<script>
    import { fade, fly } from 'svelte/transition';
    
  // ดึงไฟล์ทั้งหมดใน posts มาทำเป็นรายการ
    const posts = import.meta.glob('/src/lib/posts/*.md', { eager: true });
    
    // แปลงข้อมูลให้เป็น Array ที่เอาไปใช้งานง่ายๆ
    const postList = Object.entries(posts).map(([path, post]) => {
        const slug = path.split('/').pop().replace('.md', '');
        return { slug, ...post.metadata };
    });
</script>

<main class="max-w-4xl mx-auto px-6 py-32" in:fade>
    <header class="mb-16 border-l-4 border-violet-500 pl-6">
        <h1 class="text-5xl font-black text-white tracking-tighter mb-4">Library of Insight</h1>
        <p class="text-slate-400 font-light italic">"มองให้เห็นแก่น... เพื่อทิ้งเปลือกที่ฟุ่มเฟือย"</p>
    </header>

    <div class="grid gap-8">
        {#each postList as article, i}
            <a 
                href="/blog/{article.slug}" 
                class="card-mystery p-8 block group hover:translate-x-2 transition-all duration-500"
                in:fly={{ y: 20, delay: i * 100 }}
            >
                <span class="text-[10px] text-violet-400 font-bold tracking-widest uppercase">{article.tag}</span>
                <h2 class="text-2xl font-bold text-white mt-2 group-hover:text-violet-300 transition-colors">
                    {article.title}
                </h2>
                <p class="text-slate-500 mt-4 leading-relaxed font-light">{article.desc}</p>
                <div class="mt-6 text-[10px] text-violet-500 font-black tracking-widest uppercase">Read Article →</div>
            </a>
        {/each}
    </div>
</main>