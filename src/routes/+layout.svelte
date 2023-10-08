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

<div class="main-layout">
	<div class="mainchild-layout">
		<Navbar />

		<slot />
	</div>
</div>

<style>
	.main-layout {
		background-image: url("https://raw.githubusercontent.com/Sinkira/sinkiresource/main/oyes/veli_blur_darken_hq.webp");
		background-repeat: no-repeat; /* Prevents the background image from repeating */
		background-size: cover; /* Makes the background image cover the entire container */
		background-position: center; /* Centers the background image */
		height: 100%;
	}
	.mainchild-layout {
		background-color: rgba(0, 0, 0, 0.4);
	}
	/* #centerDiv {
		background-color: rgba(150, 0, 214, 0.9);
	} */
</style>
