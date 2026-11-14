(function(){
  var btn=document.querySelector('.menu'),nav=document.getElementById('nav');
  if(btn){
    var set=function(o){btn.setAttribute('aria-expanded',o);btn.setAttribute('aria-label',o?'Close menu':'Open menu');nav.classList.toggle('open',o)};
    btn.addEventListener('click',function(){set(btn.getAttribute('aria-expanded')!=='true')});
    nav.addEventListener('click',function(e){if(e.target.tagName==='A')set(false)});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
  }
  // Tabs
  var tabs=[].slice.call(document.querySelectorAll('[role="tab"]'));
  var show=function(t){tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;document.getElementById(x.getAttribute('aria-controls')).hidden=!on})};
  var sel=tabs.filter(function(t){return t.getAttribute('aria-selected')==='true'})[0];if(sel)show(sel);
  tabs.forEach(function(t,i){
    t.addEventListener('click',function(){show(t)});
    t.addEventListener('keydown',function(e){var d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(!d)return;var n=tabs[(i+d+tabs.length)%tabs.length];show(n);n.focus()});
  });
  // Filters (portfolio + store)
  var fbtns=[].slice.call(document.querySelectorAll('.filters button'));
  fbtns.forEach(function(b){b.addEventListener('click',function(){
    var f=b.getAttribute('data-filter');
    fbtns.forEach(function(x){x.setAttribute('aria-pressed',x===b)});
    document.querySelectorAll('[data-cat]').forEach(function(el){el.hidden=!(f==='all'||el.getAttribute('data-cat').split(' ').indexOf(f)>-1)});
    var live=document.getElementById('filter-status');
    if(live){var n=document.querySelectorAll('[data-cat]:not([hidden])').length;live.textContent='Showing '+n+(n===1?' item':' items')}
  })});
  // Showreel: only show the player once the real file exists
  var s=document.getElementById('screen');
  if(s&&location.protocol!=='file:'){fetch('kedg-showreel.mp4',{method:'HEAD'}).then(function(r){if(r.ok)s.classList.add('has-video')}).catch(function(){})}
  // Contact form: sends to Formspree (xbdvwjgg); WhatsApp kept as an alternative
  var form=document.getElementById('enquiry');
  if(form){
    var $=function(id){return document.getElementById(id)};
    var v=function(id){return ($(id).value||'').trim()};
    var compose=function(){
      return 'Hi Kasim, I\'m '+v('f-name')+'.\n\nSubject: '+v('f-subject')+'\nService: '+v('f-service')+'\nBudget: '+v('f-budget')+'\nTimeline: '+(v('f-time')||'Flexible')+'\n\n'+v('f-msg')+(v('f-email')?'\n\nEmail: '+v('f-email'):'');
    };
    var setErr=function(id,msg){var el=$(id),out=$(id+'-err');if(out)out.textContent=msg;el.setAttribute('aria-invalid',msg?'true':'false')};
    var emailOk=function(x){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(x)};
    var check=function(needEmail){
      var bad=[];
      setErr('f-name',v('f-name')?'':'Please add your name.');if(!v('f-name'))bad.push('f-name');
      if(needEmail){var e=v('f-email');var em=!e?'Please add your email so I can reply.':(emailOk(e)?'':'That email address doesn’t look right.');setErr('f-email',em);if(em)bad.push('f-email')}else{setErr('f-email','')}
      if(needEmail){setErr('f-subject',v('f-subject')?'':'Please add a short subject.');if(!v('f-subject'))bad.push('f-subject')}
      var m=v('f-msg');var mm=!m?'Please describe your project in a sentence or two.':(m.length<10?'Please add a little more detail (10+ characters).':'');setErr('f-msg',mm);if(mm)bad.push('f-msg');
      $('f-error').textContent=bad.length?'Please fix the highlighted fields.':'';
      if(bad.length)$(bad[0]).focus();
      return !bad.length;
    };
    var status=function(kind,html){var s=$('f-status');s.hidden=false;s.className='form-status '+kind;s.innerHTML=html};
    var btn=$('f-send'),label=btn.textContent;
    form.addEventListener('submit',function(e){
      e.preventDefault();
      $('f-status').hidden=true;
      if(!check(true))return;
      $('f-subject-line').value='Website enquiry: '+v('f-subject');
      btn.disabled=true;btn.textContent='Sending…';
      fetch(form.action,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}})
        .then(function(r){return r.json().catch(function(){return {}}).then(function(d){return {ok:r.ok,d:d}})})
        .then(function(res){
          if(res.ok){
            form.reset();
            status('ok','<b>Thank you, your message has been sent.</b> I reply personally to every enquiry. For anything urgent, <a href="https://wa.me/2347033255503" target="_blank" rel="noopener">message me on WhatsApp</a>.');
            if(window.gtag)gtag('event','generate_lead',{method:'contact_form'});
          }else{
            var why=(res.d&&res.d.errors&&res.d.errors.length)?res.d.errors.map(function(x){return x.message}).join(' '):'';
            status('bad','<b>Sorry, your message didn’t send.</b> '+(why?why+' ':'')+'Please try again, or reach me on <a href="https://wa.me/2347033255503" target="_blank" rel="noopener">WhatsApp</a> or at <a href="mailto:hello@kasimempire.com">hello@kasimempire.com</a>.');
          }
        })
        .catch(function(){
          status('bad','<b>Sorry, your message didn’t send</b> (no connection). Please try again, or reach me on <a href="https://wa.me/2347033255503" target="_blank" rel="noopener">WhatsApp</a> or at <a href="mailto:hello@kasimempire.com">hello@kasimempire.com</a>.');
        })
        .then(function(){btn.disabled=false;btn.textContent=label;$('f-status').scrollIntoView({block:'nearest',behavior:'smooth'})});
    });
    $('f-wa').addEventListener('click',function(){if(!check(false))return;window.open('https://wa.me/2347033255503?text='+encodeURIComponent(compose()),'_blank','noopener')});
  }
})();
      
