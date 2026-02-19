'use client';

import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Play, Check, Award, Clock } from 'lucide-react';

export default function UserDashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [chapters, setChapters] = useState<any[]>([]);
    const [progress, setProgress] = useState<any[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    const fetchData = async () => {
        try {
            const [chaptersRes, progressRes] = await Promise.all([
                api.get('/chapters'),
                api.get('/progress')
            ]);

            const sortedChapters = chaptersRes.data.sort((a: any, b: any) => a.orderNumber - b.orderNumber);
            setChapters(sortedChapters);
            setProgress(progressRes.data);
            setLoadingData(false);
        } catch (err) {
            console.error(err);
            setLoadingData(false);
        }
    };

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
        if (user) {
            fetchData();
        }
    }, [user, loading, router]);

    const getChapterStatus = (chapter: any, index: number) => {
        const userProg = progress.find((p: any) => p.chapterId === chapter.id);
        if (userProg?.completed) return 'completed';

        if (index === 0) return 'active';
        const prevChapter = chapters[index - 1];
        const prevProg = progress.find((p: any) => p.chapterId === prevChapter.id);

        if (prevProg?.completed) return 'active';

        return 'locked';
    };

    const generateCertificate = async () => {
        try {
            await api.post('/certificates/generate');
            alert('Certyfikat wygenerowany! Rozpoczynanie pobierania...');

            const response = await api.get('/certificates/download', {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Certyfikat_BeeHouses.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err: any) {
            console.error(err);
            const msg = err.response?.data?.message || err.message || 'Błąd pobierania certyfikatu';
            alert(`Błąd: ${msg}`);
        }
    }

    if (loading || loadingData || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-ivory-50">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 border-4 border-emerald-900 border-t-amber-500 rounded-full animate-spin mb-4"></div>
                    <p className="text-emerald-900 font-serif text-lg">Ładowanie...</p>
                </div>
            </div>
        );
    }

    const completedCount = chapters.filter(ch => {
        const p = progress.find((prog: any) => prog.chapterId === ch.id);
        return p?.completed;
    }).length;

    const totalChapters = chapters.length;
    const progressPercentage = totalChapters > 0 ? (completedCount / totalChapters) * 100 : 0;
    const allCompleted = totalChapters > 0 && completedCount === totalChapters;

    return (
        <div className="min-h-screen bg-ivory-50 pb-20 pt-20 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-200/20 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-200/10 rounded-full blur-[120px] -ml-20 -mb-20 pointer-events-none"></div>


            {/* Global Navbar is handled by layout.tsx */}

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Hero Header */}
                <div className="bg-emerald-900 text-ivory-50 rounded-[3rem] shadow-2xl relative overflow-hidden mb-16 p-10 md:p-16">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full -ml-10 -mb-10 blur-3xl"></div>

                    <div className="flex flex-col md:flex-row justify-between items-center relative z-10">
                        <div className="flex flex-col items-center md:items-start text-center md:text-left mb-10 md:mb-0">
                            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tight">
                                Witaj, {user.firstName}!
                            </h1>
                            <p className="text-emerald-100/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
                                Kontynuuj swoją podróż po świecie pszczelarstwa z <span className="text-amber-300 font-medium">BeeHouses</span>.
                            </p>
                        </div>

                        {/* Progress Circle Visual */}
                        <div className="flex items-center bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-lg">
                            <div className="relative w-24 h-24 flex-shrink-0">
                                <svg className="w-full h-full transform -rotate-90 drop-shadow-lg">
                                    <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-black/20" />
                                    <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="transparent"
                                        strokeDasharray={264}
                                        strokeDashoffset={264 - (264 * progressPercentage) / 100}
                                        strokeLinecap="round"
                                        className="text-amber-400 transition-all duration-1000 ease-out"
                                    />
                                </svg>
                                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-xl text-white">
                                    {Math.round(progressPercentage)}%
                                </span>
                            </div>
                            <div className="ml-6 mr-2 text-left">
                                <div className="text-xs text-emerald-200 uppercase tracking-widest font-bold mb-1">Twój Postęp</div>
                                <div className="text-2xl font-bold tracking-tight text-white">{completedCount} <span className="text-emerald-400/60 text-lg font-medium">/ {totalChapters}</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Certificate Banner (Conditional) */}
                {allCompleted && (
                    <div className="bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 border border-amber-200 rounded-3xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between shadow-lg animate-fade-in-up">
                        <div className="flex items-center space-x-6 mb-6 md:mb-0">
                            <div className="bg-amber-500 text-white p-4 rounded-full shadow-lg shadow-amber-500/30">
                                <Award className="h-10 w-10" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-amber-900 mb-2">Gratulacje! Ukończyłeś kurs! 🏆</h2>
                                <p className="text-amber-800/80">Twój imienny certyfikat mistrza pszczelarstwa jest gotowy do pobrania.</p>
                            </div>
                        </div>
                        <button
                            onClick={generateCertificate}
                            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl font-bold shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center group"
                        >
                            <Award className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                            Pobierz Certyfikat
                        </button>
                    </div>
                )}

                {/* Chapters Grid */}
                <h2 className="text-3xl font-serif font-bold text-emerald-900 mb-8 pl-4 border-l-4 border-amber-500">
                    Twoje Lekcje
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {chapters.map((chapter, index) => {
                        const status = getChapterStatus(chapter, index);
                        const isLocked = status === 'locked';
                        const isCompleted = status === 'completed';
                        const isActive = status === 'active';

                        return (
                            <Link
                                key={chapter.id}
                                href={isLocked ? '#' : `/chapter/${chapter.id}`}
                                className={`
                                    group relative bg-white rounded-[2rem] overflow-hidden transition-all duration-500 flex flex-col
                                    ${isLocked
                                        ? 'opacity-60 grayscale-[0.5] cursor-not-allowed bg-ivory-100'
                                        : 'hover:shadow-2xl hover:-translate-y-2 cursor-pointer shadow-md'
                                    }
                                    ${isActive ? 'ring-2 ring-amber-400 ring-offset-4 ring-offset-ivory-50' : ''}
                                `}
                            >
                                <div className="p-8 flex-grow flex flex-col relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="text-xs font-bold tracking-widest uppercase text-emerald-900/40 bg-emerald-900/5 px-3 py-1 rounded-full">
                                            Rozdział {chapter.orderNumber}
                                        </div>
                                        <div className="flex-shrink-0">
                                            {isCompleted && <div className="bg-emerald-100 text-emerald-700 p-2 rounded-full shadow-sm"><Check className="h-5 w-5" /></div>}
                                            {isLocked && <div className="bg-stone-200 text-stone-500 p-2 rounded-full shadow-sm"><Lock className="h-5 w-5" /></div>}
                                            {isActive && <div className="bg-amber-100 text-amber-600 p-2 rounded-full shadow-sm animate-pulse"><Play className="h-5 w-5" /></div>}
                                        </div>
                                    </div>

                                    <h3 className={`text-2xl font-serif font-bold mb-4 leading-tight group-hover:text-emerald-800 transition-colors ${isLocked ? 'text-slate-500' : 'text-slate-800'}`}>
                                        {chapter.title}
                                    </h3>

                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6">
                                        {chapter.description}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-stone-100 flex items-center justify-between">
                                        <span className={`text-sm font-bold flex items-center ${isCompleted ? 'text-emerald-600' : isActive ? 'text-amber-600' : 'text-stone-400'}`}>
                                            {isCompleted ? 'Ukończono' : isActive ? 'Kontynuuj' : 'Zablokowane'}
                                        </span>
                                        {!isLocked && <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'group-hover:translate-x-2 text-amber-600' : 'text-emerald-600'}`} />}
                                    </div>
                                </div>

                                {/* Decorative gradient at bottom */}
                                <div className={`h-2 w-full mt-auto ${isCompleted ? 'bg-emerald-500' : isActive ? 'bg-amber-400' : 'bg-stone-200'}`}></div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function ArrowRight(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
    );
}
