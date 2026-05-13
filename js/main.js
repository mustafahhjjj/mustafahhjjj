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
    focusBar.innerHTML='<button class="focus-toggle" type="button" aria-pressed="false">Odak Modu</button><span class="focus-note">Sadece soru ve cevaplar kalsın.</span>';
    const main=document.querySelector('main')||document.body;
    main.insertBefore(focusBar,main.firstChild);
    const focusButton=focusBar.querySelector('.focus-toggle');
    focusButton.addEventListener('click',()=>{
      const active=document.body.classList.toggle('focus-mode');
      focusButton.setAttribute('aria-pressed',active?'true':'false');
      focusButton.textContent=active?'Odak Modundan Çık':'Odak Modu';
      if(active) quizRoot.scrollIntoView({behavior:'smooth',block:'start'});
    });
  }

  const feedback=document.getElementById('feedback')||document.getElementById('feed');
  const hint=document.getElementById('hintBox')||document.getElementById('hint');
  const topic=document.getElementById('topicCode')||document.getElementById('code');
  const fold=text=>(text||'').toLocaleLowerCase('tr-TR').replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s').replace(/ı/g,'i').replace(/ö/g,'o').replace(/ç/g,'c');
  if(feedback&&hint&&topic){
    const advisor=document.createElement('div');
    advisor.className='adaptive-advisor';
    advisor.innerHTML='<strong>Akıllı önerim:</strong> Zorlanırsan ipucunu aç, sonra bir önceki mikro kazanımı tekrar et.';
    hint.parentNode.insertBefore(advisor,hint.nextSibling);
    const observer=new MutationObserver(()=>{
      const text=fold(feedback.textContent);
      advisor.classList.remove('good');
      if(text.includes('dogru cevap:')||text.includes('bir daha')||text.includes('yanlis')){
        advisor.classList.add('show');
        advisor.innerHTML='<strong>Akıllı önerim:</strong> '+topic.textContent+' için önce ipucunu oku. Arka arkaya zorlanırsan bir önceki görevi tekrar ederek güçlen.';
      }else if(text.includes('harika')||text.includes('dogru cevap')){
        advisor.classList.add('show','good');
        advisor.innerHTML='<strong>Süper seri!</strong> Bu hızla devam et; puanın yıldız rozetine yaklaşıyor.';
      }
    });
    observer.observe(feedback,{childList:true,characterData:true,subtree:true});
  }

  if(document.body.classList.contains('home-modern')){
    document.querySelectorAll('#canli-metrikler [data-countup]').forEach(item=>{
      if(item.textContent.trim()==='0') item.textContent='...';
    });

    const style=document.createElement('style');
    style.textContent='.stage-tabs-panels{min-height:318px}.daily-skill-panel{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:14px;align-items:center;min-height:104px;margin-top:18px;padding:18px;border:1px solid #bbf7d0;border-radius:24px;background:linear-gradient(135deg,#fff,#ecfdf5);box-shadow:0 12px 32px rgba(15,23,42,.08)}.daily-skill-panel span{color:#0d9464;font-size:.78rem;font-weight:900;text-transform:uppercase}.daily-skill-panel h3{margin:2px 0 4px}.daily-skill-panel p{margin:0}.daily-skill-panel.is-loading{background:#fff}.daily-skill-panel.is-loading h3,.daily-skill-panel.is-loading p{color:transparent;border-radius:999px;background:linear-gradient(90deg,#eef2f7,#dbeafe,#eef2f7);background-size:220% 100%;animation:skeleton 1.1s linear infinite}@media(max-width:640px){.daily-skill-panel{grid-template-columns:1fr}.daily-skill-panel .btn{width:100%}}';
    document.head.appendChild(style);

    const digitalHeroStyle=document.createElement('style');
    digitalHeroStyle.textContent='.home-hero{background:radial-gradient(circle at 72% 18%,rgba(56,189,248,.30),transparent 24%),radial-gradient(circle at 84% 70%,rgba(21,183,122,.22),transparent 26%),linear-gradient(135deg,#fbfffd 0%,#eefcff 46%,#eef6ff 100%)!important}.home-hero:before{content:"";position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(37,99,235,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.08) 1px,transparent 1px),radial-gradient(circle at 68% 30%,rgba(37,99,235,.20) 0 2px,transparent 3px),radial-gradient(circle at 78% 42%,rgba(21,183,122,.24) 0 2px,transparent 3px),radial-gradient(circle at 88% 26%,rgba(255,152,0,.28) 0 2px,transparent 3px);background-size:56px 56px,56px 56px,120px 120px,144px 144px,110px 110px;mask-image:linear-gradient(90deg,transparent 0%,rgba(0,0,0,.22) 28%,#000 58%,#000 100%)}.home-hero .container{position:relative;z-index:1}.hero-copy{background:linear-gradient(110deg,rgba(255,255,255,.86) 0%,rgba(255,255,255,.96) 42%,rgba(239,246,255,.82) 50%,rgba(255,255,255,.90) 62%,rgba(255,255,255,.86) 100%)!important;backdrop-filter:blur(8px)}.hero-panel{position:relative;background:linear-gradient(180deg,rgba(255,255,255,.92),rgba(248,251,255,.86))!important;backdrop-filter:blur(14px)}.hero-panel:after{content:"AI";position:absolute;right:-18px;top:-24px;display:grid;width:92px;height:92px;place-items:center;border-radius:28px;background:linear-gradient(135deg,#2563eb,#38bdf8 52%,#15b77a);color:#fff;font-size:1.3rem;font-weight:950;box-shadow:0 22px 50px rgba(37,99,235,.26);transform:rotate(8deg)}.digital-badges{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:12px}.digital-badges span{min-height:58px;display:grid;align-content:center;border:1px solid #bfdbfe;border-radius:18px;background:rgba(255,255,255,.78);color:#1d4ed8;font-size:.86rem;font-weight:900;text-align:center;box-shadow:0 12px 28px rgba(37,99,235,.10)}@media(max-width:640px){.digital-badges{grid-template-columns:1fr}.home-hero:before{mask-image:linear-gradient(180deg,transparent 0%,rgba(0,0,0,.4) 38%,#000 100%)}}';
    document.head.appendChild(digitalHeroStyle);

    const trustRow=document.querySelector('.trust-row');
    if(trustRow&&!document.querySelector('.digital-badges')){
      const digitalBadges=document.createElement('div');
      digitalBadges.className='digital-badges';
      digitalBadges.setAttribute('aria-label','Dijital öğrenme vurguları');
      digitalBadges.innerHTML='<span>AI beceri önerisi</span><span>Canlı ilerleme sinyali</span><span>Akıllı tekrar rotası</span>';
      trustRow.insertAdjacentElement('afterend',digitalBadges);
    }

    const skillMap={
      '1. sınıf':['Toplama Öncesi Sayma','10 içinde sayıları tanı ve kısa alıştırmaya başla.','/siniflar/1-sinif/matematik.html'],
      '2. sınıf':['Geometrik Cisimleri Tanı','Küre, küp ve silindiri ayırt et; sonra soru bankasına geç.','/testler/2-sinif-matematik-1-tema-soru-bankasi.html'],
      '3. sınıf':['Çarpım Tablosu Pratiği','Kısa çarpma görevleriyle ritmini güçlendir.','/siniflar/3-sinif/matematik.html'],
      '4. sınıf':['Kesirleri Sıralama','Pay ve payda ilişkisini mini görevlerle pekiştir.','/siniflar/4-sinif/matematik.html#kesirleri-siralama'],
      '5. sınıf':['Kesirlerde Toplama','Kesirleri aynı paydada topla ve seviyeni gör.','/siniflar/5-sinif/matematik.html#kesirlerde-toplama'],
      '6. sınıf':['Oran Problemleri','Oran kur ve kısa problem çöz.','/siniflar/6-sinif/matematik.html#oran'],
      '7. sınıf':['Tam Sayılar','İşaret kurallarını hızlı alıştırmayla tekrar et.','/siniflar/7-sinif/matematik.html#tam-sayilar'],
      '8. sınıf':['LGS Problem Pratiği','Yeni nesil problem çözmeye başla.','/siniflar/8-sinif/matematik.html#problemler'],
      '9. sınıf':['Üslü Sayılar','Üslü ifadeleri temel görevlerle çalış.','/siniflar/9-sinif/matematik.html#uslu-sayilar'],
      '10. sınıf':['Fonksiyonları Tanı','Fonksiyon okuma ve eşleştirme görevini aç.','/siniflar/10-sinif/matematik.html#fonksiyonlar'],
      '11. sınıf':['Paragrafta Ana Düşünce','Metnin ana fikrini bulma pratiği yap.','/siniflar/11-sinif/turkce.html#paragrafta-ana-dusunce'],
      '12. sınıf':['TYT Mini Deneme','Süreli mini deneme ile seviyeni ölç.','/testler/index.html']
    };
    const panels=document.querySelector('.stage-tabs-panels');
    if(panels&&!document.getElementById('dailySkillPanel')){
      const panel=document.createElement('div');
      panel.className='daily-skill-panel';
      panel.id='dailySkillPanel';
      panel.innerHTML='<div><span>Günün Becerisi</span><h3 id="dailySkillTitle">Geometrik Cisimleri Tanı</h3><p id="dailySkillText">Küre, küp ve silindiri ayırt et; sonra soru bankasına geç.</p></div><a class="btn btn-primary" id="dailySkillLink" href="/testler/2-sinif-matematik-1-tema-soru-bankasi.html" data-trial-link>Hemen Çöz</a>';
      panels.appendChild(panel);
    }
    const dailyPanel=document.getElementById('dailySkillPanel');
    const dailyTitle=document.getElementById('dailySkillTitle');
    const dailyText=document.getElementById('dailySkillText');
    const dailyLink=document.getElementById('dailySkillLink');
    document.querySelectorAll('.class-pill').forEach(pill=>{
      const data=skillMap[pill.textContent.trim()];
      if(data){pill.dataset.skillTitle=data[0];pill.dataset.skillText=data[1];pill.dataset.skillUrl=data[2];}
      pill.addEventListener('click',event=>{
        if(!pill.dataset.skillUrl)return;
        event.preventDefault();
        document.querySelectorAll('.class-pill').forEach(item=>item.classList.remove('active'));
        pill.classList.add('active');
        dailyPanel?.classList.add('is-loading');
        setTimeout(()=>{
          dailyTitle.textContent=pill.dataset.skillTitle;
          dailyText.textContent=pill.dataset.skillText;
          dailyLink.href=pill.dataset.skillUrl;
          dailyLink.textContent='Hemen Çöz';
          dailyPanel?.classList.remove('is-loading');
        },220);
      });
    });

    const replaceLinkText=(needle,text)=>document.querySelectorAll('.skill-links a,.card .btn').forEach(a=>{if(a.textContent.includes(needle)){a.firstChild.textContent=text+' ';}});
    replaceLinkText('Geometrik Cisimler','Geometrik Cisimleri Tanı');
    replaceLinkText('Sayılar ve Ritmik Sayma','Ritmik Saymayı Tamamla');
    replaceLinkText('Toplama ve Çıkarma','Toplama ve Çıkarma Problemi Çöz');
    replaceLinkText('1. Dönem Yazılı','1. Dönem Yazılıyı Dene');
    replaceLinkText('Deneme Sınavı','2. Sınıf Deneme Çöz');
    document.querySelectorAll('.card .btn').forEach(btn=>{if(btn.textContent.includes('Testleri Aç'))btn.textContent='Deneme Çöz';});

    const mathList=document.querySelector('.feature-card .skill-links');
    if(mathList&&!mathList.querySelector('[href*="dogal-sayilarla-toplama"]')){
      [['Doğal Sayılarla Toplama','/siniflar/4-sinif/matematik.html#dogal-sayilarla-toplama'],['Kesirleri Sıralama','/siniflar/4-sinif/matematik.html#kesirleri-siralama'],['Zaman Ölçüleri','/siniflar/4-sinif/matematik.html#zaman-olculeri']].forEach(([label,href])=>{
        const li=document.createElement('li');li.className='extra-skill';li.innerHTML='<a href="'+href+'">'+label+' <b>→</b></a>';mathList.appendChild(li);
      });
    }
    const trList=document.querySelectorAll('.feature-card .skill-links')[1];
    if(trList&&!trList.querySelector('[href*="paragrafta-ana-dusunce"]')){
      const li=document.createElement('li');li.className='extra-skill';li.innerHTML='<a href="/siniflar/11-sinif/turkce.html#paragrafta-ana-dusunce">Paragrafta Ana Düşünce <b>→</b></a>';trList.appendChild(li);
    }

    const trialLabel=document.querySelector('#trialModal .demo-label');
    const trialTitle=document.getElementById('trialTitle');
    const trialText=document.getElementById('trialText');
    if(trialLabel)trialLabel.textContent='Ücretsiz deneme eşiği';
    if(trialTitle)trialTitle.textContent='10 soruda %80 başarı!';
    if(trialText)trialText.textContent='Bu harika veriyi kaybetmemek ve yapay zeka analizini görmek için ücretsiz profilini oluştur.';

    const steps=document.querySelectorAll('.diagnostic-step');
    if(steps.length>=3){
      steps[0].querySelector('h3').textContent='1. Öğrenci yanlış cevap verir';
      steps[0].querySelector('p').textContent='Sistem hatanın hangi kazanımdan geldiğini ayırır.';
      steps[1].querySelector('h3').textContent='2. Sistem seviyeyi kolaylaştırır';
      steps[1].querySelector('p').textContent='AI ikonu parlar ve daha küçük adımlı soru seçilir.';
      steps[2].querySelector('h3').textContent='3. İpucu gelir, doğru çözülür';
      steps[2].querySelector('p').textContent='Öğrenci destekle tekrar dener ve başarı hissini korur.';
    }
    const metricCards=document.querySelectorAll('#canli-metrikler .metric-card');
    if(metricCards.length>=2){
      metricCards[0].querySelector('strong')?.setAttribute('data-countup','14502');
      metricCards[0].querySelector('span').textContent='Bugün çözülen soru';
      metricCards[1].querySelector('strong')?.setAttribute('data-countup','1250');
      metricCards[1].querySelector('span').textContent='Aktif öğrenci';
    }
  }
});
