<template>
	<view class="userBox">
		<view class="userInfo">
			<view class="item"><uni-icons type="person" size="60"></uni-icons>用户名：{{userInfo.username}}</view>
			<view class="item"><uni-icons type="shop" size="60"></uni-icons>公司简称：{{userInfo.shortName}}</view>
			<view class="item"><uni-icons type="notification" size="60"></uni-icons>公司代号：{{userInfo.companyNum}}</view>
		</view>
		<button class="button" type="primary" @click="upload()">上传</button>
		<button class="button" type="warn" @click="logout()">退出</button>
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
			upload() {
				uni.navigateTo({
					url: '/subpkg/upload/upload'
				})
			},
			async logout () {
				const [ err, succ ] = await uni.showModal({
					title: '提示',
					content: '确认退出登录吗？'
				}).catch(err => err)
				
				// 确认清空用户信息
				if (succ && succ.confirm) {
					this.updateUserInfo({})
					this.updateToken('')
					this.updateIsLogin(false)
				}
				
				uni.reLaunch()
			},
			...mapMutations('mUser', ['updateUserInfo', 'updateToken', 'updateIsLogin'])
		},
		computed: {
			...mapState('mUser', ['userInfo', 'token'])
		}
	}
</script>

<style lang="scss">
	.userBox {
		height: 100%;
		
		.userInfo {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: black;
			padding: 10px;
		}
		
		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			padding: 10px 0;
			font-size: 13px;
		}
		
		.button {
			margin-top: 10px;
			width: 50%;
		}
	}
</style>
