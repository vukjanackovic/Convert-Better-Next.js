'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const res = await fetch('/api/tests');
                const data = await res.json();
                setTests(data);
            } catch (error) {
                console.error('Failed to load tests', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTests();
    }, []);

    return (
        <main className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">A/B Test Dashboard</h1>

            {loading ? (
                <p>Loading tests...</p>
            ) : (
                <ul className="space-y-4">
                    {tests.map((test: any) => (
                        <li key={test.id} className="border p-4 rounded shadow">
                            <p><strong>ID:</strong> {test.testId}</p>
                            <p><strong>Name:</strong> {test.name}</p>
                            <p><strong>URL:</strong> {test.url}</p>
                            <p><strong>End Date:</strong> {new Date(test.endDate).toLocaleDateString()}</p>
                            <p><strong>Status:</strong> {test.status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
