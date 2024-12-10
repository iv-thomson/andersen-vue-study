<template>
  <div class="pagination">
    <div class="pagination__info">
      Showing {{ startIndex }} to {{ endIndex }} of {{ totalEntries }} entries
    </div>
    <div class="pagination__buttons">
      <button @click="prevPage" :disabled="currentPage === 1">
        <img src="@/assets/icons/angle-left.svg" alt="go-left-icon" />
      </button>
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :class="{ active: page === currentPage }"
      >
        {{ page }}
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        <img src="@/assets/icons/angle-right.svg" alt="go-right-icon" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
    totalEntries: {
      type: Number,
      required: true,
    },
    sortedData: {
      type: Array,
      required: true,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalEntries / this.itemsPerPage)
    },
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage + 1
    },
    endIndex() {
      return Math.min(this.currentPage * this.itemsPerPage, this.totalEntries)
    },
    visiblePages() {
      const maxVisible = 5
      const halfVisible = Math.floor(maxVisible / 2)
      let start = Math.max(1, this.currentPage - halfVisible)
      let end = Math.min(this.totalPages, this.currentPage + halfVisible)

      if (this.currentPage <= halfVisible) {
        end = Math.min(maxVisible, this.totalPages)
      } else if (this.currentPage + halfVisible > this.totalPages) {
        start = Math.max(1, this.totalPages - maxVisible + 1)
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i)
    },
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.$emit('update:currentPage', this.currentPage - 1)
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('update:currentPage', this.currentPage + 1)
      }
    },
    goToPage(page) {
      this.$emit('update:currentPage', page)
    },
  },
}
</script>

<style scoped>
.pagination__info {
  margin-top: 10px;
}

.pagination {
  display: flex;
  justify-content: space-between;
  margin: 18px auto;
  font-weight: 600;
}
.pagination__buttons button {
  margin: 0 5px;
  background-color: transparent;
  color: #bdbfc1;
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
}
.pagination__buttons button:hover:not(.active) {
  background-color: #f9f9f9;
}

.pagination__buttons button.active {
  background-color: #007bff;
  color: white;
}
</style>
