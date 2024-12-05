<template>
  <Dialog :visible="visible">
    <div class="assets-dialog">
      <form class="assets-dialog-form" @submit.prevent="submitForm">
        <div
          v-for="(category, index) in assetsCategories[this.activeCategory]"
          :key="index"
        >
          <IftaLabel
            class="assets-dialog-form__input"
            v-if="category.type === 'text'"
          >
            <InputText
              v-model="formData[index]"
              :name="category.name"
              :placeholder="category.placeholder"
              required="category.required"
              @blur="markFieldTouched(index)"
              size="large"
            />
            <label for="category.name">{{ category.name }}</label>

            <small
              v-if="!isValidText(index) && touched[index]"
              class="input-error"
            >
              {{ 'This field is required' }}
            </small>
          </IftaLabel>

          <IftaLabel
            class="assets-dialog-form__input"
            v-if="category.type === 'date'"
          >
            <DatePicker
              v-model="formData[index]"
              :name="category.name"
              :placeholder="category.placeholder"
              required="category.required"
              dateFormat="dd/mm/yy"
              size="large"
              @blur="markFieldTouched(index)"
            />
            <label for="category.name">{{ category.name }}</label>

            <small
              v-if="!isValidDate(index) && touched[index]"
              class="input-error"
            >
              {{ 'Please select a valid date' }}
            </small>
          </IftaLabel>
        </div>
        <div class="assets-dialog-buttons">
          <Button label="Close" @click="closeDialog" text></Button>
          <Button
            type="submit"
            severity="secondary"
            label="Submit"
            :disabled="isFormInvalid"
          />
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
  computed: {
    isFormInvalid() {
      return Object.values(this.errors).some(error => error !== null)
    },
  },
  methods: {
    closeDialog() {
      this.$emit('update:visible', false)
    },

    markFieldTouched(index) {
      this.touched[index] = true
    },

    isValidText(index) {
      const value = this.formData[index]
      const touched = this.touched[index]
      return touched && value && value.trim() !== ''
    },

    isValidDate(index) {
      const date = this.formData[index]
      const touched = this.touched[index]
      return touched && date && !isNaN(new Date(date).getTime())
    },

    getErrorMessage(index) {
      const category = this.assetsCategories[this.activeCategory][index]
      if (category.type === 'text') {
        return this.errors[index]
      } else if (category.type === 'date') {
        return this.errors[index]
      }
      return ''
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
      errors: {},
      touched: {},
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

    .assets-dialog-form__input {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;

      .input-error {
        color: red;
      }
    }
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
