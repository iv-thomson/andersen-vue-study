import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'

export default function initXYChart(chart, chartData) {
  chart.data = chartData

  const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
  categoryAxis.dataFields.category = 'month'
  categoryAxis.renderer.grid.template.disabled = true
  categoryAxis.renderer.baseGrid.disabled = true
  categoryAxis.renderer.line.strokeWidth = 1
  categoryAxis.renderer.line.strokeOpacity = 0.5
  categoryAxis.renderer.line.stroke = am4core.color('#000000')

  const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
  valueAxis.renderer.grid.template.disabled = true
  valueAxis.renderer.baseGrid.disabled = true
  valueAxis.renderer.line.strokeWidth = 1
  valueAxis.renderer.line.strokeOpacity = 1
  valueAxis.renderer.line.stroke = am4core.color('#000000')
  valueAxis.min = 0
  valueAxis.renderer.labels.template.adapter.add('dy', dy => dy - 10)
  valueAxis.renderer.labels.template.adapter.add('text', text => {
    return '$' + text
  })

  const series1 = chart.series.push(new am4charts.ColumnSeries())
  series1.dataFields.valueY = 't-mobile'
  series1.dataFields.categoryX = 'month'
  series1.name = 'T-Mobile'
  series1.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]'
  series1.columns.template.fill = am4core.color('#67b7dc')
  series1.columns.template.strokeWidth = 0
  series1.columns.template.adapter.add('y', y => y - 10)

  const series2 = chart.series.push(new am4charts.ColumnSeries())
  series2.dataFields.valueY = 'bell'
  series2.dataFields.categoryX = 'month'
  series2.name = 'Bell'
  series2.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]'
  series2.columns.template.fill = am4core.color('#6794dc')
  series2.columns.template.strokeWidth = 0
  series2.stacked = true
  series2.columns.template.adapter.add('y', y => y - 10)

  const series3 = chart.series.push(new am4charts.ColumnSeries())
  series3.dataFields.valueY = 'AT&T'
  series3.dataFields.categoryX = 'month'
  series3.name = 'AT&T'
  series3.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]'
  series3.columns.template.fill = am4core.color('#6771dc')
  series3.columns.template.strokeWidth = 0
  series3.columns.template.column.cornerRadiusTopLeft = 8
  series3.columns.template.column.cornerRadiusTopRight = 8
  series3.stacked = true
  series3.columns.template.adapter.add('y', y => y - 10)

  chart.paddingTop = 20
  chart.legend = new am4charts.Legend()
  chart.legend.useDefaultMarker = true
  const marker = chart.legend.markers.template
  marker.width = 36
  marker.height = 36

  const markerBackground = marker.children.getIndex(0)
  markerBackground.cornerRadius(14, 14, 14, 14)

  return chart
}
