'use client';

import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addWeeks } from 'date-fns';
import Variations from '@/app/components/Variations';
import TrackingGoals from "@/app/components/TrackingGoals";

export default function PublishingPage() {
    const [testName, setTestName] = useState('');
    const [url, setUrl] = useState('');
    const [analyticsId, setAnalyticsId] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(addWeeks(new Date(), 2));
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [variations, setVariations] = useState([]);
    const [testId, setTestId] = useState('');

    useEffect(() => {
        const id = 'BC-' + new Date().getTime();
        setTestId(id);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const res = await fetch('/api/tests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    testId,
                    testName,
                    url,
                    analyticsId,
                    startDate,
                    endDate,
                    status: 'published',
                    variations,
                    trackingGoals: [], // add empty array or import/use actual data
                }),
            });

            if (!res.ok) throw new Error('Failed to submit');

            setStatus('success');
            setTestName('');
            setUrl('');
            setAnalyticsId('');
            setStartDate(new Date());
            setEndDate(addWeeks(new Date(), 2));
        } catch (error) {
            console.error('Error submitting test:', error);
            setStatus('error');
        }
    };

    return (
        <main className="max-w-xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Create A/B Test</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Test ID</label>
                    <input
                        type="text"
                        className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-700"
                        value={testId}
                        readOnly
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Test Name</label>
                    <input
                        type="text"
                        className="w-full border px-3 py-2 rounded"
                        value={testName}
                        onChange={(e) => setTestName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">URL</label>
                    <input
                        type="url"
                        className="w-full border px-3 py-2 rounded"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Analytics ID</label>
                    <input
                        type="text"
                        className="w-full border px-3 py-2 rounded"
                        value={analyticsId}
                        onChange={(e) => setAnalyticsId(e.target.value)}
                        placeholder="G-XXXXXXXXXX"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Start Date</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => date && setStartDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="Pp"
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">End Date</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => date && setEndDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="Pp"
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <Variations onChange={setVariations} />
                <TrackingGoals />

                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    {status === 'submitting' ? 'Publishing...' : 'Publish Test'}
                </button>

                {status === 'success' && <p className="text-green-600">Test published successfully!</p>}
                {status === 'error' && <p className="text-red-600">Error publishing test. Try again.</p>}
            </form>
        </main>
    );
}