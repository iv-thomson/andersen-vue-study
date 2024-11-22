<template>
  <section class="table-wrapper">
    <div class="table-wrapper__header">
      <h1 class="table-wrapper__title">Detailed Data Usage</h1>
      <div class="search-input">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Input"
          class="search-input__field"
          @input="filterData"
        />
        <i class="pi pi-search search-input__icon"></i>
      </div>
    </div>
    <table class="data-table">
      <thead class="data-table__header">
        <tr>
          <th v-for="field in headers" :key="field" class="data-table__header-item">
            {{ capitalizedField(field) }}
            <i :class="getSortIcon(field)" class="pi sort-icon"  @click="sortData(field)"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in displayedData" :key="row.key">
          <td>{{ row.name }}</td>
          <td>{{ row.number }}</td>
          <td>{{ row.status }}</td>
          <td>{{ row.costCenter }}</td>
        </tr>
        <tr v-if="filteredData.length === 0">
          <td colspan="4" class="empty-data">No data available for the selected filters.</td>
        </tr>
      </tbody>
    </table>
    <div class="data-table__footer">
      <p class="data-table__info">
        Showing {{ first + 1 }} to {{ last }} of {{ totalRecords }}
      </p>
      <div class="data-table__pagination">
        <button :disabled="currentPage === 1" class="pagination-button" @click="prevPage">
          <i class="pi pi-chevron-left" style="font-size: 0.6rem;"></i>
        </button>
        <div 
          v-for="page in totalPages"
          :key="page"
          :class="{ page_selected: page === currentPage}" 
          class="pagination-page"
          @click="onPage(page)"
        >
          {{ page }}
        </div>
        <button :disabled="currentPage === totalPages" class="pagination-button" @click="nextPage">
          <i class="pi pi-chevron-right" style="font-size: 0.6rem;"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
name: "AppTable",
props: {
  rowsPerPage: {
    type: Number,
    default: 10,
  },
  data: {
      type: Object,
      required: true,
      default: () => ({}),
  },
  totalRecords: {
    type: Number,
    default: 0,
  },
  headers: {
    type: Array,
    default: () => {[]}
  }
},
data() {
  return {
    searchQuery: '',
    currentPage: 1,
    sortField: null,
    sortOrder: 1,
    first: 0,
    last: 10,
  };
},
computed: {
  filteredData() {
    if (!this.searchQuery) return this.data;

    return this.data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    );
  },
  sortedData() {
    if (!this.sortField) return this.filteredData;

    return this.filteredData.toSorted((a, b) => {
      const valueA = a[this.sortField];
      const valueB = b[this.sortField];

      if (valueA < valueB) return -1 * this.sortOrder;
      if (valueA > valueB) return 1 * this.sortOrder;
      return 0;
    });
  },
  displayedData() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;

    return Object.values(this.sortedData).slice(start, end);
  },
  totalPages() {
    const onePage = 1;
    return this.sortedData.length ? Math.ceil(this.sortedData.length / this.rowsPerPage) : onePage;
  },
},
watch: {
  currentPage() {
    this.first = (this.currentPage - 1) * this.rowsPerPage;
    this.last = this.first + this.rowsPerPage;
  },
  filteredData(newValue) {
    this.last = this.first + newValue.length;
  }
},
methods: {
  capitalizedField(field) {
    if (!field) return '-';

    return field.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());;
  },
  getSortIcon(field) {
    if (this.sortField !== field) return 'pi-sort-alt';
  
    return this.sortOrder === 1 ? 'pi-sort-amount-up' : 'pi-sort-amount-down';
  },
  filterData() {
    this.currentPage = 1;
  },
  sortData(field) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 1 ? -1 : 1;
    } else {
      this.sortField = field;
      this.sortOrder = 1;
    }
  },
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
    }
  },
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
    }
  },
  onPage(page) {
    this.currentPage = page;
  }
}
};
</script>

<style scoped lang="scss">
.table-wrapper {
  border: 1px solid #BDBFC1;
  border-radius: 28px;
  margin: 18px 0 36px;
  box-shadow: 0px 20px 25px -5px #0000001A;
  padding: 36px;
  background: #FFFFFF;

    &__title {
      margin: 0;
      padding: 0;
      font-size: 25px;
    }

    &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 22px;
    color: #241F1F;
    font-size: 25px;

    .search-input {
      position: relative;
      display: flex;
      align-items: center;

      &__field {
        padding: 10px 16px 10px 40px;
        border: 1px solid #BDBFC1;
        background: #F9F9F9;
        border-radius: 14px;
        color: #485066;
        font-size: 13px;
      }

      &__icon {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        position: absolute;
        padding: 10px;
        left: 0;
        top: 1px;
      }
    } 
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    color: #485066;

    &__header {
      color: #485066;
      background-color:  #E9F0F4;
    }

    &__header-item {
      text-align: left;
      padding: 10px 18px;
      font-weight: 600;
      
      &:first-child {
        border-top-left-radius: 14px;
        border-bottom-left-radius: 14px;
      }
      &:last-child {
        border-top-right-radius: 14px;
        border-bottom-right-radius: 14px;
      }
    }
    td {
      padding: 20px 18px;
      border-bottom: 1px solid #BDBFC1;
    }
    .sort-icon {
      font-size: 0.8rem;
      padding-left: 17px;
      cursor: pointer;
    }

    &__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 18px;
    }

    &__pagination {
      display: flex;
      justify-content: space-between;
      background: #FFFFFF;
      gap: 18px;
    }
  }

  .pagination-button {
    font-size: 13px;
    margin: 0 10.5px;
    color: #0E1629;
    border: none;
    background: transparent;
    transition: transform 0.2s;
    cursor: pointer;

    &:hover {
      transform: scale(1.4);
    }

    &:disabled {
      color: #BDBFC1;
      background: transparent;
      border: none;
      cursor: not-allowed;
    }
  }

 .pagination-page {
    width: 30px;
    height: 30px;
    color: #bdbfc1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 24px;
    padding: 10px;
    cursor: pointer;
  }
  .page_selected {
    background-color: #007bff;
    color: #fff;
  }
  .empty-data {
    text-align: center;
    color: #888;
  }
}
</style>