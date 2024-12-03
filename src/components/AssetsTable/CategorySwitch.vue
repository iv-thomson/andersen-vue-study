<template>
  <div class="category-switch">
    <ul class="category-switch__options">
      <li
        v-for="{ name } in categories"
        :key="name"
        @click="handleCategorySelect(name)"
        :class="{
          'category-switch__options-option': true,
          active: name === modelValue,
        }"
      >
        {{ name }}
      </li>
    </ul>
  </div>
</template>

<script>
import AssetsTable from '@/components/AssetsTable/AssetsTable.vue'

export default {
  name: 'CategorySwitch',
  components: { AssetsTable },
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: String,
      default: 'items',
    },
  },

  emits: ['update:modelValue'],

  methods: {
    handleCategorySelect(category) {
      this.$emit('update:modelValue', category)
    },
  },
}
</script>

<style lang="scss">
.category-switch {
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;

  .category-switch__options {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    max-height: 44px;
    list-style: none;
    border: 1px solid #bdbfc1;
    border-radius: 16px;
  }

  .category-switch__options-option {
    padding: 16px 14px;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    text-transform: capitalize;
    color: #aaacad;
    cursor: pointer;

    &.active {
      display: flex;
      align-items: center;
      max-height: 44px;
      color: #ffffff;
      background: #0e1629;
      border: 1px solid #0e1629;
      border-radius: 16px;
    }
  }
}
</style>
