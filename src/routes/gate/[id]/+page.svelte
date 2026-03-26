<script lang="ts">
    import { page } from '$app/state'; // Svelte 5 ใช้ state แทน stores
    import { userStat } from '$lib/user-stat.svelte.ts';
    import { calculateMirror } from '$lib/logic/engine.js';
    import gates from '$lib/data/gates.json';
    import { fade, fly } from 'svelte/transition';
    import { goto } from '$app/navigation';
    
    // นำเข้า Component สรุปผล
    import FinalReport from '$lib/components/FinalReport.svelte';

    // ดึงค่า ID และข้อมูลด่านปัจจุบัน
    let id = $derived(parseInt(page.params.id));
    let currentGate = $derived(gates.find(g => g.gate === id));

    // สถานะการแสดงผล
    let isThinking = $state(false);
    let showMirror = $state(false);
    let isFinalStep = $derived(id > 10); // ถ้า ID เกิน 10 ถือว่าจบแล้ว
    let reflection = $state({ title: '', content: '', subContent: '', delay: 2000 });

    async function handleSelect(option: any) {
        // 1. คำนวณคำสะท้อนจากกระจกเงา
        const res = calculateMirror(option, userStat.history, id);
        reflection = res;
        
        // 2. บันทึกทางเลือกและคะแนนลงในระบบกลาง
        userStat.addChoice(option, id);
        
        // 3. เข้าสู่ "พื้นที่ว่าง" (The Gap) เพื่อให้จิตใจได้หยุดพัก
        isThinking = true;
        showMirror = false;
        
        await new Promise(r => setTimeout(r, res.delay));
        
        isThinking = false;
        showMirror = true;
    }

    function nextStep() {
        showMirror = false;
        const nextId = id + 1;
        
        // เดินหน้าไปด่านถัดไป หรือถ้าครบแล้ว URL จะเปลี่ยนเป็น /gate/11 (ซึ่งจะแสดง FinalReport)
        goto(`/gate/${nextId}`);
    }
</script>

<main class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-2xl mx-auto">
        
        {#if isFinalStep}
            <div in:fade>
                <FinalReport />
            </div>

        {:else if isThinking}
            <div class="flex flex-col items-center justify-center py-20" transition:fade>
                <div class="w-10 h-10 border-2 border-t-white border-gray-800 rounded-full animate-spin mb-4"></div>
                <p class="text-white font-light tracking-[0.3em] text-xs uppercase animate-pulse">
                    พิจารณาพิกัดจิต...
                </p>
            </div>

        {:else if showMirror}
            <div class="bg-white p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)]" in:fly={{ y: 20 }}>
                <header class="flex justify-between items-center mb-6">
                    <span class="text-[10px] tracking-widest uppercase text-gray-400">Reflection Gate {id}</span>
                </header>
                
                <h2 class="text-2xl font-bold mb-4 text-black">{reflection.title}</h2>
                <p class="text-lg text-gray-800 leading-relaxed mb-8">{reflection.content}</p>
                
                {#if reflection.subContent}
                    <div class="bg-gray-100 p-4 mb-8 border-l-4 border-black italic text-sm text-gray-600">
                        {reflection.subContent}
                    </div>
                {/if}

                <button 
                    onclick={nextStep} 
                    class="w-full py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-gray-800 transition-all"
                >
                    {id === 10 ? "อ่านบทสรุปสุดท้าย" : "ก้าวข้ามด่านถัดไป"}
                </button>
            </div>

        {:else if currentGate}
            <div in:fade>
                <div class="mb-10 text-center">
                    <h1 class="text-4xl font-black text-white uppercase tracking-tighter mb-4">GATE {id}</h1>
                    <p class="text-xl text-gray-400 italic">"{currentGate.scenario}"</p>
                </div>
                
                <div class="grid gap-4">
                    {#each currentGate.options as option}
                        <button 
                            onclick={() => handleSelect(option)}
                            class="p-5 text-left border border-gray-700 text-gray-300 hover:border-white hover:text-white transition-all duration-300 bg-transparent hover:bg-white/5 group"
                        >
                            <span class="text-lg">{option.text}</span>
                        </button>
                    {/each}
                </div>
            </div>
        {/if}

    </div>
</main>