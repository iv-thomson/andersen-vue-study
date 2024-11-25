<template>
  <DataTable
    v-model:selection="selectedRows"
    :loading="!itemsTableData.length"
    :value="itemsData"
    removable-sort
    paginator
    :paginator-template="'PrevPageLink PageLinks NextPageLink'"
    :rows="itemsPerPage"
    :first="firstPage"
    table-style="font-size: 0.8rem"
    @page="handlePageChange"
  >
    <template #paginatorstart>
      <p class="base-table__info">
        Showing {{ from }} to <span>{{ to }}</span> of
        {{ itemsTableData.length }} entries
      </p>
    </template>
    <Column selection-mode="multiple" />
    <Column
      v-for="(key, index) in tableHeaderNames"
      :key="`${key}-${index}`"
      :field="key"
      :header="preparedKey(key)"
      sortable
    ></Column>
  </DataTable>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

export default {
  name: 'BaseTable',
  components: { DataTable, Column },
  props: {
    itemsData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      itemsTableData: [],
      selectedRows: [],
      itemsPerPage: 10,
      pageNumber: 1,
    }
  },
  computed: {
    tableHeaderNames() {
      return Object.keys(this.itemsTableData[0] || {})
    },

    firstPage() {
      return (this.pageNumber - 1) * this.itemsPerPage
    },

    from() {
      return this.itemsTableData.length === 0
        ? 0
        : (this.pageNumber - 1) * this.itemsPerPage + 1
    },

    to() {
      return Math.min(
        this.pageNumber * this.itemsPerPage,
        this.itemsTableData.length,
      )
    },
  },
  watch: {
    itemsData: {
      immediate: true,
      handler(newVal) {
        this.itemsTableData = [...newVal]
      },
    },
  },
  methods: {
    preparedKey(key) {
      const formattedString = key.replace(/([a-z])([A-Z])/g, '$1 $2')
      return formattedString.charAt(0).toUpperCase() + formattedString.slice(1)
    },

    handlePageChange(event) {
      this.pageNumber = event.page + 1
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep(.p-datatable-header-cell) {
  background-color: #e9f0f4;
  border-top: 1px solid #bdbfc1;
  border-bottom: 1px solid #bdbfc1;
  height: 40px;
}

::v-deep(.p-datatable-header-cell:not(:first-child)) {
  width: 148px;
  padding: 10px;
}

::v-deep(.p-datatable-header-cell:first-child) {
  width: 50px;
  padding: 10px;
  display: flex;
  justify-content: center;
  border-left: 1px solid #bdbfc1;
  border-radius: 14px 0 0 14px;
}

::v-deep(.p-datatable-header-cell:last-child) {
  border-right: 1px solid #bdbfc1;
  border-radius: 0 14px 14px 0;
}

::v-deep(.p-checkbox),
::v-deep(.p-checkbox-box) {
  width: 16px;
  height: 16px;
  margin-right: 1px;
}

::v-deep(.p-datatable-sort-icon) {
  width: 12.4px;
  height: 12.4px;
}

::v-deep(.p-row-odd > td),
::v-deep(.p-row-even > td) {
  height: 56px !important;
  padding: 10px;
}

::v-deep(.p-row-odd > td:first-child),
::v-deep(.p-row-even > td:first-child) {
  display: flex;
  justify-content: center;
  align-items: center;
}

// ::v-deep(.p-paginator-content) {
//   width: 30px !important;
//   height: 30px;
// }

::v-deep(button.p-paginator-page-selected) {
  width: 30px;
  background-color: #007bff;
  color: #fff;
}

::v-deep(.p-paginator-pages > button.p-paginator-page) {
  max-width: 30px !important;
}

.base-table__info {
  color: #485066;
  font-size: 0.8rem;
  font-weight: 600;
  & > span {
    text-decoration: underline;
  }
}
</style>
