<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<nav
	class="fixed top-0 left-0 z-50 w-full border-b border-slate-800 bg-mystery-900/50 backdrop-blur-sm"
>
	<div class="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
		<a href="/" class="text-xl font-bold text-white">Core</a>
		<div>
			<a href="/blog" class="text-slate-400 transition-colors hover:text-white">Blog</a>
			<a
				href="/analysis"
				class="ml-6 rounded-full bg-mystery-300 px-4 py-2 text-white transition-colors hover:bg-mystery-600"
				>Analysis</a
			>
			<a href="/gate/1" class="btn-start">
    Journey
</a>
		</div>
	</div>
</nav>
{@render children()}
