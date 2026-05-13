(function(){
  if(window.__ekursGrade2TestFixLoaded)return;
  window.__ekursGrade2TestFixLoaded=true;

  var isGrade2Test=/\/testler\/2-sinif-deneme-sinavi/i.test(location.pathname||'');
  if(!isGrade2Test)return;

  function setSelect(select,value){
    if(!select)return false;
    var has=[].slice.call(select.options).some(function(option){return option.value===value;});
    if(!has||select.value===value)return false;
    select.value=value;
    return true;
  }

  function forceGrade2Filters(){
    var filters=document.querySelector('.ekurs-test-filters');
    if(!filters)return false;
    var selects=filters.querySelectorAll('select');
    if(selects.length<4)return false;

    var changed=false;
    changed=setSelect(selects[0],'2')||changed;
    changed=setSelect(selects[1],'matematik')||changed;
    changed=setSelect(selects[2],'all')||changed;
    changed=setSelect(selects[3],'all')||changed;

    if(changed){
      selects[0].dispatchEvent(new Event('change',{bubbles:true}));
      setTimeout(function(){
        selects[1].dispatchEvent(new Event('change',{bubbles:true}));
      },80);
    }
    return true;
  }

  function replaceEmptyCopy(){
    var empty=document.querySelector('.ekurs-test-empty');
    if(!empty)return;
    empty.textContent='2. sınıf testleri yükleniyor. Birkaç saniye içinde görünmezse sayfayı Ctrl + F5 ile yenileyin.';
  }

  function retry(){
    forceGrade2Filters();
    replaceEmptyCopy();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',retry);else retry();
  var observer=new MutationObserver(retry);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(retry,300);
  setTimeout(retry,900);
  setTimeout(retry,1800);
})();
