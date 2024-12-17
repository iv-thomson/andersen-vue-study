<template>
  <div class="base-chart-container">
    <div class="base-chart-container__info-block">
      <slot name="info-block"></slot>
    </div>
    <div ref="chartContainer" class="base-chart-container__chart"></div>
  </div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

am4core.useTheme(am4themes_animated)

export default {
  name: 'BaseChartContainer',
  props: {
    chartData: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  emits: ['chart-created'],
  data() {
    return {
      chart: null,
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(newData) {
        if (this.chart) {
          this.chart.data = newData
        }
      },
    },
  },
  mounted() {
    this.initChart()
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  },
  methods: {
    initChart() {
      const chart = am4core.create(this.$refs.chartContainer, am4charts.XYChart)
      this.chart = chart

      this.$emit('chart-created', chart, this.chartData)

      am4core.options.autoDispose = true
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets/variables';

.base-chart-container {
  display: flex;
  gap: 18px;

  &__info-block {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  &__chart {
    width: 100%;
    height: 100%;
    min-height: 550px;
    padding: 10px;
  }
}
</style>
