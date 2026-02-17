'use client';

import { useState } from 'react';
import api from '../utils/api';
import { Leaf } from 'lucide-react';

interface ChapterFormProps {
    onSuccess: () => void;
    initialData?: any;
    onCancel: () => void;
}

export default function ChapterForm({ onSuccess, initialData, onCancel }: ChapterFormProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || '');
    const [orderNumber, setOrderNumber] = useState(initialData?.orderNumber || 1);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = { title, description, content, videoUrl, orderNumber };

            if (initialData) {
                await api.put(`/chapters/${initialData.id}`, data);
            } else {
                await api.post('/chapters', data);
            }
            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Data save failed');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-stone-200">
            <h3 className="text-xl font-bold mb-4 text-slate-800">
                {initialData ? 'Edytuj Rozdział' : 'Dodaj Nowy Rozdział'}
            </h3>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700">Tytuł</label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">Opis (krótki)</label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">Treść (HTML/Text)</label>
                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-md h-32 focus:ring-2 focus:ring-amber-500 outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">Video URL (opcjonalnie)</label>
                    <input
                        type="text"
                        value={videoUrl}
                        onChange={e => setVideoUrl(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">Numer porządkowy</label>
                    <input
                        type="number"
                        value={orderNumber}
                        onChange={e => setOrderNumber(parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                        required
                    />
                </div>

                <div className="flex space-x-2 justify-end">
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
                        Zapisz
                    </button>
                </div>
            </form>
        </div>
    );
}
