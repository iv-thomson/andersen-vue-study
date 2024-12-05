<template>
  <button class="button-add-item" @click="controlDialog">
    <i class="pi pi-plus"></i><span class="button-add-item-text">Add item</span>
  </button>
  <AddItemModal
    v-model:visible="visible"
    :active-category="defaultCategory"
    header="Edit Profile"
    @submit-form-data="handleFormData"
  />
  <table class="assets-table">
    <thead class="assets-table__header">
      <tr>
        <th
          v-for="(column, index) of columns"
          :key="index"
          class="assets-table__header-item"
          :class="{
            sortable: column.sortable !== false,
            asc: setSortType('asc', column),
            desc: setSortType('desc', column),
            'sort-active': sortConfig.column === column.label,
          }"
          @click="sortTable(column.label)"
        >
          {{ column.name }}
          <i :class="getSortIcon(column.label)"></i>
        </th>
      </tr>
    </thead>
    <tbody class="assets-tbody">
      <tr
        v-for="(row, rowIndex) in paginationRows"
        :key="rowIndex"
        class="assets-tbody__row"
      >
        <td
          v-for="(column, colIndex) in columns"
          :key="colIndex"
          class="assets-tbody__row-data"
        >
          {{ formatRowData(row[column.label]) }}
        </td>
      </tr>
    </tbody>
  </table>
  <div class="pagination">
    <div class="pagination-total-items">
      Showing 1 to 10 Of {{ totalItems }} Entries
    </div>
    <div class="pagination-pages">
      <button
        :disabled="currentPage === firstPage"
        class="pagination-pages__arrow"
        @click="goToPage(currentPage - 1)"
      >
        {{ '<' }}
      </button>
      <button
        :disabled="currentPage === firstPage"
        class="pagination-pages__number"
        @click="goToPage(1)"
      >
        {{ firstPage }}
      </button>
      <button
        v-show="totalPages !== 1"
        :disabled="currentPage === totalPages"
        class="pagination-pages__number"
        @click="goToPage(totalPages)"
      >
        {{ totalPages }}
      </button>
      <button
        :disabled="currentPage === totalPages"
        class="pagination-pages__arrow"
        @click="goToPage(currentPage + 1)"
      >
        {{ '>' }}
      </button>
    </div>
  </div>
</template>

<script>
import { fetchItemsByCategory } from '@/api/asset-management.api'
import { getColumnNames } from '@/utils/getColumnNames'
import AddItemModal from './AddItemModal.vue'

export default {
  name: 'AssetsTable',
  components: {
    AddItemModal,
  },
  props: {
    defaultCategory: {
      type: String,
      required: true,
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
      currentPage: 1,
      rowsPerPage: 10,
      totalPages: 1,
      paginationRows: [],
      firstPage: 1,
      lastPage: 4,
      totalItems: 0,
      visible: false,
      sortedList: [],
    }
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

  watch: {
    async defaultCategory(newCategory, oldCategory) {
      if (newCategory !== oldCategory) {
        this.currentPage = 1
        this.getDataByCategory(this.defaultCategory)
      }
    },
  },

  created() {
    this.getDataByCategory(this.defaultCategory)
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
        this.totalItems = categoryData.length
        this.updatePagination()
      } catch (err) {
        throw new Error('Error during fetching the data', err)
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
      this.updatePagination()
    },

    getSortIcon(label) {
      if (this.sortConfig.column === label) {
        return this.sortConfig.direction === 'asc'
          ? 'pi pi-sort-amount-up'
          : 'pi pi-sort-amount-down'
      }
      return 'pi pi-sort-alt'
    },

    goToPage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber
        this.updatePagination()
      }
    },

    updatePagination() {
      const sortedRows = this.sortRows(this.rows)
      this.totalPages = Math.ceil(this.rows.length / this.rowsPerPage)
      this.paginationRows = this.getPaginatedRows(sortedRows)
    },

    getPaginatedRows(sortedRows) {
      const startIndex = (this.currentPage - 1) * this.rowsPerPage
      const endIndex = startIndex + this.rowsPerPage
      return sortedRows.slice(startIndex, endIndex)
    },

    sortRows(rows) {
      if (!this.sortConfig.column) return rows

      const { column, direction } = this.sortConfig

      return [...rows].toSorted((a, b) => {
        const currValue = a[column]
        const followingValue = b[column]

        const comparison =
          typeof currValue === 'string'
            ? currValue.localeCompare(followingValue)
            : currValue - followingValue

        return direction === 'asc' ? comparison : -comparison
      })
    },

    setSortType(type, column) {
      return (
        this.sortConfig.column === column.label &&
        this.sortConfig.direction === type
      )
    },

    controlDialog() {
      this.visible = true
    },

    handleFormData(formData) {
      this.rows.push(formData)
      this.updatePagination()
      this.totalItems++
    },

    formatRowData(rowInput) {
      if (typeof rowInput === 'string') {
        return rowInput
      } else {
        return this.formatDate(rowInput)
      }
    },

    formatDate(rowInput) {
      const date = new Date(rowInput)
      return `${date.getFullYear()}-${this.formatNumber(date.getMonth() + 1)}-${this.formatNumber(date.getDate())}`
    },

    formatNumber(num) {
      return num < 10 ? '0' + num : num
    },
  },
}
</script>

<style lang="scss">
.button-add-item {
  display: flex;
  align-items: center;
  gap: 7px;
  align-self: flex-end;
  padding: 10px 18px;
  max-width: 118px;
  max-height: 36px;
  border: 1px solid #004b85;
  border-radius: 16px;
  background: #004b85;
  color: #ffff;
  font-weight: 600;
  cursor: pointer;

  .pi.pi-plus {
    font-size: 10px;
  }

  &-text {
    font-size: 13px;
    line-height: 16px;
  }
}
.assets-table {
  width: 100%;
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

.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &-pages {
    display: flex;
    align-items: baseline;
    gap: 18px;

    &__arrow {
      width: 4px;
      height: 7px;
      background: none;
      color: #485066;
      border: none;
      cursor: pointer;
    }

    &__number {
      width: 30px;
      height: 30px;
      color: #bdbfc1;
      background-color: #ffffff;
      background-color: #ffffff;
      border: none;
      border-radius: 50%;
      cursor: pointer;

      &:disabled {
        color: #ffffff;
        background-color: #007bff;
        border: 1px solid #007bff;
        border-radius: 50%;
      }
    }
  }
}
</style>
