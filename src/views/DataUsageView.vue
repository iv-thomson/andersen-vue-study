<template>
  <div>
    <div class="spinner-wrapper">
      <ProgressSpinner v-if="loading" />
    </div>
    <div class="data-usage">
      <div class="overview-header">
        <h1 class="overview-header__title">
          <i class="pi pi-chart-pie title-icon"></i>
          <b> All Data usage</b> - September 2024
        </h1>
        <PrimeButton label="Export to CSV" icon="pi pi-file" class="export-button" @click="handleExportToCSV"/>
      </div>
      <Message  closable icon="pi pi-exclamation-circle" class="closable-disclaimer">
        <b>Disclaimer</b>
        <div class="p-message-text">
          Data received can be 1—2 days delayed from the carrier.
        </div>
      </Message>
      <DataCards
        :value="value"
        :options="options"
        :figures="figures"
        @update:value="updateSelectedValue"
      />
      <DataTable 
        :data="nodes"
        :headers="tableHeaders" 
        :rows-per-page="rows" 
        :total-records="totalRecords" 
      />
   </div>
 </div>
</template>

<script>
import { fetchDataUsage, fetchKeyFigures } from '@/api/data-usage.api';
import { fileDowload } from '@/services/fileDowload';
import DataTable from '@/components/DataTable.vue';
import DataCards from '@/components/DataCards.vue'
import ProgressSpinner from 'primevue/progressspinner';
import PrimeButton from 'primevue/button';
import Message from 'primevue/message';

export default {
  name: 'DataUsageView',
  components: { DataTable, DataCards, ProgressSpinner, PrimeButton, Message },
  data() {
    return {
      value: 'All',
      options: ["All", "Domestic", "Roaming"],
      figures: [],
      nodes: {},
      tableHeaders: [],
      rows: 10,
      loading: false,
      totalRecords: 0,
    };
  },
  watch: {
    value: "loadFiguresData"
  },
  mounted() {
    this.loadPageData();
    this.loadFiguresData()
  },
  methods: {
    updateSelectedValue(newValue) {
      this.value = newValue;
    },
    loadPageData() {
      this.loading = true;
      fetchDataUsage()
        .then((data) => {
          this.nodes = data;
          this.tableHeaders = Object.keys(data[0]);
          this.totalRecords = data.length; 
          this.loading = false;
        })
        .catch((error) => {
          console.error('Error fetching data-usage.json:', error);
          this.loading = false;
        });
    },
    loadFiguresData() {
      this.loading = true;
      fetchKeyFigures(this.value)
        .then((data) => {
          this.figures = data[this.value];
          this.loading = false;
        })
        .catch((error) => {
          console.error('Error fetching key-figures.json:', error);
          this.loading = false;
        });
    },
    handleExportToCSV() {
      const data = this.nodes.map(node => [
        node.name,
        node.number,
        node.status,
        node.costCenter
      ]);

      fileDowload(data, this.tableHeaders, 'data-usage.csv');
    },
  },
  }
</script>

<style lang="scss">
.export-button {
  &.p-button {
    background: #004b85;
    border: none;
    height: 36px;

    &.p-component:hover {
      background: #005a9c;
      border: none;
    }
  }
}
.closable-disclaimer {
  &.p-message {
    color: #004B85;
    font-size: 16px;
    border: 1px solid #004B85;
    padding: 10px;
    border-radius: 16px;
    background: #F0F9FF;
  }
}
</style>

<style scoped lang="scss">
.spinner-wrapper {
  display: flex;
  justify-content: center;
}
.data-usage {
  display: flex;
  flex-direction: column;
  margin-top: 41px;
  padding: 0 36px;
  gap: 36px;

  .overview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__title {
      font-weight: 400;
      font-size: 31px;
    }
  }

  .title-icon {
    font-size: 32px;
    color: #007BFF;
  }
}
</style>
