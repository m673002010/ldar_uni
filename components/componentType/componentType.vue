<template>
	<view>
		<canvas canvas-id="hMKQlyfXlafbaRwXWOUJRIhkuhQOoNoQ" id="hMKQlyfXlafbaRwXWOUJRIhkuhQOoNoQ" class="charts" @touchend="tap"/>
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
		this.componentType()
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
			this.drawCharts('hMKQlyfXlafbaRwXWOUJRIhkuhQOoNoQ', res)
		},
		drawCharts(id,data){
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