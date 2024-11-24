<template>
  <table class="responsive-table">
    <thead>
      <tr>
        <th @click="sort('date')" class="table-header">
          Date
          <img
            class="table-header__icon"
            src="@/assets/icons/sort-alt.svg"
            alt="sort-icon"
          />
        </th>
        <th @click="sort('details')" class="table-header">
          Details
          <img
            class="table-header__icon"
            src="@/assets/icons/sort-alt.svg"
            alt="sort-icon"
          />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="message in paginatedData" :key="message.details">
        <td class="date-cell">
          <strong>{{ formatDate(message.date) }}</strong
          ><br />
          <span>{{ formatTime(message.time) }}</span>
        </td>
        <td class="details-cell">
          <span v-html="formatDetails(message)"></span>
          <button @click="viewDetails(message)" class="details-button">
            Details
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="pagination">
    <div class="pagination__info">
      Showing {{ startIndex }} To {{ endIndex }} Of {{ totalEntries }} Entries
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
import { fetchActivityLog } from '@/api/activity-log.api.js'

export default {
  name: 'EventTable',
  data() {
    return {
      activityLogs: [],
      sortKey: 'date',
      sortOrder: 'asc',
      currentPage: 1,
      itemsPerPage: 10,
    }
  },
  async mounted() {
    try {
      this.activityLogs = await fetchActivityLog()
    } catch (error) {
      this.error = error.message
      console.error('Error in component:', error)
    }
  },
  computed: {
    filteredData() {
      return this.activityLogs
    },
    sortedData() {
      return this.filteredData.slice().sort((a, b) => {
        const modifier = this.sortOrder === 'asc' ? 1 : -1
        const dateA = new Date(a.date + ' ' + a.time)
        const dateB = new Date(b.date + ' ' + b.time)
        if (dateA < dateB) return -1 * modifier
        if (dateA > dateB) return 1 * modifier
        return 0
      })
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      return this.sortedData.slice(start, start + this.itemsPerPage)
    },
    totalPages() {
      return Math.ceil(this.sortedData.length / this.itemsPerPage)
    },
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage + 1
    },
    endIndex() {
      return Math.min(this.currentPage * this.itemsPerPage, this.totalEntries)
    },
    totalEntries() {
      return this.activityLogs.length
    },
    visiblePages() {
      const maxVisible = 5
      const totalPages = this.totalPages
      const halfVisible = Math.floor(maxVisible / 2)

      let start = Math.max(1, this.currentPage - halfVisible)
      let end = Math.min(totalPages, this.currentPage + halfVisible)

      if (this.currentPage <= halfVisible) {
        end = Math.min(maxVisible, totalPages)
      } else if (this.currentPage + halfVisible > totalPages) {
        start = Math.max(1, totalPages - maxVisible + 1)
      }
      return Array.from({ length: end - start + 1 }, (_, i) => start + i)
    },
  },
  methods: {
    sort(key) {
      this.sortKey = key
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return date.toLocaleDateString('en-US', options)
    },
    formatTime(timeString) {
      const [time, modifier] = timeString.split(' ')
      let [hour, minute] = time.split(':')

      if (modifier === 'PM' && hour !== '12') {
        hour = parseInt(hour) + 12
      } else if (modifier === 'AM' && hour === '12') {
        hour = '00'
      }
      return hour + ':' + minute
    },
    formatDetails(message) {
      const match = message.details.match(/\[([^\]]+)\]: (.+)/)
      if (match) {
        const name = match[1]
        const content = match[2]
        return `${content} Email Sent To <a href="${message.url}" target="_blank">${message.url}</a> From <b>${name}</b>`
      }
      return message.details
    },
    prevPage() {
      this.currentPage--
    },
    nextPage() {
      this.currentPage++
    },
    viewDetails(ticket) {
      console.log('Viewing details for:', ticket)
    },
    goToPage(page) {
      this.currentPage = page
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets/variables';

.responsive-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.responsive-table th {
  background-color: $color-light-green;
  color: $color-dark-gray;
  padding: 10px;
  text-align: left;
}

.responsive-table td {
  border-bottom: 1px solid $color-light-gray;
}
.table-header {
  cursor: pointer;
  position: relative;
  &__icon {
    position: absolute;
    left: 75px;
  }
}

.date-cell {
  width: 138px;
}

.details-cell {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.details-button {
  background-color: inherit;
  border: 1px solid $color-light-gray;
  border-radius: 12px;
  height: 36px;
  width: 78px;
  color: $color-dark-blue;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
}

.strong {
  font-weight: bold;
}

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
  color: $color-light-gray;
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.pagination__buttons button:hover:not(.active) {
  background-color: $color-off-white;
}

.pagination__buttons button.active {
  background-color: $color-blue;
  color: white;
}
</style>
