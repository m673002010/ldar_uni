<template>
	<view>
		<uni-list>
			<uni-list-item title="总点数" :note="totalPoint"></uni-list-item>
			<progress :percent="totalPercent" show-info stroke-width="7" border-radius="5" font-size="14" activeColor="#10AEFF"/>
			<uni-list-item title="静密封点数" :note="staticPoint"></uni-list-item>
			<progress :percent="staticPercent" show-info stroke-width="7" border-radius="5" font-size="14" activeColor="#10AEFF"/>
			<uni-list-item title="动密封点数" :note="dynamicPoint"></uni-list-item>
			<progress :percent="dynamicPercent" show-info stroke-width="7" border-radius="5" font-size="14" activeColor="#10AEFF"/>
			<uni-list-item title="可达点数" :note="reachablePoint"></uni-list-item>
			<progress :percent="reachablePercent" show-info stroke-width="7" border-radius="5" font-size="14" activeColor="#10AEFF"/>
			<uni-list-item title="不可达点数" :note="unreachablePoint"></uni-list-item>
			<progress :percent="unreachablePercent" show-info stroke-width="7" border-radius="5" font-size="14" activeColor="#10AEFF"/>
		</uni-list>
	</view>
</template>

<script>
export default {
	data() {
		return {
			totalPoint: 0,
			staticPoint: 0,
			dynamicPoint: 0,
			reachablePoint: 0,
			unreachablePoint: 0,
			totalPercent: 0,
			staticPercent: 0,
			dynamicPercent: 0,
			reachablePercent: 0,
			unreachablePercent: 0
		}
	},
	onShow() {
		this.pointStatic()
	},
	methods: {
		async pointStatic() {
			const result = await uni.$request('get', '/dataPanel/pointStatic')
			this.totalPoint = result.data ? +result.data.totalPoint : 0
			this.staticPoint = result.data ? +result.data.staticPoint : 0
			this.dynamicPoint = result.data ? +result.data.dynamicPoint : 0
			this.reachablePoint = result.data ? +result.data.reachablePoint : 0
			this.unreachablePoint = result.data ? +result.data.unreachablePoint : 0
			this.totalPercent = 100
			this.staticPercent = (this.staticPoint / this.totalPoint * 100).toFixed(2)
			this.dynamicPercent = (this.dynamicPoint / this.totalPoint * 100).toFixed(2)
			this.reachablePercent = (this.reachablePoint / this.totalPoint * 100).toFixed(2)
			this.unreachablePercent = (this.unreachablePoint / this.totalPoint * 100).toFixed(2)
		},
	}
}
</script>

<style scoped>
</style>