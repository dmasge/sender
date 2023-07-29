<script>
	import Navbar from "./Navbar.svelte";
</script>

<Navbar />

<div id="centerDiv">
	<slot />
</div>

<div id="thirdDiv" />

<style>
	@media (max-width: 850px) {
		#centerDiv {
			background-color: rgba(150, 0, 214, 0.9);
			width: 99.5%;
			margin: auto;
			border-radius: 27px;
			border: 1px solid #a8f3fff2;
			box-shadow: 0 0 10px #a8f3fff2;
		}
	}
	@media (min-width: 850px) {
		#centerDiv {
			background-color: rgba(150, 0, 214, 0.9);
			width: 85%;
			margin: auto;
			border-radius: 27px;
			border: 1px solid #a8f3fff2;
			box-shadow: 0 0 10px #a8f3fff2;
		}
	}

	#thirdDiv {
		min-height: 6vw;
		padding: 1px;
	}
</style>
