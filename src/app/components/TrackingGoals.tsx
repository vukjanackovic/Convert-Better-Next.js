'use client';

import React, { useState } from 'react';
import {
    trackingGoalTypes,
    selectorOptions,
    TrackingGoalType,
    SelectorOption,
} from '@/constants/tracking';

const cssOnlyGoalTypes: TrackingGoalType[] = [
    'Track clicks on element',
    'Track element in view',
    'Track form submits',
    'Track element when URL match',
];

type TrackingGoal = {
    name: string;
    type: TrackingGoalType;
    selectorType: SelectorOption;
    selectorMatch: string;
};

const TrackingGoals = () => {
    const [goals, setGoals] = useState<TrackingGoal[]>([
        {
            name: '',
            type: 'Track clicks on element',
            selectorType: 'css selector',
            selectorMatch: '',
        },
    ]);

    const handleGoalChange = (
        index: number,
        field: keyof TrackingGoal,
        value: string
    ) => {
        const updatedGoals = [...goals];
        updatedGoals[index][field] = value as any;

        if (field === 'type') {
            const isCssOnly = cssOnlyGoalTypes.includes(value as TrackingGoalType);
            updatedGoals[index].selectorType = isCssOnly ? 'css selector' : 'url matches';
        }

        setGoals(updatedGoals);
    };

    const addGoal = () => {
        setGoals([
            ...goals,
            {
                name: '',
                type: 'Track clicks on element',
                selectorType: 'css selector',
                selectorMatch: '',
            },
        ]);
    };

    const removeGoal = (index: number) => {
        setGoals(goals.filter((_, i) => i !== index));
    };

    return (
        <div className="tracking-goals-repeater">
            <h3>Tracking Goals</h3>
            {goals.map((goal, index) => {
                const isCssOnly = cssOnlyGoalTypes.includes(goal.type);
                const availableSelectorOptions = isCssOnly
                    ? ['css selector'] as SelectorOption[]
                    : selectorOptions;

                return (
                    <div key={index} className="tracking-goal-form border p-4 mb-4 rounded">
                        <div>
                            <label>Tracking Goal Name:</label>
                            <input
                                type="text"
                                value={goal.name}
                                onChange={(e) => handleGoalChange(index, 'name', e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Tracking Goal Type:</label>
                            <select
                                value={goal.type}
                                onChange={(e) => handleGoalChange(index, 'type', e.target.value)}
                            >
                                {trackingGoalTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Selector Type:</label>
                            <select
                                value={goal.selectorType}
                                onChange={(e) => handleGoalChange(index, 'selectorType', e.target.value)}
                            >
                                {availableSelectorOptions.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Selector Match:</label>
                            <input
                                type="text"
                                value={goal.selectorMatch}
                                onChange={(e) => handleGoalChange(index, 'selectorMatch', e.target.value)}
                            />
                        </div>

                        {goals.length > 1 && (
                            <button type="button" onClick={() => removeGoal(index)}>
                                Remove Goal
                            </button>
                        )}
                    </div>
                );
            })}

            <button type="button" onClick={addGoal}>
                + Add Tracking Goal
            </button>
        </div>
    );
};

export default TrackingGoals;
