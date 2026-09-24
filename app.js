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
  if(s&&location.protocol!=='file:'){fetch('assets/kedg-showreel.mp4',{method:'HEAD'}).then(function(r){if(r.ok)s.classList.add('has-video')}).catch(function(){})}
  // Contact form: compose a WhatsApp message or email
  var form=document.getElementById('enquiry');
  if(form){
    var compose=function(){
      var v=function(id){return (document.getElementById(id).value||'').trim()};
      return 'Hi Kasim, I\'m '+v('f-name')+'.\n\nService: '+v('f-service')+'\nBudget: '+v('f-budget')+'\nTimeline: '+(v('f-time')||'Flexible')+'\n\n'+v('f-msg')+(v('f-email')?'\n\nEmail: '+v('f-email'):'');
    };
    var check=function(){
      var err=document.getElementById('f-error'),miss=[];
      if(!document.getElementById('f-name').value.trim())miss.push('your name');
      if(!document.getElementById('f-msg').value.trim())miss.push('a short project description');
      err.textContent=miss.length?'Please add '+miss.join(' and ')+' so I can reply properly.':'';
      if(miss.length){document.getElementById(miss[0]==='your name'?'f-name':'f-msg').focus()}
      return !miss.length;
    };
    form.addEventListener('submit',function(e){e.preventDefault();if(!check())return;window.open('https://wa.me/2347080083489?text='+encodeURIComponent(compose()),'_blank','noopener')});
    document.getElementById('f-mail').addEventListener('click',function(){if(!check())return;location.href='mailto:magajiqaseem@gmail.com?subject='+encodeURIComponent('Project enquiry: '+document.getElementById('f-service').value)+'&body='+encodeURIComponent(compose())});
  }
})();
