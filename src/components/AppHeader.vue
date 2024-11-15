<template>
  <header class="app-header">
    <RouterLink to="/data-usage">Data usage</RouterLink>
    <RouterLink to="/activity-log">Asset management</RouterLink>
    <RouterLink to="/asset-management">Activity log</RouterLink>
    <RouterLink to="/service-ticket-reporting">Service ticket reporting</RouterLink>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink,
  },
}
</script>

<style scoped lang="scss">
.app-header {
  display: flex;
  justify-content: flex-end;
  border-radius: 28px 28px 0 0;
  border-bottom: 1px solid #dcdcdf;
  background: #ffffff;
  padding: 10px 36px 10px 36px;
  gap: 4px;

  a {
    padding: 10px 17.5px 10px 17.5px;
    text-decoration: none;
    color: #0e1629;
    font-weight: 600;
    size: 14px;
  }
}
</style>
