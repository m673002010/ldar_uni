<template>
	<view class="userBox">
		{{userInfo.username}}
		{{userInfo.userId}}
		{{userInfo.companyNum}}
		<button @click="logout()">退出</button>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		name:"userInfo",
		data() {
			return {}
		},
		methods: {
			async logout () {
				const [ err, succ ] = await uni.showModal({
					title: '提示',
					content: '确认退出登录吗？'
				}).catch(err => err)
				
				// 确认清空用户信息
				if (succ && succ.confirm) {
					this.updateUserInfo({})
					this.updateToken('')
				}
			},
			...mapMutations('mUser', ['updateUserInfo', 'updateToken'])
		},
		computed: {
			...mapState('mUser', ['userInfo', 'token'])
		}
	}
</script>

<style lang="scss">
</style>
