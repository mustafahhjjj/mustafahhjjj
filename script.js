const header=document.querySelector('.site-header');
const menuToggle=document.querySelector('[data-menu-toggle]');
menuToggle?.addEventListener('click',()=>{const open=header?.classList.toggle('open')??false;menuToggle.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('.site-header a').forEach(link=>link.addEventListener('click',()=>{header?.classList.remove('open');menuToggle?.setAttribute('aria-expanded','false');}));
const fallbackTitle=document.querySelector('[data-fallback-title]');
const fallbackCopy=document.querySelector('[data-fallback-copy]');
if(fallbackTitle&&fallbackCopy){
 const labels={
  '/testler.html':'Testler','/odev-yardimi.html':'Ödev Yardımı','/giris.html':'Giriş Yap','/kayit.html':'Ücretsiz Başla','/teshis.html':'Teşhis','/oneriler.html':'Öneriler','/kazanim-planlari.html':'Kazanım Planları','/basarilarim.html':'Başarılarım','/raporlar.html':'Raporlar',
  arama:'Arama',dersler:'Dersler','okul-oncesi':'Okul Öncesi','1-sinif':'1. sınıf','2-sinif':'2. sınıf','3-sinif':'3. sınıf','4-sinif':'4. sınıf','5-sinif':'5. sınıf','6-sinif':'6. sınıf','7-sinif':'7. sınıf','8-sinif':'8. sınıf','9-sinif':'9. sınıf','10-sinif':'10. sınıf','11-sinif':'11. sınıf','12-sinif':'12. sınıf',ingilizce:'İngilizce',videolar:'Videolar'
 };
 const params=new URLSearchParams(location.search);
 const key=params.get('view')||location.pathname;
 const title=labels[key]||'Bölüm Hazırlanıyor';
 fallbackTitle.textContent=title;
 fallbackCopy.textContent=`${title} alanı için geçici sayfa hazır. Ana sayfadaki sınıf, ders, test ve ödev yardımı akışına dönebilirsin.`;
 document.title=`${title} | e-kurs.com`;
}
