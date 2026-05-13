(function(){
  if(window.__ekursMathCurriculumUxLoaded)return;
  window.__ekursMathCurriculumUxLoaded=true;

  var grades=[
    ['1. Sınıf','1','●'],['2. Sınıf','2','◆'],['3. Sınıf','3','▲'],['4. Sınıf','4','■'],
    ['5. Sınıf','5','÷'],['6. Sınıf','6','×'],['7. Sınıf','7','π'],['8. Sınıf','8','√'],
    ['9. Sınıf','9','x²'],['10. Sınıf','10','∑'],['11. Sınıf','11','f(x)'],['12. Sınıf','12','∫']
  ];

  var curriculum={
    '1. Sınıf':[
      unit('Sayılar ve Sayma',['20 içinde ileri sayma','Nesne sayısını bulma','Sayıları karşılaştırma','Sıra bildiren sayılar']),
      unit('Toplama ve Çıkarma',['10 içinde toplama','Eksilen ve çıkan ilişkisi','Zihinden çıkarma','Günlük problemler'])
    ],
    '2. Sınıf':[
      unit('Toplama İşlemi',["10'un katlarını toplama",'İki basamaklı eldesiz toplama','İki basamaklı eldeli toplama','Üç terimli toplama','Toplama problemleri']),
      unit('Çıkarma İşlemi',['Onluk bozmayı modelleme','İki basamaklı çıkarma','Eksik terimi bulma','Çıkarma problemleri']),
      unit('Geometri ve Ölçme',['Şekilleri sınıflandırma','Simetriyi fark etme','Standart olmayan ölçme','Saat okuma'])
    ],
    '3. Sınıf':[
      unit('Doğal Sayılar',['Üç basamaklı sayıları okuma','Basamak değeri','Sayı örüntüleri','Yuvarlama']),
      unit('Çarpma ve Bölme',['Çarpımı modelleme','Kısa yoldan çarpma','Bölmeyi gruplama','Kalanlı bölme']),
      unit('Kesirler',['Birim kesir','Kesirleri modelleme','Pay ve paydayı tanıma','Kesir karşılaştırma'])
    ],
    '4. Sınıf':[
      unit('Dört İşlem',['Çok basamaklı toplama','Çok basamaklı çıkarma','Çarpma stratejileri','Bölme problemleri']),
      unit('Kesirler',['Basit bileşik kesir','Kesirleri sıralama','Kesirlerle toplama','Kesir problemleri']),
      unit('Veri ve Geometri',['Grafik yorumlama','Açıları tanıma','Üçgenleri sınıflandırma','Alanı modelleme'])
    ]
  };

  function unit(title,skills){
    return {title:title,skills:skills.map(function(name,index){
      return {
        name:name,
        score:Math.max(18,Math.min(98,42+(index*13)+(title.length%17))),
        sample:sampleFor(name,index)
      };
    })};
  }

  function sampleFor(name,index){
    var samples=[
      '24 + 18 işlemini sayı bloklarıyla göster.',
      '36 + 27 işleminde elde hangi basamağa eklenir?',
      'Bir kutuda 12 kalem var, 8 kalem daha eklendi. Toplam kaç kalem olur?',
      '48 sayısını en yakın onluğa yuvarla.'
    ];
    return name+': '+samples[index%samples.length];
  }

  function isMathPage(){
    var path=location.pathname.toLowerCase();
    var title=(document.querySelector('h1')||{}).textContent||'';
    return /\/dersler\/matematik/.test(path)||/matematik/i.test(title);
  }

  function progressRing(score){
    var cls=score>=90?'mastered':score>=70?'strong':score>=50?'review':'start';
    var medal=score>=90?'<span class="skill-medal" aria-label="Ustalık">★</span>':'';
    return '<span class="skill-ring '+cls+'" style="--score:'+score+'"><i>'+score+'</i></span>'+medal;
  }

  function renderSkill(skill){
    return '<button class="math-skill '+(skill.score>=90?'is-mastered':'')+'" type="button" data-preview="'+escapeAttr(skill.sample)+'">'+
      '<span class="skill-name">'+skill.name+'</span>'+
      '<span class="skill-meta">'+(skill.score>=90?'Ustalık':'SmartScore '+skill.score)+'</span>'+
      progressRing(skill.score)+
    '</button>';
  }

  function escapeAttr(text){
    return String(text).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
  }

  function renderUnits(grade){
    var list=curriculum[grade]||[
      unit('Sayılar ve İşlemler',['Kazanımı modelle','İşlem stratejisi seç','Yeni nesil soru çöz','Hata analizi yap']),
      unit('Cebir ve Geometri',['Örüntüyü genelle','Denklem kur','Açı ilişkileri','Alan ve çevre problemleri']),
      unit('Veri ve Problem Çözme',['Grafik yorumla','Oran kur','Çok adımlı problem çöz','Sınav provası'])
    ];
    return list.map(function(item){
      return '<section class="math-unit-card"><header><h3>'+item.title+'</h3><span>'+item.skills.length+' beceri</span></header><div class="math-skill-list">'+item.skills.map(renderSkill).join('')+'</div></section>';
    }).join('');
  }

  function renderActionCenter(grade){
    return '<aside class="math-action-center">'+
      '<section><span>Günün Önerisi</span><h3>'+grade+' için odak beceri</h3><p>Bugün “İki basamaklı eldeli toplama” üzerinde 10 dakikalık pratik yap.</p><a class="btn btn-primary" href="/seviye-belirle.html">Hızlı Teşhis</a></section>'+
      '<section><span>Liderlik Tablosu</span><ol><li>Öğrenci A · 148 soru</li><li>Öğrenci B · 132 soru</li><li>Öğrenci C · 119 soru</li><li>Öğrenci D · 103 soru</li><li>Öğrenci E · 96 soru</li></ol></section>'+
      '<section><span>AI Rota</span><p>Yanlışların aynı mikro-kazanımda yoğunlaşırsa sistem seni otomatik alt beceriye yönlendirir.</p></section>'+
    '</aside>';
  }

  function build(){
    if(!isMathPage()||document.querySelector('.math-curriculum-shell'))return;
    var container=document.querySelector('main .section .container');
    if(!container)return;
    var selected=localStorage.getItem('ekurs.mathGrade')||'2. Sınıf';
    var shell=document.createElement('section');
    shell.className='math-curriculum-shell';
    shell.innerHTML=[
      '<div class="math-grade-nav" aria-label="Matematik sınıf seçimi">',
        grades.map(function(item){
          return '<button type="button" class="'+(item[0]===selected?'active':'')+'" data-grade="'+item[0]+'"><b>'+item[2]+'</b><span>'+item[0]+'</span></button>';
        }).join(''),
      '</div>',
      '<div class="math-workspace">',
        '<div class="math-curriculum-main"><div class="math-units-grid">'+renderUnits(selected)+'</div></div>',
        renderActionCenter(selected),
      '</div>',
      '<div class="skill-preview-popover" role="status" aria-live="polite"></div>'
    ].join('');
    container.insertBefore(shell,container.firstChild);
    bind(shell);
  }

  function bind(shell){
    var grid=shell.querySelector('.math-units-grid');
    var action=shell.querySelector('.math-action-center');
    shell.querySelectorAll('.math-grade-nav button').forEach(function(button){
      button.addEventListener('click',function(){
        var grade=button.getAttribute('data-grade');
        localStorage.setItem('ekurs.mathGrade',grade);
        shell.querySelectorAll('.math-grade-nav button').forEach(function(item){item.classList.toggle('active',item===button);});
        grid.classList.add('is-switching');
        window.setTimeout(function(){
          grid.innerHTML=renderUnits(grade);
          action.outerHTML=renderActionCenter(grade);
          bindSkillPreview(shell);
          grid.classList.remove('is-switching');
        },160);
      });
    });
    bindSkillPreview(shell);
  }

  function bindSkillPreview(shell){
    var popover=shell.querySelector('.skill-preview-popover');
    shell.querySelectorAll('.math-skill').forEach(function(skill){
      skill.addEventListener('mouseenter',function(){
        popover.textContent=skill.getAttribute('data-preview')||'Örnek soru hazırlanıyor.';
        popover.classList.add('show');
        var rect=skill.getBoundingClientRect();
        var parent=shell.getBoundingClientRect();
        popover.style.left=Math.min(parent.width-280,Math.max(0,rect.left-parent.left+12))+'px';
        popover.style.top=(rect.bottom-parent.top+8)+'px';
      });
      skill.addEventListener('mouseleave',function(){popover.classList.remove('show');});
      skill.addEventListener('focus',function(){skill.dispatchEvent(new Event('mouseenter'));});
      skill.addEventListener('blur',function(){popover.classList.remove('show');});
    });
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);
  else build();
})();