/* Homepage hero: typing line */
(function(){
  var el=document.querySelector('.hero-type .ht-text');if(!el)return;
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var lines=['From scratch to finish.','Business & corporate websites.','Landing pages that convert.','E-commerce stores.','FinTech & crypto interfaces.','Brands & motion that stand out.'];
  var li=0,ci=lines[0].length,del=true;
  function tick(){
    var t=lines[li];
    if(del){ci--;el.textContent=t.slice(0,ci);if(ci<=0){del=false;li=(li+1)%lines.length;}setTimeout(tick,ci<=0?350:28);}
    else{var n=lines[li];ci++;el.textContent=n.slice(0,ci);if(ci>=n.length){del=true;setTimeout(tick,li===0?2600:1700);}else setTimeout(tick,55);}
  }
  setTimeout(tick,3000);
})();

/* Homepage hero tagline: write word by word, rest, fade softly, repeat.
   One loop lasts 25s, the same as the five-project showcase, so the two
   never compete. Only transforms/opacity change, so nothing around it moves.
   Paused while the tab is hidden or the hero is off screen.
   Skipped entirely when the visitor prefers reduced motion. */
(function(){
  var el=document.querySelector('.hero-tagline');if(!el)return;
  var mq=window.matchMedia?matchMedia('(prefers-reduced-motion: reduce)'):null;
  if(mq&&mq.matches)return;
  var words=el.querySelectorAll('.tl-w').length;
  var WRITE=100+(words-1)*300+700, FADE=900, GAP=400, HOLD=25000-WRITE-FADE-GAP, timers=[], seen=true;
  function later(fn,ms){timers.push(setTimeout(fn,ms))}
  function stop(){timers.forEach(clearTimeout);timers=[];el.classList.remove('tl-loop','is-on','is-out')}
  function cycle(){
    timers=[];
    if(document.hidden||!seen){later(cycle,1000);return}   /* keep the full line showing; try again shortly */
    el.classList.remove('is-on','is-out');
    void el.offsetWidth;            /* restart from hidden words */
    el.classList.add('is-on');
    later(function(){if(!document.hidden&&seen)el.classList.add('is-out')},WRITE+HOLD);
    later(cycle,WRITE+HOLD+FADE+GAP);
  }
  if('IntersectionObserver' in window)new IntersectionObserver(function(es){seen=es[0].isIntersecting}).observe(el);
  el.classList.add('tl-loop');
  later(cycle,250);
  if(mq&&mq.addEventListener)mq.addEventListener('change',function(e){if(e.matches)stop()});
})();

