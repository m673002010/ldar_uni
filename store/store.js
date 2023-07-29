// 导入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 导入购物车的vuex模块
import moduleUser from './user.js'

Vue.use(Vuex)

// 创建Store的实例对象
const store = new Vuex.Store({
	modules: {
		mUser: moduleUser
	}
})

export default store
