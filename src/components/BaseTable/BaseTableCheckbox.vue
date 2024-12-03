<template>
  <div
    class="base-table__checkbox"
    :class="{ checked: value }"
    aria-label="Select Row"
    @click="handleClick"
  />
</template>

<script>
export default {
  name: 'BaseTableCheckbox',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:value'],
  methods: {
    handleClick() {
      console.log('Checkbox clicked, current value:', this.value)
      this.$emit('update:value', !this.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.base-table__checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  outline: none;
  transition: background-image 0.3s ease;
  background-image: url('@/assets/icons/checkbox-default.svg');
}

.base-table__checkbox.checked {
  background-image: url('@/assets/icons/checkbox-checked.svg');
}
</style>
