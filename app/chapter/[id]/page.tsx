'use client';

import { useEffect, useState, useRef } from 'react';
import api from '../../../utils/api';
import { useAuth } from '../../../context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { Clock, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ChapterView() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const params = useParams(); // This is how params are accessed in a client component
    const [chapter, setChapter] = useState<any>(null);
    const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
    const [timeSpent, setTimeSpent] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [canComplete, setCanComplete] = useState(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const saveIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!loading && !user) router.push('/login');
        if (user && params.id) {
            fetchChapter();
            // Also fetch progress to resume time/status?
            // Basic requirement: Start timer regardless? Or check if completed.
            // Let's check status first.
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (saveIntervalRef.current) clearInterval(saveIntervalRef.current);
        }
    }, [user, loading, params.id]);

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
                // Resume time functionality could be here if we tracked strictly.
                // Requirement: "Po wejściu do rozdziału... Start licznika... Po osiągnięciu 180 sekund... completed = true"
                // If already completed, no timer needed, or optional.
                if (userProg.completed) {
                    setCanComplete(true);
                    setTimeLeft(0);
                } else {
                    // If not completed, we restart timer or calculate diff?
                    // Let's restart timer for simplicity of "spędzenia 3 minut w sesji" or just total accumulated?
                    // Requirement: "Backend validuje czy faktycznie minęło min 180 sek" (Total)
                    // So we should see how much time they ALREADY spent.
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

    const startTimer = () => {
        // Local timer for UI countdown
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

        // Backend sync every 10s
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
            // Verify total time?
            // Backend returns { canComplete, completed }
        } catch (err) {
            console.error('Progress save fail', err);
        }
    };

    const handleComplete = async () => {
        try {
            await api.post('/progress/complete', { chapterId: params.id });
            setCompleted(true);
            // Redirect to dashboard or load next?
            router.push('/dashboard');
        } catch (err) {
            alert('Jeszcze nie minęło wystarczająco dużo czasu lub błąd serwera.');
        }
    };

    if (!chapter) return <div>Ładowanie...</div>;

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pt-32 pb-20 px-6">
            <Link href="/dashboard" className="text-amber-600 hover:text-amber-700 hover:underline font-medium inline-flex items-center">
                &larr; Powrót do kursu
            </Link>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-200">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-slate-900">{chapter.title}</h1>

                    {!completed && (
                        <div className={`flex items-center space-x-2 px-4 py-2 rounded-full font-mono text-lg shadow-sm
                    ${canComplete ? 'bg-green-100 text-green-700 ring-1 ring-green-200' : 'bg-amber-100 text-amber-800 ring-1 ring-amber-200'}`}>
                            <Clock className="h-5 w-5" />
                            <span>{canComplete ? 'Czas minął!' : formatTime(timeLeft)}</span>
                        </div>
                    )}
                    {completed && (
                        <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-full ring-1 ring-green-200">
                            <CheckCircle className="h-5 w-5" />
                            <span>Ukończono</span>
                        </div>
                    )}
                </div>

                {chapter.videoUrl && (
                    <div className="aspect-video bg-slate-900 rounded-xl mb-6 overflow-hidden shadow-md">
                        {/* Simple embed detection or just link */}
                        {chapter.videoUrl.includes('youtube') ? (
                            <iframe
                                src={chapter.videoUrl.replace('watch?v=', 'embed/')}
                                className="w-full h-full"
                                allowFullScreen
                                title="Video"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-white">
                                <a href={chapter.videoUrl} target="_blank" className="underline text-amber-400 hover:text-amber-300">Zobacz video</a>
                            </div>
                        )}
                    </div>
                )}

                <div className="prose prose-slate prose-headings:text-slate-900 max-w-none text-slate-700 mb-8 whitespace-pre-wrap leading-loose">
                    {chapter.content}
                </div>

                <div className="flex justify-end pt-6 border-t border-stone-100">
                    {completed ? (
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-bold transition-colors"
                        >
                            Wróć do listy
                        </button>
                    ) : (
                        <button
                            onClick={handleComplete}
                            disabled={!canComplete}
                            className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-bold transition-all
                        ${canComplete ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-lg transform hover:-translate-y-1' : 'bg-stone-200 text-stone-400 cursor-not-allowed'}`}
                        >
                            <span>Oznacz jako ukończone</span>
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
