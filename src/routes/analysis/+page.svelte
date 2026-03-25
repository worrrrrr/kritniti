<script>
	import SceneCard from '$lib/components/SceneCard.svelte';
	import ResultView from '$lib/components/ResultView.svelte';
	import UserStatusCard from '$lib/components/UserStatusCard.svelte';
	import data from '$lib/data/scenes.json';

	let currentStep = $state(0);
	let isFinished = $derived(currentStep >= data.length);
</script>

<div class="min-h-screen pt-32 px-6 pb-20">
	<div class="max-w-2xl mx-auto">
		{#if !isFinished}
			<SceneCard 
				scene={data[currentStep]} 
				onNext={() => currentStep++} 
			/>
		{:else}
			<ResultView />
		{/if}
	</div>
<!-- 
	{#if !isFinished}
		<div class="hidden lg:block">
			<UserStatusCard />
		</div>
	{/if} -->
</div>