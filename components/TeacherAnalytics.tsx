import { parentPanelItems, route, studentPanelItems, teacherPanelItems } from "@/data/home";

function PanelMock({ type }: { type: "student" | "parent" | "teacher" }) {
  if (type === "student") {
    return <div className="rounded-[2rem] bg-slate-950 p-5 text-white shadow-2xl"><p className="text-emerald-200">Öğrenci paneli</p><h3 className="mt-1 text-2xl font-black">Bugünkü ilerleme</h3><div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-white/10 p-4"><span className="text-sm text-slate-300">Günlük hedef</span><b className="block text-2xl">20 soru</b></div><div className="rounded-2xl bg-white/10 p-4"><span className="text-sm text-slate-300">Doğru oranı</span><b className="block text-2xl">%82</b></div><div className="rounded-2xl bg-white/10 p-4"><span className="text-sm text-slate-300">Puan</span><b className="block text-2xl">120</b></div><div className="rounded-2xl bg-white/10 p-4"><span className="text-sm text-slate-300">Seri</span><b className="block text-2xl">5 gün</b></div></div></div>;
  }
  if (type === "parent") {
    return <div className="rounded-[2rem] bg-white p-6 shadow-2xl"><p className="font-black text-violet-700">Veli görünümü</p><div className="mt-5 h-32 rounded-3xl bg-gradient-to-r from-violet-100 via-sky-100 to-emerald-100 p-4"><div className="flex h-full items-end gap-3">{[44, 70, 58, 84, 76].map((h, i) => <span key={i} className="flex-1 rounded-t-2xl bg-violet-500" style={{ height: `${h}%` }} />)}</div></div><p className="mt-4 rounded-2xl bg-amber-50 p-4 font-bold text-amber-800">Bildirim: Kesirler için 15 dakikalık tekrar önerildi.</p></div>;
  }
  return <div className="rounded-[2rem] bg-white p-6 shadow-2xl"><p className="font-black text-sky-700">Öğretmen ekranı</p><div className="mt-5 space-y-3">{["8/A Matematik", "7/B Fen Bilimleri", "5/C Türkçe"].map((item, i) => <div key={item} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"><b>{item}</b><span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-black text-sky-700">%{82 - i * 9}</span></div>)}</div><p className="mt-4 rounded-2xl bg-emerald-50 p-4 font-bold text-emerald-800">Eksik konu raporu ve ödev atama hazır.</p></div>;
}

function BulletGrid({ items }: { items: string[] }) {
  return <ul className="mt-6 grid gap-3 sm:grid-cols-2">{items.map((item) => <li key={item} className="rounded-2xl bg-white p-4 text-sm font-bold text-slate-700 shadow-sm">✓ {item}</li>)}</ul>;
}

export function TeacherAnalytics() {
  return (
    <>
      <section className="section-pad bg-white" id="ogrenci-paneli">
        <div className="container-nova grid gap-10 lg:grid-cols-2 lg:items-center">
          <div><p className="font-black text-emerald-700">Öğrenci paneli</p><h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">Öğrenci kendi ilerlemesini anında görür</h2><p className="mt-4 text-lg text-slate-600">Günlük hedef, çözülen soru, doğru oranı, eksik konu ve rozetler öğrencinin çalışma alışkanlığını görünür kılar.</p><BulletGrid items={studentPanelItems} /><a href={route.student} className="focus-nova mt-7 inline-flex rounded-full bg-emerald-500 px-6 py-3 font-black text-white hover:bg-emerald-600">Canlı Demoyu Gör</a></div>
          <PanelMock type="student" />
        </div>
      </section>

      <section className="section-pad bg-gradient-to-br from-violet-50 to-white" id="veli-paneli">
        <div className="container-nova grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <PanelMock type="parent" />
          <div><p className="font-black text-violet-700">Veli paneli</p><h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">Veliler gelişimi anlık takip eder</h2><p className="mt-4 text-lg text-slate-600">Veli raporları, çocuğun gelişiminde hangi dersin destek istediğini sade ve anlaşılır biçimde gösterir.</p><BulletGrid items={parentPanelItems} /><a href={route.parent} className="focus-nova mt-7 inline-flex rounded-full bg-violet-600 px-6 py-3 font-black text-white hover:bg-violet-700">Veli Panelini Gör</a></div>
        </div>
      </section>

      <section className="section-pad bg-white" id="ogretmen-paneli">
        <div className="container-nova grid gap-10 lg:grid-cols-2 lg:items-center">
          <div><p className="font-black text-sky-700">Öğretmen paneli</p><h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">Öğretmenler sınıfın eksiklerini tek ekranda görür</h2><p className="mt-4 text-lg text-slate-600">Sınıf listesi, başarı oranı, ödev verme, test oluşturma ve kazanım takibiyle öğretmenlerin karar alma süreci hızlanır.</p><BulletGrid items={teacherPanelItems} /><a href={route.teacher} className="focus-nova mt-7 inline-flex rounded-full bg-sky-600 px-6 py-3 font-black text-white hover:bg-sky-700">Öğretmen Panelini Gör</a></div>
          <PanelMock type="teacher" />
        </div>
      </section>
    </>
  );
}
