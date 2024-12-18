<template>
  <div class="monthly-billing">
    <div class="monthly-billing__header">
      <h1 class="monthly-billing__page-title">
        Monthly Billing - <span>{{ selectedCategory }}</span>
      </h1>
      <div class="monthly-billing__bread-crumbs">
        <span class="monthly-billing__bread-crumb">Carrier Reports</span>
        <img src="@/assets/icons/chevron-right.svg" alt="chevron" />
        <span class="monthly-billing__bread-crumb">Monthly Billing</span>
      </div>
    </div>
    <div class="monthly-billing__wrapper monthly-billing__wrapper_small">
      <CategorySwitch v-model="selectedCategory" :categories="categoryOptions">
      </CategorySwitch>
    </div>
    <div class="monthly-billing__wrapper monthly-billing__wrapper_large">
      <keep-alive>
        <BaseChartContainer
          v-if="chartDataSelected && chartDataSelected.length > 0"
          :chart-data="chartDataSelected"
          @chart-created="onChartCreated"
        >
          <template #info-block>
            <div
              v-for="(value, key) in infoChartData(0, 3)"
              :key="value + key"
              class="info-block info-block_chart"
            >
              <div class="info-block__value">{{ '$' + value }}</div>
              <div class="info-block__title">{{ key }}</div>
            </div>
          </template>
        </BaseChartContainer>
        <ProgressSpinner v-else />
      </keep-alive>
    </div>
    <div
      class="monthly-billing__wrapper monthly-billing__wrapper_large monthly-billing__wrapper_dashboard"
    >
      <div
        v-for="(value, key) in infoChartData(3)"
        :key="value + key"
        class="info-block info-block_dashboard"
      >
        <div class="info-block__value">
          {{ key === 'Average Cost Per Device' ? '$' + value : value }}
        </div>
        <div class="info-block__title">{{ key }}</div>
      </div>
    </div>
    <div class="monthly-billing__wrapper monthly-billing__wrapper_medium">
      <CategorySwitch
        v-model="selectedSmartCategory"
        :categories="smartphonesOptions"
      >
      </CategorySwitch>
      <keep-alive>
        <BaseChartContainer
          v-if="
            smartphonesChartDataSelected &&
            smartphonesChartDataSelected.length > 0
          "
          :chart-data="smartphonesChartDataSelected"
          @chart-created="onSmartphonesChartCreated"
        >
        </BaseChartContainer>
        <ProgressSpinner v-else />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import {
  fetchMonthlyBilling,
  fetchInfoPanelsData,
  fetchSmartphonesData,
} from '@/api/montly-billing.api'
import ProgressSpinner from 'primevue/progressspinner'
import CategorySwitch from '@/components/AssetsTable/CategorySwitch.vue'
import BaseChartContainer from '@/components/BaseChartContainer/BaseChartContainer.vue'
import initXYChart from '@/components/BaseChartContainer/MonthlyBillingChartConfig/MonthlyBillingChartConfig'
import initXYSmartphonesChart from '@/components/BaseChartContainer/MonthlyBillingChartConfig/SmartphonesChartConfig'
import {
  CATEGORY_OPTIONS,
  SELECTED_CATEGORY,
  SMARTPHONES_OPTIONS,
  SELECTED_SMARY_CATEGORY,
} from '@/components/BaseChartContainer/constants/monthlyBilling'

export default {
  name: 'MonthlyBilling',
  components: { CategorySwitch, BaseChartContainer, ProgressSpinner },
  data() {
    return {
      chartData: [],
      infoData: [],
      smartphonesData: [],
      categoryOptions: CATEGORY_OPTIONS,
      selectedCategory: SELECTED_CATEGORY,
      smartphonesOptions: SMARTPHONES_OPTIONS,
      selectedSmartCategory: SELECTED_SMARY_CATEGORY,
    }
  },
  computed: {
    categoryIndex() {
      return this.findCategoryIndex(this.categoryOptions, this.selectedCategory)
    },
    smartCategoryIndex() {
      return this.findCategoryIndex(
        this.smartphonesOptions,
        this.selectedSmartCategory,
      )
    },
    chartDataSelected() {
      return this.getSelectedData(this.chartData, this.categoryIndex)
    },
    smartphonesChartDataSelected() {
      return this.getSelectedData(this.smartphonesData, this.smartCategoryIndex)
    },
  },
  async created() {
    try {
      this.chartData = await fetchMonthlyBilling()
      this.infoData = await fetchInfoPanelsData()
      this.smartphonesData = await fetchSmartphonesData()
    } catch (error) {
      console.error('Data fetching error:', error)
    }
  },
  methods: {
    onChartCreated(chart, chartData) {
      initXYChart(chart, chartData)
    },
    onSmartphonesChartCreated(chart, chartData) {
      initXYSmartphonesChart(chart, chartData)
    },
    infoChartData(start, end) {
      const data = this.infoData[this.categoryIndex]
      if (!data) return null
      return Object.fromEntries(Object.entries(data).slice(start, end))
    },
    findCategoryIndex(options, selectedCategory) {
      return options.findIndex(category => category.name === selectedCategory)
    },
    getSelectedData(dataArray, index) {
      return index >= 0 && dataArray[index] ? dataArray[index] : null
    },
  },
}
</script>

<style lang="scss" scoped>
.monthly-billing {
  position: relative;
  padding: 0 80px 30px;
  display: flex;
  flex-direction: column;
  gap: 36px;

  &__header {
    max-width: 1308px;
    position: relative;
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
    align-items: baseline;
  }

  &__page-title {
    padding-left: 40px;
    margin-bottom: 0;
  }

  &__page-title::before {
    content: '';
    position: absolute;
    top: 25px;
    left: 0;
    width: 32px;
    height: 32px;
    background: url('../assets/icons/chart-bar.svg') no-repeat center/contain;
  }

  &__bread-crumbs {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__bread-crumb {
    font-size: 0.8rem;
    font-weight: 600;
    text-decoration: underline;
    color: #007bff;
    cursor: pointer;
  }

  &__wrapper {
    max-width: 1308px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    border: 1px solid #bdbfc1;
    border-radius: 28px;
    box-shadow: 0px 10px 10px -5px #0000000a;
    box-shadow: 0px 20px 25px -5px #0000001a;
    &_dashboard {
      flex-direction: row;
    }
    &_small {
      padding: 0 18px;
    }
    &_medium {
      padding: 10px 24px;
    }
    &_large {
      padding: 24px;
    }
  }
}

.info-block {
  padding: 18px 18px 28px;
  border-radius: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  &_chart {
    width: 326px;
    height: 158px;
    border: 1px solid #bdbfc1;
  }
  &_dashboard {
    width: 417px;
    height: 165px;
    background: linear-gradient(135deg, #0e1629 -0.52%, #485066 99.48%);
    color: #ffffff;
  }
  &__value {
    font-size: 48px;
    font-weight: 500;
  }
}
</style>
