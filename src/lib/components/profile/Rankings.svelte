<script>
    export let build;
    export let redirect;
    import HrefAvatarLc from "./HrefAvatarLc.svelte";

    import ScoringDetails from "./ScoringDetails.svelte";

    let isRanked = build["lb"] ? Object.keys(build["lb"]).length > 0 : false;

    let index; // start from the first item
    let entries;
    if (isRanked) {
        index = 0; // start from the first item
        build['lb'] = Object.entries(build["lb"])
            .sort((a, b) => a[1].percraw - b[1].percraw)
            .reduce((obj, [key, val]) => {
                obj[key] = val;
                return obj;
            }, {});
        entries = Object.entries(build["lb"]);
    }
</script>

<div class="container" style="text-align: center; overflow: hidden;">
    {#if isRanked}
        {#if Object.keys(build["lb"]).length == 0}
            <div style="margin:auto;">
                <HrefAvatarLc {redirect} {build} />
                <p style="margin-top:0; margin-bottom:0; text-align: center;">
                    Equipped lightcone not supported
                </p>
            </div>
        {/if}

        <div>
            {#if entries && entries.length > 0}
                <div style="display: flex;">
                    {#if entries.length > 1}
                        <button
                            on:click={() =>
                                (index =
                                    (index - 1 + entries.length) %
                                    entries.length)}>{"⇦"}</button
                        >
                    {/if}

                    <ScoringDetails {build} key={entries[index][0]} />

                    {#if entries.length > 1}
                        <button
                            on:click={() =>
                                (index = (index + 1) % entries.length)}
                            >{"⇨"}</button
                        >
                    {/if}
                </div>

                <HrefAvatarLc {redirect} {build} key={entries[index][0]} />
            {/if}
        </div>
    {:else}
        <div style="margin:auto;">
            <HrefAvatarLc {redirect} {build} />
            <p style="margin-top:0; margin-bottom:0; text-align: center;">
                leaderboards for this character coming soon!
            </p>
        </div>
    {/if}
</div>

<style>
    .container {
        display: flex;
        overflow-x: auto;
        max-width: 100%;
        justify-content: center;
    }
    p {
        margin: 3px;
    }
    button {
        border-color: transparent;
        font-size: 20px;
    }

    @media (max-width: 850px) {
        p {
            font-size: 11px;
        }
    }
</style>
