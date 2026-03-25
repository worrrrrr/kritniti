// src/lib/stores/quizStore.js
import { writable } from 'svelte/store';

export const userProgress = writable({
    currentStep: 0,
    history: [], // เก็บ id ของข้อที่เลือก [A, B, D, A, ...]
    scores: {
        Dosa: 0, Raga: 0, Moha: 0, Vitakka: 0,
        Te: 0, Ti: 0, Fe: 0, Fi: 0, Ne: 0, Ni: 0, Se: 0, Si: 0
    }
});