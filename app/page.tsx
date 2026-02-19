import Link from "next/link";
import { ArrowRight, Shield, FileText, BarChart3, Activity, Hexagon, Heart, Leaf, Bug, Sparkles, Mail, Phone, MapPin, ChevronDown, Star, Award, Cpu, BookOpen, Camera, FlaskConical, Wheat, Trees, Bird } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans scroll-smooth">

      {/* ─────────── HERO ─────────── */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0a0a] z-10"></div>
        {/* Background image placeholder - dark nature scene */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1920&q=80')] bg-cover bg-center"></div>

        {/* Floating particles */}
        <div className="absolute inset-0 z-10">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400/30 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-amber-400/20 rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-amber-400/40 rounded-full animate-pulse delay-700"></div>
        </div>

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
          <div className="mb-8 inline-block">
            <img src="/logo.png" alt="BeeHouses Foundation" className="h-24 md:h-32 w-auto mx-auto drop-shadow-2xl" />
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight mb-8 leading-[1.1]">
            Budujemy <span className="text-amber-400 italic">Cyfrową Arkę</span><br />
            dla Przyszłych Pokoleń
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            W świecie zmieniającego się klimatu tradycja potrzebuje wsparcia technologii.
            Nasze ule to inteligentne azyle, w których sztuczna inteligencja dba o dobrostan
            pszczelich rodzin 24 godziny na dobę.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="#adopt" className="group px-8 py-4 bg-amber-400 hover:bg-amber-300 text-black rounded-full font-bold text-lg transition-all shadow-lg shadow-amber-400/20 hover:shadow-amber-400/40 flex items-center justify-center">
              Dołącz do Misji
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#mission" className="px-8 py-4 border border-white/20 hover:bg-white/5 text-white rounded-full font-bold text-lg transition-all backdrop-blur-sm flex items-center justify-center">
              Zobacz Live Data
            </Link>
          </div>
          <Link href="#impact" className="inline-flex flex-col items-center text-white/40 hover:text-white/70 transition-colors">
            <span className="text-xs uppercase tracking-widest mb-2">Odkryj więcej</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </Link>
        </div>
      </section>

      {/* ─────────── IMPACT / DONATION ─────────── */}
      <section id="impact" className="py-24 bg-[#0a0a0a] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-bold tracking-[0.3em] uppercase mb-4 block">Wsparcie</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Twoja inwestycja<br /><span className="text-amber-400">w naturę</span></h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg italic leading-relaxed">
              &ldquo;Prawdziwe bogactwo to świat, w którym pszczoły mogą bezpiecznie pracować dla nas wszystkich.&rdquo;
            </p>
          </div>
          <p className="text-center text-white/60 max-w-2xl mx-auto mb-12 text-lg">
            W BeeHouses nie zbieramy pieniędzy na &ldquo;przetrwanie&rdquo;. Zbieramy kapitał na innowacje. Twoja wpłata to udział w technologicznym postępie.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all backdrop-blur-sm">
              <Shield className="h-10 w-10 text-amber-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Bezpieczeństwo 256-bit</h3>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all backdrop-blur-sm">
              <FileText className="h-10 w-10 text-amber-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Certyfikat Podatkowy</h3>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all backdrop-blur-sm">
              <BarChart3 className="h-10 w-10 text-amber-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Twój Wpływ</h3>
              <p className="text-white/50 text-sm">Zapewniasz opiekę weterynaryjną dla jednej rodziny pszczelej na miesiąc.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── TECHNOLOGY ─────────── */}
      <section id="mission" className="py-24 bg-[#111] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-bold tracking-[0.3em] uppercase mb-4 block">Wizja</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Technologia w służbie<br /><span className="text-emerald-400">ekosystemu</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 hover:border-emerald-500/30 transition-all group">
              <Activity className="h-12 w-12 text-emerald-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-serif font-bold mb-4">Inteligentny Monitoring</h3>
              <p className="text-white/60 leading-relaxed text-lg">
                Nasze ule wyposażone są w czujniki IoT analizujące temperaturę, wilgotność i akustykę roju 24/7.
              </p>
              <p className="text-emerald-400/80 mt-4 text-sm font-medium italic">
                &ldquo;Program BeeHouses dotarł już do 120 szkół.&rdquo;
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 hover:border-amber-500/30 transition-all group">
              <Hexagon className="h-12 w-12 text-amber-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-serif font-bold mb-4">Złoto Natury</h3>
              <p className="text-white/60 leading-relaxed text-lg">
                Produkcja miodu premium z certyfikatem jakości.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── POZNAJ ŚWIAT ZAPYLACZY ─────────── */}
      <section id="pollinators" className="py-24 bg-[#0a0a0a] relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-bold tracking-[0.3em] uppercase mb-4 block">Edukacja</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Poznaj świat <span className="text-amber-400">zapylaczy</span></h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Dowiedz się, dlaczego zapylacze są tak ważne dla naszego ekosystemu i jak możesz im pomóc.
            </p>
          </div>

          {/* Interactive game CTA */}
          <div className="bg-gradient-to-r from-amber-500/10 to-emerald-500/10 border border-white/10 rounded-3xl p-10 max-w-4xl mx-auto mb-16 text-center">
            <Sparkles className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-2xl font-serif font-bold mb-4">Poznaj świat pszczół przez zabawę</h3>
            <p className="text-white/60 max-w-2xl mx-auto mb-6 text-lg leading-relaxed">
              Dołącz do naszej interaktywnej gry edukacyjnej, która łączy rozrywkę z nauką o pszczołach i bioróżnorodności. Przeżyj przygodę jako pszczelarz, zarządzaj własną pasieką i odkryj fascynujący świat zapylaczy.
            </p>
          </div>

          {/* Pollinator cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <PollinatorCard title="Co to są zapylacze?" text="Zapylacze to organizmy, które umożliwiają przenoszenie pyłku kwiatowego, dzięki czemu rośliny mogą się rozwijać." />
            <PollinatorCard title="Jakie są ich rodzaje?" text="Pszczoła miodna, Muchówka, Motyl, Trzmiel, Nucha – a także ptaki, wiatr i woda." />
            <PollinatorCard title="Dlaczego są ważne?" text="Wspierają różnorodność biologiczną, utrzymują ekosystemy i wpływają na produkcję żywności." />
            <PollinatorCard title="Co dla nas robią?" text="Odpowiadają za zapylanie roślin uprawnych i utrzymanie zrównoważonej produkcji żywności." />
            <PollinatorCard title="Dlaczego je wspierać?" text="Wspieranie zapylaczy jest ważne dla ochrony różnorodności biologicznej i stabilności przyrody." />
            <PollinatorCard title="Jak im pomóc w domu?" text="Posiać kwiaty, zapewnić dostęp do wody, postawić domki dla owadów i wspierać organizacje charytatywne." />
            <PollinatorCard title="Spotkanie z zapylaczem?" text="Nie zakłócaj ich pracy, nie wymachuj rękami, nie panikuj i nie zbliżaj się do dzikich uli." />
            <PollinatorCard title="W razie użądlenia?" text="Wyciągnij żądło kartą, zdezynfekuj ranę i przyłóż lód na opuchliznę." />
            <PollinatorCard title="Nie zapominajmy o nich!" text="Gdyby nie zapylacze, człowiek nie przeżyłby dłużej niż 4 lata. Zawsze dbajmy o nie." />
          </div>
        </div>
      </section>

      {/* ─────────── VISION QUOTE ─────────── */}
      <section className="py-24 bg-[#111] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/10 to-amber-900/10 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-bold tracking-[0.3em] uppercase mb-4 block">Filozofia</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Technologia w służbie natury,<br /><span className="text-emerald-400">nie odwrotnie</span></h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            <blockquote className="bg-white/5 border-l-4 border-amber-400 rounded-2xl p-8 text-white/70 text-lg leading-relaxed italic">
              &ldquo;Tradycyjne pszczelarstwo to sztuka obserwacji. W BeeHouses przenosimy ją na nowy poziom. Dzięki danym wiemy dokładnie, czego potrzebuje rój, zanim stanie się to widoczne gołym okiem. Działamy precyzyjnie, minimalizując ingerencję człowieka, by pszczoły mogły robić to, co potrafią najlepiej – żyć własnym rytmem.&rdquo;
            </blockquote>
            <blockquote className="bg-white/5 border-l-4 border-emerald-400 rounded-2xl p-8 text-white/70 text-lg leading-relaxed italic">
              &ldquo;W ekologii nie chodzi o dominację nad przyrodą, ale o jej zrozumienie. Łączę naukowe zaplecze z energią nowego pokolenia, by udowodnić, że smart-rozwiązania mogą chronić bioróżnorodność skuteczniej niż kiedykolwiek wcześniej. To nie jest tylko ochrona pszczół – to projektowanie przyszłości, w której technologia i natura grają w jednej drużynie.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* ─────────── HISTORY ─────────── */}
      <section id="history" className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-bold tracking-[0.3em] uppercase mb-4 block">O Nas</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Historia powstania<br /><span className="text-amber-400">Fundacji Brudnica BeeHouses Foundation</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <HistoryCard step="01" title="Początek Misji" description="Wszystko zaczęło się od pomysłu Brodnica BeeHouses w ramach Olimpiady Zwolnieni z Teorii. Zuzanna Czupryńska wraz z Jędrzejem Pisarkiem i Wiktorem Genclem, pod opieką pana Pawła Cieczko, stworzyli inicjatywę, która stała się misją." />
            <HistoryCard step="02" title="Edukacja i Relacje" description="Przez dwa lata docieraliśmy z warsztatami do szkół, DPS-ów i placówek wsparcia. Do zespołu dołączył Mateusz Brzeziński, aktywnie wspierając rozwój naszych działań edukacyjnych." />
            <HistoryCard step="03" title="Srebrny Wilk" description="Projekt otrzymał prestiżową Nagrodę Srebrnego Wilka oraz wyróżnienie Marszałka Województwa Kujawsko-Pomorskiego. To potwierdzenie jakości naszej pracy." />
            <HistoryCard step="04" title="BeeHouses Foundation" description="Naturalna kontynuacja idei. Fundacja założona przez Zuzannę Czupryńską to przestrzeń, w której ekologia spotyka się z empatią." />
          </div>
        </div>
      </section>

      {/* ─────────── PATRONAGE / ADOPT ─────────── */}
      <section id="adopt" className="py-24 bg-[#111] relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-bold tracking-[0.3em] uppercase mb-4 block">Adopcja</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Zostań Mecenasem <span className="text-amber-400">Ula</span></h2>
            <p className="text-white/50 max-w-xl mx-auto text-lg">Wybierz poziom zaangażowania dostosowany do Twoich możliwości.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PatronageCard
              tier="Opiekun"
              features={[
                "Imienny certyfikat adopcji",
                "Raport kwartalny z życia ula",
                "Wpis na listę darczyńców"
              ]}
              accent="border-white/10 hover:border-emerald-400/50"
            />
            <PatronageCard
              tier="Mecenas"
              features={[
                "3 słoiki miodu premium",
                "Tabliczka na ulu z Twoim imieniem",
                "Dostęp do kamery online"
              ]}
              accent="border-amber-400/30 hover:border-amber-400 ring-1 ring-amber-400/20"
              featured
            />
            <PatronageCard
              tier="Patron Strategiczny"
              features={[
                "Zestaw prezentowy VIP",
                "Osobista wizyta w pasiece",
                "Warsztaty dla firmy"
              ]}
              accent="border-white/10 hover:border-emerald-400/50"
            />
          </div>
        </div>
      </section>

      {/* ─────────── GALLERY ─────────── */}
      <section id="gallery" className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-bold tracking-[0.3em] uppercase mb-4 block">Galeria</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Życie w <span className="text-amber-400">Ulach</span></h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Przeżyj codzienność naszych rodzin pszczelich. Każde zdjęcie opowiada historię harmonii między technologią a naturą.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            <GalleryCard icon={<Cpu />} title="Inteligentny Ul" desc="Zaawansowany ekosystem monitorowany 24/7" />
            <GalleryCard icon={<Bug />} title="Praca Roju" desc="Dokładność i precyzja w każdym plastrze miodu" />
            <GalleryCard icon={<Leaf />} title="Łąki Kwietne" desc="Bioróżnorodność w pełnym rozkwicie" />
            <GalleryCard icon={<BookOpen />} title="Edukacja" desc="Przyszłe pokolenia poznają świat pszczół" />
            <GalleryCard icon={<FlaskConical />} title="Badania" desc="Nauka w służbie bioróżnorodności" />
            <GalleryCard icon={<Hexagon />} title="Złoto Natury" desc="Premium miód z certyfikatem jakości" />
            <GalleryCard icon={<Trees />} title="Pasieka" desc="Harmonia między technologią a naturą" />
            <GalleryCard icon={<Bird />} title="Pszczoły" desc="Życie w harmonii z naturą" />
            <GalleryCard icon={<Wheat />} title="Ule" desc="Zaawansowane technologie w służbie pszczół" />
          </div>
        </div>
      </section>

      {/* ─────────── PROJECTS ─────────── */}
      <section className="py-24 bg-[#111]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-bold tracking-[0.3em] uppercase mb-4 block">Aktualności</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Nasze Najnowsze <span className="text-emerald-400">Projekty</span></h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Poznaj najważniejsze inicjatywy i wydarzenia, które kształtują przyszłość ochrony pszczół i bioróżnorodności.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 hover:border-emerald-400/30 transition-all group">
              <Cpu className="h-12 w-12 text-emerald-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-serif font-bold mb-4">AI w Ochronie Bioróżnorodności</h3>
              <p className="text-white/60 leading-relaxed mb-6">
                Wykorzystujemy algorytmy sztucznej inteligencji do analizowania danych z naszych inteligentnych uli, przewidywania potrzeb roju i optymalizacji warunków życia pszczół.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── CONTACT ─────────── */}
      <section id="kontakt" className="py-24 bg-[#0a0a0a] relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-bold tracking-[0.3em] uppercase mb-4 block">Kontakt</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Jesteśmy tu <span className="text-amber-400">dla Ciebie</span></h2>
            <p className="text-white/50 max-w-xl mx-auto text-lg">
              Masz pytania dotyczące inteligentnych uli lub chcesz wesprzeć naszą misję? Napisz do nas lub odwiedź naszą siedzibę.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <a href="mailto:hello@beehouses.org" className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-amber-400/30 transition-all group">
              <Mail className="h-8 w-8 text-amber-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-2">Napisz do nas</h3>
              <p className="text-white font-medium">hello@beehouses.org</p>
            </a>
            <a href="tel:+48535617829" className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-amber-400/30 transition-all group">
              <Phone className="h-8 w-8 text-amber-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-2">Zadzwoń</h3>
              <p className="text-white font-medium">+48 535 617 829</p>
            </a>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-amber-400/30 transition-all group">
              <MapPin className="h-8 w-8 text-amber-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-2">Odwiedź nas</h3>
              <p className="text-white font-medium">ul. Miodowa 12<br />60-101 Poznań, Polska</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── FOOTER ─────────── */}
      <footer className="bg-[#050505] border-t border-white/5 py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
            {/* Brand */}
            <div className="max-w-sm">
              <div className="flex items-center space-x-3 mb-4">
                <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                <span className="font-serif font-bold text-xl">Bee Houses Foundation</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Projektujemy ekosystemy z taką samą precyzją, z jaką pszczoła buduje swój plaster. Piękno jest w symbiozie.
              </p>
              <div className="mt-6">
                <h4 className="text-amber-400 text-sm font-bold mb-2">Mecenat Natury</h4>
                <p className="text-white/40 text-sm">Wspieraj rozwój dzikich pasiek i laboratoriów bioróżnorodności. Twoja obecność ma znaczenie.</p>
              </div>
            </div>
            {/* Quick Links */}
            <div className="grid grid-cols-3 gap-x-12 gap-y-3 text-sm">
              <div>
                <h4 className="font-bold text-white/80 mb-3 uppercase tracking-wider text-xs">Fundacja</h4>
                <ul className="space-y-2 text-white/40">
                  <li><Link href="#mission" className="hover:text-white transition-colors">O Fundacji</Link></li>
                  <li><Link href="#gallery" className="hover:text-white transition-colors">Nasze Łąki</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Archiwum Botaniczne</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Etyka Pszczela</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white/80 mb-3 uppercase tracking-wider text-xs">Działaj</h4>
                <ul className="space-y-2 text-white/40">
                  <li><Link href="#adopt" className="hover:text-white transition-colors">Adoptuj Ul</Link></li>
                  <li><Link href="/dashboard" className="hover:text-white transition-colors">Programy Edukacyjne</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Sklep Charytatywny</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Raport Roczny</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white/80 mb-3 uppercase tracking-wider text-xs">Kontakt</h4>
                <ul className="space-y-2 text-white/40">
                  <li><Link href="#kontakt" className="hover:text-white transition-colors">Kontakt</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Współpraca Biznesowa</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Wolontariat</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Centrum Prasowe</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-center text-white/30 text-xs">
            <p>© {new Date().getFullYear()} BeeHouses Foundation. Wszelkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─────── COMPONENT HELPERS ─────── */

function PollinatorCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-amber-400/20 transition-all group">
      <h3 className="text-lg font-bold mb-3 group-hover:text-amber-400 transition-colors">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function HistoryCard({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-amber-400/30 transition-all group relative overflow-hidden">
      <div className="text-6xl font-serif font-bold text-white/5 absolute -top-2 -right-2 group-hover:text-amber-400/10 transition-colors">{step}</div>
      <div className="relative z-10">
        <div className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-3">Etap {step}</div>
        <h3 className="text-xl font-serif font-bold mb-4 group-hover:text-amber-400 transition-colors">{title}</h3>
        <p className="text-white/50 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function PatronageCard({ tier, features, accent, featured }: { tier: string; features: string[]; accent: string; featured?: boolean }) {
  return (
    <div className={`bg-white/5 border rounded-3xl p-10 transition-all group relative ${accent} ${featured ? 'scale-105' : ''}`}>
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
          Popularny
        </div>
      )}
      <h3 className="text-2xl font-serif font-bold mb-6 text-center group-hover:text-amber-400 transition-colors">{tier}</h3>
      <ul className="space-y-3 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-start text-white/60 text-sm">
            <Star className="h-4 w-4 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-full font-bold text-sm transition-all ${featured ? 'bg-amber-400 text-black hover:bg-amber-300' : 'border border-white/20 hover:bg-white/5 text-white'}`}>
        Wybieram
      </button>
    </div>
  );
}

function GalleryCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-400/20 transition-all group aspect-square flex flex-col justify-end relative overflow-hidden">
      <div className="absolute top-4 right-4 text-white/10 group-hover:text-amber-400/30 transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-sm mb-1 group-hover:text-amber-400 transition-colors">{title}</h3>
        <p className="text-white/40 text-xs">{desc}</p>
      </div>
    </div>
  );
}
