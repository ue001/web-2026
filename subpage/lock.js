/* =====================================================================
   subpage/lock.js
   ---------------------------------------------------------------------
   A password in front of protected projects (locked:true in content/).

     · on a project page (<body data-locked>): shows the password screen
       and only loads the page's scripts (data-load) once it is right.
     · on the index: window.__lockAsk(rect, href) shows the field over
       the reel that was clicked, then goes to the project page.

   The right password is remembered until the browser tab is closed, so
   it is asked once per visit, not once per project.

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

  function unlocked(){ try{ return sessionStorage.getItem(KEY)===HASH; }catch(e){ return false; } }
  function remember(){ try{ sessionStorage.setItem(KEY,HASH); }catch(e){} }
  function sha(s){
    if(!(window.crypto&&crypto.subtle&&window.TextEncoder)) return Promise.resolve('');
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)).then(function(b){
      return [].map.call(new Uint8Array(b),function(x){ return ('0'+x.toString(16)).slice(-2); }).join('');
    });
  }

  /* the note, the field and its message; calls ok() once the password is right */
  function form(ok){
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
        if(h===HASH){ remember(); msg.textContent=''; ok(); return; }
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
    if(unlocked()){ done(); }
    else {
      /* same rule as the index: dark unless the visitor chose light */
      var t=null; try{ t=localStorage.getItem('jihae-theme'); }catch(e){}
      document.documentElement.dataset.theme = t==='light' ? 'light' : 'dark';
      var page=document.createElement('div');
      page.className='lock-page';
      page.innerHTML='<a class="lock-name" href="index.html">Jihae Cha</a><div class="lock-wrap"><h1></h1></div>';
      var wrap=page.querySelector('.lock-wrap');
      wrap.querySelector('h1').textContent=body.getAttribute('data-title')||'';
      wrap.appendChild(form(function(){ if(!go) page.remove(); done(); }));
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
    removeEventListener('scroll',shut,true);
    removeEventListener('resize',shut);
  }
  function onKey(e){ if(e.key==='Escape'){ e.stopPropagation(); shut(); } }
  function onOut(e){ if(box && !box.contains(e.target)) shut(); }
  window.__lockUnlocked=unlocked;
  /* href is an address to go to, or a function to call once the password is right */
  window.__lockAsk=function(r, href){
    var go=function(){ if(typeof href==='function') href(); else location.href=href; };
    if(unlocked()){ go(); return; }
    shut();
    box=document.createElement('div');
    box.className='lock-box';
    box.style.left=r.left+'px'; box.style.top=r.top+'px';
    box.style.width=r.width+'px'; box.style.height=r.height+'px';
    var f=form(function(){ shut(); go(); });
    box.appendChild(f);
    /* a second click on the reel, anywhere but the field, puts the reel back */
    box.addEventListener('click',function(e){ if(!f.contains(e.target)) shut(); });
    document.body.appendChild(box);
    requestAnimationFrame(function(){ if(box) box.classList.add('on'); });
    box.querySelector('input').focus({ preventScroll:true });
    addEventListener('keydown',onKey,true);
    document.addEventListener('pointerdown',onOut,true);
    addEventListener('scroll',shut,true);   /* it sits over the reel, so a scroll would leave it behind */
    addEventListener('resize',shut);
  };
})();
