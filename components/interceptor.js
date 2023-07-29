// 页面白名单，不受拦截
const whiteList = [
	// '/pages/index/index',
]

function hasPermission (url) {
	let islogin = uni.getStorageSync('isLogin') // 在这可以使用token,isLogin是登录成功后在本地存储登录标识
	islogin = Boolean(Number(islogin)) // 返回布尔值
    // 在白名单中或有登录判断条件可以直接跳转
    if(whiteList.indexOf(url) !== -1 || islogin) {
		console.log('跳转')
        return true
    }
	console.log('无权限跳转')
    return false
}

uni.addInterceptor('navigateTo', {
    // 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转
    invoke (e) {
		const token = uni.getStorageSync('token')
        if(!token && !hasPermission(e.url)){
            uni.reLaunch({
                url: '/pages/login/login'
            })
            return false
        }
        return true
    },
    success (e) {
		
    }
})

uni.addInterceptor('switchTab', {
    // tabbar页面跳转前进行拦截
    invoke (e) {
		const token = uni.getStorageSync('token')
        if(!token && !hasPermission(e.url)){
            uni.reLaunch({
                url: '/pages/login/login'
            })
            return false
        }
        return true
    },
    success (e) {
		
    }
})
