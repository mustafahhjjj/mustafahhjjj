(function(){
  function loadCss(href){
    if(document.querySelector('link[href="'+href+'"]'))return;
    var link=document.createElement('link');
    link.rel='stylesheet';
    link.href=href;
    document.head.appendChild(link);
  }
  function loadScript(src){
    if(document.querySelector('script[src="'+src+'"]'))return;
    var script=document.createElement('script');
    script.src=src;
    script.defer=true;
    document.head.appendChild(script);
  }
  function level(node){return Number(node.tagName.slice(1));}
  function audit(){
    var headings=Array.prototype.slice.call(document.querySelectorAll('h1,h2,h3'));
    if(!headings.length)return;
    var warnings=[];
    var h1Count=headings.filter(function(node){return node.tagName==='H1';}).length;
    if(h1Count!==1)warnings.push('Sayfada tek H1 olmali; bulunan H1 sayisi: '+h1Count);
    var previous=0;
    headings.forEach(function(node){
      var current=level(node);
      if(previous&&current>previous+1){warnings.push('Baslik hiyerarsisi atlandi: H'+previous+' sonrasi H'+current+' - '+node.textContent.trim().slice(0,80));}
      previous=current;
    });
    if(warnings.length){document.documentElement.setAttribute('data-heading-audit','warning');if(window.console&&console.warn)console.warn('[e-kurs SEO heading audit]',warnings);}
  }
  loadCss('/css/k12-ui.css');
  loadCss('/css/home-polish.css');
  loadCss('/css/k12-gamification.css');
  loadCss('/css/subject-intelligence.css');
  loadCss('/css/micro-skills.css');
  loadScript('/js/k12-ui.js');
  loadScript('/js/home-polish.js');
  loadScript('/js/k12-gamification.js');
  loadScript('/js/subject-intelligence.js');
  loadScript('/js/micro-skills.js');
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',audit);else audit();
})();
