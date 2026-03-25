<script>
    import { page } from '$app/stores';
    import { userProgress } from '$lib/stores/quizStore';
    import gatesData from '$lib/data/gates.json'; // ไฟล์ JSON 10 Gates
    import { calculateMirror, updateScores } from '$lib/logic/engine';
    import { fade, fly } from 'svelte/transition';

    // 1. ดึงข้อมูล Gate ปัจจุบันจาก URL Params
    $: gateId = parseInt($page.params.id);
    $: currentGate = gatesData.find(g => g.gate === gateId);

    let showMirror = false;
    let reflection = {};

    async function handleSelect(option) {
        // ประมวลผล Reflection (กระจกสะท้อน)
        reflection = calculateMirror(option, $userProgress.history, gateId);
        
        // เข้าสู่สภาวะ "พื้นที่ว่าง" (The Gap)
        showMirror = true;

        // อัปเดตข้อมูลลง Store
        userProgress.update(p => ({
            ...p,
            history: [...p.history, { gate: gateId, ...option }],
            scores: updateScores(p.scores, option.cf_weight, option.logic)
        }));
    }

    function nextStep() {
        showMirror = false;
        // Logic สำหรับการเปลี่ยนหน้าไป gateId + 1 หรือหน้าสรุปผล
    }

    const sleep = ms => new Promise(r => setTimeout(r, ms));
</script>

<main>
    {#if !showMirror}
        <section in:fade>
            <h1>{currentGate.title}</h1>
            <p>{currentGate.scenario}</p>
            
            <div class="options-grid">
                {#each currentGate.options as option}
                    <button on:click={() => handleSelect(option)}>
                        {option.text}
                    </button>
                {/each}
            </div>
        </section>
    {:else}
        <div class="void-overlay" in:fade={{ duration: 800 }}>
            {#await sleep(reflection.delay)}
                <div class="thinking">กำลังส่องพิกัดจิต...</div>
            {:then}
                <div class="mirror-box" in:fly={{ y: 20, duration: 1000 }}>
                    <span class="gate-tag">GATE {gateId}</span>
                    <h2>{reflection.title}</h2>
                    <p class="main-content">{reflection.mainContent}</p>
                    
                    {#if reflection.subContent}
                        <p class="sub-content">{reflection.subContent}</p>
                    {/if}

                    <button class="next-btn" on:click={nextStep}>
                        {gateId === 10 ? "เผชิญหน้ากับความจริงสุดท้าย" : "ก้าวต่อไปในค่ายกล"}
                    </button>
                </div>
            {/await}
        </div>
    {/if}
</main>