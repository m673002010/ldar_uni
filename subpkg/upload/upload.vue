<template>
	<view class="upload">
		<view class="item">		
			<uni-file-picker
			ref="picture"
			v-model="pictureValue" 
			fileMediatype="image"
			mode="grid"
			:limit="1"
			@select="selectPicture"
			:image-styles="imageStyles"
			/>
		</view>
		<view class="item">
			<uni-easyinput v-model="form.imgName" focus placeholder="图片名称"></uni-easyinput>
		</view>
		<view class="item">
			<button type="default" @click="uploadPicture">上传</button>
		</view>

		
<!-- 		<view class="item">上传组件台账</view>
		<uni-file-picker 
			v-model="componentValue" 
			fileMediatype="all"
			mode="grid"
			:limit="1"
			@select="importComponent"
		/> -->
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				pictureValue:[],
				form: {
					imgUrl: '',
					imgName: ''
				},
				// componentValue: [],
				imageStyles:{
					width: 120,
					height: 120,
					border:{
						color:"gray",
						width:2,
						radius:'2px'
					}
				},
			}
		},
		methods:{
			selectPicture(e){
				const tempFilePaths = e.tempFilePaths
				//获取图片临时路径
				this.form.imgUrl = tempFilePaths[0]
			},
			uploadPicture() {
				uni.uploadFile({
					//图片上传地址
					url: 'https://175.178.8.213:3001/pictureLedger/uploadPictureUni', 
					filePath: this.form.imgUrl,
					//上传名字，注意与后台接收的参数名一致
					name: 'file',
					formData: { imgName: this.form.imgName },
					//设置请求头
					header:{
						"Content-Type": "multipart/form-data",
						"Authorization": this.token
					},
					//请求成功，后台返回自己服务器上的图片地址
					success: (result) => {
						const data = JSON.parse(result.data)
						if (+data.code === 0) {
							uni.showToast({
								title: `图片上传成功`,
							})
						} else {
							uni.showToast({
								title: `图片上传失败`,
								icon: 'error'
							})
						}
						
						// 移除选择图片
						this.$refs.picture.clearFiles()
					}
				})
			}
			// importComponent(e){
			// 	const tempFilePaths = e.tempFilePaths
			// 	const fileUrl = tempFilePaths[0]
			// 	uni.uploadFile({
			// 		url: 'http://175.178.8.213:3002/component/importComponentUni',
			// 		filePath: fileUrl,
			// 		name: 'file',
			// 		header:{
			// 			"Content-Type": "multipart/form-data",
			// 			"Authorization": this.token
			// 		},
			// 		//请求成功，后台返回自己服务器上的图片地址
			// 		success: (uploadFileRes) => {
			// 			uni.showToast({
			// 				title: `导入成功`,
			// 			})
			// 		}
			// 	})
			// },
		},
		computed: {
			...mapState('mUser', ['token'])
		}
	}
</script>

<style lang="scss" scoped>
	.upload {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: black;
		padding: 10px;
		
		.item {
			margin: 10px 0px;
		}
	}
</style>
