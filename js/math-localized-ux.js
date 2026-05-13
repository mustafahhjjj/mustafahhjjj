(function(){
  if(window.__ekursMathLocalizedUxLoaded)return;
  window.__ekursMathLocalizedUxLoaded=true;

  function isMath(){
    return /\/dersler\/matematik/.test(location.pathname.toLowerCase())||/matematik/i.test((document.querySelector('h1')||{}).textContent||'');
  }

  function addKatexFallback(){
    if(!document.querySelector('script[src*="katex"]')){
      var css=document.createElement('link');
      css.rel='stylesheet';
      css.href='https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css';
      document.head.appendChild(css);
      var script=document.createElement('script');
      script.defer=true;
      script.src='https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js';
      document.head.appendChild(script);
    }
  }

  function addToggle(){
    if(document.querySelector('.math-view-toggle'))return;
    var host=document.querySelector('.page-hero .container')||document.querySelector('main .section .container');
    if(!host)return;
    var selected=localStorage.getItem('ekurs.mathView')||'skill';
    var toggle=document.createElement('div');
    toggle.className='math-view-toggle';
    toggle.innerHTML='<span>Görünüm</span><div role="tablist" aria-label="Matematik görünüm modu"><button type="button" data-mode="skill">Becerilere Göre</button><button type="button" data-mode="meb">MEB Müfredatına Göre</button></div>';
    host.appendChild(toggle);
    bindToggle(toggle,selected);
    setMode(selected);
  }

  function bindToggle(toggle,selected){
    toggle.querySelectorAll('button').forEach(function(button){
      button.classList.toggle('active',button.getAttribute('data-mode')===selected);
      button.addEventListener('click',function(){
        var mode=button.getAttribute('data-mode');
        localStorage.setItem('ekurs.mathView',mode);
        toggle.querySelectorAll('button').forEach(function(item){item.classList.toggle('active',item===button);});
        setMode(mode);
      });
    });
  }

  function setMode(mode){
    document.documentElement.setAttribute('data-math-view',mode);
    var map=document.querySelector('.outcome-map');
    if(map){
      map.classList.add('is-switching');
      window.setTimeout(function(){map.classList.remove('is-switching');},220);
    }
    relabelOutcomes(mode);
  }

  function relabelOutcomes(mode){
    document.querySelectorAll('.outcome-node').forEach(function(node,index){
      var code=node.querySelector('b');
      if(!code)return;
      if(mode==='meb'){
        code.textContent=['M.2.1.1.1','M.2.1.1.2','M.2.1.1.3','M.2.1.1.4','M.2.1.1.5'][index]||code.textContent;
        node.setAttribute('data-meb-week','Hafta '+(index+3));
      }else{
        code.textContent=node.getAttribute('data-code')||code.textContent;
        node.removeAttribute('data-meb-week');
      }
    });
  }

  function makeCollapsible(){
    document.querySelectorAll('.math-unit-card,.outcome-map,.micro-skills-panel').forEach(function(card,index){
      if(card.classList.contains('is-collapsible-ready'))return;
      card.classList.add('is-collapsible-ready');
      var heading=card.querySelector('h2,h3');
      if(!heading)return;
      var button=document.createElement('button');
      button.className='collapse-toggle';
      button.type='button';
      button.setAttribute('aria-expanded',index<2?'true':'false');
      button.textContent=index<2?'−':'+';
      heading.appendChild(button);
      if(index>=2)card.classList.add('is-collapsed');
      button.addEventListener('click',function(event){
        event.stopPropagation();
        var open=card.classList.toggle('is-collapsed')===false;
        button.textContent=open?'−':'+';
        button.setAttribute('aria-expanded',open?'true':'false');
      });
    });
  }

  function addStickyPractice(){
    if(document.querySelector('.math-sticky-practice'))return;
    var btn=document.createElement('button');
    btn.className='math-sticky-practice';
    btn.type='button';
    btn.textContent='Rastgele Bir Matematik Becerisi Test Et';
    btn.addEventListener('click',function(){
      openModal('Rastgele Matematik Becerisi','Yaklaşık 5 dakika');
    });
    document.body.appendChild(btn);
  }

  function addSoftModal(){
    if(document.querySelector('.soft-onboarding-modal'))return;
    var modal=document.createElement('div');
    modal.className='soft-onboarding-modal';
    modal.setAttribute('aria-hidden','true');
    modal.innerHTML='<div class="soft-modal-card" role="dialog" aria-modal="true" aria-label="Matematik başlangıç"><button class="soft-modal-close" type="button" aria-label="Kapat">×</button><span>Rahat başla</span><h2></h2><p class="soft-time"></p><p>Yapay zeka asistanın takıldığın her adımda sana ipucu vermek için burada. Hata yapmak bu yolun doğal bir parçası.</p><button class="soft-start" type="button">Başla</button></div>';
    document.body.appendChild(modal);
    modal.querySelector('.soft-modal-close').addEventListener('click',closeModal);
    modal.querySelector('.soft-start').addEventListener('click',function(){
      closeModal();
      var practice=document.querySelector('.math-practice-engine input');
      if(practice)practice.focus();
    });
    modal.addEventListener('click',function(event){if(event.target===modal)closeModal();});
  }

  function openModal(title,time){
    addSoftModal();
    var modal=document.querySelector('.soft-onboarding-modal');
    modal.querySelector('h2').textContent=title;
    modal.querySelector('.soft-time').textContent=time+' içinde küçük bir pratik yapacağız.';
    modal.setAttribute('aria-hidden','false');
    modal.classList.add('open');
  }

  function closeModal(){
    var modal=document.querySelector('.soft-onboarding-modal');
    if(!modal)return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
  }

  function bindSkillClicks(){
    document.addEventListener('click',function(event){
      var skill=event.target.closest('.math-skill,.outcome-node,.micro-skill-card');
      if(!skill||skill.closest('.math-practice-engine'))return;
      event.preventDefault();
      var title=(skill.querySelector('.skill-name,span,b')||skill).textContent.trim();
      openModal(title,'5 dakika');
    });
  }

  function renderFormulaSamples(){
    document.querySelectorAll('[data-formula]').forEach(function(node){
      var formula=node.getAttribute('data-formula');
      if(window.katex&&formula){
        try{window.katex.render(formula,node,{throwOnError:false,displayMode:false});}catch(error){}
      }
    });
  }

  function run(){
    if(!isMath())return;
    document.documentElement.classList.add('math-localized-ux-ready');
    addKatexFallback();
    addToggle();
    makeCollapsible();
    addStickyPractice();
    addSoftModal();
    bindSkillClicks();
    renderFormulaSamples();
    window.setTimeout(function(){makeCollapsible();renderFormulaSamples();},500);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);
  else run();
})();
