<template>
  <div class="activity-log">
    <div class="activity-log__header">
      <div class="activity-log__title">
        <img src="@/assets/icons/bolt.svg" alt="bolt-icon" />
        <h1>Activity Log</h1>
      </div>
    </div>
    <div class="filters">
      <div class="filters__header">
        <h2 class="title">Filters</h2>
        <button @click="toggleFilters">
          {{ showFilters ? 'View Less' : 'View More' }}
          <img :src="filterIcon" alt="angle-icon" />
        </button>
      </div>
      <div v-show="showFilters" class="filters__content">
        <div class="options">
          <BaseSelect
            :options="selectModelOptions"
            :selected-value="selectModelValue"
            @select="handleSelectModelOption"
          />
          <BaseSelect
            :options="selectConditionOptions"
            :selected-value="selectConditionValue"
            @select="handleSelectConditionOption"
          />
          <div class="input-filters">
            <input
              v-model="location"
              @input="validateLocation"
              placeholder="Location"
            />
            <span v-if="locationError" class="error">{{ locationError }}</span>
            <input type="date" v-model="date" />
          </div>
        </div>
        <div class="action-buttons">
          <button @click="resetFilters">Clear Filters</button>
          <button @click="applyFilters" class="action-buttons__filter-btn">
            <img src="@/assets/icons/filter.svg" alt="filter-icon" /> Filter
          </button>
        </div>
      </div>
    </div>
    <div class="events">
      <div class="events__header">
        <h2 class="title">Events</h2>
        <BaseSearch v-model="searchTerm" placeholder="Search..." />
      </div>
      <EventsTable
        ref="eventsTable"
        :searchTerm="searchTerm"
        :filters="activeFilters"
      />
    </div>
  </div>
</template>

<script>
import angleDownImage from '@/assets/icons/angle-down.svg'
import angleUpImage from '@/assets/icons/angle-up.svg'
import BaseSelect from '@/components/BaseSelect.vue'
import { DatePicker } from 'primevue'
import BaseSearch from '@/components/BaseSearch.vue'
import EventsTable from '@/components/EventsTable/EventsTable.vue'

export default {
  name: 'ActivityLogView',
  components: { BaseSelect, DatePicker, BaseSearch, EventsTable },
  data() {
    return {
      selectModelOptions: [
        { name: 'Model', value: 'Model' },
        { name: 'Success', value: 0 },
        { name: 'Update', value: 1 },
        { name: 'Carrier notification', value: 2 },
      ],
      selectModelValue: 'Model',
      selectConditionOptions: [
        { name: 'Condition', value: 'Condition' },
        { name: 'Question', value: 0 },
        { name: 'Action', value: 1 },
        { name: 'Information', value: 2 },
        { name: 'Suggestion', value: 3 },
        { name: 'Agreement', value: 4 },
      ],
      selectConditionValue: 'Condition',
      location: '',
      date: '',
      angleDownImage: '@assets/icons/angle-down.svg',
      angleUpImage: '@assets/icons/angle-up.svg',
      showFilters: false,
      searchTerm: '',
      activeFilters: {},
      locationError: '',
    }
  },
  computed: {
    filterIcon() {
      return this.showFilters ? angleUpImage : angleDownImage
    },
  },
  methods: {
    toggleFilters() {
      this.showFilters = !this.showFilters
    },
    handleSelectModelOption(option) {
      this.selectModelValue = option.name
      this.searchTerm = ''
    },
    handleSelectConditionOption(option) {
      this.selectConditionValue = option.name
      this.searchTerm = ''
    },
    resetFilters() {
      this.selectModelValue = 'Model'
      this.selectConditionValue = 'Condition'
      this.location = ''
      this.date = ''
      this.applyFilters()
    },
    applyFilters() {
      this.activeFilters = {
        model: this.selectModelValue,
        condition: this.selectConditionValue,
        location: this.location,
        date: this.date,
      }
      this.$refs.eventsTable.applyFilters(this.activeFilters)
    },
    validateLocation() {
      const regex = /^[A-Za-z\s]*$/
      if (!regex.test(this.location)) {
        this.locationError =
          'Location must contain only English letters and spaces.'
      } else {
        this.locationError = ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets/variables';
@mixin wrapper {
  background-color: $color-off-white;
  border: 1px solid $color-light-gray;
  border-radius: 28px;
  box-shadow: 0 20px 25px -5px #0000001a;
  color: $color-dark-gray;
  padding: 36px;
  font-size: 13px;
}

.activity-log {
  padding: 36px 36px 0;
  &__title {
    display: flex;
  }

  button {
    height: 36px;
    color: $color-dark-blue;
    border-radius: 12px;
    font-weight: 600;
    border: 1px solid $color-light-gray;
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
  }

  .filters {
    @include wrapper;

    &__header {
      display: flex;
      justify-content: space-between;

      .title {
        color: black;
        margin: 0;
      }
    }

    &__content {
      margin: 18px 0 0 0;
      .options {
        display: flex;
        justify-content: space-between;

        > * {
          width: 416px;
        }

        .input-filters {
          display: flex;
          flex-direction: column;

          input {
            background-color: $color-off-white;
            border: 1px solid $color-light-gray;
            border-radius: 12px;
            color: $color-dark-gray;
            height: 36px;
            padding: 0 20px;
            &:last-child {
              margin-top: 18px;
            }
          }
        }
      }

      .action-buttons {
        display: flex;
        justify-content: space-between;
        margin: 18px 0 0 0;

        &__filter-btn {
          color: white;
          background-color: $color-dark-blue;
          padding: 15px;
          width: 91px;
          &:hover {
            background-color: #004477;
          }
        }
      }
    }

    button {
      background-color: inherit;
      width: 121px;
      padding: 0 10px;
      &:hover {
        background-color: #f8f8f8;
      }
    }
  }

  .events {
    @include wrapper;
    margin: 36px 0;

    &__header {
      display: flex;
      justify-content: space-between;
      margin: 0 0 18px 0;
      align-items: center;
      .title {
        color: black;
      }
    }
  }
  .error {
    margin: 2px;
    font-size: 12px;
    color: darkred;
  }
}
</style>
