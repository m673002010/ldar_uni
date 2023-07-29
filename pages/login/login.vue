<template>
	<view class="myContainer">
		<userLogin v-if="!token"></userLogin>

		<userInfo v-else></userInfo>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default {
		data() {
			return {}
		},
		methods: {
			
		},
		computed: {
			...mapState('mUser', ['token'])
		}
	}
</script>

<style lang="scss">
	page, .myContainer {
		height: 100%;
	}
</style>
