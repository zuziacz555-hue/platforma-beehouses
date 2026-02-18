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
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
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
        <div className="min-h-screen bg-stone-50 pb-20 pt-20">
            {/* Global Navbar is handled by layout.tsx */}

            {/* Hero Header - Updated to Green/Gold Brand Colors */}
            <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-amber-600 text-white pt-24 pb-32 px-6 rounded-b-[4rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300 opacity-10 rounded-full -mr-20 -mt-20 blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400 opacity-10 rounded-full -ml-10 -mb-10 blur-3xl"></div>

                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center relative z-10">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        {/* Logo Container - Simplified to use standard logo path */}
                        <div className="mb-8 bg-white p-6 rounded-3xl shadow-xl animate-scale-in">
                            <img src="/logo.png" alt="BeeHouses Logo" className="h-20 w-auto object-contain" />
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up drop-shadow-md tracking-tight text-white">
                            Cześć, {user.firstName}! 👋
                        </h1>
                        <p className="text-emerald-50 text-xl md:text-2xl max-w-2xl animate-fade-in-up delay-100 font-light leading-relaxed">
                            Witaj w <span className="font-semibold text-yellow-300">BeeHouses</span>. Twoja pasieka czeka na rozwój.
                        </p>
                    </div>

                    {/* Progress Circle Visual */}
                    <div className="mt-12 md:mt-0 flex items-center bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl animate-scale-in hover:bg-white/15 transition-all transform hover:scale-105">
                        <div className="relative w-32 h-32 flex-shrink-0">
                            <svg className="w-full h-full transform -rotate-90 drop-shadow-xl">
                                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-black/10" />
                                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent"
                                    strokeDasharray={364}
                                    strokeDashoffset={364 - (364 * progressPercentage) / 100}
                                    strokeLinecap="round"
                                    className="text-yellow-400 transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-3xl drop-shadow-sm text-white">
                                {Math.round(progressPercentage)}%
                            </span>
                        </div>
                        <div className="ml-8 mr-2 text-left">
                            <div className="text-sm text-emerald-100 uppercase tracking-widest font-bold mb-2">Twój Postęp</div>
                            <div className="text-3xl font-bold tracking-tight text-white">{completedCount} <span className="text-emerald-200 text-xl font-medium">/ {totalChapters}</span></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content - Floating Up */}
            <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">

                {/* Certificate Banner (Conditional) */}
                {allCompleted && (
                    <div className="bg-gradient-to-r from-yellow-100 to-amber-100 border border-amber-200 rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-center justify-between shadow-lg animate-bounce-slow">
                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                            <div className="bg-amber-500 text-white p-3 rounded-full shadow-lg">
                                <Award className="h-8 w-8" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-amber-900">Gratulacje! Ukończyłeś kurs! 🏆</h2>
                                <p className="text-amber-700">Twój imienny certyfikat jest gotowy.</p>
                            </div>
                        </div>
                        <button
                            onClick={generateCertificate}
                            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center"
                        >
                            <Award className="mr-2 h-5 w-5" />
                            Pobierz Certyfikat
                        </button>
                    </div>
                )}

                {/* Chapters Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {chapters.map((chapter, index) => {
                        const status = getChapterStatus(chapter, index);
                        const isLocked = status === 'locked';
                        const isCompleted = status === 'completed';
                        const isActive = status === 'active';

                        return (
                            <div
                                key={chapter.id}
                                className={`
                                    group relative bg-white rounded-3xl overflow-hidden transition-all duration-300
                                    ${isLocked
                                        ? 'opacity-70 grayscale-[0.5]'
                                        : 'hover:shadow-2xl hover:-translate-y-2 cursor-pointer'
                                    }
                                    ${isActive ? 'ring-4 ring-emerald-400/30' : ''}
                                    shadow-sm border border-stone-100
                                `}
                            >
                                <div className="absolute top-6 right-6 z-10">
                                    {isCompleted && <div className="bg-green-100 text-green-700 p-2 rounded-full shadow-sm"><Check className="h-5 w-5" /></div>}
                                    {isLocked && <div className="bg-stone-100 text-stone-500 p-2 rounded-full shadow-sm"><Lock className="h-5 w-5" /></div>}
                                    {isActive && <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full shadow-sm animate-pulse"><Play className="h-5 w-5" /></div>}
                                </div>

                                <div className="p-8 h-full flex flex-col">
                                    <div className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-3">
                                        Rozdział {chapter.orderNumber}
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-emerald-700 transition-colors">
                                        {chapter.title}
                                    </h3>

                                    <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                                        {chapter.description}
                                    </p>

                                    <div className="mt-auto">
                                        {isLocked ? (
                                            <div className="w-full py-4 bg-stone-100 text-stone-400 rounded-2xl text-center font-bold flex items-center justify-center">
                                                <Lock className="w-4 h-4 mr-2" />
                                                Zablokowane
                                            </div>
                                        ) : (
                                            <Link
                                                href={`/chapter/${chapter.id}`}
                                                className={`
                                                    w-full py-4 rounded-2xl font-bold text-lg text-center flex items-center justify-center transition-all
                                                    ${isCompleted
                                                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                                                        : 'bg-slate-900 text-white hover:bg-emerald-600 shadow-xl'
                                                    }
                                                `}
                                            >
                                                {isCompleted ? 'Powtórz Lekcję' : 'Rozpocznij Naukę'}
                                                {!isCompleted && <ArrowRight className="w-5 h-5 ml-2" />}
                                            </Link>
                                        )}
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-stone-50">
                                    <div className={`h-full ${isCompleted ? 'bg-green-500 w-full' : isActive ? 'bg-emerald-500 w-1/3' : 'w-0'}`} />
                                </div>
                            </div>
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
