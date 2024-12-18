import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'

export default function initXYSmartphonesChart(chart, chartData) {
  chart.data = chartData

  const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
  categoryAxis.dataFields.category = 'parameter'
  categoryAxis.renderer.grid.template.disabled = true
  categoryAxis.renderer.baseGrid.disabled = true
  categoryAxis.renderer.line.strokeWidth = 1
  categoryAxis.renderer.line.strokeOpacity = 1
  categoryAxis.renderer.line.stroke = am4core.color('#000000')
  categoryAxis.renderer.labels.template.adapter.add('dy', dy => dy - 10)

  const valueAxis = chart.xAxes.push(new am4charts.ValueAxis())
  valueAxis.renderer.grid.template.disabled = true
  valueAxis.renderer.baseGrid.disabled = true
  valueAxis.renderer.line.strokeWidth = 1
  valueAxis.renderer.line.strokeOpacity = 0.5
  valueAxis.renderer.line.stroke = am4core.color('#000000')
  valueAxis.min = 0
  valueAxis.renderer.labels.template.adapter.add('dx', dx => dx + 20)
  valueAxis.renderer.labels.template.adapter.add('text', text => {
    return '$' + text
  })

  const series = chart.series.push(new am4charts.ColumnSeries())
  series.dataFields.valueX = 'sum'
  series.dataFields.categoryY = 'parameter'
  series.name = 'sum'
  series.columns.template.tooltipText = '{categoryY}: [bold]{valueX}[/]'
  series.columns.template.fill = am4core.color('#004B85')
  series.columns.template.strokeWidth = 0
  series.columns.template.column.cornerRadiusTopRight = 8
  series.columns.template.column.cornerRadiusBottomRight = 8
  series.columns.template.adapter.add('x', x => x + 20)
  series.columns.template.adapter.add('y', y => y - 10)

  chart.paddingRight = 60

  return chart
}
