(function(){
  if(window.__ekursPrimaryExamCoachLoaded)return;
  window.__ekursPrimaryExamCoachLoaded=true;
  var isPrimary=/2-sinif|2\.s[ıi]n[ıi]f|ilkokul/i.test(decodeURIComponent(location.pathname+' '+location.search));
  var startedAt=Date.now();
  var totalSeconds=15*60;

  function el(tag,cls,text){var n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;}
  function button(text,cls,fn){var b=el('button',cls,text);b.type='button';b.addEventListener('click',fn);return b;}
  function norm(v){return String(v||'').toLocaleLowerCase('tr-TR');}
  function speak(text){
    if(!('speechSynthesis' in window))return;
    window.speechSynthesis.cancel();
    var utterance=new SpeechSynthesisUtterance(text);
    utterance.lang='tr-TR';
    utterance.rate=.86;
    utterance.pitch=1.12;
    window.speechSynthesis.speak(utterance);
  }

  function enhance(){
    syncPrimaryFilters();
    document.querySelectorAll('.ekurs-test-dialog').forEach(function(dialog){
      if(!dialog.dataset.primaryCoach){dialog.dataset.primaryCoach='1';startedAt=Date.now();}
      localizePrimary(dialog);
      addReadAloud(dialog);
      addMascot(dialog);
      addStatusCenter(dialog);
      styleChoices(dialog);
      upgradeWrongFeedback(dialog);
      upgradeCorrectFeedback(dialog);
      upgradeResults(dialog);
    });
  }

  function syncPrimaryFilters(){
    if(!isPrimary||document.documentElement.dataset.primaryFiltersSynced==='1')return;
    var filters=document.querySelector('.ekurs-test-filters');
    if(!filters)return;
    var selects=filters.querySelectorAll('select');
    if(selects.length<4)return;
    var changed=false;
    if(selects[0].value!=='2'){selects[0].value='2';changed=true;}
    if(selects[1].value!=='matematik'){selects[1].value='matematik';changed=true;}
    if(selects[2].value!=='all'){selects[2].value='all';changed=true;}
    if(selects[3].value!=='all'){selects[3].value='all';changed=true;}
    document.documentElement.dataset.primaryFiltersSynced='1';
    if(changed)selects[0].dispatchEvent(new Event('change',{bubbles:true}));
  }

  function localizePrimary(dialog){
    if(!isPrimary)return;
    var h2=dialog.querySelector('.ekurs-test-runner-head h2');
    if(h2&&norm(h2.textContent).indexOf('üslü')>-1)h2.textContent='2. Sınıf Toplama Hızlı Teşhis';
    var lead=dialog.querySelector('.ekurs-test-runner-head p');
    if(lead&&norm(lead.textContent).indexOf('kuvvet')>-1)lead.textContent='Eldeli toplama, dikkat ve işlem sırası becerilerini çocuk dostu bir denemeyle ölçüyoruz.';
    var math=dialog.querySelector('.ekurs-test-math');
    if(math&&norm(math.textContent).indexOf('2')>-1&&norm(math.textContent).indexOf('+ 4')>-1){
      math.textContent='7 + 5';
      math.setAttribute('data-ekurs-math','7+5');
      math.dataset.rendered='1';
    }
    var prompt=dialog.querySelector('.ekurs-test-math-prompt');
    if(prompt&&norm(prompt.textContent).indexOf('sonucu')>-1)prompt.dataset.primaryPrompt='Toplama işleminin sonucu kaçtır?';
    dialog.querySelectorAll('.ekurs-test-feedback.is-wrong p').forEach(function(p){
      if(norm(p.textContent).indexOf('üs')>-1)p.textContent='Önce birlikleri tamamla: 7 + 5 işleminde 7 üzerine 3 ekleyince 10 olur, geriye 2 kalır. Sonuç 12.';
    });
    dialog.querySelectorAll('.ekurs-test-steps li').forEach(function(li,i){
      var steps=['7 + 3 = 10','5 sayısından 3 kullandık, 2 kaldı','10 + 2 = 12'];
      if(steps[i])li.textContent=steps[i];
    });
    var visual=dialog.querySelector('.ekurs-test-visual-hint');
    if(visual&&norm(visual.textContent).indexOf('üslü')>-1)visual.textContent='Toplama yaparken 10’a tamamlamak işlemi kolaylaştırır.';
  }

  function addReadAloud(dialog){
    var prompt=dialog.querySelector('.ekurs-test-math-prompt');
    if(!prompt||prompt.querySelector('.ekurs-read-aloud'))return;
    var btn=button('Sesli oku','ekurs-read-aloud',function(){
      var question=prompt.dataset.primaryPrompt||prompt.textContent;
      var choices=[].slice.call(dialog.querySelectorAll('.ekurs-test-choices button')).map(function(x){return x.textContent.trim();}).join(', ');
      speak(question+'. Şıklar: '+choices);
    });
    btn.setAttribute('aria-label','Soruyu ve şıkları sesli oku');
    prompt.insertBefore(btn,prompt.firstChild);
  }

  function addMascot(dialog){
    var question=dialog.querySelector('.ekurs-test-live-question');
    if(!question||question.querySelector('.ekurs-primary-mascot'))return;
    var mascot=el('div','ekurs-primary-mascot');
    mascot.appendChild(el('span','','AI'));
    mascot.appendChild(el('p','','Ben Eko. Takılırsan birlikte öğreniriz.'));
    question.insertBefore(mascot,question.firstChild);
  }

  function styleChoices(dialog){
    dialog.querySelectorAll('.ekurs-test-choices button:not([data-primary-choice])').forEach(function(btn,index){
      btn.dataset.primaryChoice='1';
      btn.classList.add('ekurs-primary-choice','choice-'+((index%4)+1));
      var label=String.fromCharCode(65+index);
      if(btn.querySelector('.ekurs-choice-letter'))return;
      var text=btn.textContent;
      btn.textContent='';
      btn.appendChild(el('span','ekurs-choice-letter',label));
      btn.appendChild(el('strong','',text));
    });
  }

  function addStatusCenter(dialog){
    var panel=dialog.querySelector('.ekurs-test-smart-panel');
    if(!panel)return;
    if(!panel.querySelector('.ekurs-status-title'))panel.insertBefore(el('strong','ekurs-status-title','Sınav Durum Merkezi'),panel.firstChild);
    addEnergyBar(panel);
    if(!panel.querySelector('.ekurs-countdown')){
      var cd=el('div','ekurs-countdown');
      cd.appendChild(el('span','','Kalan süre'));
      cd.appendChild(el('strong','','15:00'));
      panel.appendChild(cd);
    }
    if(!panel.querySelector('.ekurs-question-map'))panel.appendChild(el('div','ekurs-question-map'));
    if(!panel.querySelector('.ekurs-flag-current')){
      panel.appendChild(button('Bu soruyu işaretle','ekurs-flag-current',function(){
        var q=dialog.querySelector('.ekurs-test-question');
        if(q)q.classList.toggle('is-flagged');
        updateQuestionMap(dialog);
      }));
    }
    updateCountdown(panel);
    updateQuestionMap(dialog);
  }

  function addEnergyBar(panel){
    var scoreNode=panel.querySelector('.ekurs-test-score-ring strong');
    var score=scoreNode?Math.max(0,Math.min(100,parseInt(scoreNode.textContent,10)||0)):0;
    var bar=panel.querySelector('.ekurs-energy-bar');
    if(!bar){
      bar=el('div','ekurs-energy-bar');
      bar.appendChild(el('span','','Başarı Enerjisi'));
      bar.appendChild(el('i',''));
      bar.appendChild(el('strong','',score+'%'));
      var ring=panel.querySelector('.ekurs-test-score-ring');
      panel.insertBefore(bar,ring?ring.nextSibling:panel.firstChild.nextSibling);
    }
    bar.querySelector('i').style.width=score+'%';
    bar.querySelector('strong').textContent=score+'%';
    bar.classList.toggle('is-challenge',score>=90);
  }

  function updateCountdown(panel){
    var target=panel.querySelector('.ekurs-countdown strong');
    if(!target)return;
    var left=Math.max(0,totalSeconds-Math.floor((Date.now()-startedAt)/1000));
    var m=Math.floor(left/60),s=left%60;
    target.textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
  }

  function updateQuestionMap(dialog){
    var map=dialog.querySelector('.ekurs-question-map');
    var countText=(dialog.querySelector('.ekurs-test-question-count')||{}).textContent||'';
    var match=countText.match(/Soru\s+(\d+)\s*\/\s*(\d+)/i);
    if(!map||!match)return;
    var current=Number(match[1]),total=Number(match[2]);
    map.innerHTML='';
    for(var i=1;i<=total;i++){
      var dot=el('span','',String(i));
      if(i<current)dot.className='is-done';
      else if(i===current&&dialog.querySelector('.ekurs-test-question.is-flagged'))dot.className='is-flagged';
      else if(i===current&&dialog.querySelector('.ekurs-test-feedback.is-wrong'))dot.className='is-stuck';
      else if(i===current)dot.className='is-current';
      else dot.className='is-empty';
      map.appendChild(dot);
    }
  }

  function upgradeWrongFeedback(dialog){
    dialog.querySelectorAll('.ekurs-test-feedback.is-wrong:not([data-learning-modal])').forEach(function(box){
      box.dataset.learningModal='1';
      box.classList.add('ekurs-learning-modal');
      var intro=el('div','ekurs-learning-intro');
      intro.appendChild(el('span','ekurs-learning-mascot','AI'));
      var copy=el('div','');
      copy.appendChild(el('strong','','Bir hata yaptın ama sorun değil, gel birlikte öğrenelim.'));
      copy.appendChild(el('p','','Moral bozma. Mini dersi izle, puanı geri kazan. Bu adımı anlamadan sonraki soruya geçmiyoruz.'));
      intro.appendChild(copy);
      box.insertBefore(intro,box.firstChild);
      var next=box.querySelector('.ekurs-test-next');
      if(next)next.textContent='Anladım, sonraki soruya geç';
      var video=box.querySelector('.ekurs-video-inline-btn');
      if(video)video.textContent='Önce mini dersi izle';
      speak('Bir hata yaptın ama sorun değil. Gel birlikte öğrenelim.');
      updateQuestionMap(dialog);
    });
  }

  function upgradeCorrectFeedback(dialog){
    dialog.querySelectorAll('.ekurs-test-feedback.is-correct:not([data-primary-celebrated])').forEach(function(box){
      box.dataset.primaryCelebrated='1';
      var msg=el('div','ekurs-star-burst','Harika! Yıldız kazandın.');
      box.insertBefore(msg,box.firstChild);
      speak('Harika, doğru cevap.');
      updateQuestionMap(dialog);
    });
  }

  function upgradeResults(dialog){
    var results=dialog.querySelector('.ekurs-test-results:not([data-ai-report])');
    if(!results)return;
    results.dataset.aiReport='1';
    var report=el('section','ekurs-ai-report');
    report.appendChild(el('span','ekurs-test-chip','Yapay Zeka Karnesi'));
    report.appendChild(el('h3','','Bugünkü öğrenme özeti'));
    var radar=el('div','ekurs-success-radar');
    [['Matematik Toplama','8/10',80],['Dikkat ve İşlem Sırası','7/10',70],['Okuma Anlama','10/10',100]].forEach(function(item){
      var row=el('div','');
      row.appendChild(el('span','',item[0]));
      var line=el('i','');line.style.width=item[2]+'%';row.appendChild(line);
      row.appendChild(el('strong','',item[1]));
      radar.appendChild(row);
    });
    report.appendChild(radar);
    var grid=el('div','ekurs-ai-report-grid');
    [
      ['Güçlü alanların','Toplama adımlarını doğru kurmaya başladın.'],
      ['Gelişim alanların','Takıldığın kazanımlarda mini dersi izleyip kolay soruyla pekiştir.'],
      ['Öneri','Yarın 10:00 için 5 soruluk tekrar testi hazırla.']
    ].forEach(function(item){var card=el('article','');card.appendChild(el('strong','',item[0]));card.appendChild(el('p','',item[1]));grid.appendChild(card);});
    report.appendChild(grid);
    results.appendChild(report);
  }

  setInterval(function(){
    document.querySelectorAll('.ekurs-test-smart-panel').forEach(function(panel){updateCountdown(panel);addEnergyBar(panel);});
  },1000);
  var observer=new MutationObserver(enhance);
  observer.observe(document.documentElement,{childList:true,subtree:true,characterData:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enhance);else enhance();
})();
