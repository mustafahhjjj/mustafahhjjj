(function(){
  var gradeStats={
    'Okul Öncesi':'3 alan / 12 etkinlik',
    '1. Sınıf':'4 ünite / 18 beceri',
    '2. Sınıf':'6 ünite / 27 beceri',
    '3. Sınıf':'6 ünite / 30 beceri',
    '4. Sınıf':'6 ünite / 32 beceri',
    '5. Sınıf':'8 ünite / 36 beceri',
    '6. Sınıf':'8 ünite / 40 beceri',
    '7. Sınıf':'8 ünite / 44 beceri',
    '8. Sınıf':'8 ünite / 4 test',
    '9. Sınıf':'6 ünite / 34 beceri',
    '10. Sınıf':'6 ünite / 36 beceri',
    'YKS / LGS':'Deneme + AI analiz'
  };

  function cleanCompetitorCopy(){
    Array.prototype.slice.call(document.querySelectorAll('h1,h2,h3,p,span,a')).forEach(function(node){
      if(!node.textContent||node.children.length)return;
      if(node.textContent.indexOf('IXL mantığında')>-1){
        node.textContent=node.textContent.replace('IXL mantığında','MEB uyumlu K-12 düzende');
      }
      if(node.textContent.indexOf('IXL kadar sade, e-kurs kadar sıcak')>-1){
        node.textContent='MEB uyumlu K-12 öğrenme düzeni';
      }
    });
  }

  function addClassStats(){
    Array.prototype.slice.call(document.querySelectorAll('.k12-entry-grid a,.class-pill')).forEach(function(card){
      if(card.querySelector('.class-stat'))return;
      var label=card.childNodes[0]&&card.childNodes[0].nodeType===3?card.childNodes[0].nodeValue.trim():card.textContent.trim();
      var stat=gradeStats[label];
      if(!stat)return;
      var span=document.createElement('span');
      span.className='class-stat';
      span.textContent=stat;
      card.appendChild(span);
    });
  }

  function buildDiagnosticPanel(){
    var section=document.querySelector('#ai-akis .container');
    if(!section||section.querySelector('.ai-diagnostic-hero'))return;
    var head=section.querySelector('.section-head');
    var panel=document.createElement('div');
    panel.className='ai-diagnostic-hero';
    panel.innerHTML=[
      '<div class="ai-diagnostic-copy">',
        '<span class="demo-label">AI Diagnostic</span>',
        '<h3>Seviyeni Belirle: 5 dakikada eksik kazanımlarını gör</h3>',
        '<p>Öğrenci sınıfını seçer, kısa teşhis sorularını çözer; sistem güçlü alanları, tekrar gereken konuları ve sıradaki mikro beceriyi çıkarır.</p>',
        '<div class="diagnostic-actions">',
          '<a class="btn btn-primary btn-pulse" href="/seviye-belirle.html">AI Analizi Yap</a>',
          '<a class="btn btn-light" href="/kayit.html">Raporumu Kaydet</a>',
        '</div>',
      '</div>',
      '<div class="diagnostic-snapshot" aria-label="Örnek AI teşhis özeti">',
        '<div><strong>Güçlü alan</strong><span>Geometrik cisimleri tanıma</span></div>',
        '<div><strong>Tekrar alanı</strong><span>Kesirleri karşılaştırma</span></div>',
        '<div><strong>Sıradaki adım</strong><span>10 soruluk mikro test</span></div>',
      '</div>'
    ].join('');
    if(head&&head.nextSibling)head.parentNode.insertBefore(panel,head.nextSibling);
    else section.insertBefore(panel,section.firstChild);
  }

  function cleanFooter(){
    var footer=document.querySelector('.footer-links');
    if(!footer)return;
    var allowed=['Sınıflar','Branşlar','Dersler','LGS/YKS','Veliler İçin','İletişim','Gizlilik'];
    Array.prototype.slice.call(footer.querySelectorAll('a')).forEach(function(link){
      var text=link.textContent.trim();
      if(allowed.indexOf(text)===-1)link.classList.add('footer-extra-hidden');
    });
  }

  function run(){
    document.documentElement.classList.add('home-polish-ready');
    cleanCompetitorCopy();
    addClassStats();
    buildDiagnosticPanel();
    cleanFooter();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);
  else run();
})();
