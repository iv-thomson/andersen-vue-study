<template>
  <button
    class="base-table__checkbox"
    :class="{ checked: isChecked }"
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
    onChange: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      isChecked: this.value,
    }
  },
  methods: {
    handleClick() {
      this.isChecked = !this.isChecked
      this.onChange(this.isChecked)
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
