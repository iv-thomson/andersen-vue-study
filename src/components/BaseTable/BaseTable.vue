<template>
  <DataTable
    v-model:selection="selectedRows"
    :loading="!itemsTableData.length"
    :value="itemsData"
    removable-sort
    paginator
    :paginator-template="'PrevPageLink PageLinks NextPageLink'"
    :rows="itemsPerPage"
    :first="firstPage"
    table-style="font-size: 0.8rem"
    @page="handlePageChange"
  >
    <template #paginatorstart>
      <p class="base-table__info">
        Showing {{ from }} to <span>{{ to }}</span> of
        {{ itemsTableData.length }} entries
      </p>
    </template>
    <Column
      v-if="withCheckbox"
      selection-mode="multiple"
      :style="{
        width: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }"
    />
    <Column
      v-if="showColumnBadge"
      :header="capitalize(badgeField)"
      :field="badgeField"
      sortable
    >
      <template #body="slotProps">
        <span
          :class="{
            'base-table__badge base-table__badge_green':
              slotProps.data[badgeField] === greenBadgeValue,
            'base-table__badge base-table__badge_red':
              slotProps.data[badgeField] === redBadgeValue,
          }"
        >
          {{ slotProps.data[badgeField] }}
        </span>
      </template>
    </Column>
    <Column
      v-for="(key, index) in tableHeaderNames"
      :key="`${key}-${index}`"
      :field="key"
      :header="preparedKey(key)"
      sortable
    >
      <template #body="slotProps">
        <span
          v-if="key === vhtmlField"
          v-html="safeHtml(slotProps.data[key])"
        ></span>
        <span v-else>{{ slotProps.data[key] }}</span>
      </template></Column
    >
    <Column v-if="withTableButton" :style="{ textAlign: 'end' }">
      <template #header><slot name="header"></slot></template>
      <template #body="slotProps">
        <slot name="table-button" :data="slotProps.data">
          <BaseButton
            label="Info"
            variant="outlined"
            class="base-table__button"
            @click="handleButtonClick(slotProps.data)"
          >
            Details
          </BaseButton>
        </slot>
      </template>
    </Column>
  </DataTable>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import BaseButton from 'primevue/button'
import DOMPurify from 'dompurify'

export default {
  name: 'BaseTable',
  components: { BaseButton, Column, DataTable },
  props: {
    itemsData: {
      type: Array,
      default: () => [],
    },
    withCheckbox: {
      type: Boolean,
      default: true,
    },
    withTableButton: {
      type: Boolean,
      default: false,
    },
    showColumnBadge: {
      type: Boolean,
      default: false,
    },
    badgeField: {
      type: String,
      default: '',
    },
    redBadgeValue: {
      type: String,
      default: '',
    },
    greenBadgeValue: {
      type: String,
      default: '',
    },
    vhtmlField: {
      type: String,
      default: '',
    },
  },
  emits: ['rowButtonClick'],
  data() {
    return {
      itemsTableData: [],
      selectedRows: [],
      itemsPerPage: 10,
      pageNumber: 1,
    }
  },
  computed: {
    tableHeaderNames() {
      return Object.keys(this.itemsTableData[0] || {}).filter(
        key => key !== 'id' && key !== this.badgeField,
      )
    },

    firstPage() {
      return (this.pageNumber - 1) * this.itemsPerPage
    },

    from() {
      return this.itemsTableData.length === 0
        ? 0
        : (this.pageNumber - 1) * this.itemsPerPage + 1
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
    preparedKey(key) {
      const formattedString = key.replace(/([a-z])([A-Z])/g, '$1 $2')
      return formattedString.charAt(0).toUpperCase() + formattedString.slice(1)
    },

    handlePageChange(event) {
      this.pageNumber = event.page + 1
    },

    handleButtonClick(rowData) {
      this.$emit('rowButtonClick', rowData.id)
    },

    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },

    safeHtml(content) {
      return DOMPurify.sanitize(content)
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep(.p-datatable .p-datatable-tbody) {
  background: rgba(164, 20, 193, 0) !important;
}

::v-deep(.p-datatable-header-cell) {
  background-color: #e9f0f4;
  border-top: 1px solid #bdbfc1;
  border-bottom: 1px solid #bdbfc1;
  width: 148px;
  height: 40px;
  padding: 10px;
}

::v-deep(.p-datatable-header-cell:first-child) {
  border-left: 1px solid #bdbfc1;
  border-radius: 14px 0 0 14px;
}

::v-deep(.p-datatable-header-cell:last-child) {
  border-right: 1px solid #bdbfc1;
  border-radius: 0 14px 14px 0;
}

::v-deep(.p-checkbox),
::v-deep(.p-checkbox-box) {
  width: 16px;
  height: 16px;
  margin-right: 1px;
}

::v-deep(.p-datatable-sort-icon) {
  width: 12.4px;
  height: 12.4px;
}

::v-deep(.p-row-odd > td),
::v-deep(.p-row-even > td) {
  height: 56px !important;
  padding: 10px;
}

::v-deep(button.p-paginator-page-selected) {
  width: 30px;
  background-color: #007bff;
  color: #fff;
}

::v-deep(.p-paginator-pages > button.p-paginator-page) {
  max-width: 30px !important;
}

.base-table {
  &__button {
    border-radius: 12px;
    border: 1px solid #bdbfc1;
    color: #004b85;
    width: 78px;
    height: 36px;
    font-size: 0.8rem;
    font-weight: 600;
    text-align: end;
  }

  &__badge {
    border: 1px solid;
    border-radius: 32px;
    padding: 4px 8px;
    &_green {
      border-color: #11cc6e;
      color: #11cc6e;
      background-color: #edfbf4;
    }
    &_red {
      border-color: #cc1111;
      color: #cc1111;
      background-color: #fbeded;
    }
  }

  &__info {
    color: #485066;
    font-size: 0.8rem;
    font-weight: 600;
    & > span {
      text-decoration: underline;
    }
  }
}
</style>
