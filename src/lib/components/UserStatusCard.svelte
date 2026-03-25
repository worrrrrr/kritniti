<script lang="ts">
	import { userStatus } from '$lib/user-status.svelte';

	// เรียงฟังก์ชันที่แต้มเยอะสุด 4 อันดับแรก
	

</script>

<div
	class="fixed top-4 right-4 w-64 rounded-3xl border border-slate-700 bg-slate-900 p-5 font-sans text-white shadow-2xl"
>
	<div class="mb-3 flex items-center gap-2">
		<div class="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
		<span class="font-mono text-[10px] text-slate-400">ANALYZING ENGINE v1.0</span>
	</div>

	<div class="mb-4 text-3xl font-black tracking-tighter text-white">
		{userStatus.currentMBTI}
	</div>

	<div class="mb-4">
		<p class="mb-1 text-[9px] font-bold text-slate-500 uppercase">Dominant Driver</p>
		<p class="text-sm font-bold text-blue-400 uppercase">{userStatus.topDriver}</p>
	</div>

	<div class="mb-4">
		<p class="mb-1 text-[9px] font-bold text-slate-500 uppercase">MBTI Points</p>
		<div class="flex flex-wrap gap-2">
			{#each Object.entries(userStatus.mbtiPoints) as [char, points]}
				<div class="rounded bg-slate-700 px-2 py-1 font-mono text-xs">
					{char}: {points}
				</div>
			{/each}
		</div>
	</div>
	<div class="mb-4">
		<p class="mb-1 text-[9px] font-bold text-slate-500 uppercase">MBTI Points</p>
		<div class="flex flex-wrap gap-2">
			{#each Object.entries(userStatus.cognitiveFn) as [char, points]}
				<div class="rounded bg-slate-700 px-2 py-1 font-mono text-xs">
					{char}: {points}
				</div>
			{/each}
		</div>
	</div>
</div>
