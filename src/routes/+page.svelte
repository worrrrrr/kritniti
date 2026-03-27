<script lang="ts">
    import { userStat } from '$lib/user-stat.svelte.ts';
    import { fade, fly } from 'svelte/transition';
    import { onMount } from 'svelte';
	import SvelteMBTI from '$lib/components/SvelteMBTI.svelte';

    let mounted = $state(false);
    onMount(() => { mounted = true; });

    function startJourney() {
        userStat.reset();
        window.location.href = '/gate/1';
    }
</script>

<main class="min-h-screen  text-white flex flex-col items-center justify-center p-6 overflow-hidden">
    {#if mounted}
        <div class="fixed inset-0 opacity-20 pointer-events-none">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white rounded-full animate-[pulse_10s_infinite]"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gray-500 rounded-full animate-[pulse_15s_infinite]"></div>
        </div>

        <div class="relative z-10 max-w-3xl text-center space-y-12">
            <header class="space-y-4" in:fly={{ y: -20, duration: 1000 }}>
                <h1 class="text-7xl md:text-9xl font-black tracking-tighter uppercase italic">
                    KRITNITI
                </h1>
                <div class="flex items-center justify-center gap-4">
                    <span class="h-[1px] w-12 bg-gray-500"></span>
                    <p class="text-sm tracking-[0.5em] text-gray-400 uppercase">The Void of Self-Discovery</p>
                    <span class="h-[1px] w-12 bg-gray-500"></span>
                </div>
            </header>

            

          
        </div>
        <div class="fixed bottom-6 left-6 text-[10px] text-gray-600 tracking-widest uppercase">
            v.2026 / experimental_logic
        </div>
    {/if}
</main>

<style>
    :global(body) {
        background-color: black;
        margin: 0;
        font-family: 'Inter', sans-serif;
    }
</style>