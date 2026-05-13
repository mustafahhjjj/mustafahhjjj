(function(){
  function level(node){return Number(node.tagName.slice(1));}
  function audit(){
    var headings=Array.prototype.slice.call(document.querySelectorAll('h1,h2,h3'));
    if(!headings.length)return;
    var warnings=[];
    var h1Count=headings.filter(function(node){return node.tagName==='H1';}).length;
    if(h1Count!==1)warnings.push('Sayfada tek H1 olmalı; bulunan H1 sayısı: '+h1Count);
    var previous=0;
    headings.forEach(function(node){
      var current=level(node);
      if(previous&&current>previous+1){warnings.push('Başlık hiyerarşisi atlandı: H'+previous+' sonrası H'+current+' - '+node.textContent.trim().slice(0,80));}
      previous=current;
    });
    if(warnings.length){document.documentElement.setAttribute('data-heading-audit','warning');if(window.console&&console.warn)console.warn('[e-kurs SEO heading audit]',warnings);}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',audit);else audit();
})();
