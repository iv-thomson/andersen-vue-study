<template>
  <Dialog :visible="visible">
    <div class="assets-dialog">
      <form class="assets-dialog-form" @submit.prevent="submitForm">
        <div
          v-for="(category, index) in assetsCategories[this.activeCategory]"
          :key="index"
        >
          <IftaLabel v-if="category.type === 'text'">
            <InputText
              v-model="formData[index]"
              :name="category.name"
              :placeholder="category.placeholder"
              size="large"
            />
            <label for="category.name">{{ category.name }}</label>
          </IftaLabel>
          <IftaLabel v-if="category.type === 'date'">
            <DatePicker
              v-model="formData[index]"
              :name="category.name"
              :placeholder="category.placeholder"
              dateFormat="dd/mm/yy"
              size="large"
            />
            <label for="category.name">{{ category.name }}</label>
          </IftaLabel>
        </div>
        <div class="assets-dialog-buttons">
          <Button
            label="Cancel"
            @click="closeDialog"
            text
            class="!p-4 w-full !text-primary-50 !border !border-white/30 hover:!bg-white/10"
          ></Button>
          <Button type="submit" severity="secondary" label="Submit" />
        </div>
      </form>
    </div>
    <div></div>
  </Dialog>
</template>
<script>
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import IftaLabel from 'primevue/IftaLabel'
import DatePicker from 'primevue/datepicker'
import { assetsCategories } from '@/utils/variables/assetsCategories'
import { postItemsByCategory } from '@/api/asset-management.api'

export default {
  components: { Dialog, Button, InputText, IftaLabel, DatePicker },
  name: 'AddItemModal',
  emits: ['update:visible', 'submitFormData'],
  props: {
    header: { type: String, required: true },
    visible: { type: Boolean, required: true },
    activeCategory: { type: String, required: true },
  },

  methods: {
    closeDialog() {
      this.$emit('update:visible', false)
    },

    fetchData() {
      console.log(assetsCategories[this.activeCategory])
    },

    submitForm() {
      this.loading = true

      setTimeout(async () => {
        const newEntry = { ...this.formData }

        try {
          const response = await postItemsByCategory(
            this.activeCategory,
            newEntry,
          )
          // no actual endpoint to send data :(
          console.log('Response:', response)

          this.tableData.push(newEntry)
          this.$emit('submitFormData', newEntry)
        } catch (err) {
          throw new Error('Error during fetching the data', err)
        }
        this.formData = {}
        this.loading = false
        this.closeDialog()
      }, 1000)
    },
  },

  data() {
    return {
      assetsCategories,
      formData: {},
      loading: false,
      tableData: [],
    }
  },
}
</script>
<style lang="scss">
.assets-dialog {
  min-width: 500px;
  min-height: 200px;

  .assets-dialog-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  &-buttons {
    display: flex;
    gap: 20px;
  }
}
.p-button-text.p-button-secondary {
  display: none;
}
</style>
