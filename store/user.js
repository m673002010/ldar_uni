export default {
	// 为当前模块开启命名空间
	namespaced: true,
	
	// 模块的state数据
	state: () => ({
		// 登录成功后获取token
		token: uni.getStorageSync('token'),
		// 用户基本信息
		userInfo: uni.getStorageSync('userInfo'),
		// 是否登录
		isLogin: false,
		// 重定向的object对象 { openType, from }
		redirectInfo: null
	}),
	
	// 模块的mutations方法
	mutations: {
		// 更新用户信息
		updateUserInfo (state, userInfo) { 
			state.userInfo = userInfo
			this.commit('mUser/saveUserInfoToStorage')
		},
		// 持久化存储用户信息
		saveUserInfoToStorage(state) { 
			uni.setStorageSync('userInfo', state.userInfo)
		},
		// 更新token
		updateToken(state, token) {
			state.token = token
			this.commit('mUser/saveTokenToStorage')
		},
		// 持久化存储token
		saveTokenToStorage(state) { 
			uni.setStorageSync('token', state.token)
		},
		// 更新登录状态
		updateIsLogin(state, isLogin) {
			state.isLogin = isLogin
		},
		// 更新重定向对象
		updateRedirectInfo (state, info) {
			state.redirectInfo = info
		}
	},
	
	// 模块的getters属性
	getters: {
	}
}