/* ===== Global-conversion upgrade (Nov 2026) ===== */
/* Scroll reveal for featured work + pricing cards */
(function(){
  var els=[].slice.call(document.querySelectorAll('.reveal'));if(!els.length)return;
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -5% 0px',threshold:0});
  els.forEach(function(e){io.observe(e)});
})();
/* Free 3-point review form: same Formspree endpoint as the contact form (xbdvwjgg) */
(function(){
  var f=document.getElementById('review-form');if(!f)return;
  var $=function(id){return document.getElementById(id)};
  var err=function(id,m){$(id+'-err').textContent=m;$(id).setAttribute('aria-invalid',m?'true':'false')};
  var btn=$('r-send'),label=btn.textContent,st=$('r-status');
  var say=function(k,h){st.hidden=false;st.className='form-status '+k;st.innerHTML=h};
  f.addEventListener('submit',function(e){
    e.preventDefault();st.hidden=true;
    var site=$('r-site').value.trim(),em=$('r-email').value.trim(),bad=[];
    var siteOk=/^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i.test(site);
    err('r-site',!site?'Please add your website address.':(siteOk?'':'That web address doesn’t look right.'));if(!site||!siteOk)bad.push('r-site');
    var emOk=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em);
    err('r-email',!em?'Please add your email so I can send the review.':(emOk?'':'That email address doesn’t look right.'));if(!em||!emOk)bad.push('r-email');
    if(bad.length){$(bad[0]).focus();return}
    $('r-msg').value='Please send me a free 3-point review of my website: '+site;
    $('r-subject').value='Free website review request: '+site;
    btn.disabled=true;btn.textContent='Sending…';
    fetch(f.action,{method:'POST',body:new FormData(f),headers:{'Accept':'application/json'}})
      .then(function(r){
        if(r.ok){f.reset();say('ok','<b>Thank you, your request is in.</b> Your three fixes will arrive by email within 48 hours. For anything urgent, <a href="https://wa.me/2347033255503" target="_blank" rel="noopener">message on WhatsApp</a>.');if(window.gtag)gtag('event','generate_lead',{method:'free_review_form'})}
        else{say('bad','<b>Sorry, that didn’t send.</b> Please try again, or send your link on <a href="https://wa.me/2347033255503" target="_blank" rel="noopener">WhatsApp</a> or to <a href="mailto:hello@kasimempire.com">hello@kasimempire.com</a>.')}
      })
      .catch(function(){say('bad','<b>Sorry, that didn’t send</b> (no connection). Please try again, or send your link on <a href="https://wa.me/2347033255503" target="_blank" rel="noopener">WhatsApp</a> or to <a href="mailto:hello@kasimempire.com">hello@kasimempire.com</a>.')})
      .then(function(){btn.disabled=false;btn.textContent=label});
  });
})();
/* Contact page: pre-fill from package buttons (?package=audit|growth|elite, ?topic=review) */
(function(){
  var form=document.getElementById('enquiry');if(!form||!window.URLSearchParams)return;
  var q=new URLSearchParams(location.search),p=q.get('package'),t=q.get('topic');
  var map={audit:['Website redesign','$120 (Starter Audit)','Starter Audit ($120) enquiry'],growth:['Website redesign','$300 to $1,200 (Growth Redesign)','Growth Redesign (from $300) enquiry'],elite:['Business or corporate website','$1,200 or more (Elite Full Build)','Elite Full Build (from $1,200) enquiry']};
  var pick=function(id,val){var s=document.getElementById(id);if(!s)return;[].slice.call(s.options).forEach(function(o){if(o.text===val)s.value=o.value})};
  var subj=document.getElementById('f-subject');
  if(p&&map[p]){pick('f-service',map[p][0]);pick('f-budget',map[p][1]);if(subj&&!subj.value)subj.value=map[p][2]}
  else if(t==='aureon'||t==='palmstone'||t==='vaultra'||t==='nexacoin'){
    var showcase={aureon:['Automotive showroom website','Automotive showroom website enquiry'],palmstone:['Real estate website','Real estate website enquiry'],vaultra:['Fintech & crypto web design','Fintech dashboard project enquiry'],nexacoin:['Fintech & crypto web design','Crypto website project enquiry']}[t];
    pick('f-service',showcase[0]);
    if(subj&&!subj.value)subj.value=showcase[1];
  }
  else if(t==='review'){pick('f-service','Website redesign');if(subj&&!subj.value)subj.value='Free 3-point website review';var m=document.getElementById('f-msg');if(m&&!m.value)m.value='Please review my website: '}
})();

/* Analytics: count clicks on WhatsApp, email and phone links as contact_click events (no personal data sent) */
(function(){
  document.addEventListener('click',function(e){
    var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;if(!a||!window.gtag)return;
    var h=a.getAttribute('href')||'',m=h.indexOf('wa.me/')>-1?'whatsapp':h.indexOf('mailto:')===0?'email':h.indexOf('tel:')===0?'phone':'';
    if(m)gtag('event','contact_click',{method:m,page_path:location.pathname});
    else if(a.getAttribute('data-demo'))gtag('event','view_demo',{demo:a.getAttribute('data-demo'),page_path:location.pathname});
  });
})();

/* Gentle float on project previews and service art: runs only while on screen,
   never with reduced motion (see "Gentle float" in styles.css). */
(function(){
  if(!('IntersectionObserver' in window))return;
  var mq=window.matchMedia?matchMedia('(prefers-reduced-motion: reduce)'):null;if(mq&&mq.matches)return;
  var els=[].slice.call(document.querySelectorAll('.work-shot,.pillar-art,.row-visual,.fc-browser,.d5-shot'));if(!els.length)return;
  els.forEach(function(e,i){if(i%3===1)e.classList.add('fl-b');else if(i%3===2)e.classList.add('fl-c')});
  var io=new IntersectionObserver(function(es){es.forEach(function(x){x.target.classList.toggle('is-floating',x.isIntersecting)})},{rootMargin:'40px 0px'});
  els.forEach(function(e){io.observe(e)});
  if(mq&&mq.addEventListener)mq.addEventListener('change',function(e){if(e.matches){io.disconnect();els.forEach(function(x){x.classList.remove('is-floating')})}});
})();
