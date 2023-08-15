<template>
	<view class="myContainer">
		<userLogin v-if="!isLogin"></userLogin>

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
			...mapState('mUser', ['isLogin'])
		}
	}
</script>

<style lang="scss">
	page, .myContainer {
		height: 100%;
	}
</style>
