import Link from "next/link";
import { BookOpen, Award, Users, ArrowRight } from "lucide-react";

// Final deployment build trigger
export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans text-slate-900">

      {/* Global Navbar is now handled by layout.tsx */}

      <main className="flex-grow">
        {/* Hero Section with Green/Gold Gradient */}
        <div className="relative bg-gradient-to-br from-emerald-800 via-emerald-600 to-amber-500 text-white overflow-hidden rounded-b-[4rem] shadow-2xl">

          {/* Decorative Blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 opacity-20 rounded-full -mr-20 -mt-20 blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400 opacity-20 rounded-full -ml-10 -mb-10 blur-3xl"></div>

          <div className="container mx-auto px-6 pt-56 pb-32 relative z-10 flex flex-col items-center text-center">

            {/* Main Logo in Hero - Now using standard /logo.png */}
            <div className="mb-10 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-white/30 animate-scale-in">
              <img src="/logo.png" alt="BeeHouses Foundation Logo" className="h-32 md:h-40 w-auto object-contain" />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight animate-fade-in-up drop-shadow-lg">
              BeeHouses <span className="text-yellow-300">Foundation</span>
            </h1>

            <p className="text-xl md:text-2xl text-emerald-50 max-w-2xl mb-10 leading-relaxed font-light animate-fade-in-up delay-100">
              Twoja droga do mistrzostwa w pszczelarstwie. <br />
              <span className="font-medium text-yellow-200">Edukacja. Ochrona. Przyszłość.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-5 animate-fade-in-up delay-200">
              <Link
                href="/login"
                className="group px-8 py-4 bg-amber-500 hover:bg-amber-400 text-emerald-900 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-amber-500/40 transform hover:-translate-y-1 flex items-center"
              >
                Rozpocznij Kurs
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Dlaczego warto dołączyć?</h2>
            <div className="h-1 w-24 bg-amber-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-amber-600" />}
              title="Wiedza Ekspercka"
              description="Kompleksowe materiały szkoleniowe przygotowane przez mistrzów pszczelarstwa."
              color="bg-amber-50"
              borderColor="border-amber-100"
            />
            <FeatureCard
              icon={<Award className="h-10 w-10 text-emerald-600" />}
              title="Certyfikacja"
              description="Po ukończeniu kursu otrzymasz imienny certyfikat potwierdzający Twoje umiejętności."
              color="bg-emerald-50"
              borderColor="border-emerald-100"
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-blue-600" />}
              title="Społeczność"
              description="Dołącz do grona osób, którym zależy na ochronie środowiska i przyszłości pszczół."
              color="bg-blue-50"
              borderColor="border-blue-100"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-emerald-900 text-emerald-100 py-12 border-t border-emerald-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="flex items-center space-x-3 mb-6 md:mb-0 bg-white/5 p-3 rounded-2xl">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto brightness-200 grayscale" />
            <span className="font-bold text-xl">BeeHouses Foundation</span>
          </div>
          <p className="text-sm opacity-60">© {new Date().getFullYear()} BeeHouses Foundation. Wszelkie prawa zastrzeżone.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, color, borderColor }: { icon: React.ReactNode, title: string, description: string, color: string, borderColor: string }) {
  return (
    <div className={`p-8 rounded-3xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border ${borderColor} bg-white group`}>
      <div className={`${color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-3 text-center">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-center">{description}</p>
    </div>
  );
}
