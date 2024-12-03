<template>
  <h1>Accounting Codes</h1>
  <div class="accounting">
    <div class="accounting__header">
      <h2>Cost Center / WBS Element</h2>
      <Button
        label="+ Add New Code"
        @click="openAddCodeModal"
        class="p-button-info"
      />
    </div>
    <div>
      <DataTable :value="accountingCodes" tableStyle="min-width: 50rem">
        <Column field="name" header="Code Name"></Column>
        <Column field="description1" header="Description 1"></Column>
        <Column field="description2" header="Description 2"></Column>
        <Column field="status" header="Status"></Column>
        <Column header="">
          <template #body="slotProps">
            <Button
              label="Edit"
              @click="openEditCodeModal(slotProps.data)"
              class="button-info"
            />
            <Button
              label="Delete"
              @click="deleteCode(slotProps.data)"
              class="button-delete"
            />
          </template>
        </Column>
      </DataTable>
    </div>
    <Modal
      v-model:visible="showModal"
      :title="modalTitle"
      :fields="modalFields"
      :initialData="modalData"
      @submit="handleModalSubmit"
    />
  </div>
</template>

<script>
import { DataTable, Column, Button } from 'primevue'
import Modal from '@/components/Modal.vue'

export default {
  components: { DataTable, Column, Button, Modal },
  data() {
    return {
      showModal: false,
      modalTitle: '',
      modalFields: [],
      modalData: {},
      accountingCodes:
        JSON.parse(localStorage.getItem('accountingCodes')) || [],
    }
  },
  methods: {
    openAddCodeModal() {
      this.modalTitle = 'Add New Accounting Code'
      this.modalFields = this.getModalFields()
      this.modalData = {}
      this.showModal = true
    },
    openEditCodeModal(code) {
      this.modalTitle = 'Edit Accounting Code'
      this.modalFields = this.getModalFields()
      this.modalData = { ...code }
      this.showModal = true
    },
    handleModalSubmit(data) {
      if (data.id) {
        const index = this.accountingCodes.findIndex(
          code => code.id === data.id,
        )
        if (index !== -1) {
          this.accountingCodes.splice(index, 1, data)
        }
      } else {
        const newId =
          this.accountingCodes.length > 0
            ? Math.max(...this.accountingCodes.map(item => item.id)) + 1
            : 1
        this.accountingCodes.push({ ...data, id: newId })
      }
      this.updateLocalStorage()
      this.showModal = false
      this.modalData = {}
    },
    deleteCode(code) {
      this.accountingCodes = this.accountingCodes.filter(
        item => item.id !== code.id,
      )
      this.updateLocalStorage()
    },
    updateLocalStorage() {
      localStorage.setItem(
        'accountingCodes',
        JSON.stringify(this.accountingCodes),
      )
    },
    getModalFields() {
      return [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'description1', label: 'Description 1', type: 'text' },
        { name: 'description2', label: 'Description 2', type: 'text' },
        { name: 'status', label: 'Status', type: 'text' },
      ]
    },
  },
}
</script>

<style scoped lang="scss">
h1 {
  margin: 36px;
}
.accounting {
  color: black;
  padding: 36px;
  margin: 0 auto 36px;
  width: 95%;
  max-height: 992px;
  border: 1px solid #bdbfc1;
  border-radius: 28px;
  .button-info {
    background-color: #004b85;
    color: white;
    border: none;
    margin: 0 8px 0 0;
    &:hover {
      background-color: #00457c;
      color: white;
      border: none;
    }
  }
  .button-delete {
    background-color: #ffdcdc;
    color: red;
    border: none;
    width: 79px;
    margin: 0 8px 0 0;
    &:hover {
      background-color: #f5b7b7;
      color: red;
      border: none;
    }
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      height: 36px;
      background-color: #004b85;
      color: white;
      font-size: small;
    }
  }
}
</style>
