'use client';

import { useEffect, useState, useRef } from 'react';
import api from '../../../utils/api';
import { useAuth } from '../../../context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { Clock, CheckCircle, ArrowRight, PlayCircle } from 'lucide-react';
import Link from 'next/link';

export default function ChapterView() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const params = useParams();
    const [chapter, setChapter] = useState<any>(null);
    const [timeLeft, setTimeLeft] = useState(180);
    const [timeSpent, setTimeSpent] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [canComplete, setCanComplete] = useState(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const saveIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const fetchChapter = async () => {
        try {
            const id = params.id;
            const [chRes, progRes] = await Promise.all([
                api.get(`/chapters/${id}`),
                api.get('/progress')
            ]);

            setChapter(chRes.data);

            const userProg = progRes.data.find((p: any) => p.chapterId === parseInt(id as string));
            if (userProg) {
                setCompleted(userProg.completed);
                if (userProg.completed) {
                    setCanComplete(true);
                    setTimeLeft(0);
                } else {
                    setTimeSpent(userProg.timeSpent);
                    const remaining = Math.max(0, 180 - userProg.timeSpent);
                    setTimeLeft(remaining);
                    if (remaining === 0) setCanComplete(true);
                    else startTimer();
                }
            } else {
                startTimer();
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (!loading && !user) router.push('/login');
        if (user && params.id) {
            fetchChapter();
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (saveIntervalRef.current) clearInterval(saveIntervalRef.current);
        }
    }, [user, loading, params.id]);

    const startTimer = () => {
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setCanComplete(true);
                    if (timerRef.current) clearInterval(timerRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        saveIntervalRef.current = setInterval(() => {
            saveProgress(10);
        }, 10000);
    };

    const saveProgress = async (increment: number) => {
        try {
            await api.post('/progress/update', {
                chapterId: params.id,
                timeIncrement: increment
            });
        } catch (err) {
            console.error('Progress save fail', err);
        }
    };

    const handleComplete = async () => {
        try {
            await api.post('/progress/complete', { chapterId: params.id });
            setCompleted(true);
            router.push('/dashboard');
        } catch (err) {
            alert('Jeszcze nie minęło wystarczająco dużo czasu lub błąd serwera.');
        }
    };

    if (!chapter) return (
        <div className="min-h-screen flex items-center justify-center bg-ivory-50">
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 border-4 border-emerald-900 border-t-amber-500 rounded-full animate-spin mb-4"></div>
                <p className="text-emerald-900 font-serif text-lg">Ładowanie rozdziału...</p>
            </div>
        </div>
    );

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-ivory-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-200/10 rounded-full blur-[120px] -ml-20 -mb-20 pointer-events-none"></div>

            <div className="max-w-5xl mx-auto pt-32 pb-24 px-6 relative z-10">
                <div className="mb-10">
                    <Link href="/dashboard" className="group inline-flex items-center text-emerald-800 hover:text-emerald-600 transition-colors font-medium">
                        <span className="w-8 h-8 rounded-full bg-white border border-emerald-100 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform shadow-sm">
                            &larr;
                        </span>
                        Powrót do kursu
                    </Link>
                </div>

                <div className="bg-white rounded-[2rem] shadow-xl border border-ivory-200 overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-emerald-900 text-ivory-50 p-10 md:p-14 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>

                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                                <div className="flex-1">
                                    <span className="inline-block px-4 py-1.5 bg-amber-500/20 text-amber-300 rounded-full text-sm font-bold tracking-wider mb-4 border border-amber-500/30 uppercase">
                                        Rozdział Kursu
                                    </span>
                                    <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-4 text-white">
                                        {chapter.title}
                                    </h1>
                                </div>

                                {/* Timer Card */}
                                <div className={`flex items-center space-x-4 px-6 py-4 rounded-2xl backdrop-blur-md border transition-all duration-500
                                    ${completed
                                        ? 'bg-emerald-800/50 border-emerald-700/50 text-emerald-100'
                                        : canComplete
                                            ? 'bg-emerald-800/80 border-emerald-500 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                                            : 'bg-white/10 border-white/10 text-ivory-200'
                                    }`}>
                                    {completed ? (
                                        <>
                                            <div className="p-2 bg-emerald-500 rounded-full">
                                                <CheckCircle className="h-6 w-6 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-xs uppercase tracking-wider opacity-80">Status</p>
                                                <p className="font-bold text-lg">Ukończono</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className={`p-2 rounded-full ${canComplete ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500/20'}`}>
                                                <Clock className={`h-6 w-6 ${canComplete ? 'text-white' : 'text-amber-400'}`} />
                                            </div>
                                            <div>
                                                <p className="text-xs uppercase tracking-wider opacity-80">Pozostały czas</p>
                                                <p className={`font-mono text-xl font-bold ${canComplete ? 'text-white' : 'text-amber-300'}`}>
                                                    {canComplete ? '0:00' : formatTime(timeLeft)}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 md:p-14">
                        {chapter.videoUrl && (
                            <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-900/5 group">
                                {chapter.videoUrl.includes('youtube') ? (
                                    <div className="aspect-video relative">
                                        <iframe
                                            src={chapter.videoUrl.replace('watch?v=', 'embed/')}
                                            className="w-full h-full"
                                            allowFullScreen
                                            title="Video"
                                        />
                                    </div>
                                ) : (
                                    <div className="aspect-video bg-slate-900 flex items-center justify-center relative overflow-hidden group-hover:bg-slate-800 transition-colors">
                                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579380656108-f98e4df8ea62?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
                                        <a href={chapter.videoUrl} target="_blank" className="relative z-10 flex flex-col items-center group/link">
                                            <PlayCircle className="w-20 h-20 text-white opacity-90 group-hover/link:scale-110 transition-transform duration-300" />
                                            <span className="mt-4 text-white font-medium text-lg border-b border-transparent group-hover/link:border-white transition-all">
                                                Otwórz materiał wideo
                                            </span>
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="prose prose-lg prose-slate max-w-none text-slate-600 mb-12 leading-loose font-light">
                            {/* Simulate Drop Cap for first letter if content exists */}
                            <style jsx global>{`
                                .prose p:first-of-type::first-letter {
                                    font-family: var(--font-playfair-display);
                                    font-size: 3.5rem;
                                    line-height: 1;
                                    float: left;
                                    margin-right: 1rem;
                                    color: #064e3b; /* emerald-900 */
                                    font-weight: 700;
                                }
                            `}</style>
                            {chapter.content}
                        </div>

                        <div className="flex justify-end pt-8 border-t border-ivory-200">
                            {completed ? (
                                <button
                                    onClick={() => router.push('/dashboard')}
                                    className="px-8 py-4 bg-ivory-100 text-emerald-900 rounded-xl hover:bg-ivory-200 font-bold transition-all flex items-center shadow-sm hover:shadow-md"
                                >
                                    Wróć do listy rozdziałów
                                </button>
                            ) : (
                                <button
                                    onClick={handleComplete}
                                    disabled={!canComplete}
                                    className={`group flex items-center space-x-3 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300
                                    ${canComplete
                                            ? 'bg-gradient-to-r from-emerald-800 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-600 shadow-lg hover:shadow-emerald-900/20 hover:-translate-y-1'
                                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                                >
                                    <span>Oznacz jako ukończone</span>
                                    <ArrowRight className={`h-5 w-5 transition-transform ${canComplete ? 'group-hover:translate-x-1' : ''}`} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
