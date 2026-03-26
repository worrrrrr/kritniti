export function updateScores(currentScores, cfWeight, logic) {
    const newScores = { ...currentScores };

    // 1. อัปเดต Cognitive Function (Te, Ni, etc.)
    if (cfWeight) {
        Object.entries(cfWeight).forEach(([key, value]) => {
            if (key in newScores) newScores[key] += value;
        });
    }

    // 2. อัปเดต Drive (Dosa, Raga, etc.)
    if (logic && logic.drive) {
        if (logic.drive in newScores) newScores[logic.drive] += 10;
    }

    return newScores;
}

export function calculateMirror(option, history, currentStep) {
    let extraReflection = "";

    // ดักพิรุธ: เคยบู๊ (Dosa) แล้วอยู่ๆ มาเงียบ (Moha) ในด่านท้ายๆ
    if (currentStep > 5) {
        const wasAggressive = history.filter(h => h.logic?.drive === 'Dosa').length >= 3;
        if (wasAggressive && option.logic?.drive === 'Moha') {
            extraReflection = "กลิ่นอายนักรบหายไปไหน? หรือความจริงตรงหน้ามันหนักจนคุณต้องแกล้งตายเพื่อเอาตัวรอด?";
        }
    }

    return {
        title: option.mirror.title,
        content: option.mirror.content,
        subContent: extraReflection,
        // ยิ่งด่านลึก ยิ่ง Delay นาน (สร้างพื้นที่ว่าง)
        delay: 2000 + (currentStep * 400) 
    };
}