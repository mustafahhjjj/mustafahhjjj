(function(){
  if(window.__ekursMathPracticeEngineLoaded)return;
  window.__ekursMathPracticeEngineLoaded=true;

  var state={
    skill:'iki-basamakli-eldeli-toplama',
    skillName:'İki basamaklı eldeli toplama',
    difficulty:1,
    streak:0,
    score:42,
    current:null
  };

  function isMathPage(){
    return /\/dersler\/matematik/.test(location.pathname.toLowerCase())||/matematik/i.test((document.querySelector('h1')||{}).textContent||'');
  }

  function fallbackQuestion(){
    var max=Math.min(89,Math.round(45+state.difficulty*14));
    var a,b;
    do{
      a=random(18,max);
      b=random(18,max);
    }while((a%10)+(b%10)<10);
    return {
      skill_name:state.skillName,
      question:a+' + '+b+' = ?',
      answer:a+b,
      difficulty:state.difficulty,
      remediation:['Önce birlikleri topla.','10 veya daha fazlaysa 1 onluk elde et.','Eldeyi onlar basamağına ekle.'],
      manipulative:'base-ten-blocks'
    };
  }

  function random(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
  }

  function fetchQuestion(){
    if(!window.fetch)return Promise.resolve(fallbackQuestion());
    return fetch('/api/math-question-generator.php?skill='+encodeURIComponent(state.skill)+'&difficulty='+state.difficulty+'&streak='+state.streak)
      .then(function(res){return res.ok?res.json():fallbackQuestion();})
      .then(function(data){return data&&data.ok?data:fallbackQuestion();})
      .catch(function(){return fallbackQuestion();});
  }

  function smartScore(correct){
    if(correct){
      state.streak+=1;
      state.score=Math.min(100,Math.round(state.score+8+(state.difficulty*2)));
      if(state.streak>=3)state.difficulty=Math.min(5,Number((state.difficulty+0.2).toFixed(1)));
    }else{
      state.streak=0;
      state.score=Math.max(0,Math.round(state.score-(5+state.difficulty*2)));
    }
  }

  function renderManipulative(panel,question){
    var host=panel.querySelector('.practice-manipulative');
    if(!host)return;
    host.innerHTML='<b></b><b></b><b></b><span></span><span></span><span></span><span></span><span></span>';
    host.setAttribute('data-tool',question.manipulative||'base-ten-blocks');
  }

  function renderQuestion(panel,question){
    state.current=question;
    panel.querySelector('.practice-skill').textContent=question.skill_name||state.skillName;
    panel.querySelector('.practice-question').textContent=question.question;
    panel.querySelector('.practice-score').textContent=state.score;
    panel.querySelector('.practice-difficulty').textContent='Zorluk '+state.difficulty.toFixed(1);
    panel.querySelector('.practice-feedback').innerHTML='';
    panel.querySelector('.practice-answer').value='';
    renderManipulative(panel,question);
  }

  function feedback(panel,correct,answer){
    smartScore(correct);
    var q=state.current;
    var html=correct
      ? '<div class="is-correct"><strong>Doğru.</strong><span>SmartScore yükseldi. Aynı tutarlılıkla devam et.</span></div>'
      : '<div class="is-wrong"><strong>Doğru cevap: '+q.answer+'</strong><span>Yanıtın: '+(answer||'boş')+'</span><ol>'+q.remediation.map(function(step){return '<li>'+step+'</li>';}).join('')+'</ol></div>';
    panel.querySelector('.practice-feedback').innerHTML=html;
    panel.querySelector('.practice-score').textContent=state.score;
    panel.querySelector('.practice-difficulty').textContent='Zorluk '+state.difficulty.toFixed(1);
  }

  function build(){
    if(!isMathPage()||document.querySelector('.math-practice-engine'))return;
    var target=document.querySelector('.math-action-center')||document.querySelector('main .section .container');
    if(!target)return;
    var panel=document.createElement('section');
    panel.className='math-practice-engine';
    panel.innerHTML=[
      '<span>Codex Gen</span>',
      '<h3>Canlı mikro pratik</h3>',
      '<p class="practice-skill">İki basamaklı eldeli toplama</p>',
      '<div class="practice-meta"><b>SmartScore <i class="practice-score">42</i></b><b class="practice-difficulty">Zorluk 1.0</b></div>',
      '<div class="practice-manipulative" aria-label="Sayı blokları"></div>',
      '<strong class="practice-question">Soru hazırlanıyor...</strong>',
      '<div class="practice-row"><input class="practice-answer" inputmode="numeric" placeholder="Cevap"><button type="button">Kontrol Et</button></div>',
      '<div class="practice-feedback" aria-live="polite"></div>',
      '<button class="practice-next" type="button">Yeni Soru</button>'
    ].join('');
    if(target.classList&&target.classList.contains('math-action-center'))target.insertBefore(panel,target.firstChild);
    else target.insertBefore(panel,target.firstChild);
    bind(panel);
    fetchQuestion().then(function(q){renderQuestion(panel,q);});
  }

  function bind(panel){
    panel.querySelector('.practice-row button').addEventListener('click',function(){
      var value=Number(panel.querySelector('.practice-answer').value);
      var correct=Number.isFinite(value)&&value===Number(state.current.answer);
      feedback(panel,correct,value);
    });
    panel.querySelector('.practice-next').addEventListener('click',function(){
      fetchQuestion().then(function(q){renderQuestion(panel,q);});
    });
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);
  else build();
})();
