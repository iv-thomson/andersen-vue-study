<template>
  <div>
    <ProgressSpinner v-if="loading"/>
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
        :nodes="nodes" 
        :filters="filters" 
        :rows="rows" 
        :loading="loading" 
        :total-records="totalRecords" 
        :first="first" 
        :last="last" 
        @update:page="handlePageChange"
        @update:filters="updateFilters" 
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
      filters: {},
      rows: 10,
      loading: false,
      totalRecords: 0,
      first: 0,
      last: 0,
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
    formatNodes(data) {
      return data.map((item, index) => ({
        key: index.toString(),
        data: {
          name: item.name || '-', 
          number: item.number || '-',
          status: item.status || '-',
          costCenter: item.costCenter || '-',
        },
        leaf: true,
      }));
    },
    handlePageChange(event) {
      this.first = event.first;
      this.last = event.first + event.rows;
      this.loading = true;
      this.loadPageData();
    },
    updateFilters(event) {
      this.filters = { ...this.filters, global: event.target.value };
    },
    updateSelectedValue(newValue) {
      this.value = newValue;
    },
    loadPageData() {
      this.loading = true;
      fetchDataUsage()
        .then((data) => {
          this.nodes = this.formatNodes(data);
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
      const headers = ['Name', 'Employee Number', 'Status', 'Cost Center'];
      const data = this.nodes.map(node => [
        node.data.name,
        node.data.number,
        node.data.status,
        node.data.costCenter
      ]);

      fileDowload(data, headers, 'data-usage.csv');
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
