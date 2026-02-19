import Link from "next/link";
import { BookOpen, Award, Users, ArrowRight, Star } from "lucide-react";

// Final deployment build trigger
export default function Home() {
  return (
    <div className="min-h-screen bg-ivory-50 flex flex-col font-sans text-slate-800">

      {/* Global Navbar is now handled by layout.tsx */}

      <main className="flex-grow">
        {/* Hero Section with Green/Gold Gradient */}
        <div className="relative bg-emerald-900 text-ivory-50 overflow-hidden rounded-b-[4rem] shadow-2xl pb-20">

          {/* Decorative Blobs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full -mr-40 -mt-40 blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full -ml-20 -mb-20 blur-3xl"></div>

          {/* Texture Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>

          <div className="container mx-auto px-6 pt-48 pb-24 relative z-10 flex flex-col items-center text-center">

            {/* Main Logo in Hero */}
            <div className="mb-12 bg-ivory-50/10 backdrop-blur-md p-8 rounded-[3rem] shadow-2xl border border-ivory-50/20 animate-scale-in">
              <img src="/logo.png" alt="BeeHouses Foundation Logo" className="h-32 md:h-48 w-auto object-contain drop-shadow-xl" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight animate-fade-in-up drop-shadow-lg font-serif">
              BeeHouses <span className="text-amber-400 italic">Foundation</span>
            </h1>

            <p className="text-xl md:text-2xl text-ivory-100 max-w-3xl mb-12 leading-relaxed font-light animate-fade-in-up delay-100">
              Twoja droga do mistrzostwa w pszczelarstwie. <br />
              <span className="font-medium text-amber-300 mt-2 block">Edukacja. Ochrona. Przyszłość.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up delay-200">
              <Link
                href="/login"
                className="group px-10 py-5 bg-amber-500 hover:bg-amber-400 text-emerald-950 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-amber-500/40 transform hover:-translate-y-1 flex items-center"
              >
                Rozpocznij Kurs
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#features"
                className="px-10 py-5 bg-transparent border-2 border-ivory-50/30 text-ivory-50 hover:bg-ivory-50/10 rounded-full font-bold text-lg transition-all flex items-center backdrop-blur-sm"
              >
                Dowiedz się więcej
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="container mx-auto px-6 py-32">
          <div className="text-center mb-20">
            <span className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-4 block">Dlaczego My</span>
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-950 mb-6 font-serif">Warto dołączyć do pasieki</h2>
            <div className="flex justify-center items-center gap-2">
              <div className="h-0.5 w-12 bg-amber-400 rounded-full"></div>
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              <div className="h-0.5 w-12 bg-amber-400 rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-amber-700" />}
              title="Wiedza Ekspercka"
              description="Kompleksowe materiały szkoleniowe przygotowane przez mistrzów pszczelarstwa z wieloletnim doświadczeniem."
              delay="0"
            />
            <FeatureCard
              icon={<Award className="h-10 w-10 text-emerald-700" />}
              title="Certyfikacja"
              description="Po ukończeniu kursu otrzymasz imienny, prestiżowy certyfikat potwierdzający Twoje nabyte umiejętności."
              delay="100"
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-blue-700" />}
              title="Społeczność"
              description="Dołącz do elitarnego grona osób, którym zależy na ochronie środowiska i przyszłości pszczół w Polsce."
              delay="200"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-emerald-950 text-ivory-100 py-16 border-t border-emerald-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-900/20 rounded-full -mr-20 -mt-20 blur-3xl"></div>

        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left relative z-10">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-4 mb-4 justify-center md:justify-start">
              <div className="bg-white p-2 rounded-xl">
                <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
              </div>
              <span className="font-serif font-bold text-2xl text-ivory-50">BeeHouses Foundation</span>
            </div>
            <p className="text-emerald-100/60 max-w-sm">
              Fundacja na rzecz rozwoju pszczelarstwa i ochrony bioróżnorodności.
            </p>
          </div>

          <div className="text-sm opacity-60 font-light">
            <p className="mb-2">© {new Date().getFullYear()} BeeHouses Foundation.</p>
            <p>Wszelkie prawa zastrzeżone. Projekt i realizacja z pasją.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: string }) {
  return (
    <div
      className="p-10 rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-ivory-200 bg-white group hover:border-amber-200"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 bg-ivory-50 group-hover:scale-110 transition-transform duration-300 shadow-inner group-hover:bg-amber-50">
        {icon}
      </div>
      <h3 className="text-2xl font-serif font-bold text-emerald-950 mb-4 text-center group-hover:text-amber-700 transition-colors">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-center font-light text-lg">{description}</p>
    </div>
  );
}
