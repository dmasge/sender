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
	<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1701767758741248"
     crossorigin="anonymous"></script>
	<script
		async
		src="https://www.googletagmanager.com/gtag/js?id=G-RDYGGB43F6"
	></script>
	<script type="text/javascript">
		atOptions = {
			'key' : 'defb6be37669d107e0223bb53e769aee',
			'format' : 'iframe',
			'height' : 300,
			'width' : 160,
			'params' : {}
		};
		document.write('<scr' + 'ipt type="text/javascript" src="//www.topcreativeformat.com/defb6be37669d107e0223bb53e769aee/invoke.js"></scr' + 'ipt>');
	</script>
</svelte:head>

<div class="main-layout">
	<div class="mainchild-layout">
		<Navbar />

		<slot />
	</div>
</div>

<style>
	.main-layout {
		/* background-image: url("https://raw.githubusercontent.com/Sinkira/sinkiresource/main/oyes/veli_blur_darken_hq.webp"); */
		background-repeat: no-repeat; /* Prevents the background image from repeating */
		background-size: cover; /* Makes the background image cover the entire container */
		background-position: center; /* Centers the background image */
		height: 100%;
		background-color: #171021;
	}
	.mainchild-layout {
		background-color: rgba(255, 255, 255, 0);
	}
	/* #centerDiv {
		background-color: rgba(150, 0, 214, 0.9);
	} */
</style>
