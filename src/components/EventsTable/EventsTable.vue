<template>
  <div v-if="loading" class="loading-indicator">Loading...</div>
  <table v-else class="responsive-table">
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
  <Pagination
    v-if="!loading"
    :currentPage="currentPage"
    :itemsPerPage="itemsPerPage"
    :totalEntries="totalEntries"
    :sortedData="sortedData"
    @update:currentPage="currentPage = $event"
  />
</template>

<script>
import { fetchActivityLog } from '@/api/activity-log.api.js'
import Pagination from '@/components/EventsTable/Pagination.vue'

export default {
  name: 'EventTable',
  components: { Pagination },
  props: {
    searchTerm: {
      type: String,
      default: '',
    },
    filters: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      activityLogs: [],
      sortKey: 'date',
      sortOrder: 'asc',
      currentPage: 1,
      itemsPerPage: 10,
      loading: true,
    }
  },
  async mounted() {
    try {
      this.loading = true
      this.activityLogs = await fetchActivityLog()
    } finally {
      this.loading = false
    }
  },
  computed: {
    filteredData() {
      return this.computedFilteredData()
    },

    sortedData() {
      return this.filteredData.slice().sort((a, b) => {
        const modifier = this.sortOrder === 'asc' ? 1 : -1
        const dateA = new Date(a.date + ' ' + a.time)
        const dateB = new Date(b.date + ' ' + b.time)
        return (dateA - dateB) * modifier
      })
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      return this.sortedData.slice(start, start + this.itemsPerPage)
    },
    totalEntries() {
      return this.sortedData.length
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
      if (modifier === 'PM' && hour !== '12') hour = String(parseInt(hour) + 12)
      if (modifier === 'AM' && hour === '12') hour = '00'
      return `${hour}:${minute}`
    },
    formatDetails(message) {
      const match = message.details.match(/\[([^\]]+)\]: (.+)/)
      if (match) {
        const name = match[1]
        return `<b>[${message.model}]</b> Email Sent To <a href="${message.url}" target="_blank">${message.url}</a> From <b>${name}</b>`
      }
      return message.details
    },
    viewDetails(message) {
      const details = `
        Date: ${this.formatDate(message.date)}
        Details: ${message.details}
        Location: ${message.location}
        Model: ${message.model}
      `
      alert(details)
    },
    computedFilteredData() {
      let data = this.activityLogs

      if (this.searchTerm) {
        data = data.filter(item =>
          Object.values(item).some(field =>
            String(field).toLowerCase().includes(this.searchTerm.toLowerCase()),
          ),
        )
      }

      if (this.filters.model && this.filters.model !== 'Model') {
        data = data.filter(item => item.model === this.filters.model)
      }

      if (this.filters.condition && this.filters.condition !== 'Condition') {
        data = data.filter(item => item.condition === this.filters.condition)
      }

      if (this.filters.location) {
        data = data.filter(
          item =>
            item.location && item.location.includes(this.filters.location),
        )
      }

      if (this.filters.date) {
        data = data.filter(item => {
          const itemDate = new Date(item.date)
          const filterDate = new Date(this.filters.date)
          return itemDate.toDateString() === filterDate.toDateString()
        })
      }
      return data
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

  th {
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

  td {
    border-bottom: 1px solid $color-light-gray;

    &.date-cell {
      width: 138px;
      strong {
        font-weight: bold;
      }
    }

    &.details-cell {
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;

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
    }
  }
}
</style>
