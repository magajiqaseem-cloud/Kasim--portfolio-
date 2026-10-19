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
            status('ok','<b>Thank you, your message has been sent.</b> I reply personally to every enquiry. For anything urgent, <a href="https://wa.me/2347080083489" target="_blank" rel="noopener">message me on WhatsApp</a>.');
            if(window.gtag)gtag('event','generate_lead',{method:'contact_form'});
          }else{
            var why=(res.d&&res.d.errors&&res.d.errors.length)?res.d.errors.map(function(x){return x.message}).join(' '):'';
            status('bad','<b>Sorry, your message didn’t send.</b> '+(why?why+' ':'')+'Please try again, or reach me on <a href="https://wa.me/2347080083489" target="_blank" rel="noopener">WhatsApp</a> or at <a href="mailto:magajiqaseem@gmail.com">magajiqaseem@gmail.com</a>.');
          }
        })
        .catch(function(){
          status('bad','<b>Sorry, your message didn’t send</b> (no connection). Please try again, or reach me on <a href="https://wa.me/2347080083489" target="_blank" rel="noopener">WhatsApp</a> or at <a href="mailto:magajiqaseem@gmail.com">magajiqaseem@gmail.com</a>.');
        })
        .then(function(){btn.disabled=false;btn.textContent=label;$('f-status').scrollIntoView({block:'nearest',behavior:'smooth'})});
    });
    $('f-wa').addEventListener('click',function(){if(!check(false))return;window.open('https://wa.me/2347080083489?text='+encodeURIComponent(compose()),'_blank','noopener')});
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
