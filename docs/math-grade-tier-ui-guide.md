# Matematik Sayfaları Yaş Katmanı UI/UX Codex'i

Bu codex, `e-kurs.com/siniflar/[sinif]/matematik` sayfalarının tek şablon gibi hissettirmemesi için sınıf seviyesine göre farklı arayüz, ton ve pedagojik destek üretir.

## Kaynak Kuralı

Tema adları ürün ekibi tarafından uydurulmaz. Matematik sayfalarındaki sınıf tema listeleri şu resmi kaynaklara göre alınır:

- 1-4. sınıflar: MEB Türkiye Yüzyılı Maarif Modeli İlkokul Matematik Dersi Öğretim Programı (2024)
- 5-8. sınıflar: MEB Türkiye Yüzyılı Maarif Modeli Ortaokul Matematik Dersi Öğretim Programı (2024)
- 9-12. sınıflar: MEB Türkiye Yüzyılı Maarif Modeli Ortaöğretim Matematik Dersi Öğretim Programı (Hazırlık, 9-12) (2024)

Oyunlaştırılmış veya pazarlama dili sadece arayüz katmanında kullanılabilir; tema başlığı ve MEB kodu değiştirilmez.

## Katmanlar

| Sınıf | Tier | UI/UX ilkesi | Öne çıkan araç |
| --- | --- | --- | --- |
| 1-4 | `PRIMARY` | Büyük buton, renkli kart, kısa cümle, görsel/sesli destek | Sesli oku, yıldız hedefi, anında moral |
| 5-8 | `MIDDLE` | Daha temiz ama motive edici, alt beceri ve hedef takibi | Seri, sınıf hedefi, LGS farkındalığı |
| 9-12 | `HIGH` | Minimal, ciddi, veri yoğunluğu yüksek | Koyu mod, Pomodoro, zayıf nokta analizi, sınav geri sayımı |

## Statik Site Uygulaması

Repo statik HTML yapısında olduğu için ortak yardımcı dosyalar eklendi:

- `/js/math-grade-tier-ui.js`
- `/css/math-grade-tier-ui.css`

JS yardımcıları:

```js
window.EKursGradeTier.getGradeTier(2)  // PRIMARY
window.EKursGradeTier.getGradeTier(8)  // MIDDLE
window.EKursGradeTier.getGradeTier(12) // HIGH
window.EKursGradeTier.themes[8].themes // MEB kaynaklı 8. sınıf tema listesi
```

Sayfa yolu `/siniflar/8-sinif/matematik.html` gibi olduğunda JS sınıfı otomatik algılar, `html[data-grade-tier]` ve `body.tier-middle` değerlerini ekler, ardından hero bölümünden sonra yaşa uygun çalışma panelini ve MEB kaynaklı tema listesini yerleştirir.

## Next.js Karşılığı

```tsx
export type GradeTier = 'PRIMARY' | 'MIDDLE' | 'HIGH';

export function getGradeTier(grade: number): GradeTier {
  if (grade >= 1 && grade <= 4) return 'PRIMARY';
  if (grade >= 5 && grade <= 8) return 'MIDDLE';
  return 'HIGH';
}

export default function MathGradePage({ params }: { params: { grade: string } }) {
  const grade = Number(params.grade);
  const tier = getGradeTier(grade);

  if (tier === 'PRIMARY') return <PrimaryMathPage grade={grade} />;
  if (tier === 'MIDDLE') return <MiddleMathPage grade={grade} />;
  return <HighMathPage grade={grade} />;
}
```

## UnitList Tier Davranışı

```tsx
function UnitList({ tier, units }: { tier: GradeTier; units: Unit[] }) {
  const base = 'grid gap-4';
  const classes = {
    PRIMARY: 'grid-cols-1 md:grid-cols-2 text-lg rounded-3xl [&_button]:min-h-14',
    MIDDLE: 'grid-cols-1 md:grid-cols-3 text-base rounded-2xl [&_button]:min-h-12',
    HIGH: 'grid-cols-1 lg:grid-cols-2 text-sm rounded-xl bg-slate-950 text-slate-100',
  }[tier];

  return (
    <section className={`${base} ${classes}`}>
      {units.map((unit) => (
        <article key={unit.code} className="border p-4 shadow-sm">
          <h2>{unit.title}</h2>
          {tier === 'PRIMARY' && <button aria-label={`${unit.title} sesli oku`}>Sesli Oku</button>}
          {tier === 'MIDDLE' && <ProgressRing value={unit.progress} />}
          {tier === 'HIGH' && <WeakPointChart data={unit.analytics} />}
        </article>
      ))}
    </section>
  );
}
```

## Ürün Kuralı

Aynı kazanım havuzu kullanılabilir; fakat arayüz ve motivasyon dili aynı kalmamalıdır. 2. sınıf öğrencisi güven, oyun ve sesli destek görürken; 12. sınıf öğrencisi zaman, analiz ve sınav odağı görmelidir.
