<template>
  <DialogWindow :visible="visible">
    <div class="assets-dialog">
      <form class="assets-dialog-form" @submit.prevent="submitForm">
        <div
          v-for="(category, index) in assetsCategories[activeCategory]"
          :key="index"
        >
          <IftaLabel
            v-if="category.type === 'text'"
            class="assets-dialog-form__input"
          >
            <InputText
              v-model="formData[index]"
              :name="category.name"
              :placeholder="category.placeholder"
              required="category.required"
              size="large"
              @blur="markFieldTouched(index)"
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
            v-if="category.type === 'date'"
            class="assets-dialog-form__input"
          >
            <DatePicker
              v-model="formData[index]"
              :name="category.name"
              :placeholder="category.placeholder"
              required="category.required"
              date-format="dd/mm/yy"
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
          <PrimeButton label="Close" text @click="closeDialog" />
          <PrimeButton
            type="submit"
            severity="secondary"
            label="Submit"
            :disabled="isFormInvalid"
          />
        </div>
      </form>
    </div>
    <div></div>
  </DialogWindow>
</template>

<script>
import DialogWindow from 'primevue/dialog'
import PrimeButton from 'primevue/button'
import InputText from 'primevue/inputtext'
import IftaLabel from 'primevue/IftaLabel'
import DatePicker from 'primevue/datepicker'
import { assetsCategories } from '@/utils/variables/assetsCategories'
import { postItemsByCategory } from '@/api/asset-management.api'

export default {
  name: 'AddItemModal',
  components: { DialogWindow, PrimeButton, InputText, IftaLabel, DatePicker },
  props: {
    header: { type: String, required: true },
    visible: { type: Boolean, required: true },
    activeCategory: { type: String, required: true },
  },
  emits: ['update:visible', 'submitFormData'],

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
