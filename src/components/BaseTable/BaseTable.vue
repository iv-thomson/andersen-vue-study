<template>
  <div class="base-table">
    <ul class="base-table__header">
      <div class="base-table__checkboxCell">
        <BaseTableCheckbox :value="isChecked" :on-change="toggleCheckbox" />
      </div>
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
        ref="tableRows"
        :item-data="row"
      />
    </ul>
    <div class="base-table__footer">
      <p class="base-table__info">
        Showing {{ from }} to <span>{{ to }}</span> of
        {{ itemsTableData.length }} entries
      </p>

      <div class="base-table__pagination">
        <img
          src="@/assets/icons/angle-left.svg"
          alt="leftBtn"
          class="base-table__paginationNavigateBtn"
          @click="navigateLeft"
        />
        <div
          v-for="page in pages"
          :key="page"
          class="page"
          :class="{ page_selected: page === pageNumber }"
          @click="pageClick(page)"
        >
          {{ page }}
        </div>
        <img
          src="@/assets/icons/angle-right.svg"
          alt="rightBtn"
          class="base-table__paginationNavigateBtn"
          @click="navigateRight"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseTableRow from '@/components/BaseTable/BaseTableRow.vue'
import BaseTableCheckbox from '@/components/BaseTable/BaseTableCheckbox.vue'
import sortIcon from '@/assets/icons/sort-alt.svg'

export default {
  name: 'BaseTable',
  components: { BaseTableCheckbox, BaseTableRow },
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
      isChecked: false,
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

    from() {
      return (this.pageNumber - 1) * this.itemsPerPage + 1
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

      this.sortDirections[key] = sortDirection === 'asc' ? 'desc' : 'asc'
    },

    handleButtonClick(index) {
      if (this.rotatedIndex !== index) {
        this.sortDirections = {}
      }

      this.rotateIcon(index)

      setTimeout(() => {
        this.sortColumn(index)
      }, 300)
    },

    navigateLeft() {
      if (this.pageNumber > 1) {
        this.pageNumber -= 1
      }
    },

    navigateRight() {
      if (this.pageNumber < this.pages) {
        this.pageNumber += 1
      }
    },

    toggleCheckbox(isChecked) {
      this.isChecked = isChecked
      this.$refs.tableRows.forEach(row => {
        const checkbox = row.$refs.checkbox
        if (checkbox.isChecked !== isChecked) {
          checkbox.handleClick()
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.base-table {
  max-width: 1236px;

  &__header {
    display: flex;
    margin: 0;
    padding: 0;
    border: 1px solid #bdbfc1;
    border-radius: 14px;
    background-color: #e9f0f4;
  }

  &__checkboxCell {
    width: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__headerItem {
    list-style-type: none;
    flex-basis: 12.5%;
  }

  &__sortBtn {
    height: 40px;
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 1rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    color: #485066;
    font-size: 0.8rem;
    font-weight: 600;
  }

  &__sortBtnImage {
    display: block;
    transition: transform 0.5s ease;
  }

  &__body {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  &__pagination {
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: 10.5px;
  }

  &__paginationNavigateBtn {
    cursor: pointer;
    transition: transform 0.2s;
    margin: 0 10.5px;
  }

  &__paginationNavigateBtn:hover {
    transform: scale(1.4);
  }

  &__info {
    color: #485066;
    font-size: 0.8rem;
    font-weight: 600;
  }

  &__info > span {
    text-decoration: underline;
  }
}

.rotated {
  transform: rotate(180deg);
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
  color: #bdbfc1;
  font-size: 0.8rem;
}

.page_selected {
  background-color: #007bff;
  color: #fff;
}
</style>
