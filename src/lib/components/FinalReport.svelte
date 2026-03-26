<script lang="ts">
    import { userStat } from '$lib/user-stat.svelte.ts';
    import resultData from '$lib/data/full_288.json'; // ดึงฐานข้อมูลดิบมาใช้
    import { fade } from 'svelte/transition';

    const s = userStat.scores;

    // 1. Logic คำนวณหา MBTI + Enneagram (ตามที่คุณตอบ 10 ด่าน)
    const EorI = (s.Te + s.Fe + s.Ne + s.Se) > (s.Ti + s.Fi + s.Ni + s.Si) ? 'E' : 'I';
    const NorS = (s.Ni + s.Ne) > (s.Si + s.Se) ? 'N' : 'S';
    const TorF = (s.Ti + s.Te) > (s.Fi + s.Fe) ? 'T' : 'F';
    const JorP = (s.Te + s.Fe + s.Si + s.Ni) > (s.Ti + s.Fi + s.Se + s.Ne) ? 'J' : 'P';
    
    // หา Enneagram ที่คะแนนสูงที่สุด
    const driveScores = { "1": s.Dosa, "4": s.Raga, "5": s.Moha, "7": s.Vitakka }; // ตัวอย่าง Mapping
    const topEnneagram = Object.entries(driveScores).sort((a, b) => b[1] - a[1])[0][0];

    const typeKey = `${EorI}${NorS}${TorF}${JorP}-${topEnneagram}`; // เช่น INTJ-5
    const detail = resultData[typeKey] || resultData["INTJ-1w2"]; // fallback ถ้าหาไม่เจอ
</script>

<div class="final-report text-white space-y-12" in:fade>
    <section class="text-center py-10 border-b border-gray-800">
        <h1 class="text-6xl font-black tracking-tighter mb-2">{EorI}{NorS}{TorF}{JorP}</h1>
        <p class="text-2xl font-light text-gray-400 uppercase tracking-[0.5em]">ลักษณ์ {topEnneagram}</p>
        <div class="mt-4 px-4 py-1 bg-white text-black inline-block font-bold text-sm">
            {detail.social_mask}
        </div>
    </section>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section class="space-y-4">
            <h3 class="text-xs font-bold uppercase tracking-widest text-gray-500">Vibe & Persona</h3>
            <p class="text-xl leading-relaxed">
                คุณมักจะแสดงออกด้วยท่าทาง <span class="text-white underline">{detail.vibe}</span> 
                และสื่อสารแบบ <span class="text-white underline">{detail.communication}</span>
            </p>
        </section>

        <section class="space-y-4 bg-red-950/20 p-6 border-l-2 border-red-500">
            <h3 class="text-xs font-bold uppercase tracking-widest text-red-500">เมื่อคุณหลุดการควบคุม (Shadow)</h3>
            <p class="text-gray-300 italic">
                "{detail.stress_signal}"
            </p>
            <p class="text-sm text-gray-400 mt-2">
                วิธีที่คุณตอบโต้ยามคับขัน: {detail.conflict_style}
            </p>
        </section>
    </div>

    <section class="py-10 border-t border-gray-800">
        <h3 class="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">ความต้องการที่ลึกที่สุด (The Hidden Core)</h3>
        <p class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
            "{detail.hidden_need}"
        </p>
        <p class="mt-6 text-gray-400 leading-relaxed text-lg">
            {detail.description}
        </p>
    </section>

    <section class="grid grid-cols-2 gap-4">
        <div class="p-4 border border-gray-800">
            <h4 class="text-xs text-green-500 mb-2 uppercase">Strengths</h4>
            <ul class="text-sm space-y-1">
                {#each detail.strengths as s} <li>• {s}</li> {/each}
            </ul>
        </div>
        <div class="p-4 border border-gray-800">
            <h4 class="text-xs text-red-500 mb-2 uppercase">Weaknesses</h4>
            <ul class="text-sm space-y-1">
                {#each detail.weaknesses as w} <li>• {w}</li> {/each}
            </ul>
        </div>
    </section>
</div>