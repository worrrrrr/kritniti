<script lang="ts">
    import { userStatus } from '$lib/user-status.svelte';
    let { scene, onNext } = $props();

    function handleSelect(opt: any) {
        // 1. เพิ่มแต้ม Driver
        if (opt.driver) {
            userStatus.drivers[opt.driver as keyof typeof userStatus.drivers] += 1;
        }
        // 2. เพิ่มแต้ม MBTI
        if (opt.mbti) {
            opt.mbti.forEach((char: string) => {
                userStatus.mbtiPoints[char as keyof typeof userStatus.mbtiPoints] += 1;
            });
        }
        // 3. เพิ่มแต้ม Enneagram (บรรทัดนี้ที่ทำให้แต้มวิ่ง)
        if (opt.ennea) {
            userStatus.enneaVotes[opt.ennea as keyof typeof userStatus.enneaVotes] += 1;
        }
        onNext();
    }
</script>

<div class="bg-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl max-w-lg mx-auto">
    <div class="mb-6">
        <span class="text-blue-500 font-mono text-xs tracking-widest uppercase">Scenario {scene.id}</span>
        <h2 class="text-2xl font-bold text-white mt-2">{scene.question}</h2>
    </div>

    <div class="flex flex-col gap-3">
        {#each scene.options as opt}
            <button 
                onclick={() => handleSelect(opt)}
                class="w-full text-left p-4 rounded-2xl border border-slate-800 bg-slate-800/50 hover:border-blue-500 hover:bg-blue-500/10 transition-all text-slate-300 hover:text-white"
            >
                {opt.text}
            </button>
        {/each}
    </div>
</div>