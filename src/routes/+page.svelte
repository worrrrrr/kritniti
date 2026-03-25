<script>
    import SceneCard from '$lib/components/SceneCard.svelte';
    import ResultView from '$lib/components/ResultView.svelte';
    import UserStatusCard from '$lib/components/UserStatusCard.svelte';
    import data from '$lib/data/scenes.json';

    let currentStep = $state(0);
    let isFinished = $derived(currentStep >= data.length);
</script>

<main class="min-h-screen bg-slate-950 text-white relative p-6">
    <div class="max-w-2xl mx-auto mt-20">
        {#if !isFinished}
            <SceneCard 
                scene={data[currentStep]} 
                onNext={() => currentStep++} 
            />
        {:else}
            <ResultView />
        {/if}
    </div>

    <!-- <UserStatusCard /> -->
</main>