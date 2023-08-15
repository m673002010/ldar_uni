<template>
	<view class="container">
		<uni-section title="登录" type="line">
			<view class="login">
				<uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
					<uni-forms-item label="用户名" required name="username">
						<uni-easyinput v-model="valiFormData.username" placeholder="请输入用户名" />
					</uni-forms-item>
					<uni-forms-item label="密码" required name="password">
						<uni-easyinput v-model="valiFormData.password" type="password" placeholder="请输入密码" />
					</uni-forms-item>
				</uni-forms>
				<button type="primary" @click="login('valiForm')">登录</button>
			</view>
		</uni-section>

		<uni-popup ref="showPopup">
			<uni-list>
				<uni-list-item v-for="(item, index) in companyList" :key="index" :title="item.fullName" :note="item.companyNum" @click="selectCompany(item)" link></uni-list-item>
			</uni-list>
		</uni-popup>
	</view>
</template>

<script>
	import { mapMutations, mapState } from 'vuex'
	export default {
		name:"userLogin",
		data() {
			return {
				valiFormData: {
					username: '',
					password: '',
				},
				rules: {
					username: {
						rules: [{
							required: true,
							errorMessage: '用户名不能为空'
						}]
					},
					password: {
						rules: [{
							required: true,
							errorMessage: '密码不能为空'
						}]
					}
				},
				companyList: [],
			}
		},
		onLoad() {},
		methods: {
			async login() {
				const result = await uni.$request('post', '/user/login', this.valiFormData)
				if (+result.code === 0) {
					this.updateToken(result.data.token)
					
					const companyResult = await uni.$request('get', '/company/companyInfo')
					if (+companyResult.code === 0) {
						this.companyList = companyResult.data
						this.$refs.showPopup.open()
					}
				}
				else {
					uni.showToast({
						title: `登录失败`,
						icon: 'error'
					})
				}
			},
			async selectCompany(item) {
				const result = await uni.$request('post', '/user/reToken', { companyNum: item.companyNum, shortName: item.shortName })
				if (+result.code === 0) {
					this.updateToken(result.data.token)
					this.updateIsLogin(true)
					await this.getUserInfo()
					uni.switchTab({
						url: '/pages/index/index'
					})
				} else {
					uni.showToast({
						title: `选择公司失败`,
						icon: 'error' 
					})
				}
			},
			async getUserInfo () {
				const result = await uni.$request('get', '/user/userInfo')
				if (+result.code === 0) {
					// 设置用户信息
					this.updateUserInfo(result.data)
				} else {
					uni.showToast({
						title: `获取用户失败`,
						icon: 'error'
					})
				}
			},
			...mapMutations('mUser', ['updateUserInfo', 'updateToken', 'updateIsLogin'])
		},
		computed: {
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		padding: 10px;
		background-color: #fff;
	}
</style>
