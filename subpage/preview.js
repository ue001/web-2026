/* =====================================================================
   subpage/preview.js
   ---------------------------------------------------------------------
   Renders one chapter as a standalone page. The plate, row, cell and
   section builders below are copied from the main site's chapter script
   so the markup is identical — same classes, same grid spans, same
   caption registers. The only differences:

     · title / year / roles come from the chapter object, not from an
       index tile, because a standalone page has no tile to read.
     · the hero is built from ch.cover rather than cloned from a tile.
     · Continue is an <a href> to the next chapter's `file`, not a
       button that re-renders in place. Chapters with file:null fall
       back to a link to the index.
     · no flight animation, no history, no scroll lock.

   Which chapter a page shows is set by data-chapter on <body>.
   ===================================================================== */
(function(){
  /* chapters are matched by file NAME, not type: media/generative.mp4, .jpg
     or plain media/generative all find the same chapter */
  function name(s){ return (s||'').split(/[?#]/)[0].replace(/\.[a-z0-9]+$/i,'').split('/').slice(-2).join('/'); }
  var CH = {};
  Object.keys(window.CHAPTERS || {}).forEach(function(key){ CH[name(key)] = window.CHAPTERS[key]; });
  var k  = document.body.getAttribute('data-chapter');
  var ch = CH[name(k)];
  var proj  = document.getElementById('proj');
  var inner = document.getElementById('projInner');

  if(!ch){
    inner.innerHTML = '<div class="prow"><div class="pc" style="grid-column:1 / 13">'+
      '<p class="body">No chapter is registered under <b>'+esc(k)+'</b>. '+
      'Check the key at the top of the matching file in content/ — it must '+
      'match this page\'s data-chapter exactly.</p></div></div>';
    return;
  }

  function esc(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;'); }
  function isVideo(s){ return /\.(mp4|mov|webm|m4v)(\?|$)/i.test(s||''); }

  function cell(span,html,rule){
    return '<div class="pc'+(rule?' pc--rule':'')+'" style="grid-column:'+span[0]+' / '+span[1]+'">'+(html||'')+'</div>';
  }
  function cellEl(span,rule){
    var d=document.createElement('div');
    d.className='pc'+(rule?' pc--rule':'');
    d.style.gridColumn=span[0]+' / '+span[1];
    return d;
  }
  function row(){ var r=document.createElement('div'); r.className='prow'; return r; }

  function mediaEl(src){
    var n;
    if(isVideo(src)){
      n=document.createElement('video'); n.src=src;
      n.autoplay=true; n.muted=true; n.loop=true; n.playsInline=true; n.preload='metadata';
    } else { n=document.createElement('img'); n.src=src; n.alt=''; n.decoding='async'; }
    /* a missing file still has to read as layout: the plate keeps its
       box and prints the path it was looking for */
    n.addEventListener('error',function(){
      var f=n.parentNode; if(!f) return;
      var g=document.createElement('div');
      g.className='ghost'; g.textContent=src;
      g.style.cssText='position:absolute;inset:0;display:flex;align-items:center;'+
        'justify-content:center;padding:1rem;text-align:center;font-size:12px;'+
        'color:var(--ink-soft);background:var(--shot-bg);word-break:break-all;';
      f.style.position='relative';
      n.style.visibility='hidden';
      f.insertBefore(g,n.nextSibling);
    });
    return n;
  }

  /* ---- slideshow ----------------------------------------------------
     A figure with `slides:[…]` cross-fades through its files instead of
     showing one. The first slide stays in normal flow so the plate keeps
     that file's natural height; the rest sit on top of it.

     The rule under the plate is the clock: the active one fills across
     as its slide's time runs out, so the cut is never a surprise. It
     freezes where it is when the reader holds the frame, and carries on
     from there — the bar and the timer read from the same remainder. */
  function framesEl(item){
    var wrap=document.createElement('div');
    wrap.className='frames';
    var nodes=item.slides.map(function(src,i){
      var n=mediaEl(src);
      n.dataset.on = i===0 ? 'true' : 'false';
      wrap.appendChild(n);
      return n;
    });

    var dots=document.createElement('div');
    dots.className='dots';
    var buttons=nodes.map(function(_,i){
      var b=document.createElement('button');
      b.type='button';
      b.setAttribute('aria-label','Slide '+(i+1)+' of '+nodes.length);
      b.setAttribute('aria-pressed', String(i===0));
      b.innerHTML='<i></i>';
      dots.appendChild(b);
      return b;
    });
    wrap.appendChild(dots);

    var at=0, timer=null, seen=false, held=false;
    var wait=item.interval||4200;
    var spent=0, since=0;
    var still=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(still) wrap.dataset.still='true';

    function bar(i){ return buttons[i].firstChild; }
    function at_(sx,i,ms){
      var f=bar(i);
      f.style.transition = ms ? ('transform '+ms+'ms linear') : 'none';
      f.style.transform  = 'scaleX('+sx+')';
    }
    function done(i){ /* slides already passed read as full, not empty */
      at_(i<at?1:0, i, 0);
    }
    function grown(){
      var m=getComputedStyle(bar(at)).transform, sx=0;
      if(m && m!=='none'){ sx=parseFloat(m.slice(m.indexOf('(')+1)) || 0; }
      return Math.min(Math.max(sx,0),1);
    }

    /* The outgoing slide is not faded out. It holds at full opacity
       underneath while the incoming one fades in on top, so the plate
       never dips to its background — no blink between slides. It is
       only hidden once the one above it has fully arrived. */
    var clear=null;
    function show(i){
      var was=at;
      at=(i+nodes.length)%nodes.length;
      spent=0;
      if(clear){ clearTimeout(clear); clear=null; }

      nodes.forEach(function(n,j){
        if(j===at){ n.style.zIndex=3; n.dataset.on='true'; }
        else if(j===was){ n.style.zIndex=2; n.dataset.on='true'; }
        else { n.style.zIndex=1; n.dataset.on='false'; }
      });
      if(was!==at){
        clear=setTimeout(function(){
          nodes[was].dataset.on='false';
          nodes[was].style.zIndex=1;
          clear=null;
        }, 720);
      }

      buttons.forEach(function(b,j){
        b.setAttribute('aria-pressed', String(j===at));
        done(j);
      });
      void bar(at).offsetWidth;   /* commit the reset before the fill */
    }

    function run(){
      if(timer||held||!seen) return;
      var left=Math.max(wait-spent, 60);
      since=Date.now();
      at_(1, at, still?0:left);
      timer=setTimeout(function(){ timer=null; show(at+1); run(); }, left);
    }
    function halt(){
      if(!timer) return;
      clearTimeout(timer); timer=null;
      spent+=Date.now()-since;
      at_(grown(), at, 0);      /* freeze the bar where the eye left it */
    }

    buttons.forEach(function(b,i){
      b.addEventListener('click',function(){ halt(); held=true; show(i); });
    });
    wrap.addEventListener('pointerenter',function(){ held=true; halt(); });
    wrap.addEventListener('pointerleave',function(){ held=false; run(); });
    wrap.addEventListener('focusin',function(){ held=true; halt(); });
    wrap.addEventListener('focusout',function(){ held=false; run(); });

    if(window.IntersectionObserver){
      new IntersectionObserver(function(es){
        seen=es[0].isIntersecting;
        if(seen) run(); else halt();
      },{threshold:.25}).observe(wrap);
    } else { seen=true; run(); }

    return wrap;
  }

  function plateEl(item,mark){
    var fig=document.createElement('figure'); fig.className='plate';
    if(item.fit) fig.dataset.fit=item.fit;
    if(item.ratio) fig.style.setProperty('--r', item.ratio);
    if(item.w) fig.style.maxWidth=item.w;
    if(item.align==='right'){ fig.style.marginLeft='auto'; fig.dataset.align='right'; }
    else if(item.align==='center'){ fig.style.marginLeft='auto'; fig.style.marginRight='auto'; fig.dataset.align='center'; }
    if(item.slides && item.slides.length>1){ fig.className+=' plate--show';
      fig.appendChild(framesEl(item)); }
    else fig.appendChild(mediaEl(item.src || (item.slides||[])[0]));
    if(item.cap){
      var cap=document.createElement('figcaption');
      cap.className='figcap'+(item.kind==='note'?' figcap--note':'');
      cap.innerHTML=(mark?'<b>'+mark+'</b> ':'')+esc(item.cap);
      fig.appendChild(cap);
    }
    if(item.kind==='doc'&&item.credit){
      var cr=document.createElement('p'); cr.className='credit';
      cr.textContent='Photograph: '+item.credit;
      fig.appendChild(cr);
    }
    return fig;
  }

  /* A section is ONE row: the text holds in the left cell while that
     section's plates scroll past it on the right. */
  function sectionRow(sec,n){
    var r=row(); r.id='sec-'+n;

    var left=cellEl([1,3],true);
    left.className+=' sec-text';
    var hold=document.createElement('div');
    hold.className='hold';
    hold.innerHTML='<h3>'+esc(sec.name)+'</h3>'+
      (sec.body||[]).map(function(p){ return '<p class="body">'+esc(p)+'</p>'; }).join('')+
      (sec.more||[]).map(function(p){ return '<p class="body more">'+esc(p)+'</p>'; }).join('');
    left.appendChild(hold);

    var right=cellEl([3,13],false);
    right.className+=' stack'+(sec.tight?' stack--tight':'');
    (sec.figures||[]).forEach(function(item){
      if(item.group&&item.group.length){
        var g=document.createElement('div');
        g.className='pgroup';
        g.style.gridTemplateColumns='repeat('+item.group.length+', minmax(0,1fr))';
        item.group.forEach(function(it){ g.appendChild(plateEl(it,'')); });
        right.appendChild(g);
      } else {
        right.appendChild(plateEl(item,''));
      }
    });

    r.appendChild(left); r.appendChild(right);
    return r;
  }

  function build(){
    var html='';

    /* the cover plate */
    html+='<div class="prow proj__open">'+
      '<div class="pc proj__hero" style="grid-column:1 / 13">'+
        '<div class="slot" id="projSlot"></div>'+
      '</div>'+
    '</div>';

    /* title 1–5, then the meta pairs across the rest */
    var roleList=(ch.role||'').split(/\s*,\s*/).filter(Boolean)
      .map(function(r){ return '<span>'+esc(r)+',</span>'; }).join('')
      .replace(/,<\/span>$/,'</span>');
    html+='<div class="prow prow--open prow--head">'+
      cell([1,6],'<h2>'+esc(ch.head||ch.title||'')+'</h2>'+
        (ch.context?'<p class="tags">'+esc(ch.context)+'</p>':'')+
        (ch.note?'<p class="tags">'+esc(ch.note)+'</p>':''),false)+
      cell([6,8],'<p class="mkey">Year</p><p class="mval">'+esc(ch.year||'')+'</p>',false)+
      cell([8,10],'<p class="mkey">Scope</p><p class="mval">'+roleList+'</p>',false)+
      cell([10,13],(ch.tools?'<p class="mkey">Tools</p><p class="mval"><span>'+esc(ch.tools).replace(/\s*(\([^)]*\))/g,'</span><span>$1')+'</span></p>':''),false)+
    '</div>';

    /* the statement */
    if(ch.lede){
      html+='<div class="prow prow--open prow--say">'+
        cell([1,8],'<p class="statement">'+esc(ch.lede)+'</p>',false)+
        cell([9,13],'',false)+
      '</div>';
    }

    inner.innerHTML=html;

    /* hero: the same media the index tile uses */
    var slot=inner.querySelector('#projSlot');
    slot.appendChild(mediaEl(ch.banner||ch.cover||k));

    (ch.sections||[]).forEach(function(sec,n){
      inner.appendChild(sectionRow(sec,n));
    });

    /* the loop — an ordinary link, so it works off file:// */
    var nx=ch.next, nch=nx?CH[name(nx)]:null;
    var foot=row();
    var slug=function(t){ return (t||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); };   /* as the index names its chapters */
    if(nch){
      foot.innerHTML=cell([1,3],'<p class="mkey">Continue</p>'+
        '<a class="proj__back" href="'+(nch.file || 'index.html#'+slug(nch.title))+'">'+
          (nch.numeral?nch.numeral+'. ':'')+esc(nch.title||'')+' &rarr;</a>',true)+
        cell([3,13],'',false);
    } else {
      foot.innerHTML=cell([1,3],'<a class="proj__back" href="index.html">&larr; Back</a>',true)+
        cell([3,13],'',false);
    }
    inner.appendChild(foot);
  }

  /* ---- read / even / look ------------------------------------------
     Chosen with the same Text / Shared / Image menu as the index, and
     saved under the index's own key, so the mode a visitor picked on the
     index is the mode a subpage opens in. */
  var MKEY='jihae-split', OLDKEY='jihae-projmode';
  var MODES={read:1,even:1,look:1};
  var STOPS=[{m:'look',v:15,n:'Image'},{m:'even',v:38,n:'Shared'},{m:'read',v:68,n:'Text'}];
  var dialSync=null;
  function setMode(m,save){
    proj.dataset.mode = MODES[m] ? m : 'even';
    [].forEach.call(proj.querySelectorAll('[data-mode-set]'),function(b){
      b.setAttribute('aria-pressed', String(b.dataset.modeSet===proj.dataset.mode));
    });
    if(save){
      try{ localStorage.setItem(MKEY, proj.dataset.mode); localStorage.setItem(OLDKEY, proj.dataset.mode); }catch(e){}
      proj.dataset.hot='true';
      clearTimeout(setMode.t); setMode.t=setTimeout(function(){ proj.removeAttribute('data-hot'); },760);
    }
    if(dialSync) dialSync();
  }

  /* the menu: three ruled cells, Text · Shared · Image, left to right.
     The chosen cell takes the space; the corners touching it curve away.
     Click a cell, drag across, or use the arrow keys. */
  function buildDial(){
    var bar=document.createElement('div');
    bar.className='ratio'; bar.setAttribute('role','group'); bar.setAttribute('aria-label','Layout');
    var dial=document.createElement('div');
    dial.className='dial dial--cells'; dial.tabIndex=0;
    dial.setAttribute('role','slider'); dial.setAttribute('aria-label','Text, Shared or Image');
    dial.setAttribute('aria-valuemin','15'); dial.setAttribute('aria-valuemax','68');
    dial.innerHTML='<i class="c"><span>Text</span></i><i class="c"><span>Shared</span></i><i class="c"><span>Image</span></i>';
    bar.appendChild(dial); document.body.appendChild(bar);

    var cells=[].slice.call(dial.querySelectorAll('.c'));
    var ST=[STOPS[2],STOPS[1],STOPS[0]];
    var GROW=2.4, SOFTEN=.55, FAR=.16, L=2, val=38;
    var still=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
    function nearest(v){ return STOPS.reduce(function(a,s){ return Math.abs(s.v-v)<Math.abs(a.v-v)?s:a; }); }
    var ease=function(k){ return k*k*(3-2*k); };
    function draw(v){
      var W=dial.clientWidth, H=dial.clientHeight;
      var f=ST.map(function(s){ var k=STOPS.indexOf(s), nb=STOPS[k+(v>s.v?1:-1)]; var span=nb?Math.abs(nb.v-s.v):30; return Math.max(0,1-Math.abs(v-s.v)/span); });
      var w=f.map(function(k){ return 1+GROW*ease(k); }), tot=w.reduce(function(a,b){return a+b;},0);
      var x=0, lead=f.indexOf(Math.max.apply(null,f));
      cells.forEach(function(c,i){
        var cw=w[i]/tot*(W+L*2), left=x-(i?L:0); x+=cw;
        c.style.left=left+'px'; c.style.width=(cw+(i?L:0))+'px';
        var short=Math.min(cw,H), me=ease(f[i]);
        var side=function(j){ var nb=cells[j]?ease(f[j]):null; return nb===null? short*FAR*Math.max(0,1-me)*.6 : (nb>me? short/2*SOFTEN*(nb-me) : short*FAR*Math.max(0,1-me)*.6); };
        var lt=side(i-1), rt=side(i+1);
        c.style.borderRadius=lt.toFixed(1)+'px '+rt.toFixed(1)+'px '+rt.toFixed(1)+'px '+lt.toFixed(1)+'px';
        c.classList.toggle('lead',i===lead); c.classList.toggle('on',i===lead && f[i]>.98);
        c.firstChild.style.letterSpacing=(-.1+.1*me).toFixed(3)+'em';
      });
      var n=nearest(v);
      dial.setAttribute('aria-valuenow',Math.round(v)); dial.setAttribute('aria-valuetext',n.n);
    }
    function live(v){
      val=Math.min(68,Math.max(15,v)); draw(val);
      var n=nearest(val); if(proj.dataset.mode!==n.m) setMode(n.m,true);
    }
    function glide(to,ms){
      var from=val, t0=performance.now();
      (function f(now){ var t=still?1:Math.min(1,(now-t0)/ms), e=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
        live(from+(to-from)*e); if(t<1) requestAnimationFrame(f); })(t0);
    }
    dialSync=function(){ var s=STOPS.filter(function(s){ return s.m===proj.dataset.mode; })[0];
      if(s && !d0 && Math.abs(s.v-val)>.5){ val=s.v; draw(val); } };

    var d0=null, closeT=null;
    function open(){ clearTimeout(closeT); dial.classList.add('open'); }
    function close(ms){ clearTimeout(closeT); closeT=setTimeout(function(){
      if(!d0 && !dial.matches(':focus-visible') && !dial.matches(':hover')) dial.classList.remove('open'); }, ms||350); }
    dial.addEventListener('pointerenter',open);
    dial.addEventListener('pointerleave',function(){ close(); });
    dial.addEventListener('focus',open);
    dial.addEventListener('blur',function(){ close(150); });
    dial.addEventListener('pointerdown',function(e){ dial.setPointerCapture(e.pointerId); dial.classList.add('held'); open(); d0={x:e.clientX,v:val,moved:false}; });
    dial.addEventListener('pointermove',function(e){ if(!d0) return;
      if(!d0.moved && Math.abs(e.clientX-d0.x)>3) d0.moved=true;
      if(d0.moved) live(d0.v-(e.clientX-d0.x)/dial.clientWidth*(68-15)*1.5); });
    function up(e){ dial.classList.remove('held'); if(!d0) return; var c=d0; d0=null;
      if(!c.moved && e.type==='pointerup'){
        var r=dial.getBoundingClientRect(), x=e.clientX-r.left, i=0;
        cells.forEach(function(el,k){ if(x>=el.offsetLeft) i=k; });
        glide(ST[i].v,520);
      } else glide(nearest(val).v,280);
      if(!dial.matches(':hover')) close(900); }
    dial.addEventListener('pointerup',up); dial.addEventListener('pointercancel',up);
    dial.addEventListener('keydown',function(e){
      var i=STOPS.indexOf(nearest(val)), j=null;
      if(e.key==='ArrowLeft'||e.key==='ArrowUp') j=Math.min(2,i+1);
      if(e.key==='ArrowRight'||e.key==='ArrowDown') j=Math.max(0,i-1);
      if(j!==null){ e.preventDefault(); glide(STOPS[j].v,520); }
    });
    if(window.ResizeObserver) new ResizeObserver(function(){ draw(val); }).observe(dial);
    addEventListener('resize',function(){ draw(val); });

    /* hidden over the cover image, arriving once the reader scrolls past it */
    function pastHero(){
      var hero=document.querySelector('.proj__open');
      var past=hero && (window.scrollY||document.documentElement.scrollTop) > hero.offsetHeight*0.6;
      document.documentElement.classList.toggle('proj-past-hero', !!past);
    }
    addEventListener('scroll',pastHero,{passive:true}); pastHero();
    draw(val);
  }

  /* ---- theme, shared with the index -------------------------------- */
  var TKEY='jihae-theme';
  function setTheme(t,save){
    document.documentElement.dataset.theme = (t==='dark') ? 'dark' : 'light';
    var b=document.getElementById('theme');
    if(b){ b.textContent = (t==='dark') ? 'Light' : 'Dark';
           b.setAttribute('aria-pressed', String(t==='dark')); }
    if(save){ try{ localStorage.setItem(TKEY,t); }catch(e){} }
  }

  build();
  (function(){   /* the name, top left, goes back to the home page */
    var a=document.createElement('a'); a.className='stuck-name'; a.href='index.html';
    a.textContent='Jihae Cha'; a.setAttribute('aria-label','Jihae Cha, home');
    document.body.appendChild(a);
  })();
  proj.dataset.open='true';
  proj.dataset.in='true';
  proj.dataset.settled='true';
  proj.setAttribute('aria-hidden','false');

  buildDial();
  var sm=null; try{ sm=localStorage.getItem(MKEY)||localStorage.getItem(OLDKEY); }catch(e){}
  setMode(MODES[sm]?sm:'even', false);
  var st=null; try{ st=localStorage.getItem(TKEY); }catch(e){}
  setTheme(st==='light'?'light':'dark', false);   /* dark unless the visitor chose light, as on the index */

  document.title = (ch.title||'Project') + ' — Jihae';

  document.addEventListener('click',function(e){
    var md=e.target.closest&&e.target.closest('[data-mode-set]');
    if(md){ setMode(md.dataset.modeSet,true); return; }
    var th=e.target.closest&&e.target.closest('#theme');
    if(th){ setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark',true); return; }
    var j=e.target.closest&&e.target.closest('[data-jump]');
    if(j){
      e.preventDefault();
      var t=document.getElementById(j.dataset.jump);
      if(t) window.scrollTo({top:t.offsetTop-8, behavior:'smooth'});
    }
  });
})();
