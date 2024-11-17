<template>
  <div class="base-table">
    <ul class="base-table__header">
      <li
        v-for="(key, index) in tableHeaderNames"
        :key="uniqueIndex(index)"
        class="base-table__headerItem"
      >
        <button class="base-table__sortBtn" @click="handleButtonClick(index)">
          {{ preparedKey(key) }}
          <transition name="rotate">
            <img
              v-show="true"
              :src="sortIcon"
              alt="sortBtn"
              class="base-table__sortBtnImage"
              :class="{
                rotated:
                  rotatedIndex === index &&
                  sortDirections[tableHeaderNames[index]] === 'desc',
              }"
            />
          </transition>
        </button>
      </li>
    </ul>
    <ul class="base-table__body">
      <BaseTableRow
        v-for="(row, index) in paginatedItems"
        :key="index"
        :item-data="row"
      />
    </ul>
    <div class="base-table__pagination">
      <div
        v-for="page in pages"
        :key="page"
        class="page"
        :class="{ page_selected: page === pageNumber }"
        @click="pageClick(page)"
      >
        {{ page }}
      </div>
    </div>
  </div>
</template>

<script>
import BaseTableRow from '@/components/BaseTable/BaseTableRow.vue'
import sortIcon from '@/assets/icons/sort-alt.svg'

export default {
  name: 'BaseTable',
  components: { BaseTableRow },
  props: {
    itemsData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      itemsTableData: [],
      rotatedIndex: null,
      sortIcon,
      itemsPerPage: 10,
      pageNumber: 1,
    }
  },
  computed: {
    preparedKey() {
      return key => {
        const formattedString = key.replace(/([a-z])([A-Z])/g, '$1 $2')
        return (
          formattedString.charAt(0).toUpperCase() + formattedString.slice(1)
        )
      }
    },

    uniqueIndex() {
      return index => `${index}-${Math.random().toString(36).substring(2, 9)}`
    },

    tableHeaderNames() {
      return Object.keys(this.itemsTableData[0] || {})
    },

    pages() {
      return Math.ceil(this.itemsTableData.length / 10)
    },

    paginatedItems() {
      let from = (this.pageNumber - 1) * this.itemsPerPage
      let to = from + this.itemsPerPage
      return this.itemsTableData.slice(from, to)
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
    rotateIcon(index) {
      if (this.rotatedIndex === index) {
        this.rotatedIndex = null
      } else {
        this.rotatedIndex = index
      }
    },

    pageClick(page) {
      this.pageNumber = page
    },

    sortColumn(index) {
      const key = this.tableHeaderNames[index]
      const isNumeric = this.itemsTableData.every(
        item => !isNaN(parseFloat(item[key])),
      )

      // Определяем текущее направление сортировки
      const sortDirection = this.sortDirections[key] || 'asc'

      this.itemsTableData.sort((a, b) => {
        const aValue = a[key]
        const bValue = b[key]

        if (isNumeric) {
          return sortDirection === 'asc'
            ? parseFloat(aValue) - parseFloat(bValue)
            : parseFloat(bValue) - parseFloat(aValue)
        } else {
          return sortDirection === 'asc'
            ? String(aValue).localeCompare(String(bValue))
            : String(bValue).localeCompare(String(aValue))
        }
      })

      // Обновляем направление сортировки для следующего клика
      this.sortDirections[key] = sortDirection === 'asc' ? 'desc' : 'asc'
    },

    handleButtonClick(index) {
      // Проверяем, если сортируем новую колонку, сбрасываем направление сортировки для других
      if (this.rotatedIndex !== index) {
        this.sortDirections = {} // сбрасываем направления сортировки
      }

      this.rotateIcon(index)

      setTimeout(() => {
        this.sortColumn(index)
      }, 300)
    },
  },
}
</script>

<style scoped>
.base-table {
  max-width: 1236px;
}

.base-table__header {
  display: flex;
  margin: 0;
  padding: 0;
}

.base-table__headerItem {
  list-style-type: none;
  flex-basis: 11.11%;
}

.base-table__sortBtn {
  height: 40px;
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 1rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.base-table__sortBtnImage {
  display: block;
  transition: transform 0.5s ease;
}

.rotated {
  transform: rotate(180deg);
}

.base-table__body {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

.base-table__pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  margin-top: 20px;
  gap: 10.5px;
}

.page {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 0 10px;
  cursor: pointer;
}

.page_selected {
  background-color: #007bff;
  color: #fff;
}
</style>
