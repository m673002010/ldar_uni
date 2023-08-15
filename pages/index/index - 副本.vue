<template>
	<view class="container">
		<uni-section title="点数统计" type="line">
			<view class="dataPanel">
				<uni-list>
					<uni-list-item title="总点数" :note="totalPoint"></uni-list-item>
					<uni-list-item title="静密封点数" :note="staticPoint"></uni-list-item>
					<uni-list-item title="动密封点数" :note="dynamicPoint"></uni-list-item>
					<uni-list-item title="可达点数" :note="reachablePoint"></uni-list-item>
					<uni-list-item title="不可达点数" :note="unreachablePoint"></uni-list-item>
				</uni-list>
			</view>
		</uni-section>
		
		<uni-section title="组件类型分布" type="line">
			<view class="dataPanel">
				<uni-list>
					<uni-list-item v-for="(item, index) in componentTypeData" :key="index" :title="item.name" :note="item.value"></uni-list-item>
				</uni-list>
			</view>
		</uni-section>
		
		<uni-section title="减排量" type="line">
			<view class="dataPanel">
				<uni-list>
					<uni-list-item v-for="(item, index) in hdsData" :key="index" :title="item.name" :note="item.value"></uni-list-item>
				</uni-list>
			</view>
		</uni-section>
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
				componentTypeData: [],
				hdsData: [],
			}
		},
		methods: {
			async pointStatic() {
				const result = await uni.$request('get', '/dataPanel/pointStatic')
				this.totalPoint = result.data ? result.data.totalPoint : 0
				this.staticPoint = result.data ? result.data.staticPoint : 0
				this.dynamicPoint = result.data ? result.data.dynamicPoint : 0
				this.reachablePoint = result.data ? result.data.reachablePoint : 0
				this.unreachablePoint = result.data ? result.data.unreachablePoint : 0
			},
			async componentType(){
				const result = await uni.$request('get', '/dataPanel/componentType')
				this.componentTypeData = result.data ? result.data : []
			},
			async emission(){
				const result = await uni.$request('get', '/hds/historyDetectionStatistics', { year: '2023' })
				const hdsData = result.data ? result.data : []
				this.hdsData = hdsData.map(item => {
					const obj = {
						name: item.detectionCycle,
						value: '维修前:' + item.emissionBeforeRepair + '  维修后:' + item.emissionAfterRepair + '  减排量:' + item.emissionDecrease
					}
					return obj
				})
			}
		},
		onShow() {
			this.pointStatic()
			this.componentType()
			this.emission()
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
	.dataPanel {
		padding: 10px;
		background-color: #fff;
	}

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		margin-left: 10px;
	}
</style>
