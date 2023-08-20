<template>
	<view class="container">
		<uni-section title="点数统计" type="line">
			<view>
				<sealPointType></sealPointType>
			</view>
		</uni-section>
		
		<uni-section title="组件类型分布" type="line">
			<view>
				<componentType></componentType>
			</view>
		</uni-section>
		
		<uni-section title="减排量" type="line">
			<view>
				<emission></emission>
			</view>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
		},
		onShow() {
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
</style>
