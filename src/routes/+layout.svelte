<script>
	import Navbar from "./Navbar.svelte";

	try {
        if(typeof window !== 'undefined' 
        && window) {
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RDYGGB43F6');
        }
    } catch(error) {
		console.error("Failed to initialize Analytics")
	}
</script>


<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-RDYGGB43F6"></script>
</svelte:head>


<Navbar />

<div id="centerDiv">
	<slot />
</div>

<div id="thirdDiv" />

<style>
	/* #centerDiv {
		background-color: rgba(150, 0, 214, 0.9);
	} */
	#centerDiv {
		background-color: rgba(192, 226, 254, 0.95);
	}
	@media (max-width: 850px) {
		#centerDiv {
			width: 99.5%;
			margin: auto;
			border-bottom-left-radius: 25px;
			border-bottom-right-radius: 25px;
		}
	}
	@media (min-width: 850px) {
		#centerDiv {
			width: 85%;
			margin: auto;
			border-bottom-left-radius: 25px;
			border-bottom-right-radius: 25px;
		}
	}

	#thirdDiv {
		min-height: 6vw;
		padding: 1px;
	}
</style>
