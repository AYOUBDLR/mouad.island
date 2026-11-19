export interface AccessStep {
  stepNumber: number;
  title: string;
  description: string;
}

export const WATCH_REDIRECT_URL = 'https://trkoffer.net/cl/i/krn218';

export const WATCH_STEPS: AccessStep[] = [
  {
    stepNumber: 1,
    title: 'CLICK WATCH NOW BUTTON',
    description:
      'Press the pink-orange Watch Now button above to initialize active streaming servers.',
  },
  {
    stepNumber: 2,
    title: 'AUTOMATIC STREAM NODE SYNC',
    description:
      'Wait a few seconds while our portal verifies and allocates the fastest stream route.',
  },
  {
    stepNumber: 3,
    title: 'START WATCHING IMMEDIATELY',
    description:
      'Once synced, you are redirected straight to the Love Island Australia stream.',
  },
];
