'use client';

import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';

interface Variation {
    name: string;
    trafficSplit: number;
    htmlSelector: string;
    html: string;
    js: string;
    css: string;
}

interface VariationsProps {
    onChange?: (variations: Variation[]) => void;
}

export default function Variations({ onChange }: VariationsProps) {
    const [variations, setVariations] = useState<Variation[]>([]);

    const totalSplit = variations.reduce((sum, v) => sum + v.trafficSplit, 0);
    const controlPercentage = Math.max(0, 100 - totalSplit);

    const updateVariations = (newVars: Variation[]) => {
        setVariations(newVars);
        onChange?.(newVars);
    };

    const addVariation = () => {
        updateVariations([
            ...variations,
            {
                name: '',
                trafficSplit: 0,
                htmlSelector: '',
                html: '',
                js: '',
                css: '',
            },
        ]);
    };

    const removeVariation = (index: number) => {
        const newVars = [...variations];
        newVars.splice(index, 1);
        updateVariations(newVars);
    };

    const updateField = (index: number, field: keyof Variation, value: any) => {
        const newVars = [...variations];

        if (field === 'trafficSplit') {
            const newSplit = Math.max(0, Math.min(100, Number(value)));
            const currentTotal = variations.reduce(
                (sum, v, i) => sum + (i === index ? 0 : v.trafficSplit),
                0
            );
            const allowedSplit = Math.max(0, 100 - currentTotal);
            newVars[index][field] = Math.min(newSplit, allowedSplit);
        } else {
            newVars[index][field] = value;
        }

        updateVariations(newVars);
    };

    return (
        <div className="border rounded p-4 space-y-4">
            <h2 className="text-xl font-semibold mb-2">Variations</h2>

            <div className="mb-4">
                <label className="block font-medium">Control Percentage (Read-only)</label>
                <input
                    type="number"
                    readOnly
                    value={controlPercentage}
                    className="w-full border p-2 rounded bg-gray-100 text-gray-700"
                />
            </div>

            {variations.map((variation, i) => (
                <div key={i} className="border p-4 rounded relative bg-gray-50">
                    <div className="flex justify-between mb-2 items-center">
                        <strong>Variation v{i + 1}</strong>
                        <button
                            type="button"
                            onClick={() => removeVariation(i)}
                            className="px-2 py-1 bg-red-500 text-white rounded"
                            title="Remove"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block font-medium">Variation Name</label>
                            <input
                                type="text"
                                value={variation.name}
                                onChange={(e) => updateField(i, 'name', e.target.value)}
                                className="w-full border p-2 rounded"
                                placeholder="Variation A"
                            />
                        </div>

                        <div>
                            <label className="block font-medium">
                                Traffic Split (%) – max {100 - variations.reduce((sum, v, idx) => idx !== i ? sum + v.trafficSplit : sum, 0)}%
                            </label>
                            <input
                                type="number"
                                min={0}
                                max={100}
                                value={variation.trafficSplit}
                                onChange={(e) => updateField(i, 'trafficSplit', e.target.value)}
                                className="w-full border p-2 rounded"
                                placeholder="0 - 100"
                            />
                        </div>

                        <div>
                            <label className="block font-medium">HTML Selector</label>
                            <input
                                type="text"
                                value={variation.htmlSelector}
                                onChange={(e) => updateField(i, 'htmlSelector', e.target.value)}
                                className="w-full border p-2 rounded"
                                placeholder=".my-button"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">HTML</label>
                            <CodeMirror
                                value={variation.html}
                                extensions={[html()]}
                                onChange={(value) => updateField(i, 'html', value)}
                                height="150px"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">JS</label>
                            <CodeMirror
                                value={variation.js}
                                extensions={[javascript()]}
                                onChange={(value) => updateField(i, 'js', value)}
                                height="150px"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">CSS</label>
                            <CodeMirror
                                value={variation.css}
                                extensions={[css()]}
                                onChange={(value) => updateField(i, 'css', value)}
                                height="150px"
                            />
                        </div>
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={addVariation}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                + Add Variation
            </button>
        </div>
    );
}
