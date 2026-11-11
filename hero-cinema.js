/* Cinematic hero showcase (11 Nov 2026)
   - Crossfades between slides only after the next image has decoded, so a frame is never blank.
   - The outgoing slide stays fully visible underneath while the new one fades in.
   - Runs only while the hero is on screen and the tab is visible; pauses on request.
   - With reduced motion: no autoplay and no camera moves; the segments still switch slides. */
(function(){
  var fig=document.querySelector('.cine');
  if(!fig)return;
  var slides=[].slice.call(fig.querySelectorAll('.cine-slide')),
      segs=[].slice.call(fig.querySelectorAll('.cine-seg')),
      pauseBtn=fig.querySelector('.cine-pause'),
      sweep=fig.querySelector('.cine-sweep'),
      mq=window.matchMedia?matchMedia('(prefers-reduced-motion: reduce)'):{matches:false},
      DUR=6500,FADE=mq.matches?250:1400,i=0,timer=0,prevTimer=0,onScreen=true,paused=false,busy=false;

  fig.style.setProperty('--dur',DUR/1000+'s');

  function motion(){return !mq.matches}
  function imgOf(n){return slides[n].querySelector('img')}
  function ready(n){
    var im=imgOf(n);
    if(!im)return Promise.resolve();
    if(im.loading==='lazy')im.loading='eager';
    if(im.complete&&im.naturalWidth)return im.decode?im.decode().catch(function(){}):Promise.resolve();
    return new Promise(function(res){
      var done=function(){im.removeEventListener('load',done);im.removeEventListener('error',done);res()};
      im.addEventListener('load',done);im.addEventListener('error',done);
      setTimeout(res,8000);
    }).then(function(){return im.decode?im.decode().catch(function(){}):null});
  }
  function mark(n){
    segs.forEach(function(s,k){
      s.classList.toggle('is-on',k===n);
      s.classList.toggle('is-done',false);
      s.classList.remove('is-run');
      if(k===n)s.setAttribute('aria-current','true');else s.removeAttribute('aria-current');
    });
    if(running()){void segs[n].offsetWidth;segs[n].classList.add('is-run')}
  }
  function show(n){
    if(n===i||busy)return;
    busy=true;
    ready(n).then(function(){
      var old=slides[i];
      slides.forEach(function(s){s.classList.remove('is-prev')});
      old.classList.add('is-prev');old.classList.remove('is-on');old.setAttribute('inert','');
      slides[n].classList.add('is-on');slides[n].removeAttribute('inert');
      i=n;mark(n);
      if(sweep&&motion()){sweep.classList.remove('is-run');void sweep.offsetWidth;sweep.classList.add('is-run')}
      clearTimeout(prevTimer);
      prevTimer=setTimeout(function(){old.classList.remove('is-prev')},FADE+50);
      busy=false;
      ready((n+1)%slides.length);   // warm the next image while this one plays
      schedule();
    });
  }
  function running(){return motion()&&onScreen&&!paused&&!document.hidden}
  function schedule(){
    clearTimeout(timer);
    fig.classList.toggle('is-live',motion()&&onScreen&&!document.hidden);
    fig.classList.toggle('is-paused',paused||!onScreen||document.hidden);
    fig.classList.toggle('is-auto',motion());
    if(running())timer=setTimeout(function(){show((i+1)%slides.length)},DUR);
  }
  function restartRun(){segs.forEach(function(s){s.classList.remove('is-run')});if(running()){void segs[i].offsetWidth;segs[i].classList.add('is-run')}}

  segs.forEach(function(s,k){s.addEventListener('click',function(){if(k===i){return}show(k)})});
  if(pauseBtn)pauseBtn.addEventListener('click',function(){
    paused=!paused;
    pauseBtn.setAttribute('aria-pressed',String(paused));
    pauseBtn.setAttribute('aria-label',paused?'Play the showcase':'Pause the showcase');
    schedule();if(!paused)restartRun();
  });
  // keyboard: left/right arrows on the segment row
  fig.querySelector('.cine-segs').addEventListener('keydown',function(e){
    if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
      e.preventDefault();var n=(i+(e.key==='ArrowRight'?1:slides.length-1))%slides.length;show(n);segs[n].focus();
    }
  });
  // swipe on the stage (touch and pen), without blocking vertical scrolling
  var sx=0,sy=0,tracking=false,stage=fig.querySelector('.cine-stage');
  stage.addEventListener('pointerdown',function(e){if(e.pointerType==='mouse')return;tracking=true;sx=e.clientX;sy=e.clientY},{passive:true});
  stage.addEventListener('pointerup',function(e){
    if(!tracking)return;tracking=false;
    var dx=e.clientX-sx,dy=e.clientY-sy;
    if(Math.abs(dx)>48&&Math.abs(dx)>Math.abs(dy)*1.4)show((i+(dx<0?1:slides.length-1))%slides.length);
  },{passive:true});
  stage.addEventListener('pointercancel',function(){tracking=false},{passive:true});
  stage.style.touchAction='pan-y';

  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){onScreen=es[0].isIntersecting;schedule();restartRun()},{threshold:.15}).observe(fig);
  }
  document.addEventListener('visibilitychange',function(){schedule();restartRun()});
  if(mq.addEventListener)mq.addEventListener('change',function(){schedule();restartRun()});

  // start once the first image is ready; warm the second in the background
  ready(0).then(function(){mark(0);schedule();
    var warm=function(){ready(1)};
    if(document.readyState==='complete')warm();else addEventListener('load',warm,{once:true});
  });
})();
