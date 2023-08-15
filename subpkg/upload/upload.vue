<template>
	<view class="upload">
		<view class="item">上传图片台账</view>
		<uni-file-picker 
			v-model="pictureValue" 
			fileMediatype="image"
			mode="grid"
			:limit="1"
			@select="uploadPicture"
		/>
		
		<view class="item">上传组件台账</view>
		<uni-file-picker 
			v-model="componentValue" 
			fileMediatype="all"
			mode="grid"
			:limit="1"
			@select="importComponent"
		/>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				pictureValue:[],
				componentValue: [],
			}
		},
		methods:{
			uploadPicture(e){
				const tempFilePaths = e.tempFilePaths
				//获取图片临时路径
				const imgUrl = tempFilePaths[0]
				uni.uploadFile({
					//图片上传地址
					url: 'http://175.178.8.213:3002/pictureLedger/uploadPicture', 
					filePath: imgUrl,
					//上传名字，注意与后台接收的参数名一致
					name: 'file',
					//设置请求头
					header:{
						"Content-Type": "multipart/form-data",
						"Authorization": this.token
					},
					//请求成功，后台返回自己服务器上的图片地址
					success: (uploadFileRes) => {
						uni.showToast({
							title: `图片上传成功`,
						})
					}
				})
			},
			importComponent(e){
				const tempFilePaths = e.tempFilePaths
				const fileUrl = tempFilePaths[0]
				uni.uploadFile({
					url: 'http://175.178.8.213:3002/component/importComponentUni', 
					filePath: fileUrl,
					name: 'file',
					header:{
						"Content-Type": "multipart/form-data",
						"Authorization": this.token
					},
					//请求成功，后台返回自己服务器上的图片地址
					success: (uploadFileRes) => {
						uni.showToast({
							title: `导入成功`,
						})
					}
				})
			},
		},
		computed: {
			...mapState('mUser', ['token'])
		}
	}
</script>

<style lang="scss" scoped>
	.upload {
		background-color: #CCCCCC;
	}
	
	.item {
		margin-top: 20px;
		margin-bottom: 5px;
	}
</style>
