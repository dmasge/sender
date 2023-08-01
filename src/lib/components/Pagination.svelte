<script>
    import { page } from "$app/stores";

    let slugPage = $page.params.slug;
    $: currentPage = parseInt(slugPage);

    let baseUrl;
    $: {
        const url = new URL($page.url.href);
        const pathParts = url.pathname.split('/');
        pathParts.pop();
        url.pathname = pathParts.join('/');
        baseUrl = url.href;
    }
</script>


<div>

    <nav>
        {#if currentPage > 1}
            <a
                class="navA"
                href={`${baseUrl}/${currentPage - 1}`}>&lt;</a
            >
        {/if}
        <span>{currentPage}</span>
        {#if currentPage < 10}
            <a
                class="navA"
                href={`${baseUrl}/${currentPage + 1}`}>&gt;</a
            >
        {/if}
    </nav>
</div>



<style>
    nav {
        display: flex;
        justify-content: center;
    }
    nav a,
    nav span {
        margin: 0 10px;
    }

    .navA {
        text-decoration: none;
        font-weight: 900;
    }
</style>