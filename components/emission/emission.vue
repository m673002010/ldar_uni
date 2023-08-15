<template>
	<view>
		<canvas canvas-id="trfxiTdfRGyfrDbzoqRBzwPXoHiaBSlb" id="trfxiTdfRGyfrDbzoqRBzwPXoHiaBSlb" class="charts" @touchend="tap"/>
	</view>
</template>

<script>
import uCharts from '../../components/u-charts.min.js'
let uChartsInstance = {}
export default {
	data() {
		return {
			cWidth: 750,
			cHeight: 500
		}
	},
	onReady() {
		//这里的 750 对应 css .charts 的 width
		this.cWidth = uni.upx2px(750)
		//这里的 500 对应 css .charts 的 height
		this.cHeight = uni.upx2px(500)
		this.emission()
	},
	methods: {
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
			this.drawCharts('trfxiTdfRGyfrDbzoqRBzwPXoHiaBSlb', res)
		},
		drawCharts(id,data){
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
		tap(e){
			uChartsInstance[e.target.id].touchLegend(e)
			uChartsInstance[e.target.id].showToolTip(e)
		}
	}
}
</script>

<style scoped>
	.charts{
		width: 750rpx;
		height: 500rpx;
	}
</style>