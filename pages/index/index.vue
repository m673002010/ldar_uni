<template>
	<view class="container">
		<uni-section title="点数统计" type="line">
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
		</uni-section>
		
		<uni-section title="组件类型分布" type="line">
			<view>
				<canvas canvas-id="hMKQlyfXlafbaRwXWOUJRIhkuhQOoNoQ" id="hMKQlyfXlafbaRwXWOUJRIhkuhQOoNoQ" class="charts" @touchend="tap"/>
			</view>
		</uni-section>
		
		<uni-section title="减排量" type="line">
			<view>
				<canvas canvas-id="trfxiTdfRGyfrDbzoqRBzwPXoHiaBSlb" id="trfxiTdfRGyfrDbzoqRBzwPXoHiaBSlb" class="charts" @touchend="tap"/>
			</view>
		</uni-section>
	</view>
</template>

<script>
	import uCharts from '../../components/u-charts.min.js'
	let uChartsInstance = {}
	export default {
		data() {
			return {
				cWidth: 750,
				cHeight: 500,
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
		methods: {
			async componentType() {
				const result = await uni.$request('get', '/dataPanel/componentType')
				const componentTypeData = result.data ? result.data : []
				let res = {
					series: [
						{
							data: componentTypeData
						}
					]
				}
				this.drawComponentTypeCharts('hMKQlyfXlafbaRwXWOUJRIhkuhQOoNoQ', res)
			},
			drawComponentTypeCharts(id,data){
				const ctx = uni.createCanvasContext(id, this)
				uChartsInstance[id] = new uCharts({
					type: "pie",
					context: ctx,
					width: this.cWidth,
					height: this.cHeight,
					series: data.series,
					animation: true,
					background: "#FFFFFF",
					color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
					padding: [5,5,5,5],
					enableScroll: false,
					extra: {
					  pie: {
						activeOpacity: 0.5,
						activeRadius: 10,
						offsetAngle: 0,
						labelWidth: 15,
						border: false,
						borderWidth: 3,
						borderColor: "#FFFFFF"
					  }
					}
				})
			},
			async emission() {
				const result = await uni.$request('get', '/hds/historyDetectionStatistics', { year: '2023' })
				const hdsData = result.data ? result.data : []
				
				const emissionBeforeRepair = hdsData.map(item => item.emissionBeforeRepair)
				const emissionAfterRepair = hdsData.map(item => item.emissionAfterRepair)
				const emissionDecrease = hdsData.map(item => item.emissionDecrease)
				
				let res = {
					series: [
						{
							name: "维修前排放量",
							data: emissionBeforeRepair
						},
						{
							name: "维修后排放量",
							data: emissionAfterRepair
						},
						{
							name: "减排量",
							data: emissionDecrease
						}
					]
				}
				this.drawEmissionCharts('trfxiTdfRGyfrDbzoqRBzwPXoHiaBSlb', res)
			},
			drawEmissionCharts(id,data){
				const ctx = uni.createCanvasContext(id, this)
				uChartsInstance[id] = new uCharts({
					type: "column",
					context: ctx,
					width: this.cWidth,
					height: this.cHeight,
					categories: ["一季度", "二季度", "三季度", "四季度"],
					series: data.series,
					animation: true,
					background: "#FFFFFF",
					color: ["#EE6666", "#1890FF","#91CB74"],
					padding: [15,15,0,5],
					enableScroll: false,
					legend: {},
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						data: [
							{
								min: 0
							}
						]
					},
					extra: {
						column: {
							type: "group",
							width: 20,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08
						}
					}
				})
			},
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
			tap(e){
				uChartsInstance[e.target.id].touchLegend(e)
				uChartsInstance[e.target.id].showToolTip(e)
			}
		},
		onShow() {
			//这里的 750 对应 css .charts 的 width
			this.cWidth = uni.upx2px(750)
			//这里的 500 对应 css .charts 的 height
			this.cHeight = uni.upx2px(500)
			this.componentType()
			this.emission()
			this.pointStatic()
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
	.charts{
		width: 750rpx;
		height: 500rpx;
	}
</style>
