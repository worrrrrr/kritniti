// src/lib/user-stat.svelte.ts

class UserStat {
    // ใช้ Rune $state ของ Svelte 5
    step = $state(1);
    history = $state<any[]>([]);
    scores = $state({
        Dosa: 0, Raga: 0, Moha: 0, Vitakka: 0,
        Te: 0, Ti: 0, Fe: 0, Fi: 0, Ne: 0, Ni: 0, Se: 0, Si: 0
    });

    addChoice(option: any, currentStep: number) {
        this.history.push({ step: currentStep, ...option });
        
        // คำนวณคะแนนแบบ Inline ไปก่อน จะได้ไม่พังเพราะไฟล์ Engine
        if (option.cf_weight) {
            for (const [key, value] of Object.entries(option.cf_weight)) {
                if (key in this.scores) {
                    (this.scores as any)[key] += value;
                }
            }
        }
        if (option.logic?.drive && option.logic.drive in this.scores) {
            (this.scores as any)[option.logic.drive] += 10;
        }
    }

    reset() {
        this.step = 1;
        this.history = [];
        this.scores = {
            Dosa: 0, Raga: 0, Moha: 0, Vitakka: 0,
            Te: 0, Ti: 0, Fe: 0, Fi: 0, Ne: 0, Ni: 0, Se: 0, Si: 0
        };
    }
}

export const userStat = new UserStat();