<template>
  <li
    class="base-table__row"
    :class="{ 'base-table__row--checked': isChecked }"
  >
    <div class="base-table__checkboxCell">
      <BaseTableCheckbox
        ref="checkbox"
        :value="isChecked"
        @update:value="toggleCheckbox"
      />
    </div>
    <ul class="base-table__rowData">
      <li
        v-for="(key, index) in itemData"
        :key="`${key}-${index}`"
        class="base-table__cell"
      >
        {{ key }}
      </li>
    </ul>
  </li>
</template>

<script>
import BaseTableCheckbox from '@/components/BaseTable/BaseTableCheckbox.vue'

export default {
  name: 'BaseTableRow',
  components: {
    BaseTableCheckbox,
  },
  props: {
    itemData: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['row-checked'],
  data() {
    return {
      isChecked: false,
    }
  },
  methods: {
    toggleCheckbox(newCheckedState) {
      this.isChecked = newCheckedState
      this.$emit('row-checked', this.isChecked)
    },
  },
}
</script>

<style lang="scss" scoped>
.base-table__row {
  height: 56px;
  list-style-type: none;
  display: flex;
  border-bottom: 1px solid #bdbfc1;
  transition: background-color 0.3s ease;

  &--checked {
    background-color: #daeaf1;
  }
}

.base-table {
  &__checkboxCell {
    width: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__rowData {
    display: flex;
    align-items: center;
    flex-grow: 1;
    padding: 0;
  }

  &__cell {
    list-style-type: none;
    flex-basis: 12.5%;
    font-size: 0.8rem;
  }
}
</style>
