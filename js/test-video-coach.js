(function(){
  if(window.__ekursVideoCoachLoaded)return;
  window.__ekursVideoCoachLoaded=true;
  var skills=[
    {key:'2^3',topic:'Üslü Sayılar',skillId:'M.8.1.1.1',lessonUrl:'/dersler/matematik?konu=uslu-sayilar',answer:'12',hint:'2^3 = 8, sonra 8 + 4 = 12.'},
    {key:'√49',topic:'Kareköklü İfadeler',skillId:'M.8.1.3.2',lessonUrl:'/dersler/matematik?konu=karekoklu-ifadeler',answer:'10',hint:'√49 = 7, sonra 7 + 3 = 10.'},
    {key:'EBOB',topic:'Çarpanlar ve Katlar',skillId:'M.8.1.2.1',lessonUrl:'/dersler/matematik?konu=carpanlar-katlar',answer:'6',hint:'18 ve 24 sayılarının en büyük ortak böleni 6dır.'},
    {key:'İşlem Önceliği',topic:'İşlem Önceliği',skillId:'M.8.1.1.2',lessonUrl:'/dersler/matematik?konu=islem-onceligi',answer:'Parantez varsa önce onu çöz',hint:'Önce parantez, sonra üs, sonra çarpma/bölme, en son toplama/çıkarma.'},
    {key:'Geometri',topic:'Geometri',skillId:'M.8.3.1.1',lessonUrl:'/dersler/matematik?konu=acilar',answer:'B: 90 derece',hint:'Dik açı 90 derecedir.'}
  ];

  function el(tag,cls,text){var n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;}
  function button(text,cls,fn){var b=el('button',cls,text);b.type='button';b.addEventListener('click',fn);return b;}
  function norm(v){return String(v||'').toLocaleLowerCase('tr-TR');}
  function inferSkill(root){
    var text=(root&&root.textContent)||document.body.textContent||'';
    for(var i=0;i<skills.length;i++){
      if(text.indexOf(skills[i].key)>-1||norm(text).indexOf(norm(skills[i].topic))>-1)return skills[i];
    }
    return {topic:'Matematik kazanımı',skillId:'M.K12.AUTO',lessonUrl:'/dersler/matematik',answer:'12',hint:'Kısa özeti izledikten sonra tekrar deneyebilirsin.'};
  }
  function attachFeedbackButtons(){
    document.querySelectorAll('.ekurs-test-feedback.is-wrong:not([data-video-coach])').forEach(function(box){
      box.dataset.videoCoach='1';
      var skill=inferSkill(box.closest('.ekurs-test-dialog')||box);
      box.appendChild(button('Kısa ders videosunu aç','ekurs-video-inline-btn',function(){openVideoCoach(skill,box.closest('.ekurs-test-dialog'));}));
    });
  }
  function interceptRemediationClicks(event){
    var btn=event.target.closest('button');
    if(!btn)return;
    var text=norm(btn.textContent);
    if(text.indexOf('şimdi izle')===-1&&text.indexOf('simdi izle')===-1)return;
    var card=btn.closest('.ekurs-remediation-card')||btn.closest('.ekurs-test-results')||document;
    event.preventDefault();
    event.stopPropagation();
    openVideoCoach(inferSkill(card),btn.closest('.ekurs-test-dialog'));
  }
  function openVideoCoach(skill,dialog){
    var old=document.querySelector('.ekurs-video-coach');
    if(old)old.remove();
    var panel=el('aside','ekurs-video-coach');
    panel.appendChild(button('Kapat','ekurs-video-close',function(){panel.remove();}));
    panel.appendChild(el('span','ekurs-test-chip','Anlamadın mı? O zaman izle'));
    panel.appendChild(el('h3','',skill.topic+' kısa ders'));
    var body=el('div','ekurs-video-body');
    body.appendChild(el('p','', 'Kazanıma bağlı video aranıyor. Video yoksa testten çıkmadan animasyonlu mini ders açılacak.'));
    panel.appendChild(body);
    (dialog||document.body).appendChild(panel);
    fetch('/api/k12-video-helper.php?skill_id='+encodeURIComponent(skill.skillId)+'&topic='+encodeURIComponent(skill.topic)+'&lesson_url='+encodeURIComponent(skill.lessonUrl),{credentials:'same-origin'})
      .then(function(resp){if(!resp.ok)throw new Error('video');return resp.json();})
      .then(function(data){renderVideoBody(body,skill,data,dialog);})
      .catch(function(){renderVideoBody(body,skill,{status:'fallback',lessonUrl:skill.lessonUrl,script:skill.hint,storyboard:[skill.hint]},dialog);});
  }
  function renderVideoBody(body,skill,data,dialog){
    body.innerHTML='';
    if(data.videoUrl){
      var video=document.createElement('video');
      video.className='ekurs-video-player';video.src=data.videoUrl;video.controls=true;video.playsInline=true;
      video.addEventListener('ended',function(){showCheck(body,skill,dialog);});
      body.appendChild(video);
      body.appendChild(el('small','', 'Video bittiğinde aynı kazanımdan kısa anlama kontrolü açılacak.'));
    }else{
      body.appendChild(makeMiniLessonMovie(skill,data));
      body.appendChild(el('small','', 'Gerçek video dosyası bağlanana kadar bu alanda animasyonlu mini ders oynatılır. Öğrenci testten çıkmaz.'));
      body.appendChild(button('Videoyu bitirdim, kontrol sorusuna geç','ekurs-test-next',function(){showCheck(body,skill,dialog);}));
    }
  }
  function makeMiniLessonMovie(skill,data){
    var movie=el('div','ekurs-video-movie is-playing');
    var scene=el('div','ekurs-video-scene');
    scene.appendChild(el('span','ekurs-video-scene-label','Animasyonlu mini ders'));
    var formulaText=norm(skill.topic).indexOf('üslü')>-1?'2³ + 4':skill.topic;
    scene.appendChild(el('div','ekurs-video-formula',formulaText));
    var blocks=el('div','ekurs-video-blocks');
    ['2','× 2','× 2','= 8'].forEach(function(item){blocks.appendChild(el('span','',item));});
    scene.appendChild(blocks);
    var result=el('div','ekurs-video-result','8 + 4 = 12');
    scene.appendChild(result);
    movie.appendChild(scene);
    movie.appendChild(el('p','ekurs-video-caption',data.script||skill.hint));
    var progress=el('div','ekurs-video-progress');
    progress.appendChild(el('span',''));
    movie.appendChild(progress);
    var controls=el('div','ekurs-video-controls');
    controls.appendChild(button('Tekrar oynat','ekurs-video-mini-btn',function(){
      movie.classList.remove('is-playing');
      void movie.offsetWidth;
      movie.classList.add('is-playing');
    }));
    movie.appendChild(controls);
    return movie;
  }
  function showCheck(body,skill,dialog){
    body.innerHTML='';
    body.appendChild(el('strong','', 'Anlama kontrolü'));
    body.appendChild(el('p','', 'Videodan sonra çok kolay bir soruyla konuyu hemen pekiştirelim.'));
    var wrap=el('div','ekurs-video-check');
    wrap.appendChild(el('span','',skill.topic));
    var input=document.createElement('input');
    input.type='text';input.placeholder='Cevabını yaz';input.inputMode='text';
    wrap.appendChild(input);
    wrap.appendChild(button('Kontrol et','ekurs-test-next',function(){
      var ok=norm(input.value).replace(',','.')===norm(skill.answer).replace(',','.');
      if(ok){
        bumpScore(dialog);
        body.innerHTML='';
        body.appendChild(el('strong','', 'Harika! Videodan sonra konuyu kavradın.'));
        body.appendChild(el('p','', 'SmartScore için +5 bonus uygulandı.'));
      }else{
        var msg=body.querySelector('.ekurs-video-retry')||el('p','ekurs-video-retry');
        msg.textContent='Bir kez daha dene. İpucu: '+skill.hint;
        body.appendChild(msg);
      }
    }));
    body.appendChild(wrap);
  }
  function bumpScore(dialog){
    var root=dialog||document;
    var score=root.querySelector('.ekurs-test-score-ring strong');
    var ring=root.querySelector('.ekurs-test-score-ring');
    if(!score||!ring)return;
    var next=Math.min(100,(parseInt(score.textContent,10)||0)+5);
    score.textContent=String(next);
    ring.style.setProperty('--score',next);
  }
  var observer=new MutationObserver(attachFeedbackButtons);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener('click',interceptRemediationClicks,true);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',attachFeedbackButtons);else attachFeedbackButtons();
})();
