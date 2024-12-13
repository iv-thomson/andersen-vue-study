<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <h2>{{ title }}</h2>
      <div
        class="input-container"
        v-for="(field, index) in fields"
        :key="index"
      >
        <label :for="field.name">{{ field.label }}</label>
        <input
          v-model="formData[field.name]"
          :id="field.name"
          :type="field.type"
        />
      </div>
      <div class="modal-actions">
        <Button label="Cancel" @click="cancel" class="cancel" />
        <Button label="Save" @click="submitForm" class="p-button-success" />
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from 'primevue'

export default {
  components: { Button },
  name: 'Modal',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: 'Add New Item',
    },
    fields: {
      type: Array,
      required: true,
    },
    initialData: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:visible', 'submit'],
  data() {
    return {
      formData: {},
    }
  },
  watch: {
    initialData: {
      handler(newVal) {
        this.formData = { ...newVal }
      },
      deep: true,
    },
  },
  methods: {
    submitForm() {
      this.$emit('submit', this.formData)
      this.resetFormData()
    },
    resetFormData() {
      this.formData = {}
      this.$emit('update:visible', false)
    },
    cancel() {
      this.$emit('update:visible', false)
      this.resetFormData()
    },
  },
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  width: 50%;
  height: 450px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .input-container {
    display: flex;
    flex-direction: column;
    input {
      height: 35px;
      background-color: white;
      border: 1px solid #dedede;
      margin: 5px 0 5px 0;
      border-radius: 8px;
      color: black;
    }
  }
  .modal-actions {
    display: flex;
    justify-content: space-between;
    .cancel {
      background-color: white;
      border: none;
      &:hover {
        background-color: #e7e7e7;
        border: none;
      }
    }
    button {
      margin: 36px 0 0;
      height: 36px;
      width: 92px;
      cursor: pointer;
    }
  }
}
</style>
