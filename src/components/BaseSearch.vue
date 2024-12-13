<template>
  <div class="base-search">
    <input
      v-model="localSearchValue"
      type="text"
      :placeholder="placeholder"
      class="base-search__input"
    />
    <img
      src="@/assets/icons/search.svg"
      alt="SearchIcon"
      class="base-search__icon-search"
    />
    <img
      v-show="localSearchValue !== ''"
      src="@/assets/icons/cross.svg"
      alt="ClearIcon"
      class="base-search__icon-cancel"
      @click="clearSearch"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseSearch',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Search...',
    },
  },
  emits: ['update:modelValue'],
  computed: {
    localSearchValue: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },
  methods: {
    clearSearch() {
      this.localSearchValue = ''
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets/variables';
.base-search {
  position: relative;
  display: flex;
  align-items: center;

  &__input {
    color: $color-light-gray;
    width: 220px;
    font-size: 0.8rem;
    padding: 10px 18px 10px 40px;
    border: 1px solid #bdbfc1;
    background-color: #f9f9f9;
    border-radius: 16px;
  }

  &__icon-search {
    border-radius: 50%;
    position: absolute;
    padding: 10px;
    left: 0;
    top: 1px;
  }

  &__icon-cancel {
    position: absolute;
    right: 10px;
    top: 11px;
    cursor: pointer;
  }
}
</style>
