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
      class="base-search__iconSearch"
      @click="emitSearch"
    />
    <img
      v-show="localSearchValue !== ''"
      src="@/assets/icons/cross.svg"
      alt="SearchIcon"
      class="base-search__iconCancel"
      @click="clearSearch"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseSearch',
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Search...',
    },
  },
  emits: ['input', 'search'],
  data() {
    return {
      localSearchValue: this.value,
    }
  },
  watch: {
    value(newValue) {
      this.localSearchValue = newValue
    },
  },
  methods: {
    emitSearch() {
      this.$emit('input', this.localSearchValue)
      this.$emit('search', this.localSearchValue)
    },

    clearSearch() {
      this.localSearchValue = ''
      this.emitSearch()
    },
  },
}
</script>

<style lang="scss" scoped>
.base-search {
  position: relative;
  display: flex;
  align-items: center;

  &__input {
    width: 220px;
    font-size: 0.8rem;
    padding: 10px 18px 10px 40px;
    border: 1px solid #bdbfc1;
    background-color: #f9f9f9;
    border-radius: 16px;
  }

  &__iconSearch {
    border-radius: 50%;
    position: absolute;
    padding: 10px;
    left: 0;
    top: 1px;
    cursor: pointer;
  }

  &__icon:hover {
    background-color: #bdbfc1;
  }

  &__iconCancel {
    position: absolute;
    right: 10px;
    top: 11px;
    cursor: pointer;
  }
}
</style>
