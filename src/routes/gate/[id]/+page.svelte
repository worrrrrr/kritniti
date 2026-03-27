<script lang="ts">
    import { page } from '$app/state';
    import { userStat } from '$lib/user-stat.svelte.ts';
    import gates from '$lib/data/gates.json';
    import { fade, fly } from 'svelte/transition';
    import { goto } from '$app/navigation';
    import FinalReport from '$lib/components/FinalReport.svelte';

    let id = $derived(parseInt(page.params.id));
    let currentGate = $derived(gates.find(g => g.gate === id));

    let isThinking = $state(false);
    let showMirror = $state(false);
    let isFinalStep = $derived(id > 10);
    let reflection = $state({ title: '', content: '' });

    async function handleSelect(option: any) {
        // ใช้ mirror.title เป็นหัวข้อเสมอ
        // ใช้ reflection string (ถ้ามี) เป็นเนื้อหา ถ้าไม่มีให้ใช้ mirror.content
        reflection = {
            title: option.mirror.title,
            content: option.reflection || option.mirror.content
        };

        userStat.addChoice(option, id);

        isThinking = true;
        showMirror = false;

        await new Promise(r => setTimeout(r, 2000)); // delay คงที่

        isThinking = false;
        showMirror = true;
    }

    function nextStep() {
        showMirror = false;
        goto(`/gate/${id + 1}`);
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
                    <span class="text-[10px] tracking-widest uppercase text-gray-400">REFLECTION GATE {id}</span>
                </header>

                <h2 class="text-2xl font-bold mb-4 text-black">{reflection.title}</h2>
                <p class="text-lg text-gray-800 leading-relaxed mb-8">{reflection.content}</p>

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