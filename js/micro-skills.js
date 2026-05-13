(function(){
  if(window.__ekursMicroSkillsLoaded)return;
  window.__ekursMicroSkillsLoaded=true;

  var microSkillData={
    matematik:[
      {unit:'Toplama İşlemi',name:"10'un katlarını toplama",score:92,level:'Ustalık',tool:'Sayı blokları'},
      {unit:'Toplama İşlemi',name:'İki basamaklı eldesiz toplama',score:84,level:'Güçlü',tool:'Basamak tablosu'},
      {unit:'Toplama İşlemi',name:'İki basamaklı eldeli toplama',score:63,level:'Tekrar',tool:'Sayı blokları'},
      {unit:'Toplama İşlemi',name:'Üç terimli toplama',score:41,level:'Başlangıç',tool:'Adım adım çözüm'},
      {unit:'Toplama İşlemi',name:'Toplama işlemiyle problem çözme',score:58,level:'Tekrar',tool:'Problem şeması'}
    ]
  };

  function subject(){
    var match=location.pathname.toLowerCase().match(/\/dersler\/([^\/?#]+)/);
    if(match)return decodeURIComponent(match[1]).replace('.html','');
    var title=(document.querySelector('h1')||{}).textContent||'';
    return /matematik/i.test(title)?'matematik':'';
  }

  function scoreClass(score){
    if(score>=90)return 'is-mastered';
    if(score>=70)return 'is-strong';
    if(score>=50)return 'is-review';
    return 'is-start';
  }

  function renderSmartScorePanel(list){
    if(document.querySelector('.micro-skills-panel'))return;
    var target=document.querySelector('main .section .container');
    if(!target)return;
    var panel=document.createElement('section');
    panel.className='micro-skills-panel';
    panel.innerHTML=[
      '<div class="micro-skills-head">',
        '<span>SmartScore + Mikro Kazanımlar</span>',
        '<h2>Toplama İşlemi artık tek başlık değil, ölçülebilir alt beceriler</h2>',
        '<p>Öğrenci doğru yaptıkça SmartScore yükselir; hata yaptığında çözüm adımı, kural ve somut araç önerisi görünür.</p>',
      '</div>',
      '<div class="micro-skill-list">',
        list.map(function(skill){
          return '<article class="micro-skill-card '+scoreClass(skill.score)+'">'+
            '<div><b>'+skill.name+'</b><span>'+skill.unit+' · '+skill.tool+'</span></div>'+
            '<strong>'+skill.score+'</strong>'+
            '<i style="width:'+skill.score+'%"></i>'+
            '<em>'+skill.level+'</em>'+
          '</article>';
        }).join(''),
      '</div>',
      '<div class="wrong-feedback-demo">',
        '<div><span>Hata anında öğretim</span><h3>Yanlış cevapta “neden?” açıklaması</h3><p>Örnek: birlikleri topla, 10 veya fazlaysa bir onluk elde et, eldeyi onlar basamağına ekle.</p></div>',
        '<div class="base-ten-demo" aria-label="Sayı blokları örneği"><b></b><b></b><b></b><span></span><span></span><span></span><span></span></div>',
      '</div>'
    ].join('');
    target.insertBefore(panel,target.firstChild);
  }

  function renderTeacherTroubleSpots(list){
    var teacherLike=/ogretmen|teacher|admin|panel/.test(location.pathname.toLowerCase())||/Öğretmen Paneli|Sınıf Analitiği/i.test(document.body.textContent||'');
    if(!teacherLike||document.querySelector('.trouble-spots-panel'))return;
    var host=document.querySelector('main,.container,body');
    var hot=list.filter(function(skill){return skill.score<70;});
    var panel=document.createElement('section');
    panel.className='trouble-spots-panel';
    panel.innerHTML='<span>Sıcaklık Haritası</span><h2>Sınıfın zorlandığı mikro kazanımlar</h2>'+
      hot.map(function(skill){
        var wrong=Math.min(90,100-skill.score+18);
        return '<article><strong>'+skill.name+'</strong><b>%'+wrong+' zorlanma</b><p>Öneri: 10 dakikalık tekrar + 5 soruluk mini test atayın.</p></article>';
      }).join('');
    host.insertAdjacentElement('afterbegin',panel);
  }

  function run(){
    var data=microSkillData[subject()];
    if(!data)return;
    document.documentElement.classList.add('micro-skills-ready');
    renderSmartScorePanel(data);
    renderTeacherTroubleSpots(data);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);
  else run();
})();
