<template>
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
    <section class="tree-table__wrapper">
      <TreeTable 
      :value="nodes" 
      :paginator="true" 
      :rows="rows" 
      :loading="loading"
      :total-records="totalRecords"
      :filters="filters"
      table-style="min-width: 50rem"
      @page="onPage"
    >
      <template #header>
          <div class="table-header">
            <h1>Detailed Data Usage</h1>
              <IconField>
                  <InputIcon class="pi pi-search" />
                  <InputText v-model="filters['global']" placeholder="Input" />
              </IconField>
          </div>
      </template>
      <template #empty>
        <div class="table-empty">
          <i class="pi pi-info-circle" style="font-size: 1rem;"></i>
          <span> No data available for the selected filters.</span>
        </div>
      </template>
      <Column field="name" header="Name" sortable></Column>
      <Column field="number" header="Employee Number" sortable></Column>
      <Column field="status" header="Status" sortable></Column>
      <Column field="costCenter" header="Cost Center" sortable></Column>
      <span class="showing-info">Showing {{ first + 1 }} to {{ last }} of {{ totalRecords }}</span>
    </TreeTable>
    </section>
  </div>
</template>

<script>
import { fetchDataUsage, fetchKeyFigures } from "@/api/data-usage.api";
import { fileDowload } from '@/services/fileDowload';
import PrimeButton from 'primevue/button';
import TreeTable from 'primevue/treetable';
import Message from 'primevue/message';
import SelectButton from 'primevue/selectbutton';
import Card from 'primevue/card';
import Column from 'primevue/column';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
export default {
  name: 'DataUsageView',
  components: { PrimeButton, Message, SelectButton, Card, TreeTable, Column, IconField, InputIcon, InputText },
  data() {
    return {
      value: 'All',
      options: ['All', 'Top Data Users (>5GB)', '0531177937 - Bell'],
      figures: [],
      nodes: null,
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
    onPage(event) {
      this.first = event.first;
      this.last = event.first + event.rows;
      this.loading = true;
      this.loadPageData();
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
.tree-table__wrapper {
  border: 1px solid #BDBFC1;
  border-radius: 28px;
  margin-top: 18px;
  margin-bottom: 36px;
  box-shadow: 0px 20px 25px -5px #0000001A;
  padding: 28px 36px;
  background: #FFFFFF;
}
.p-treetable.p-component {
  margin-top: 18px;
  margin-bottom: 18px;
}
.p-treetable-thead {
  border: 1px solid #BDBFC1;
}
.p-treetable-header-cell.p-treetable-sortable-column {
  color: #485066;
  background-color:  #E9F0F4;
  font-weight: bold;
  padding: 10px 18px; 
}
.p-inputtext.p-component {
  border-radius: 14px;
}
.p-paginator.p-component {
  justify-content: end;
  padding-top: 18px;
  padding-bottom: 0;
}
.p-paginator-pages>.p-paginator-page.p-paginator-page-selected {
  background: #007BFF;
  color: #FFFFFF;
}
.showing-info {
  position: absolute;
  bottom: 12px;
  font-size: 13px;
  color: #485066;
}
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 6px;
}
.table-header h1 {
  margin: 0; 
  font-size: 25px;
}
.table-header .p-iconfield {
  display: flex;
  align-items: center;
}
</style>
