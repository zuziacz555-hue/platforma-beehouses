'use client';

import { useState } from 'react';
import api from '../utils/api';

interface UserFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export default function UserForm({ onSuccess, onCancel }: UserFormProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/users', {
                firstName,
                lastName,
                email,
                password,
                role
            });
            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create user');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-stone-200">
            <h3 className="text-xl font-bold mb-4 text-slate-800">Dodaj Nowego Użytkownika</h3>

            {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Imię</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Nazwisko</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">Hasło</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">Rola</label>
                    <select
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                    >
                        <option value="user">Użytkownik</option>
                        <option value="admin">Administrator</option>
                    </select>
                </div>

                <div className="flex space-x-2 justify-end pt-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-slate-600 hover:text-slate-800"
                    >
                        Anuluj
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 font-medium"
                    >
                        Dodaj Użytkownika
                    </button>
                </div>
            </form>
        </div>
    );
}
