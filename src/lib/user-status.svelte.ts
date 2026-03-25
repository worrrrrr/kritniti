// src/lib/user-status.svelte.ts
class UserStatus {
    drivers = $state({ observer: 0, seeker: 0, controller: 0, giver: 0, integrator: 0 });
    mbtiPoints = $state({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
    enneaVotes = $state({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 });

    // ผลสรุป Cognitive Functions (คำนวณจากแต้ม MBTI)
    cognitiveFn = $derived.by(() => {
        const p = this.mbtiPoints;
        return {
            Te: p.T + p.E + p.J, Ti: p.T + p.I + p.P,
            Fe: p.F + p.E + p.J, Fi: p.F + p.I + p.P,
            Ne: p.N + p.E + p.P, Ni: p.N + p.I + p.J,
            Se: p.S + p.E + p.P, Si: p.S + p.I + p.J
        };
    });

    // สรุป Enneagram
    currentEnneagram = $derived.by(() => {
        const votes = Object.entries(this.enneaVotes);
        const top = votes.sort((a, b) => b[1] - a[1])[0];
        return top[1] > 0 ? Number(top[0]) : 0;
    });

    // คำอธิบาย Enneagram (สำหรับโชว์ตอนจบ)
    enneaDescription = $derived.by(() => {
        const des: Record<number, string> = {
            1: "The Reformer: เน้นความสมบูรณ์แบบ ระเบียบวินัย และความถูกต้อง",
            2: "The Helper: เน้นการช่วยเหลือ การให้ และความสัมพันธ์",
            3: "The Achiever: เน้นความสำเร็จ ภาพลักษณ์ และเป้าหมาย",
            4: "The Individualist: เน้นเอกลักษณ์ อารมณ์ และความคิดสร้างสรรค์",
            5: "The Investigator: เน้นการวิเคราะห์ ข้อมูล และความเป็นส่วนตัว",
            6: "The Loyalist: เน้นความปลอดภัย ความรอบคอบ และความรับผิดชอบ",
            7: "The Enthusiast: เน้นความสนุก ประสบการณ์ใหม่ และอิสระ",
            8: "The Challenger: เน้นอำนาจ การปกป้อง และความตรงไปตรงมา",
            9: "The Peacemaker: เน้นความสงบ การประนีประนอม และความกลมกลืน"
        };
        return des[this.currentEnneagram] || "กำลังวิเคราะห์ข้อมูล...";
    });

    currentMBTI = $derived.by(() => {
        const p = this.mbtiPoints;
        const getChar = (v1: number, v2: number, c1: string, c2: string) => 
            (v1 === 0 && v2 === 0) ? 'X' : (v1 >= v2 ? c1 : c2);
        return getChar(p.I, p.E, 'I', 'E') + getChar(p.N, p.S, 'N', 'S') + 
               getChar(p.T, p.F, 'T', 'F') + getChar(p.J, p.P, 'J', 'P');
    });

    topDriver = $derived.by(() => {
        const entries = Object.entries(this.drivers);
        const top = entries.sort((a, b) => b[1] - a[1])[0];
        return top[1] > 0 ? top[0].toUpperCase() : "NONE";
    });
}
export const userStatus = new UserStatus();