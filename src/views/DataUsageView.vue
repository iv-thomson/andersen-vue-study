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
      <section class="data-usage__cards">
        <SelectButton v-model="value" :options="options"/>
        <div class="data-usage__card-list">
          <Card
            v-for="(figure, index) in figures"
            :key="index"
            style="width: 25rem; overflow: hidden"
          >
            <template #title>{{ figure.value}}</template>
            <template #subtitle>{{ figure.description }}</template>
          </Card>
        </div>
      </section>
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
import { fetchDataUsage, fetchKeyFigures } from "@/api/data-usage.api";
import { fileDowload } from '@/services/fileDowload';
import DataTable from "@/components/DataTable.vue";
import ProgressSpinner from 'primevue/progressspinner';
import PrimeButton from 'primevue/button';
import Message from 'primevue/message';
import SelectButton from 'primevue/selectbutton';
import Card from 'primevue/card';

export default {
  name: 'DataUsageView',
  components: { DataTable, ProgressSpinner, PrimeButton, Message, SelectButton, Card },
  data() {
    return {
      value: 'All',
      options: ['All', 'Top Data Users (>5GB)', '0531177937 - Bell'],
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
  mounted() {
    this.loadPageData();
    this.loadFiguresData()
  },
  methods: {
    formatNodes(data) {
      return data.map((item, index) => ({
        key: index.toString(),
        data: {
          name: item.name || "-", 
          number: item.number || "-",
          status: item.status || "-",
          costCenter: item.costCenter || "-",
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
    loadPageData() {
      this.loading = true;
      fetchDataUsage()
        .then((data) => {
          this.nodes = this.formatNodes(data);
          this.totalRecords = data.length; 
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching data-usage.json:", error);
          this.loading = false;
        });
    },
    loadFiguresData() {
      this.loading = true;
      fetchKeyFigures()
        .then((data) => {
          this.figures = data;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching key-figures.json:", error);
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

<style>
.data-usage {
  display: flex;
  flex-direction: column;
  margin-top: 41px;
  padding: 0 36px;
  gap: 36px;
}
.overview-header {
  display: flex;
  justify-content: space-between;
  align-items: center
}
.overview-header__title {
  font-weight: 400;
  font-size: 31px;
}
.title-icon {
  font-size: 32px;
  color: #007BFF;
}
.export-button.p-button {
  background:#004B85;
  border: none;
  height: 36px;
}
.export-button.p-button.p-component:hover {
  background: #005A9C;
  border: none;
}
.closable-disclaimer.p-message {
  color: #004B85;
  font-size: 16px;
  border: 1px solid #004B85;
  padding: 10px;
  border-radius: 16px;
  background: #F0F9FF;
}
.data-usage__cards {
  padding: 36px;
  border: 1px solid #BDBFC1;
  border-radius: 28px;
  background: #ffffff;
  box-shadow: 0px 20px 25px -5px #0000001A;
}
.data-usage__cards > .p-selectbutton.p-component {
  height: 44px;
  border-radius: 16px;
  border: 1px solid #BDBFC1
}
.p-togglebutton.p-component {
  color: #AAACAD;
  background: #FFFFFF;
  font-size: 13px;
  border-radius: 16px !important;
  border-color: #FFFFFF;
}
.p-togglebutton.p-component.p-togglebutton-checked {
  padding: 10px 18px;
  color: #FFFFFF;
  background: #FFFFFF;
  border: none;
}
.p-togglebutton.p-component.p-togglebutton-checked::before {
  border-radius: 16px;
  background: linear-gradient(135deg, #0E1629 -0.52%, #485066 99.48%);
}
.data-usage__card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 36px;
}
.data-usage__card-list > .p-card {
  min-width: 419px;
  height: 164px;
  justify-content: center;
  background: linear-gradient(135deg, #0E1629 -0.52%, #485066 99.48%);
  color: #FFFFFF;

}
.data-usage__card-list .p-card-title {
  font-size: 49px;
}
</style>
