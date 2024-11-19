<template>
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
              <InputText :value="filters['global']" placeholder="Input" @input="onFilterChange" />
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
      </TreeTable>
      <span class="showing-info">
        Showing {{ first + 1 }} to {{ last }} of {{ totalRecords }}
      </span>
    </section>
  </template>
  
  <script>
  import TreeTable from 'primevue/treetable';
  import Column from 'primevue/column';
  import IconField from 'primevue/iconfield';
  import InputIcon from 'primevue/inputicon';
  import InputText from 'primevue/inputtext';
  
  export default {
    components: { TreeTable, Column, IconField, InputIcon, InputText },
    props: {
      nodes: {
        type: Object,
        required: true,
        default: () => ({}),
      },
      rows: {
        type: Number,
        default: 10,
      },
      loading: {
        type: Boolean,
        default: false,
      },
      totalRecords: {
        type: Number,
        default: 0,
      },
      filters: {
        type: Object,
        default: () => ({}),
      },
      first: {
       type: Number,
       default: 0,
     },
     last: {
       type: Number,
       default: 0,
     },
    },
    emits: ['update:page', 'update:filters'],
    methods: {
      onPage(event) {
        this.$emit('update:page', event);
      },
      onFilterChange(event) {
        this.$emit('update:filters', event)
      }
   },
  };
  </script>
<style lang="scss">
.tree-table__wrapper {
  position: relative;
  border: 1px solid #BDBFC1;
  border-radius: 28px;
  margin: 18px 0 36px;
  box-shadow: 0px 20px 25px -5px #0000001A;
  padding: 28px 36px;
  background: #FFFFFF;

  .p-treetable {
    &.p-component {
      margin: 18px 0;

      .p-treetable-header-cell {
        &.p-treetable-sortable-column {
          color: #485066;
          background-color:  #E9F0F4;
          font-weight: bold;
          padding: 10px 18px;
        }
      }
    }
  }
  .p-treetable-thead {
    border: 1px solid #BDBFC1;
 }
}
.p-inputtext {
  &.p-component {
    border-radius: 14px;
  }
}
.p-paginator {
  &.p-component {
    justify-content: end;
    padding-top: 18px;
    padding-bottom: 0;
  }

  .p-paginator-pages {
    .p-paginator-page {
      &.p-paginator-page-selected {
        background: #007BFF;
        color: #FFFFFF;
      }
    }
  }
}

.showing-info {
  position: absolute;
  bottom: 60px;
  font-size: 13px;
  color: #485066;
}
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 6px;

  h1 {
    margin: 0;
    font-size: 25px;
  }

  .p-iconfield {
    display: flex;
    align-items: center;
  }
}
</style>
  