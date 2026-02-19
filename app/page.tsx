import Link from "next/link";
import { ArrowRight, Shield, FileText, BarChart3, Activity, Hexagon, Sparkles, Mail, Phone, MapPin, ChevronDown, Star, Cpu, BookOpen, Bug, Leaf, FlaskConical, Wheat, Trees, Bird } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans scroll-smooth">

      {/* ─────── HERO ─────── */}
      <section className="relative pt-40 pb-28 bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-white/5 rounded-full -mr-60 -mt-60 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-400/5 rounded-full -ml-40 -mb-40 blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <img src="/logo.png" alt="BeeHouses Foundation" className="h-28 md:h-36 w-auto mx-auto mb-10 drop-shadow-xl" />
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6 leading-tight">
            Budujemy Cyfrową Arkę<br />dla Przyszłych Pokoleń
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            W świecie zmieniającego się klimatu tradycja potrzebuje wsparcia technologii.
            Nasze ule to inteligentne azyle, w których sztuczna inteligencja dba o dobrostan pszczelich rodzin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="group inline-flex items-center justify-center px-8 py-4 bg-amber-400 hover:bg-amber-300 text-emerald-950 rounded-full font-bold transition-all shadow-lg hover:shadow-amber-400/30">
              Platforma Edukacyjna
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#mission" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/25 hover:bg-white/10 rounded-full font-bold transition-all">
              Poznaj Naszą Misję
            </Link>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
          <ChevronDown className="h-6 w-6" />
        </div>
      </section>

      {/* ─────── IMPACT ─────── */}
      <section id="impact" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionHeader label="Wsparcie" title="Twoja inwestycja w naturę" />
          <p className="text-center text-slate-500 max-w-2xl mx-auto mb-4 italic text-lg">
            &ldquo;Prawdziwe bogactwo to świat, w którym pszczoły mogą bezpiecznie pracować dla nas wszystkich.&rdquo;
          </p>
          <p className="text-center text-slate-500 max-w-2xl mx-auto mb-14">
            W BeeHouses nie zbieramy pieniędzy na &ldquo;przetrwanie&rdquo;. Zbieramy kapitał na innowacje. Twoja wpłata to udział w technologicznym postępie.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <IconCard icon={<Shield />} title="Bezpieczeństwo 256-bit" />
            <IconCard icon={<FileText />} title="Certyfikat Podatkowy" />
            <IconCard icon={<BarChart3 />} title="Twój Wpływ" desc="Zapewniasz opiekę weterynaryjną dla jednej rodziny pszczelej na miesiąc." />
          </div>
        </div>
      </section>

      {/* ─────── TECHNOLOGY ─────── */}
      <section id="mission" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionHeader label="Wizja" title="Technologia w służbie ekosystemu" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <Activity className="h-10 w-10 text-emerald-600 mb-5 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-serif font-bold mb-3 text-slate-800">Inteligentny Monitoring</h3>
              <p className="text-slate-500 leading-relaxed">Nasze ule wyposażone są w czujniki IoT analizujące temperaturę, wilgotność i akustykę roju 24/7.</p>
              <p className="text-emerald-600 mt-4 text-sm font-medium italic">&ldquo;Program BeeHouses dotarł już do 120 szkół.&rdquo;</p>
            </div>
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <Hexagon className="h-10 w-10 text-amber-500 mb-5 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-serif font-bold mb-3 text-slate-800">Złoto Natury</h3>
              <p className="text-slate-500 leading-relaxed">Produkcja miodu premium z certyfikatem jakości.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────── POLLINATORS ─────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <SectionHeader label="Edukacja" title="Poznaj świat zapylaczy" />
          <p className="text-center text-slate-500 max-w-2xl mx-auto mb-14">
            Dowiedz się, dlaczego zapylacze są tak ważne dla naszego ekosystemu i jak możesz im pomóc.
          </p>

          {/* Game CTA */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-10 max-w-3xl mx-auto mb-14 text-center">
            <Sparkles className="h-10 w-10 text-amber-500 mx-auto mb-4" />
            <h3 className="text-xl font-serif font-bold mb-3 text-slate-800">Poznaj świat pszczół przez zabawę</h3>
            <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
              Dołącz do naszej interaktywnej gry edukacyjnej, która łączy rozrywkę z nauką o pszczołach i bioróżnorodności.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard title="Co to są zapylacze?" text="Organizmy umożliwiające przenoszenie pyłku kwiatowego, dzięki czemu rośliny mogą się rozwijać." />
            <InfoCard title="Jakie są ich rodzaje?" text="Pszczoła miodna, Muchówka, Motyl, Trzmiel, Nucha – a także ptaki, wiatr i woda." />
            <InfoCard title="Dlaczego są ważne?" text="Wspierają różnorodność biologiczną, utrzymują ekosystemy i wpływają na produkcję żywności." />
            <InfoCard title="Co dla nas robią?" text="Odpowiadają za zapylanie roślin uprawnych i utrzymanie zrównoważonej produkcji żywności." />
            <InfoCard title="Dlaczego je wspierać?" text="Wspieranie zapylaczy jest ważne dla ochrony różnorodności biologicznej i stabilności przyrody." />
            <InfoCard title="Jak im pomóc w domu?" text="Posiać kwiaty, zapewnić dostęp do wody, postawić domki dla owadów i wspierać organizacje charytatywne." />
            <InfoCard title="Spotkanie z zapylaczem?" text="Nie zakłócaj ich pracy, nie wymachuj rękami, nie panikuj i nie zbliżaj się do dzikich uli." />
            <InfoCard title="W razie użądlenia?" text="Wyciągnij żądło kartą, zdezynfekuj ranę i przyłóż lód na opuchliznę." />
            <InfoCard title="Nie zapominajmy o nich!" text="Gdyby nie zapylacze, człowiek nie przeżyłby dłużej niż 4 lata. Zawsze dbajmy o nie." />
          </div>
        </div>
      </section>

      {/* ─────── VISION QUOTE ─────── */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionHeader label="Filozofia" title="Technologia w służbie natury, nie odwrotnie" />
          <div className="space-y-6">
            <blockquote className="bg-white border-l-4 border-emerald-600 rounded-xl p-8 text-slate-600 leading-relaxed italic shadow-sm">
              &ldquo;Tradycyjne pszczelarstwo to sztuka obserwacji. W BeeHouses przenosimy ją na nowy poziom. Dzięki danym wiemy dokładnie, czego potrzebuje rój, zanim stanie się to widoczne gołym okiem. Działamy precyzyjnie, minimalizując ingerencję człowieka, by pszczoły mogły robić to, co potrafią najlepiej – żyć własnym rytmem.&rdquo;
            </blockquote>
            <blockquote className="bg-white border-l-4 border-amber-400 rounded-xl p-8 text-slate-600 leading-relaxed italic shadow-sm">
              &ldquo;W ekologii nie chodzi o dominację nad przyrodą, ale o jej zrozumienie. Łączę naukowe zaplecze z energią nowego pokolenia, by udowodnić, że smart-rozwiązania mogą chronić bioróżnorodność skuteczniej niż kiedykolwiek wcześniej.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* ─────── HISTORY ─────── */}
      <section id="history" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <SectionHeader label="O Nas" title="Historia Fundacji BeeHouses" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TimelineCard step="01" title="Początek Misji" text="Inicjatywa w ramach Olimpiady Zwolnieni z Teorii. Zuzanna Czupryńska, Jędrzej Pisarek i Wiktor Gencel pod opieką Pawła Cieczko stworzyli projekt, który stał się misją." />
            <TimelineCard step="02" title="Edukacja i Relacje" text="Dwa lata warsztatów w szkołach, DPS-ach i placówkach wsparcia. Do zespołu dołączył Mateusz Brzeziński." />
            <TimelineCard step="03" title="Srebrny Wilk" text="Prestiżowa Nagroda Srebrnego Wilka oraz wyróżnienie Marszałka Województwa Kujawsko-Pomorskiego." />
            <TimelineCard step="04" title="BeeHouses Foundation" text="Fundacja założona przez Zuzannę Czupryńską – przestrzeń, w której ekologia spotyka się z empatią." />
          </div>
        </div>
      </section>

      {/* ─────── PATRONAGE ─────── */}
      <section id="adopt" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionHeader label="Adopcja" title="Zostań Mecenasem Ula" />
          <p className="text-center text-slate-500 max-w-xl mx-auto mb-14">Wybierz poziom zaangażowania dostosowany do Twoich możliwości.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TierCard tier="Opiekun" features={["Imienny certyfikat adopcji", "Raport kwartalny z życia ula", "Wpis na listę darczyńców"]} />
            <TierCard tier="Mecenas" features={["3 słoiki miodu premium", "Tabliczka na ulu z Twoim imieniem", "Dostęp do kamery online"]} featured />
            <TierCard tier="Patron Strategiczny" features={["Zestaw prezentowy VIP", "Osobista wizyta w pasiece", "Warsztaty dla firmy"]} />
          </div>
        </div>
      </section>

      {/* ─────── GALLERY ─────── */}
      <section id="gallery" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <SectionHeader label="Galeria" title="Życie w Ulach" />
          <p className="text-center text-slate-500 max-w-2xl mx-auto mb-14">
            Przeżyj codzienność naszych rodzin pszczelich. Każde zdjęcie opowiada historię harmonii między technologią a naturą.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            <GalleryTile icon={<Cpu className="h-8 w-8" />} title="Inteligentny Ul" desc="Ekosystem monitorowany 24/7" />
            <GalleryTile icon={<Bug className="h-8 w-8" />} title="Praca Roju" desc="Precyzja w każdym plastrze" />
            <GalleryTile icon={<Leaf className="h-8 w-8" />} title="Łąki Kwietne" desc="Bioróżnorodność w rozkwicie" />
            <GalleryTile icon={<BookOpen className="h-8 w-8" />} title="Edukacja" desc="Przyszłe pokolenia" />
            <GalleryTile icon={<FlaskConical className="h-8 w-8" />} title="Badania" desc="Nauka dla bioróżnorodności" />
            <GalleryTile icon={<Hexagon className="h-8 w-8" />} title="Złoto Natury" desc="Miód z certyfikatem" />
            <GalleryTile icon={<Trees className="h-8 w-8" />} title="Pasieka" desc="Technologia i natura" />
            <GalleryTile icon={<Bird className="h-8 w-8" />} title="Pszczoły" desc="Harmonia z naturą" />
            <GalleryTile icon={<Wheat className="h-8 w-8" />} title="Ule" desc="Zaawansowane technologie" />
          </div>
        </div>
      </section>

      {/* ─────── PROJECTS ─────── */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionHeader label="Aktualności" title="Nasze Najnowsze Projekty" />
          <p className="text-center text-slate-500 max-w-2xl mx-auto mb-14">
            Inicjatywy kształtujące przyszłość ochrony pszczół i bioróżnorodności.
          </p>
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
            <Cpu className="h-10 w-10 text-emerald-600 mb-5 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-serif font-bold mb-3 text-slate-800">AI w Ochronie Bioróżnorodności</h3>
            <p className="text-slate-500 leading-relaxed">
              Wykorzystujemy algorytmy sztucznej inteligencji do analizowania danych z naszych inteligentnych uli, przewidywania potrzeb roju i optymalizacji warunków życia pszczół.
            </p>
          </div>
        </div>
      </section>

      {/* ─────── CONTACT ─────── */}
      <section id="kontakt" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionHeader label="Kontakt" title="Jesteśmy tu dla Ciebie" />
          <p className="text-center text-slate-500 max-w-xl mx-auto mb-14">
            Masz pytania dotyczące inteligentnych uli lub chcesz wesprzeć naszą misję? Napisz do nas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a href="mailto:hello@beehouses.org" className="bg-slate-50 rounded-2xl p-8 text-center hover:bg-emerald-50 transition-colors group border border-slate-100">
              <Mail className="h-8 w-8 text-emerald-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Napisz do nas</div>
              <div className="font-semibold text-slate-700">hello@beehouses.org</div>
            </a>
            <a href="tel:+48535617829" className="bg-slate-50 rounded-2xl p-8 text-center hover:bg-emerald-50 transition-colors group border border-slate-100">
              <Phone className="h-8 w-8 text-emerald-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Zadzwoń</div>
              <div className="font-semibold text-slate-700">+48 535 617 829</div>
            </a>
            <div className="bg-slate-50 rounded-2xl p-8 text-center group border border-slate-100">
              <MapPin className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Odwiedź nas</div>
              <div className="font-semibold text-slate-700">ul. Miodowa 12<br />60-101 Poznań</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────── FOOTER ─────── */}
      <footer className="bg-emerald-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12">
            <div className="max-w-sm">
              <div className="flex items-center space-x-3 mb-4">
                <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                <span className="font-serif font-bold text-lg">Bee Houses Foundation</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Projektujemy ekosystemy z taką samą precyzją, z jaką pszczoła buduje swój plaster.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-x-12 gap-y-2 text-sm">
              <div>
                <h4 className="font-bold text-white/80 mb-3 text-xs uppercase tracking-wider">Fundacja</h4>
                <ul className="space-y-2 text-white/50"><li><Link href="#mission" className="hover:text-white transition-colors">O Fundacji</Link></li><li><Link href="#gallery" className="hover:text-white transition-colors">Nasze Łąki</Link></li><li><Link href="#" className="hover:text-white transition-colors">Etyka Pszczela</Link></li></ul>
              </div>
              <div>
                <h4 className="font-bold text-white/80 mb-3 text-xs uppercase tracking-wider">Działaj</h4>
                <ul className="space-y-2 text-white/50"><li><Link href="#adopt" className="hover:text-white transition-colors">Adoptuj Ul</Link></li><li><Link href="/dashboard" className="hover:text-white transition-colors">Programy Edukacyjne</Link></li><li><Link href="#" className="hover:text-white transition-colors">Raport Roczny</Link></li></ul>
              </div>
              <div>
                <h4 className="font-bold text-white/80 mb-3 text-xs uppercase tracking-wider">Kontakt</h4>
                <ul className="space-y-2 text-white/50"><li><Link href="#kontakt" className="hover:text-white transition-colors">Kontakt</Link></li><li><Link href="#" className="hover:text-white transition-colors">Współpraca</Link></li><li><Link href="#" className="hover:text-white transition-colors">Wolontariat</Link></li></ul>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/30 text-xs">
            © {new Date().getFullYear()} BeeHouses Foundation. Wszelkie prawa zastrzeżone.
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ──── Reusable Components ──── */

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="text-center mb-14">
      <span className="text-emerald-600 text-xs font-bold tracking-[0.25em] uppercase block mb-3">{label}</span>
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800">{title}</h2>
      <div className="h-1 w-16 bg-amber-400 mx-auto rounded-full mt-4"></div>
    </div>
  );
}

function IconCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc?: string }) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 text-center hover:shadow-md transition-shadow group">
      <div className="text-emerald-600 mx-auto mb-4 flex justify-center group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
      {desc && <p className="text-slate-500 text-sm">{desc}</p>}
    </div>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 hover:border-emerald-200 hover:shadow-sm transition-all group">
      <h3 className="font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors text-sm">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function TimelineCard({ step, title, text }: { step: string; title: string; text: string }) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 hover:shadow-md transition-shadow group relative overflow-hidden">
      <div className="text-7xl font-serif font-bold text-slate-100 absolute -top-3 -right-2 group-hover:text-emerald-50 transition-colors">{step}</div>
      <div className="relative z-10">
        <div className="text-emerald-600 text-xs font-bold uppercase tracking-widest mb-3">Etap {step}</div>
        <h3 className="text-lg font-serif font-bold mb-3 text-slate-800 group-hover:text-emerald-700 transition-colors">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function TierCard({ tier, features, featured }: { tier: string; features: string[]; featured?: boolean }) {
  return (
    <div className={`rounded-2xl p-8 transition-shadow group relative border ${featured ? 'bg-emerald-50 border-emerald-200 shadow-md scale-[1.03]' : 'bg-white border-slate-100 hover:shadow-md'}`}>
      {featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">Popularny</div>}
      <h3 className="text-xl font-serif font-bold mb-6 text-center text-slate-800">{tier}</h3>
      <ul className="space-y-3 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-start text-slate-600 text-sm">
            <Star className="h-4 w-4 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-full font-bold text-sm transition-all ${featured ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-slate-700'}`}>
        Wybieram
      </button>
    </div>
  );
}

function GalleryTile({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 hover:bg-emerald-50 hover:border-emerald-200 transition-all group aspect-square flex flex-col justify-end relative overflow-hidden">
      <div className="absolute top-4 right-4 text-slate-200 group-hover:text-emerald-300 transition-colors">{icon}</div>
      <div><h3 className="font-bold text-sm text-slate-700 mb-1 group-hover:text-emerald-700 transition-colors">{title}</h3><p className="text-slate-400 text-xs">{desc}</p></div>
    </div>
  );
}
