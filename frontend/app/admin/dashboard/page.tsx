'use client';

import { useEffect, useState } from 'react';
import api from '../../../utils/api';
import ChapterForm from '../../../components/ChapterForm';
import { Pencil, Trash2, Plus, Key, Users as UsersIcon, BookOpen, Award, Shield } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';

import UserForm from '../../../components/UserForm';
import PasswordResetModal from '../../../components/PasswordResetModal';

export default function AdminDashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState<any>(null);
    const [chapters, setChapters] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isUserAdding, setIsUserAdding] = useState(false);
    const [editData, setEditData] = useState<any>(null);

    // Password Reset State
    const [resetUserData, setResetUserData] = useState<any>(null);

    useEffect(() => {
        if (!loading && (!user || user.role !== 'admin')) {
            router.push('/login');
            return;
        }

        if (user?.role === 'admin') {
            fetchData();
        }
    }, [user, loading, router]);

    const fetchData = async () => {
        try {
            const statsRes = await api.get('/dashboard/stats');
            setStats(statsRes.data);

            const chaptersRes = await api.get('/chapters');
            setChapters(chaptersRes.data);

            const usersRes = await api.get('/users');
            setUsers(usersRes.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Czy na pewno chcesz usunąć ten rozdział?')) {
            await api.delete(`/chapters/${id}`);
            fetchData();
        }
    };

    if (loading || !user) return <div className="min-h-screen flex items-center justify-center bg-stone-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div></div>;

    return (
        <div className="space-y-12 pt-32 pb-24 px-6 max-w-7xl mx-auto animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Panel <span className="text-emerald-600">Administratora</span></h1>
                    <p className="text-slate-500 mt-2 text-lg font-light">Zarządzaj pasieką wiedzy i swoimi pszczelarzami.</p>
                </div>
                <div className="flex space-x-3">
                    <div className="bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100 flex items-center text-emerald-700 font-semibold shadow-sm">
                        <Shield className="h-5 w-5 mr-2" />
                        Administrator: {user.firstName}
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard
                        icon={<UsersIcon className="h-8 w-8 text-blue-600" />}
                        label="Użytkownicy"
                        value={stats.totalUsers}
                        gradient="from-blue-500 to-blue-700"
                    />
                    <StatCard
                        icon={<BookOpen className="h-8 w-8 text-amber-600" />}
                        label="Rozdziały"
                        value={stats.totalChapters}
                        gradient="from-amber-500 to-amber-700"
                    />
                    <StatCard
                        icon={<Award className="h-8 w-8 text-emerald-600" />}
                        label="Certyfikaty"
                        value={stats.totalCertificates}
                        gradient="from-emerald-600 to-emerald-800"
                    />
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Users Management Section */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center px-2">
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center">
                            <UsersIcon className="h-6 w-6 mr-3 text-emerald-600" />
                            Zarządzanie Użytkownikami
                        </h2>
                        <button
                            onClick={() => setIsUserAdding(true)}
                            className="bg-slate-900 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl transition-all font-bold flex items-center shadow-lg transform hover:-translate-y-1"
                        >
                            <Plus className="h-5 w-5 mr-2" />
                            Dodaj
                        </button>
                    </div>

                    <div className="bg-white rounded-[2.5rem] shadow-xl border border-stone-100 overflow-hidden">
                        {isUserAdding && (
                            <div className="p-8 bg-emerald-50/50 border-b border-stone-100 animate-slide-down">
                                <UserForm
                                    onSuccess={() => { setIsUserAdding(false); fetchData(); }}
                                    onCancel={() => setIsUserAdding(false)}
                                />
                            </div>
                        )}

                        <div className="divide-y divide-stone-50 max-h-[600px] overflow-y-auto custom-scrollbar">
                            {users.map((u: any) => (
                                <div key={u.id} className="p-6 flex justify-between items-center hover:bg-slate-50 transition-all group">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-lg shadow-inner">
                                            {u.firstName[0]}{u.lastName[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors uppercase tracking-tight">{u.firstName} {u.lastName}</p>
                                            <p className="text-sm text-slate-400 group-hover:text-slate-600 transition-colors">{u.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className={`px-3 py-1 text-[10px] rounded-full font-bold uppercase tracking-widest shadow-sm
                                            ${u.role === 'admin' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                                            {u.role}
                                        </span>
                                        <button
                                            onClick={() => setResetUserData(u)}
                                            className="p-2.5 bg-slate-50 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all shadow-inner group-hover:bg-amber-100/50"
                                            title="Resetuj hasło"
                                        >
                                            <Key className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Chapters Management Section */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center px-2">
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center">
                            <BookOpen className="h-6 w-6 mr-3 text-amber-600" />
                            Zarządzanie Rozdziałami
                        </h2>
                        <button
                            onClick={() => { setEditData(null); setIsEditing(true); }}
                            className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl transition-all font-bold flex items-center shadow-lg transform hover:-translate-y-1"
                        >
                            <Plus className="h-5 w-5 mr-2" />
                            Dodaj Rozdział
                        </button>
                    </div>

                    <div className="bg-white rounded-[2.5rem] shadow-xl border border-stone-100 overflow-hidden">
                        {isEditing && (
                            <div className="p-8 bg-amber-50/50 border-b border-stone-100 animate-slide-down">
                                <ChapterForm
                                    initialData={editData}
                                    onSuccess={() => { setIsEditing(false); fetchData(); }}
                                    onCancel={() => setIsEditing(false)}
                                />
                            </div>
                        )}

                        <div className="divide-y divide-stone-50 max-h-[600px] overflow-y-auto custom-scrollbar">
                            {chapters.map((chapter: any) => (
                                <div key={chapter.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-slate-50 transition-all group">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <span className="bg-amber-100 text-amber-700 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border border-amber-200 shadow-sm">Rozdział {chapter.orderNumber}</span>
                                            <h3 className="font-bold text-slate-800 group-hover:text-amber-700 transition-colors tracking-tight uppercase">{chapter.title}</h3>
                                        </div>
                                        <p className="text-sm text-slate-400 group-hover:text-slate-500 transition-colors line-clamp-1 italic">{chapter.description}</p>
                                    </div>
                                    <div className="flex space-x-3 mt-4 md:mt-0">
                                        <button
                                            onClick={() => { setEditData(chapter); setIsEditing(true); }}
                                            className="p-2.5 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all shadow-inner group-hover:bg-blue-100/50"
                                            title="Edytuj"
                                        >
                                            <Pencil className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(chapter.id)}
                                            className="p-2.5 bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all shadow-inner group-hover:bg-red-100/50"
                                            title="Usuń"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {chapters.length === 0 && (
                                <div className="p-16 text-center text-slate-400">
                                    <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                        <BookOpen className="h-10 w-10 text-slate-200" />
                                    </div>
                                    <p className="font-light italic">Brak rozdziałów w pasiece wiedzy. Dodaj pierwszy!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Password Reset Modal */}
            {resetUserData && (
                <PasswordResetModal
                    userId={resetUserData.id}
                    userName={`${resetUserData.firstName} ${resetUserData.lastName}`}
                    isAdminReset={true}
                    onClose={() => setResetUserData(null)}
                />
            )}
        </div>
    );
}

function StatCard({ icon, label, value, gradient }: { icon: React.ReactNode, label: string, value: string | number, gradient: string }) {
    return (
        <div className="group relative bg-white p-8 rounded-[2.5rem] shadow-xl border border-stone-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-[0.03] rounded-bl-[4rem]`}></div>
            <div className="flex items-center space-x-6">
                <div className={`p-4 bg-gradient-to-br ${gradient} bg-opacity-10 rounded-2xl shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white group-hover:brightness-110">{icon}</div>
                </div>
                <div>
                    <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{label}</h3>
                    <p className="text-4xl font-black text-slate-800 tracking-tight mt-1">{value}</p>
                </div>
            </div>
        </div>
    );
}
