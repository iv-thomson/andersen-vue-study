<template>
  <div class="background-jobs">
    <div class="background-jobs__header">
      <h1 class="background-jobs__page-title">Background Jobs</h1>
      <div class="background-jobs__bread-crumbs">
        <span class="background-jobs__bread-crumb">Activity</span>
        <img src="@/assets/icons/chevron-right.svg" alt="chevron" />
        <span class="background-jobs__bread-crumb">Background Jobs</span>
      </div>
    </div>
    <div class="background-jobs__table-wrapper">
      <div class="background-jobs__table-filters">
        <label class="background-jobs__label"
          >Name
          <input
            type="text"
            placeholder="input"
            class="background-jobs__input"
          />
        </label>
        <label class="background-jobs__label"
          >Status
          <BaseSelect
            :options="selectOptions"
            :selected-value="selectedValue"
            @select="handleSelectOption"
          />
        </label>
        <BaseSearch v-model="searchValue" placeholder="Search Device List..." />
      </div>
      <BaseTable
        :items-data="filteredData"
        :with-checkbox="false"
        :with-table-button="true"
        :show-column-badge="true"
        badge-field="status"
        red-badge-value="incompleted"
        green-badge-value="completed"
        vhtml-field="createdAt"
        @row-button-click="handleRowButtonClick"
      />
    </div>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable/BaseTable.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseSearch from '@/components/BaseSearch.vue'
import { fetchBackgroundJobs } from '@/api/background-jobs.api'

export default {
  name: 'ActivityBacgroundJobs',
  components: {
    BaseTable,
    BaseSelect,
    BaseSearch,
  },
  data() {
    return {
      jobsData: [],
      selectOptions: [
        { name: 'all', value: 0 },
        { name: 'completed', value: 1 },
        { name: 'incompleted', value: 2 },
      ],
      selectedValue: 'all',
      searchValue: '',
    }
  },
  computed: {
    filteredData() {
      let result = [...this.jobsData]

      if (this.selectedValue !== 'all') {
        result = result.filter(item => item.status === this.selectedValue)
      }

      if (this.searchValue) {
        result = result.filter(item =>
          Object.values(item).some(field =>
            String(field)
              .toLowerCase()
              .includes(this.searchValue.toLowerCase()),
          ),
        )
      }

      result = result.map(item => {
        return Object.keys(item)
          .filter(key => key !== 'statistics')
          .reduce((newItem, key) => {
            newItem[key] = item[key]
            return newItem
          }, {})
      })

      return result
    },
  },
  async created() {
    this.jobsData = await fetchBackgroundJobs()
  },
  methods: {
    handleSelectOption(option) {
      this.selectedValue = option.name
      this.searchValue = ''
    },

    handleRowButtonClick(rowDataId) {
      this.$router.push({
        name: 'job',
        params: { jobId: rowDataId },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.background-jobs {
  position: relative;
  padding: 0 80px 30px;

  &__header {
    max-width: 1308px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__page-title {
    padding-left: 40px;
  }

  &__page-title::before {
    content: '';
    position: absolute;
    top: 25px;
    left: 0;
    width: 32px;
    height: 32px;
    background: url('../assets/icons/bolt.svg') no-repeat center/contain;
  }

  &__bread-crumbs {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__bread-crumb {
    font-size: 0.8rem;
    font-weight: 600;
    text-decoration: underline;
    color: #007bff;
    cursor: pointer;
  }

  &__input {
    width: 220px;
    font-size: 0.8rem;
    position: relative;
    padding: 10px 18px;
    border: solid 1px #bdbfc1;
    border-radius: 16px;
    cursor: pointer;
  }

  &__label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 0.8rem;
    font-weight: 600;
    &:last-of-type {
      flex: 1;
    }
  }

  &__table-wrapper {
    max-width: 1308px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    padding: 36px;
    border: 1px solid #bdbfc1;
    border-radius: 28px;
    box-shadow: 0px 10px 10px -5px #0000000a;
    box-shadow: 0px 20px 25px -5px #0000001a;
  }

  &__table-filters {
    display: flex;
    align-items: end;
    gap: 18px;
  }
}
</style>
