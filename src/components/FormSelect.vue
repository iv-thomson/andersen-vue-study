<template>
    <div class="form-group">
      <label :for="id" class="form-label">{{ label }}</label>
      <select
        :id="id"
        :value="modelValue"
        class="custom-select"
        :class="{ 'input-error': error }"
        @input="updateSelectedValue"
        @blur="$emit('validate')"
      >
        <option disabled value="">Input</option>
        <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
      </select>
      <i class="pi pi-angle-down select-icon"></i>
      <span v-if="error" class="error-message">{{ error }}</span>
    </div>
</template>

<script>
  export default {
    name: 'FormSelect',
    props: {
      id: { type: String, required: true, default: '' },
      modelValue: { type: String, required: true, default: '' },
      error: { type: String, required: true, default: '' },
      options: { type: Array, required: true },
      label: { type: String, required: true},
    },
    emits: ['update:modelValue', 'validate', 'clear'],
    methods: {
        updateSelectedValue(event) {
            this.$emit('update:modelValue', event.target.value, this.id)
            this.$emit('clear');
        }
    }
  };
</script>

<style scoped lang="scss">
.error-message {
  color: red;
  font-size: 12px;
  margin-top: -5px;
}
.form-label {
  color: #0E1629;
  font-weight: 600;
  font-size: 13px;
}
.form-group {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;

    .input-error {
      border: 1px solid red;
    }

    .custom-select {
      appearance: none;
    }
}
.custom-select {
  padding: 12px 20px 12px 20px;
  border: 1px solid #bdbfc1;
  background: transparent;
  border-radius: 14px;
  color: #485066;
  font-size: 13px;
}
.pi.select-icon {
  position: absolute;
  top: 48px;
  right: 10px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #6D6E70;
  pointer-events: none;
}
</style>