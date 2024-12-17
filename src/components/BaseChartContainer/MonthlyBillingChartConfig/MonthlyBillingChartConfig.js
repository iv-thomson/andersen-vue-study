import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'

export default function initXYChart(chart, chartData) {
  chart.data = chartData

  const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
  categoryAxis.dataFields.category = 'country'
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

  const series1 = chart.series.push(new am4charts.ColumnSeries())
  series1.dataFields.valueY = 'litres1'
  series1.dataFields.categoryX = 'country'
  series1.name = 'Sales A'
  series1.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]'
  series1.columns.template.fill = am4core.color('#67b7dc')
  series1.columns.template.strokeWidth = 0

  const series2 = chart.series.push(new am4charts.ColumnSeries())
  series2.dataFields.valueY = 'litres2'
  series2.dataFields.categoryX = 'country'
  series2.name = 'Sales B'
  series2.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]'
  series2.columns.template.fill = am4core.color('#6794dc')
  series2.columns.template.strokeWidth = 0
  series2.stacked = false

  const series3 = chart.series.push(new am4charts.ColumnSeries())
  series3.dataFields.valueY = 'litres3'
  series3.dataFields.categoryX = 'country'
  series3.name = 'Sales C'
  series3.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]'
  series3.columns.template.fill = am4core.color('#6771dc')
  series3.columns.template.strokeWidth = 0
  series3.columns.template.column.cornerRadiusTopLeft = 8
  series3.columns.template.column.cornerRadiusTopRight = 8
  series3.stacked = false

  // Сдвиг столбцов
  series1.columns.template.adapter.add('y', y => y - 10)
  series2.columns.template.adapter.add('y', y => y - 10)
  series3.columns.template.adapter.add('y', y => y - 10)

  valueAxis.renderer.labels.template.adapter.add('dy', dy => dy - 10)

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
