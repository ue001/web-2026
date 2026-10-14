/* =====================================================================
   subpage/lock.js
   ---------------------------------------------------------------------
   A password in front of protected projects (locked:true in content/).

     · on a project page (<body data-locked>): shows the password screen
       and only loads the page's scripts (data-load) once it is right.
     · on the index: window.__lockAsk(rect, href) shows the field over
       the reel that was clicked, then goes to the project page.

   The right password is remembered per project until the browser tab is
   closed: unlocking one project does not unlock the others.

   This is a polite gate, not real security: the site is static, so the
   content and media files can still be reached directly.

   To change the password, run this in Terminal and paste the result
   into HASH below:
       printf 'new-password' | shasum -a 256
   ===================================================================== */
(function(){
  var HASH='6129d36227bb1615b49951d396e9c80af49a28d157b1d0f5937a10b6107c3092';
  var CONTACT='mailto:jihae.cha9@gmail.com?subject=Portfolio%20access';   /* where "contact me" leads */
  var KEY='jihae-unlocked';

  /* id: the project's chapter key (data-chapter on its page, its key in CHAPTERS on the index) */
  function slot(id){ return KEY+':'+String(id||'').replace(/\.[a-z0-9]+$/i,''); }   /* media/generative.mp4 and media/generative are the same */
  function unlocked(id){ try{ return sessionStorage.getItem(slot(id))===HASH; }catch(e){ return false; } }
  function remember(id){ try{ sessionStorage.setItem(slot(id),HASH); }catch(e){} }
  function sha(s){
    if(!(window.crypto&&crypto.subtle&&window.TextEncoder)) return Promise.resolve('');
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)).then(function(b){
      return [].map.call(new Uint8Array(b),function(x){ return ('0'+x.toString(16)).slice(-2); }).join('');
    });
  }

  /* the note, the field and its message; calls ok() once the password is right */
  function form(id, ok){
    var f=document.createElement('form');
    f.className='lock-form';
    f.innerHTML=
      '<p class="lock-note">Password protected. <a class="lock-ask" href="'+CONTACT+'">Contact me for access&nbsp;&rarr;</a></p>'+
      '<div class="lock-field"><input type="password" placeholder="Password" aria-label="Password" autocomplete="current-password">'+
        '<button type="submit">Enter</button></div>'+
      '<p class="lock-msg" aria-live="polite"></p>';
    var inp=f.querySelector('input'), field=f.querySelector('.lock-field'), msg=f.querySelector('.lock-msg');
    f.addEventListener('submit',function(e){
      e.preventDefault();
      sha(inp.value).then(function(h){
        if(h===HASH){ remember(id); msg.textContent=''; ok(); return; }
        msg.textContent='Wrong password. Try again.';
        field.classList.remove('bad'); void field.offsetWidth; field.classList.add('bad');
        inp.select();
      });
    });
    return f;
  }

  /* ---- a project page ------------------------------------------------ */
  var body=document.body;
  if(body && body.hasAttribute('data-locked')){
    var scripts=(body.getAttribute('data-load')||'').split(/\s+/).filter(Boolean);
    var load=function(i){
      if(i>=scripts.length) return;
      var s=document.createElement('script'); s.src=scripts[i];
      s.onload=function(){ load(i+1); };
      body.appendChild(s);
    };
    var go=body.getAttribute('data-go');   /* the project opens in the index overlay: send the visitor there once unlocked */
    var done=function(){ if(go) location.replace(go); else load(0); };
    var id=body.getAttribute('data-chapter')||location.pathname;
    if(unlocked(id)){ done(); }
    else {
      /* same rule as the index: dark unless the visitor chose light */
      var t=null; try{ t=localStorage.getItem('jihae-theme'); }catch(e){}
      document.documentElement.dataset.theme = t==='light' ? 'light' : 'dark';
      var page=document.createElement('div');
      page.className='lock-page';
      page.innerHTML='<a class="lock-name" href="index.html">Jihae Cha</a><div class="lock-wrap"><h1></h1></div>';
      var wrap=page.querySelector('.lock-wrap');
      wrap.querySelector('h1').textContent=body.getAttribute('data-title')||'';
      wrap.appendChild(form(id, function(){ if(!go) page.remove(); done(); }));
      var back=document.createElement('a'); back.className='lock-back'; back.href='index.html'; back.innerHTML='&larr; Back to all work';
      wrap.appendChild(back);
      body.insertBefore(page, body.firstChild);
      wrap.querySelector('input').focus();
    }
  }

  /* ---- the index: the field over the clicked reel --------------------- */
  var box=null;
  function shut(){
    if(!box) return; var b=box; box=null;
    b.classList.remove('on'); setTimeout(function(){ b.remove(); },300);
    removeEventListener('keydown',onKey,true);
    document.removeEventListener('pointerdown',onOut,true);
    removeEventListener('scroll',onScroll,true);
    removeEventListener('resize',shut);
  }
  function onKey(e){ if(e.key==='Escape'){ e.stopPropagation(); shut(); } }
  /* only a real scroll away closes it: a snap settling, trackpad momentum
     or a list scrolling inside a reel moves a few pixels and would
     otherwise shut the field while the password is being typed */
  var from=null, under=null;
  function onScroll(e){
    var t=e.target===document?document.scrollingElement:e.target;
    if(!t||!from) return;
    if(under && t!==document.scrollingElement && !t.contains(under)) return;   /* a scroller inside the reel, not around it */
    if(!from.has(t)){ from.set(t,[t.scrollTop,t.scrollLeft]); return; }
    var s=from.get(t);
    if(Math.abs(t.scrollTop-s[0])>40||Math.abs(t.scrollLeft-s[1])>40) shut();
  }
  function onOut(e){ if(box && !box.contains(e.target)) shut(); }
  window.__lockUnlocked=unlocked;
  /* href is an address to go to, or a function to call once the password is right */
  window.__lockAsk=function(r, href, id){
    var go=function(){ if(typeof href==='function') href(); else location.href=href; };
    if(unlocked(id)){ go(); return; }
    shut();
    under=document.elementFromPoint(r.left+r.width/2, r.top+r.height/2);   /* the reel, before the field covers it */
    box=document.createElement('div');
    box.className='lock-box';
    box.style.left=r.left+'px'; box.style.top=r.top+'px';
    box.style.width=r.width+'px'; box.style.height=r.height+'px';
    var f=form(id, function(){ shut(); go(); });
    box.appendChild(f);
    /* a second click on the reel, anywhere but the field, puts the reel back */
    box.addEventListener('click',function(e){ if(!f.contains(e.target)) shut(); });
    document.body.appendChild(box);
    requestAnimationFrame(function(){ if(box) box.classList.add('on'); });
    box.querySelector('input').focus({ preventScroll:true });
    addEventListener('keydown',onKey,true);
    document.addEventListener('pointerdown',onOut,true);
    from=new Map();
    addEventListener('scroll',onScroll,true);   /* it sits over the reel, so a scroll would leave it behind */
    addEventListener('resize',shut);
  };
})();
