<script lang="ts">
    import { userStatus } from '$lib/user-status.svelte';
    import { fade, fly } from 'svelte/transition';

    // ดึงค่า Top 3 Functions มาแสดงเป็นเครื่องมือที่ใช้
    let topTools = $derived(
        Object.entries(userStatus.cognitiveFn)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
    );
</script>

<div class="max-w-2xl mx-auto space-y-6 pb-20" in:fade>
    <div class="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 text-center shadow-2xl">
        <p class="text-blue-500 font-mono text-[10px] tracking-[0.4em] mb-4 uppercase">Psychological Profile Analysis</p>
        <h1 class="text-8xl font-black text-white tracking-tighter mb-2">{userStatus.currentMBTI}</h1>
        <div class="inline-flex items-center gap-2 px-4 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full">
            <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span class="text-blue-400 font-bold text-xs uppercase tracking-widest">{userStatus.topDriver} DRIVEN</span>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <p class="text-[10px] text-slate-500 uppercase font-bold mb-2">แรงจูงใจภายใน (Core Motivation)</p>
            <h3 class="text-3xl font-bold text-emerald-400 mb-3">Type {userStatus.currentEnneagram}</h3>
            <p class="text-sm text-slate-400 leading-relaxed italic">
                "{userStatus.enneaDescription}"
            </p>
            <div class="mt-4 pt-4 border-t border-slate-800">
                <p class="text-[10px] text-slate-500 uppercase font-bold mb-2">กลไกการเอาตัวรอด</p>
                <p class="text-xs text-slate-300">คุณมักใช้ <span class="text-blue-400">{userStatus.topDriver}</span> เป็นเครื่องมือหลักในการตอบสนองความต้องการของเบื้องลึกจิตใจ</p>
            </div>
        </div>

        <div class="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <p class="text-[10px] text-slate-500 uppercase font-bold mb-4">เครื่องมือทางปัญญา (Primary Tools)</p>
            <div class="space-y-4">
                {#each topTools as [name, value]}
                    <div>
                        <div class="flex justify-between text-[10px] mb-1">
                            <span class="font-bold text-slate-300">{name}</span>
                            <span class="text-slate-600">{value} pts</span>
                        </div>
                        <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div class="h-full bg-blue-600 transition-all duration-1000" style="width: {Math.min(value * 5, 100)}%"></div>
                        </div>
                    </div>
                {/each}
            </div>
            <p class="mt-6 text-[10px] text-slate-500 leading-tight italic">
                *ฟังก์ชันเหล่านี้คือ "เลนส์" ที่คุณใช้ประมวลผลข้อมูลตามแนวทางของ {userStatus.currentMBTI}
            </p>
        </div>
    </div>

    <div class="bg-slate-900 border border-blue-500/20 rounded-3xl p-8 relative overflow-hidden">
        <div class="absolute top-0 right-0 p-4 opacity-10">
            <svg width="64" height="64" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2L4.5 20.29l.71.71L12 18l6.79 3l.71-.71L12 2z"/></svg>
        </div>
        
        <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span class="text-blue-500">◆</span> Coaching Insight
        </h3>
        <p class="text-sm text-slate-300 leading-relaxed mb-6">
            เป้าหมายของระบบนี้ไม่ใช่การบอกว่าคุณคือใคร แต่คือการทำให้คุณรู้เท่าทัน <span class="text-blue-400 font-bold">Driver</span> ของตัวเอง 
            ปัจจุบันคุณกำลังทำงานผ่านโหมด <span class="text-white underline decoration-blue-500">{userStatus.topDriver}</span> เป็นหลัก 
            ซึ่งอาจทำให้คุณติดอยู่ใน "กลไก" เดิมๆ
        </p>
        
        <div class="bg-slate-950/50 rounded-2xl p-4 border border-slate-800">
            <p class="text-[10px] text-blue-500 font-bold uppercase mb-2">คำแนะนำเพื่อความสมดุล (Balance Task)</p>
            <p class="text-xs text-slate-400">
                ลองฝึกใช้ Driver ตัวอื่นที่คะแนนน้อยลงมา เพื่อลดความตึงเครียดของกลไกหลัก และเพิ่มความยืดหยุ่นในการใช้ชีวิต
            </p>
        </div>
    </div>
<div class="mt-4 p-6 bg-slate-800/40 border border-slate-700 rounded-3xl text-left">
    <p class="text-[10px] text-blue-500 font-bold uppercase mb-2 tracking-widest">What is {userStatus.topDriver}?</p>
    
    {#if userStatus.topDriver === 'OBSERVER'}
        <p class="text-xs text-slate-300">
            คุณใช้การ <span class="text-white font-bold">สังเกตและเก็บข้อมูล</span> เป็นเลนส์หลักในการรับรู้โลก เพื่อวิเคราะห์แยกแยะสิ่งต่างๆ ก่อนจะตัดสินใจลงมือทำ
        </p>
    {:else if userStatus.topDriver === 'SEEKER'}
        <p class="text-xs text-slate-300">
            คุณใช้การ <span class="text-white font-bold">แสวงหาความเป็นไปได้</span> เป็นเลนส์หลัก มุ่งเน้นการขุดลึกเพื่อหาความหมายภายในหรือทางเลือกใหม่ๆ ที่น่าตื่นเต้น
        </p>
    {:else if userStatus.topDriver === 'CONTROLLER'}
        <p class="text-xs text-slate-300">
            คุณใช้การ <span class="text-white font-bold">จัดระเบียบและควบคุม</span> เป็นเลนส์หลัก มุ่งเน้นไปที่ผลลัพธ์ การวางโครงสร้าง และการทำให้ทุกอย่างอยู่ในร่องในรอย
        </p>
    {:else if userStatus.topDriver === 'GIVER'}
        <p class="text-xs text-slate-300">
            คุณใช้การ <span class="text-white font-bold">หยิบยื่นและช่วยเหลือ</span> เป็นเลนส์หลัก มุ่งเน้นการตอบสนองความต้องการของผู้อื่นและการรักษาความสัมพันธ์
        </p>
    {:else if userStatus.topDriver === 'INTEGRATOR'}
        <p class="text-xs text-slate-300">
            คุณใช้การ <span class="text-white font-bold">ประสานและสร้างภาพรวม</span> เป็นเลนส์หลัก มุ่งเน้นการเชื่อมโยงข้อมูลที่หลากหลายให้กลายเป็นภาพใหญ่ที่กลมกลืน
        </p>
    {/if}

    <p class="mt-4 text-[9px] text-slate-500 italic border-t border-slate-700/50 pt-2">
        *ข้อควรระวัง: Driver คือ "แรงขับชั่วคราว" ที่คุณถนัดใช้ ไม่ใช่ตัวตนตายตัว เป้าหมายคือการรู้เท่าทันเพื่อรักษาสมดุล
    </p>
</div>
    <div class="text-center pt-8">
        <button 
            onclick={() => location.reload()} 
            class="text-[10px] text-slate-600 hover:text-white uppercase tracking-[0.3em] transition-all hover:letter-spacing-[0.4em]"
        >
            [ Reset Analysis Engine ]
        </button>
    </div>
</div>