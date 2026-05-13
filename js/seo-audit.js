(function(){
  var assetVersion='20260513-grade2-stable';
  var path=(location.pathname||'').replace(/\/+$/,'');
  var isGrade2Class=path==='/siniflar/2-sinif';

  function versioned(path){return path+'?v='+assetVersion;}
  function loadCss(href){
    var src=versioned(href);
    if(document.querySelector('link[href="'+src+'"]'))return;
    var link=document.createElement('link');
    link.rel='stylesheet';
    link.href=src;
    document.head.appendChild(link);
  }
  function loadScript(src){
    var versionedSrc=versioned(src);
    if(document.querySelector('script[src="'+versionedSrc+'"]'))return;
    var script=document.createElement('script');
    script.src=versionedSrc;
    script.defer=true;
    document.head.appendChild(script);
  }
  function fixGrade2ClassLinks(){
    if(!isGrade2Class)return;
    document.querySelectorAll('a.btn').forEach(function(link){
      if(link.textContent.trim()==='Test Çöz'){
        link.href='/testler/2-sinif.html';
        link.textContent='2. Sınıf Testleri';
      }
    });
  }
  function level(node){return Number(node.tagName.slice(1));}
  function audit(){
    fixGrade2ClassLinks();
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

  if(isGrade2Class){
    loadCss('/siniflar/2-sinif/styles.css');
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',audit);else audit();
    return;
  }

  loadCss('/css/k12-ui.css');
  loadCss('/css/home-polish.css');
  loadCss('/css/k12-gamification.css');
  loadCss('/css/subject-intelligence.css');
  loadCss('/css/micro-skills.css');
  loadCss('/css/math-curriculum-ux.css');
  loadCss('/css/math-practice-engine.css');
  loadCss('/css/world-class-math.css');
  loadCss('/css/math-localized-ux.css');
  loadCss('/css/math-component-layout.css');
  loadCss('/css/test-center.css');
  loadCss('/css/test-runner.css');
  loadCss('/css/test-interactions.css');
  loadCss('/css/test-video-coach.css');
  loadCss('/css/primary-exam-coach.css');
  loadCss('/css/cp-sync-guard.css');
  loadScript('/js/k12-ui.js');
  loadScript('/js/home-polish.js');
  loadScript('/js/k12-gamification.js');
  loadScript('/js/subject-intelligence.js');
  loadScript('/js/micro-skills.js');
  loadScript('/js/math-curriculum-ux.js');
  loadScript('/js/math-practice-engine.js');
  loadScript('/js/world-class-math.js');
  loadScript('/js/math-localized-ux.js');
  loadScript('/js/math-component-layout.js');
  loadScript('/js/test-center.js');
  loadScript('/js/test-video-coach.js');
  loadScript('/js/primary-exam-coach.js');
  loadScript('/js/grade2-test-fix.js');
  loadScript('/js/cp-sync-guard.js');
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',audit);else audit();
})();
