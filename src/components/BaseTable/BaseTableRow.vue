<template>
  <li class="base-table__row">
    <ul class="base-table__rowData">
      <li
        v-for="(key, index) in itemData"
        :key="uniqueIndex(index)"
        class="base-table__cell"
      >
        {{ key }}
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'BaseTableRow',
  props: {
    itemData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {
    uniqueIndex() {
      return index => `${index}-${Math.random().toString(36).substring(2, 9)}`
    },
  },
}
</script>

<style scoped>
.base-table__row {
  height: 56px;
  list-style-type: none;
  display: flex;
  border-bottom: 1px solid #bdbfc1;
}

.base-table__rowData {
  display: flex;
  align-items: center;
  flex-grow: 1;
  width: 95.8%;
  padding: 0;
}

.base-table__cell {
  /* width: 148px; */
  list-style-type: none;
  flex-basis: 11.11%;
  font-size: 0.8rem;
}
</style>
