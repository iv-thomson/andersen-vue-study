<template>
  <div class="base-chart-container">
    <div class="base-chart-container__info-block"></div>
    <div ref="chartContainer" class="base-chart-container__chart"></div>
  </div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

// Применение темы
am4core.useTheme(am4themes_animated)

export default {
  name: 'BaseChartContainer',
  props: {
    chartData: {
      type: Array,
      required: true, // Данные для графика (обязательный пропс)
      default: () => [],
    },
  },
  emits: ['chart-created'],
  data() {
    return {
      chart: null, // Ссылка на объект графика
    }
  },
  watch: {
    // Следим за изменениями данных и обновляем график
    chartData: {
      deep: true,
      handler(newData) {
        if (this.chart) {
          this.chart.data = newData // Обновляем данные графика
        }
      },
    },
  },
  mounted() {
    this.initChart()
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose() // Полностью уничтожаем график
      this.chart = null // Удаляем ссылку на объект графика
    }
  },
  methods: {
    initChart() {
      // Создание графика (исключаем из реактивности Vue)
      const chart = am4core.create(this.$refs.chartContainer, am4charts.XYChart)
      this.chart = chart // Сохраняем ссылку на график

      // Эмитируем событие, передавая созданный график
      this.$emit('chart-created', chart, this.chartData)

      am4core.options.autoDispose = true // Устанавливаем автоматическое удаление графика
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
    width: 300px;
    height: 700px;
    background-color: $color-light-gray;
  }

  &__chart {
    width: 100%;
    height: 100%;
    min-height: 600px;
    padding: 10px;
  }
}
</style>
