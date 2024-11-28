<template>
  <table class="assets-table">
    <thead class="assets-table__header">
      <tr>
        <th
          v-for="(column, index) of columns"
          :key="index"
          class="assets-table__header-item"
          @click="sortTable(column.label)"
          :class="{
            sortable: column.sortable !== false,
            asc:
              sortConfig.column === column.label &&
              sortConfig.direction === 'asc',
            desc:
              sortConfig.column === column.label &&
              sortConfig.direction === 'desc',
            'sort-active': sortConfig.column === column.label,
          }"
        >
          {{ column.name }}
          <i :class="getSortIcon(column.label)"></i>
        </th>
      </tr>
    </thead>
    <tbody class="assets-tbody">
      <tr
        class="assets-tbody__row"
        v-for="(row, rowIndex) in sortedRows"
        :key="rowIndex"
      >
        <td
          class="assets-tbody__row-data"
          v-for="(column, colIndex) in columns"
          :key="colIndex"
        >
          {{ row[column.label] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { fetchItemsByCategory } from '@/api/asset-management.api'
import { getColumnNames } from '@/utils/getColumnNames'

export default {
  components: 'AssetsTable',
  props: {
    columnsList: {
      type: Array,
      required: false,
    },
    rowsList: {
      type: Array,
      required: false,
    },
    defaultCategory: {
      type: String,
      required: true,
    },
  },

  created() {
    this.getDataByCategory(this.defaultCategory)
  },

  watch: {
    async defaultCategory(newCategory, oldCategory) {
      if (newCategory !== oldCategory) {
        this.getDataByCategory(this.defaultCategory)
      }
    },
  },

  methods: {
    async getDataByCategory(defaultCategory) {
      try {
        const categoryData = await fetchItemsByCategory(defaultCategory)

        if (categoryData[0] && typeof categoryData[0] === 'string') {
          this.columns = categoryData.map(item => ({ name: item, label: item }))
          this.rows = []
          return
        }

        this.columns = getColumnNames(categoryData[0])
        this.rows = categoryData
      } catch (err) {
        console.error('Error during fetching the data', err)
      }
    },

    sortTable(columnLabel) {
      const { column, direction } = this.sortConfig

      if (column === columnLabel) {
        this.sortConfig.direction = direction === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortConfig.column = columnLabel
        this.sortConfig.direction = 'asc'
      }
    },

    getSortIcon(label) {
      if (this.sortConfig.column === label) {
        return this.sortConfig.direction === 'asc'
          ? 'pi pi-sort-amount-up'
          : 'pi pi-sort-amount-down'
      }

      return 'pi pi-sort-alt'
    },
  },

  computed: {
    sortedRows() {
      if (!this.sortConfig.column) {
        return this.rows
      }

      return [...this.rows].sort((a, b) => {
        const column = this.sortConfig.column
        const direction = this.sortConfig.direction === 'asc' ? 1 : -1

        if (typeof a[column] === 'string') {
          return direction * a[column].localeCompare(b[column])
        } else if (typeof a[column] === 'number') {
          return direction * (a[column] - b[column])
        }
        return 0
      })
    },
  },

  data() {
    return {
      rows: [],
      columns: [],
      sortConfig: {
        column: null,
        direction: null,
      },
    }
  },
}
</script>

<style lang="scss">
.assets-table {
  width: 100%;
  margin-left: 40px;
  font-size: 13px;
  line-height: 16px;
  color: #485066;
  border-collapse: collapse;

  &__header {
    height: 40px;
    text-transform: capitalize;
    color: #485066;
    background-color: #e9f0f4;
  }

  &__header-item {
    padding: 10px 18px;
    font-weight: 600;
    text-align: left;
    cursor: pointer;

    &:first-child {
      border-top-left-radius: 16px;
      border-bottom-left-radius: 16px;
    }

    &:last-child {
      border-top-right-radius: 16px;
      border-bottom-right-radius: 16px;
    }

    &.sort-active,
    &:hover {
      background-color: #454e66;
      color: #e9f0f4;
      opacity: 0.6;
    }
  }

  .pi {
    margin-left: 24px;
  }
}

.assets-tbody__row-data {
  padding: 20px 18px;
  border-bottom: 1px solid #bdbfc1;
}
</style>
