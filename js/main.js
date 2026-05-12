document.addEventListener('DOMContentLoaded',()=>{
  const nav=document.querySelector('.nav');
  const toggle=document.querySelector('.menu-toggle');
  if(nav&&toggle){
    toggle.addEventListener('click',e=>{
      e.stopPropagation();
      const open=nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded',open?'true':'false');
    });
    document.addEventListener('click',e=>{
      if(!nav.contains(e.target)){
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded','false');
      }
    });
  }

  const quizRoot=document.querySelector('.quiz-shell,.quiz,.question-card,.qcard');
  if(quizRoot){
    document.body.classList.add('has-focus-mode');
    const focusBar=document.createElement('div');
    focusBar.className='focus-tools';
    focusBar.innerHTML='<button class="focus-toggle" type="button" aria-pressed="false">Odak Modu</button><span class="focus-note">Sadece soru ve cevaplar kalsin.</span>';
    const main=document.querySelector('main')||document.body;
    main.insertBefore(focusBar,main.firstChild);
    const focusButton=focusBar.querySelector('.focus-toggle');
    focusButton.addEventListener('click',()=>{
      const active=document.body.classList.toggle('focus-mode');
      focusButton.setAttribute('aria-pressed',active?'true':'false');
      focusButton.textContent=active?'Odak Modundan Cik':'Odak Modu';
      if(active){
        quizRoot.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  }

  const feedback=document.getElementById('feedback')||document.getElementById('feed');
  const hint=document.getElementById('hintBox')||document.getElementById('hint');
  const topic=document.getElementById('topicCode')||document.getElementById('code');
  if(feedback&&hint&&topic){
    const advisor=document.createElement('div');
    advisor.className='adaptive-advisor';
    advisor.innerHTML='<strong>Akilli onerim:</strong> Zorlanirsan ipucunu ac, sonra bir onceki mikro kazanimi tekrar et.';
    hint.parentNode.insertBefore(advisor,hint.nextSibling);
    const observer=new MutationObserver(()=>{
      const text=(feedback.textContent||'').toLocaleLowerCase('tr-TR');
      if(text.includes('dogru cevap:')||text.includes('bir daha')||text.includes('yanlis')){
        advisor.classList.add('show');
        advisor.innerHTML='<strong>Akilli onerim:</strong> '+topic.textContent+' icin once ipucunu oku. Arka arkaya zorlanirsan bir onceki gorevi tekrar ederek guclen.';
      }else if(text.includes('harika')||text.includes('dogru cevap')){
        advisor.classList.add('show','good');
        advisor.innerHTML='<strong>Super seri!</strong> Bu hizla devam et; puanin yildiz rozetine yaklasiyor.';
      }
    });
    observer.observe(feedback,{childList:true,characterData:true,subtree:true});
  }
});
