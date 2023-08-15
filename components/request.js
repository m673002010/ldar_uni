const requestConfig = {
	baseUrl: 'https://175.178.8.213:3001',
	timeout: 5 * 1000,
	headers: {
		'Accept-Language': 'zh-CN',
	},
}

export function request(method, path, data = {}, config = {}) {
	const {
		baseUrl = '',
		timeout = 0,
		headers = {},
	} = { ...requestConfig, ...config }

	uni.addInterceptor('request', {
		invoke(invoke){
			//请求前拦截并处理
			invoke.header['Authorization'] = uni.getStorageSync('token')
		},
	})

	return new Promise((resolve, reject) => {
		uni.request({
			method,
			url: `${baseUrl}${path}`,
			data,
			header: {
				...headers,
				'content-type': 'application/json;charset=utf-8',
				// 'Authorization': uni.getStorageSync('token')
			},
			timeout,
			success: (res) => {
				if (res.statusCode === 200) {
					resolve(res.data)
				} else {
					reject(new Error(res.statusCode))
				}
			},
			fail: (err) => {
				let errorMessage = ''

				if (err.errMsg.includes('timeout')) {
					errorMessage = '请求超时，请稍后重试！'
				} else if (err.errMsg.includes('abort')) {
					errorMessage = '请求数据错误，请重试！'
				} else {
					errorMessage = '网络请求错误，请检查网络连接！'
				}
				reject(new Error(errorMessage))
			},
		})
	})
}