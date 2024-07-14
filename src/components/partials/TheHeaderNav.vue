<template>
	<div class="text-white " style="height: 200px;">
		<div class="w-full p-8">
			<div class="row">
				<div class="px-4 col-md-12">
					<div class="flex flex-wrap items-center justify-between">
						<div>
							<h1 class="text-white mb-2">{{ pageTitle }}</h1>
							<p class="mb-4 text-white">{{ pageDescription }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="absolute top-0 lg:h-64 h-72 overflow-hidden rounded-lg" style="z-index: -1;">
			<img src="../../assets/images/dashboard/top-header.png" alt="header"
			     class="animated-scaleX object-cover w-screen h-full rounded-2xl">
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			pageTitle: String,
			pageDescription: String,
		}
	}
</script>

<style scoped>

</style>