export const trackingGoalTypes = [
    'Track clicks on element',
    'Track element in view',
    'Track form submits',
    'Track element when URL match',
    'Track click on link',
] as const;

export type TrackingGoalType = typeof trackingGoalTypes[number];

export const selectorOptions = [
    'css selector',
    'url matches',
    'url contains',
    'url starts with',
] as const;

export type SelectorOption = typeof selectorOptions[number];
