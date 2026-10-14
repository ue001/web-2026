/* CHAPTER — Generative Title Slide. Field reference: content/05-line0.js
   Figure paths match the slides of generative_title_slide.pdf — export
   each slide under these names, or change the paths. */
window.CHAPTERS['media/generative.mp4'] = {
  numeral:'VII',
  file:'generative-title/',
  locked:true,   /* asks for the password: see subpage/lock.js */
  head:'Generative Title Slide, CLEVER°FRANKE',
  title:'Generative Title Slide',
  year:'2026',
  context:'Internship, CLEVER°FRANKE',
  lede:'A title slide that draws itself from the image behind it.',
  role:'Generative design, System design, Motion design',
  tools:'Figma Motion, JavaScript / HTML Canvas (built with Claude Code)',
  /* the sections are written out in index.html (<template data-chapter="media/generative">)
     and styled there under .proj[data-chapter="media/generative"]; init runs once
     they are on the page, each time the chapter opens */
  init:function(){
  /* Exploration: pick a meeting, the keyword dots move to its place.
     0 = wild / less branding / abstract, 1 = calm / more branding / literal.
     PLACEHOLDER for internal: wild, more branding, literal */
  (function(){
    var st=document.getElementById('gexst'), ks=document.querySelector('.g-exks'), dots=ks.querySelectorAll('.g-k b');
    var K={ in:[0,1,1], nc:[1,1,1], cl:[1,0,0] };
    var bs=st.querySelectorAll('button'), held=null;
    function pick(b){
      bs.forEach(function(x){ x.classList.toggle('on', x===b); });
      st.classList.toggle('pick', !!b); ks.classList.toggle('pick', !!b);
      dots.forEach(function(d,j){ d.style.left = b ? (8+84*K[b.dataset.g][j])+'%' : ''; });
    }
    bs.forEach(function(b){
      b.addEventListener('mouseenter',function(){ pick(b); });
      b.addEventListener('focus',function(){ pick(b); });
      b.addEventListener('click',function(){ held=(held===b)?null:b; pick(held||b); });
    });
    /* on its own it steps through the meetings; pointing at one takes over */
    var i=0, timer=null, still=matchMedia('(prefers-reduced-motion: reduce)').matches;
    function step(){ pick(bs[i++ % bs.length]); timer=setTimeout(step, 2200); }
    function run(){ if(!timer && !held && !still) step(); }
    function halt(){ clearTimeout(timer); timer=null; }
    st.addEventListener('mouseenter', halt);
    st.addEventListener('mouseleave',function(){ if(held) pick(held); else run(); });
    bs.forEach(function(b){ b.addEventListener('focus', halt); });
    new IntersectionObserver(function(es){ if(es[0].isIntersecting) run(); else halt(); },{threshold:.4}).observe(st);
    if(still) pick(bs[1]);
  })();


  /* The live slides. One source photo is sampled
     once; every canvas draws from it each frame while it is on screen. */
  (function(){
  const SRC=window.GENERATIVE_PHOTO;   /* the tulip photo, 1000px, inline so the canvas can always read it (file:// included) */
  const still=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const img=new Image(); img.src=SRC;
  const SW=96,SH=54; let px=null;
  const hash=(a,b)=>{const s=Math.sin(a*127.1+b*311.7)*43758.5;return s-Math.floor(s)};
  function sample(){const c=document.createElement('canvas');c.width=SW;c.height=SH;const x=c.getContext('2d');
    const r=Math.max(SW/img.width,SH/img.height),w=img.width*r,h=img.height*r;x.drawImage(img,(SW-w)/2,(SH-h)/2,w,h);px=x.getImageData(0,0,SW,SH).data}
  function col(u,v){const i=((Math.min(SH-1,v*SH|0))*SW+Math.min(SW-1,u*SW|0))*4;return[px[i],px[i+1],px[i+2]]}
  const CC={};const clusters=n=>CC[n]||(CC[n]=km(n));
  function km(n){let cs=[];for(let i=0;i<n;i++)cs.push(col(hash(i,1),hash(i,2)));let cnt;
    for(let it=0;it<6;it++){const s=cs.map(()=>[0,0,0,0]);
      for(let i=0;i<px.length;i+=4){let bi=0,bd=1e9;cs.forEach((c,j)=>{const d=(c[0]-px[i])**2+(c[1]-px[i+1])**2+(c[2]-px[i+2])**2;if(d<bd){bd=d;bi=j}});
        s[bi][0]+=px[i];s[bi][1]+=px[i+1];s[bi][2]+=px[i+2];s[bi][3]++}
      cs=s.map((a,j)=>a[3]?[a[0]/a[3],a[1]/a[3],a[2]/a[3]]:cs[j]);cnt=s.map(a=>a[3])}
    return cs.map((c,i)=>({c,n:cnt[i]})).filter(o=>o.n).sort((a,b)=>b.n-a.n)}
  function size(cv){const w=cv.offsetWidth,h=cv.offsetHeight,d=devicePixelRatio||1;if(cv.width!==(w*d|0)){cv.width=w*d|0;cv.height=h*d|0}return[cv.width,cv.height]}   /* layout size, not on-screen: scaling a slide must not resize or redraw it */

  const Q={
   en:{eng:'sweep',sub:'Conference',a:['Bands',3,40,10],b:['Columns',40,200,130],fixed:'bands sweep · cut · ping-pong'},
   ec:{eng:'tree',sub:'Kick-off',a:['Division',3,120,10],b:['Colors',3,16,6],fixed:'slide up'},
   in:{eng:'sweep',sub:'Team meeting',a:['Bands',3,40,24],b:['Columns',40,200,90],modes:['thickness opens','reveal','palette bloom','shuffle','push, pull']},
   ic:{eng:'tree',sub:'Internal project update',a:['Division',3,200,60],b:['Colors',3,16,9],modes:['revealing','push, pull','size sets direction']}};
  const S=[];
  Object.entries(Q).forEach(([id,q])=>{const el=document.getElementById('q-'+id);
   q.A=q.a[3];q.B=q.b[3];q.mode=q.modes?q.modes[0]:null;
   el.innerHTML=`<span class="slide"><canvas></canvas><span class="lg">Studio</span><span class="dt">Date</span><div class="t"><small>${q.sub}</small>This is a title</div></span>`;
   S.push([el.querySelector('canvas'),q]);});



  const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
  function pp(t,P){const x=(t%P)/P;if(x<.35)return ease(x/.35);if(x<.5)return 1;if(x<.85)return 1-ease((x-.5)/.35);return 0}
  let BW=false;
  const RGB=c=>{if(BW){const y=(.3*c[0]+.59*c[1]+.11*c[2])|0;return`rgb(${y},${y},${y})`}return`rgb(${c.map(v=>v|0)})`};
  function photo(x,W,H){const r=Math.max(W/img.width,H/img.height);x.filter=BW?'grayscale(1)':'none';x.drawImage(img,(W-img.width*r)/2,(H-img.height*r)/2,img.width*r,img.height*r);x.filter='none'}

  function sweep(x,W,H,q,t){
   const ext=!q.modes,m=q.mode;let bands=q.A,cols=q.B;
   if(ext)bands=Math.max(2,Math.round(2+(q.A-2)*pp(t,5)));   /* external: from two bands up to A */
   x.fillStyle='#fff';x.fillRect(0,0,W,H);
   const p=pp(t,5);
   if(m==='reveal')photo(x,W,H);
   let widths=Array(cols).fill(1);
   if(m==='push, pull')widths=widths.map((_,i)=>1+.7*Math.sin(t*1.1+i*.37)*Math.sin(t*.43+i*.11));
   const tot=widths.reduce((a,b)=>a+b,0);let X=0;
   for(let i=0;i<cols;i++){const cw=widths[i]/tot*W;
    for(let j=0;j<bands;j++){
     let u=(i+.5)/cols;const v=(j+.5)/bands;
     if(m==='shuffle'){const wave=Math.floor(t/1.6);if(hash(i+wave*31,j)<.18)u=Math.min(.999,Math.max(0,u+(hash(j,i+wave)-.5)*.5))}
     let c=col(u,v);
     if(m==='palette bloom'){const cl=clusters(9),pc=Math.max(0,Math.min(1,p*1.35-(1-v)*.35)),s=1+Math.floor(pc*(cl.length-1)+.0001);
      let bi=0,bd=1e9;for(let k=0;k<s;k++){const d=(cl[k].c[0]-c[0])**2+(cl[k].c[1]-c[1])**2+(cl[k].c[2]-c[2])**2;if(d<bd){bd=d;bi=k}}c=cl[bi].c}
     if(m==='reveal'){const d=Math.hypot(u-.5,(v-.5)*.6)*1.9+(hash(i,j)-.5)*.35;if(d<p)continue}
     let w=cw;if(m==='thickness opens')w=cw*(1-.75*p);
     x.fillStyle=RGB(c);x.fillRect(X,j*H/bands,w+(m==='thickness opens'?0:1),H/bands+1)}
    if(i&&m!=='thickness opens'){x.fillStyle='rgba(255,255,255,.45)';x.fillRect(X,0,Math.max(1,W/1000),H)}
    X+=cw}
  }
  function layout(q,W,H){
   if(q.cache&&q.cache.W===W)return q.cache;
   const cl=clusters(q.B),tot=cl.reduce((a,b)=>a+b.n,0),cells=[],regs=[];
   (function lay(ids,X,Y,w,h,hz){if(!ids.length)return;if(ids.length===1){regs.push({X,Y,w,h,k:ids[0]});return}
    const s=ids.reduce((a,i)=>a+cl[i].n,0);let half=0,k=0;while(k<ids.length-1&&half+cl[ids[k]].n<s/2){half+=cl[ids[k]].n;k++}k=Math.max(1,k);
    const A=ids.slice(0,k),B=ids.slice(k),f=A.reduce((a,i)=>a+cl[i].n,0)/s;
    if(hz){lay(A,X,Y,w*f,h,!hz);lay(B,X+w*f,Y,w*(1-f),h,!hz)}else{lay(A,X,Y,w,h*f,!hz);lay(B,X,Y+h*f,w,h*(1-f),!hz)}})(cl.map((_,i)=>i),0,0,W,H,true);
   regs.forEach(r=>{const n=Math.max(1,Math.round(q.A*cl[r.k].n/tot));let s=r.k*97;
    (function sub(X,Y,w,h,n){if(n<=1){cells.push({X,Y,w,h,c:cl[r.k].c});return}s++;const a=Math.max(1,Math.round(n*(.3+.4*hash(s,n))));const f=a/n;
     if(w>=h){sub(X,Y,w*f,h,a);sub(X+w*f,Y,w*(1-f),h,n-a)}else{sub(X,Y,w,h*f,a);sub(X,Y+h*f,w,h*(1-f),n-a)}})(r.X,r.Y,r.w,r.h,n)});
   const areas=cells.map(c=>c.w*c.h).sort((a,b)=>b-a);
   return q.cache={W,cells,hi:areas[Math.floor(areas.length*.22)]||0,lo:areas[Math.floor(areas.length*.62)]||0};
  }
  function tree(x,W,H,q,t){
   const L=layout(q,W,H),m=q.modes?q.mode:'slide up',p=pp(t,5);
   x.fillStyle='#fff';x.fillRect(0,0,W,H);
   if(m==='revealing')photo(x,W,H);
   L.cells.forEach((c,i)=>{let X=c.X,Y=c.Y,w=c.w,h=c.h;
    if(m==='push, pull'){const k=.12*Math.sin(t*1.2+i*1.7);X+=k*w*.5;w*=1-Math.abs(k)*.5;h*=1+.08*Math.sin(t+i)}
    x.save();x.beginPath();x.rect(Math.floor(c.X),Math.floor(c.Y),Math.ceil(c.w)+1,Math.ceil(c.h)+1);x.clip();
    x.fillStyle=RGB(c.c);
    if(m==='slide up'){   /* each block slides in from below, holds, then slides up and away; staggered left to right */
     const f=(t%5)/5,st=(c.X+c.w/2)/W*.12,cl=v=>Math.max(0,Math.min(1,v));
     const kin=ease(cl((f-st)/.25)),kout=ease(cl((f-.62-st)/.25));
     x.fillRect(X,Y+((1-kin)-kout)*h*1.05,w+1,h+1)}
    else if(m==='revealing'){const v=Math.hypot((c.X+c.w/2)/W-.5,((c.Y+c.h/2)/H-.5)*.6)*1.9+(hash(i,3)-.5)*.3;if(v>=p)x.fillRect(X,Y,w+1,h+1)}
    else if(m==='size sets direction'){const a=c.w*c.h,d=1-p;let ox=0,oy=0;if(a>=L.hi)oy=-h*d;else if(a>=L.lo)ox=-w*d;else oy=h*d;x.fillRect(X+ox,Y+oy,w+1,h+1)}
    else x.fillRect(X,Y,w+1,h+1);
    x.restore()});
  }
  function noimg(x,W,H,q,t){
   const P=3.2,f=(t%P)/P;x.fillStyle='#000';x.fillRect(0,0,W,H);
   if(q.eng==='tree'){
    const n=q.A<=2?1:Math.min(q.A,60);
    if(!q.bk||q.bk.n!==n||q.bk.W!==W){const r=[];let s=7;
     (function sp(X,Y,w,h,k){if(k<=1){r.push([X,Y,w,h]);return}s++;const a=Math.max(1,Math.round(k*(.3+.4*hash(s,k)))),fr=a/k;
      if(w>=h){sp(X,Y,w*fr,h,a);sp(X+w*fr,Y,w*(1-fr),h,k-a)}else{sp(X,Y,w,h*fr,a);sp(X,Y+h*fr,w,h*(1-fr),k-a)}})(0,0,W,H,n);
     q.bk={n,W,r}}
    const win=n===1?.22:.42,dur=n===1?.22:.18;
    x.fillStyle='#fff';
    q.bk.r.forEach(([X,Y,w,h],i)=>{const st=n===1?0:hash(i,11)*(win-dur);const p=Math.max(0,Math.min(1,(f-st)/dur));if(p>=1)return;
     x.save();x.beginPath();x.rect(Math.floor(X),Math.floor(Y),Math.ceil(w)+1,Math.ceil(h)+1);x.clip();x.fillRect(X,Y-ease(p)*h*1.02,w+1,h+1);x.restore()});
    return}
   if(f<.36){const seq=[1,2,4,8,16,8,4,2,1],k=Math.min(seq.length-1,Math.floor(f/.36*seq.length)),b=Math.max(1,Math.round(seq[k]*q.A/16)),c=Math.max(2,Math.round(q.B/10));
    for(let i=0;i<c;i++)for(let j=0;j<b;j++)if(hash(i+k*7,j)<.45){x.fillStyle='#fff';x.fillRect(i*W/c,j*H/b,W/c+1,H/b+1)}
    x.fillStyle='rgba(255,255,255,.45)';for(let i=1;i<c;i++)x.fillRect(i*W/c,0,Math.max(1,W/1000),H)}
  }

  /* draw only the canvases on screen */
  const vis=new Set();
  const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting?vis.add(e.target):vis.delete(e.target)));
  function drawAll(t){S.forEach(([cv,q])=>{if(!vis.has(cv))return;const[W,H]=size(cv);
    if(q.hold&&performance.now()<q.hold)return;
    if(q.mini){if(!W||q.drawnW===W)return;q.drawnW=W;t=2.2}const x=cv.getContext('2d');BW=!!q.bw;
    if(q.none){noimg(x,W,H,q,t);return}(q.eng==='tree'?tree:sweep)(x,W,H,q,t)})}
  function frame(ms){if(!S[0][0].isConnected)return;   /* the index rebuilt the chapter: this copy stops */
   if(px)drawAll(ms/1000);requestAnimationFrame(frame)}

  /* the simplified tool */
  const MEET={
   'Pitch':['ec',[6,5]],'Kick-off':['ec',[10,6]],'Client update':['ec',[14,7]],'Demo':['ec',[8,5]],'Keynote':['ec',[20,8]],
   'Conference':['en',[16,130]],'Meetup':['en',[10,100]],'PR deck':['en',[22,160]],
   'Internal project update':['ic',[60,9],'revealing'],
   'Breakfast session':['in',[24,90],'palette bloom'],'Intro':['in',[18,80],'reveal'],'Team meeting':['in',[28,110],'shuffle']};
  const QN={ec:['External','Client','treemap','slide up · fixed'],en:['External','Non-client','mosaic','bands sweep · fixed'],
   ic:['Internal','Client','treemap','choose a motion'],in:['Internal','Non-client','mosaic','choose a motion']};
  const U={},$=id=>document.getElementById(id);S.push([$('u-cv'),U]);
  function setMeet(){const m=$('u-meet').value,[qid,vals,mo]=MEET[m],base=Q[qid];
   Object.assign(U,{eng:base.eng,a:base.a,b:base.b,A:vals[0],B:vals[1],modes:base.modes||null,mode:mo||null,cache:null});
   $('u-sub').textContent=m;
   $('u-quad').innerHTML=QN[qid].map(s=>`<span>${s}</span>`).join('');
   $('u-sl').innerHTML=[U.a,U.b].map((s,i)=>`<label class="g-sl">${s[0]}<input id="u-s${i}" type="range" min="${s[1]}" max="${s[2]}" value="${vals[i]}"><span id="u-v${i}">${vals[i]}</span></label>`).join('');
   [0,1].forEach(i=>$('u-s'+i).addEventListener('input',e=>{U[i?'B':'A']=+e.target.value;$('u-v'+i).textContent=e.target.value;U.cache=null}));
   $('u-mow').hidden=!U.modes||U.none;
   if(U.modes){$('u-mo').innerHTML=U.modes.map(x=>`<button type="button" aria-pressed="${x===U.mode}">${x}</button>`).join('');
    $('u-mo').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{U.mode=b.textContent;$('u-mo').querySelectorAll('button').forEach(y=>y.setAttribute('aria-pressed',y===b))}))}
  }
  $('u-meet').addEventListener('change',setMeet);
  $('u-bw').addEventListener('change',e=>{U.bw=e.target.checked});
  function useSrc(src){img.onload=()=>{sample();for(const k in CC)delete CC[k];S.forEach(([,q])=>q.cache=null)};img.src=src;$('u-thumb').src=src;$('u-thumb').hidden=false;
   U.none=false;$('u-bw').disabled=false;$('u-mow').hidden=!U.modes}
  function noImage(){U.none=true;$('u-thumb').hidden=true;$('u-bw').checked=true;$('u-bw').disabled=true;$('u-mow').hidden=true}
  $('u-tul').addEventListener('click',()=>useSrc(SRC));
  $('u-none').addEventListener('click',noImage);
  $('u-up').addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>useSrc(r.result);r.readAsDataURL(f)});
  setMeet();

  img.onload=()=>{sample();S.forEach(([cv])=>io.observe(cv));
    if(still){vis.clear();S.forEach(([cv])=>vis.add(cv));drawAll(1.7);addEventListener('resize',()=>drawAll(1.7))}
    else requestAnimationFrame(frame)};
  })();
  },
  next:'media/line0.mp4'
};
