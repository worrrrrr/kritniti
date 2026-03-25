<script lang="ts">
    import { page } from '$app/stores';
    import { fade, fly } from 'svelte/transition';

    let slug = $derived($page.params.slug);
    const posts = import.meta.glob('/src/lib/posts/*.md', { eager: true });

    let currentPost = $derived.by(() => {
        const path = `/src/lib/posts/${slug}.md`;
        return posts[path] as any;
    });

    let Content = $derived(currentPost?.default);
    let meta = $derived(currentPost?.metadata);
</script>

<main class="min-h-screen pt-32 pb-20 px-6">
    {#if Content}
        <article class="max-w-2xl mx-auto" in:fade>
            <div class="mb-12" in:fly={{ y: 20, duration: 800 }}>
                <h1 class="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                    {meta.title}
                </h1>
                <p class="text-violet-400 font-light italic">{meta.description}</p>
            </div>

            <div class="card-mystery p-8 md:p-12">
                <div class="prose">
                    <Content />
                </div>
            </div>
        </article>
    {:else}
        <p class="text-center text-slate-500">กำลังค้นหาแก่นแท้...</p>
    {/if}
</main>