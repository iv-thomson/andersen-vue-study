<template>
  <div class="api-token-changes-timeline">
    <div class="api-token-changes-timeline__header">
      <h1 class="api-token-changes-timeline__page-title">Integrations</h1>
    </div>
    <div class="api-token-changes-timeline__table-wrapper">
      <h2 class="api-token-changes-timeline__table-title">Rest API</h2>
      <ApiAdminBlock />
    </div>
    <div class="api-token-changes-timeline__table-wrapper">
      <div class="api-token-changes-timeline__header">
        <h2 class="api-token-changes-timeline__table-title">
          API Token Changes Timeline
        </h2>
        <BaseButton
          label="Info"
          severity="info"
          class="api-token-changes-timeline__button api-token-changes-timeline__button_info"
          @click="handleAddClick"
        >
          <img src="@/assets/icons/plus.svg" alt="plus" />
          Add
        </BaseButton>
      </div>
      <BaseTable
        :items-data="filteredData"
        :with-checkbox="false"
        :with-table-button="true"
        vhtml-field="date"
      >
        <template #header>
          <span class="api-token-changes-timeline__buttons-header"
            >Actions</span
          >
        </template>
        <template #table-button="{ data }">
          <div class="api-token-changes-timeline__table-buttons">
            <BaseButton
              label="Info"
              severity="info"
              class="api-token-changes-timeline__button api-token-changes-timeline__button_info"
              @click="handleEditClick(data.id)"
            >
              <img src="@/assets/icons/pencil.svg" alt="edit" />Edit</BaseButton
            >
            <BaseButton
              label="Danger"
              severity="danger"
              variant="outlined"
              class="api-token-changes-timeline__button api-token-changes-timeline__button_del"
              @click="handleDeleteClick(data.id)"
            >
              <img
                src="@/assets/icons/trash.svg"
                alt="delete"
              />Delete</BaseButton
            >
          </div>
        </template>
      </BaseTable>
    </div>
  </div>
  <BaseModal
    :visible="showModal"
    :is-edit="isEditMode"
    :item="selectedItem"
    @close="showModal = false"
    @submit="handleModalSubmit"
  />
</template>

<script>
import ApiAdminBlock from '@/components/ApiAdminBlock.vue'
import BaseButton from 'primevue/button'
import BaseTable from '@/components/BaseTable/BaseTable.vue'
import BaseModal from '@/components/BaseModal.vue'
import { fetchTokenChangesTimeline } from '@/api/token-changes-timeline.api.js'

const LOCAL_STORAGE_KEY = 'apiTokenData'

export default {
  name: 'ApiTokenChangesTimeline',
  components: {
    ApiAdminBlock,
    BaseButton,
    BaseTable,
    BaseModal,
  },
  data() {
    return {
      tokenData: [],
      showModal: false,
      isEditMode: false,
      selectedItem: null,
    }
  },
  computed: {
    filteredData() {
      return this.tokenData.map(item => {
        return Object.keys(item)
          .filter(key => key !== 'date')
          .reduce((newItem, key) => {
            newItem[key] = item[key]
            return newItem
          }, {})
      })
    },
  },
  async created() {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (localData) {
      this.tokenData = JSON.parse(localData)
    } else {
      const fetchedData = await fetchTokenChangesTimeline()
      this.tokenData = fetchedData
      this.saveToLocalStorage()
    }
  },
  methods: {
    saveToLocalStorage() {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.tokenData))
    },

    handleEditClick(rowDataId) {
      const item = this.tokenData.find(item => item.id === rowDataId)
      this.selectedItem = item
      this.isEditMode = true
      this.showModal = true
    },

    handleAddClick() {
      this.selectedItem = null
      this.isEditMode = false
      this.showModal = true
    },

    handleModalSubmit(data) {
      if (this.isEditMode) {
        const index = this.tokenData.findIndex(
          item => item.id === this.selectedItem.id,
        )
        if (index !== -1) {
          this.tokenData.splice(index, 1, { ...this.selectedItem, ...data })
        }
      } else {
        const newItem = {
          id: this.tokenData[this.tokenData.length - 1].id + 1,
          ...data,
        }
        this.tokenData.push(newItem)
      }
      this.saveToLocalStorage()
    },

    handleDeleteClick(rowDataId) {
      this.tokenData = this.tokenData.filter(item => item.id !== rowDataId)
      this.saveToLocalStorage()
    },
  },
}
</script>

<style lang="scss" scoped>
.api-token-changes-timeline {
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
    background: url('../assets/icons/shield.svg') no-repeat center/contain;
  }

  &__table-title {
    margin: 0;
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
    &:last-child {
      margin-top: 36px;
    }
  }

  &__button {
    border-radius: 12px;
    border: 1px solid #bdbfc1;
    width: fit-content;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 10px 16px;
    &_info {
      background-color: #004b85;
      color: #fff;
    }
    &_del {
      background-color: #e51c231a;
      color: #fff;
    }
  }

  &__table-buttons {
    display: flex;
    gap: 17.5px;
  }

  &__buttons-header {
    font-weight: 600;
    margin: 0 5px 0 auto;
  }
}
</style>
