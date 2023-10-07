<script>
	import Navbar from "./Navbar.svelte";

	try {
		if (typeof window !== "undefined" && window) {
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				window.dataLayer.push(arguments);
			}
			gtag("js", new Date());
			gtag("config", "G-RDYGGB43F6");
		}
	} catch (error) {
		console.error("Failed to initialize Analytics");
	}
</script>

<svelte:head>
	<script
		async
		src="https://www.googletagmanager.com/gtag/js?id=G-RDYGGB43F6"
	></script>
</svelte:head>

<Navbar />

<div class="blur-background">
	<div class="slot-wrapper">
		<slot />
	</div>
</div>

<style>
	/* #centerDiv {
		background-color: rgba(150, 0, 214, 0.9);
	} */
	.blur-background {
		backdrop-filter: blur(100px);
	}
	.slot-wrapper {
		background-color: rgba(0, 0, 0, 0.3);
	}
	
</style>
