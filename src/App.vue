<template>
  <main class="page">
    <AppHeader />

    <div class="page__content">
      <RouterView />
    </div>

    <AppFooter />
  </main>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
  },
}
</script>

<style lang="scss">
  .page {
    // Define global styles here:
    h1 {
      color: black;
    }
  }
</style>

<style scoped lang="scss">
// read about the difference between "style scoped" and "style" here https://vuejs.org/api/sfc-css-features.html
.page {
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border-radius: 28px;
  background: linear-gradient(137.52deg, #f5f7fa 4.72%, #ffffff 96.75%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-top: 1px solid #ccc;
  overflow: hidden;

  &__content {
    flex-grow: 1;
  }
}
</style>
