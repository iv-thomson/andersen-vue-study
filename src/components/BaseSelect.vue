<template>
  <div class="base-select">
    <p
      ref="selectTitle"
      class="base-select__title"
      @click.stop="toggleVisibility"
    >
      {{ selectedValue }}
      <img src="@/assets/icons/angle-down.svg" alt="selectIcon" />
    </p>
    <ul v-if="isVisible" class="base-select__options">
      <li
        v-for="option in options"
        :key="option.value"
        class="base-select__option"
        @click="chooseOption(option)"
      >
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BaseSelect',
  components: {},
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    selectedValue: {
      type: String,
      default: '',
    },
  },
  emits: ['select'],
  data() {
    return {
      isVisible: false,
    }
  },
  mounted() {
    document.addEventListener('click', this.hideSelect, true)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.hideSelect, true)
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible
    },

    chooseOption(option) {
      this.$emit('select', option)
      this.isVisible = false
    },

    hideSelect(event) {
      const titleElement = this.$refs.selectTitle
      if (titleElement.contains(event.target)) {
        return
      }
      this.isVisible = false
    },
  },
}
</script>

<style lang="scss" scoped>
.base-select {
  width: 220px;
  font-size: 0.8rem;
  position: relative;
  cursor: pointer;

  &__options {
    width: 220px;
    padding: 0;
    border: solid 1px #bdbfc1;
    border-radius: 16px;
    background-color: #fff;
    position: absolute;
    z-index: 5;
  }

  &__option {
    list-style-type: none;
    padding: 10px 18px;
    border-radius: 16px;
    cursor: pointer;
    &:hover {
      background-color: #c4c7ca;
    }
  }

  &__title {
    border: solid 1px #bdbfc1;
    border-radius: 16px;
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 10px 18px;
    color: #6d6e70;
  }
}
</style>
