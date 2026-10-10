/* =====================================================================
   subpage/protect.js
   ---------------------------------------------------------------------
   A polite guard on the pictures and reels, for every page that loads it:

     · no "Save image / Save video as" on right-click over an image,
       video or the flight's still (the rest of the page keeps its menu)
     · images and reels cannot be dragged out onto the desktop
     · no long-press "Save to Photos" on phones
     · no download button or picture-in-picture on any reel

   It reaches into the landing's own frames as well, and keeps up with
   media added later (the chapters build theirs when they open).

   A deterrent only: the files are still public, so anyone determined can
   reach them through the browser's tools or the repository.
   ===================================================================== */
(function(){
  var MEDIA='img, video, canvas';
  var CSS='img, video, canvas{ -webkit-user-drag:none; user-drag:none; -webkit-touch-callout:none; }';

  function onMedia(e){ var t=e.target; return t && t.closest && t.closest(MEDIA); }
  function quiet(v){
    v.setAttribute('controlsList','nodownload noplaybackrate');
    v.disablePictureInPicture=true;
  }

  function guard(doc){
    if(!doc || doc.__guarded) return;
    doc.__guarded=true;
    var st=doc.createElement('style'); st.textContent=CSS;
    (doc.head||doc.documentElement).appendChild(st);
    doc.addEventListener('contextmenu', function(e){ if(onMedia(e)) e.preventDefault(); }, true);
    doc.addEventListener('dragstart', function(e){ if(onMedia(e)) e.preventDefault(); }, true);
    [].forEach.call(doc.querySelectorAll('video'), quiet);
    new MutationObserver(function(ms){
      ms.forEach(function(m){ [].forEach.call(m.addedNodes, function(n){
        if(n.nodeType!==1) return;
        if(n.tagName==='VIDEO') quiet(n);
        if(n.querySelectorAll) [].forEach.call(n.querySelectorAll('video'), quiet);
        if(n.tagName==='IFRAME') frame(n);
      }); });
    }).observe(doc.documentElement, { childList:true, subtree:true });
    [].forEach.call(doc.querySelectorAll('iframe'), frame);
  }

  /* the landing and the about panels are frames written into the page itself, so they share
     its origin and can be guarded the same way, each time one (re)loads */
  function frame(f){
    function go(){ try{ guard(f.contentDocument); }catch(e){} }
    f.addEventListener('load', function(){ try{ f.contentDocument.__guarded=false; }catch(e){} go(); });
    go();
  }

  guard(document);
})();
