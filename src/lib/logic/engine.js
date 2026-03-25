// src/lib/logic/engine.js

export function calculateMirror(currentOption, history, currentStep) {
    let extraReflection = "";
    
    // 1. ตรวจสอบ "ความย้อนแย้ง" (Inconsistency Detection)
    if (currentStep > 3) {
        const pastDosa = history.filter(h => h.logic.drive === 'Dosa').length;
        
        // ถ้าเคยรุก (Dosa) มาตลอด แต่จู่ๆ มาแกล้งตาย (Moha/D)
        if (pastDosa >= 2 && currentOption.logic.drive === 'Moha') {
            extraReflection = "น่าสนใจ... นักรบผู้เกรี้ยวกราดในฉากก่อนๆ หายไปไหน? หรือนี่คือการแกล้งตายเพื่อหนีความอับอายกันแน่?";
        }
    }

    // 2. ตรวจสอบ "อาการย้ำคิดย้ำทำ" (Pattern Fixation)
    const sameAnswerCount = history.filter(h => h.id === currentOption.id).length;
    if (sameAnswerCount >= 3) {
        extraReflection = `คุณใช้หน้ากาก ${currentOption.id} มา ${sameAnswerCount + 1} ครั้งแล้วนะ... คุณติดคุกที่ตัวเองสร้างไว้จนขยับตัวไม่ได้แล้วหรือเปล่า?`;
    }

    return {
        title: currentOption.mirror.title,
        mainContent: currentOption.mirror.content,
        subContent: extraReflection,
        delay: 3000 + (currentStep * 200) // ยิ่งด่านลึก ยิ่งดีเลย์นานขึ้นเพื่อสร้าง Pressure
    };
}