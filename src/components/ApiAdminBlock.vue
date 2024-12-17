<template>
  <div class="api-admin-block">
    <div class="api-admin-block__item">
      <span class="api-admin-block__item-title">Documentation</span>
      <a href="#">Link to API Documentation</a>
    </div>
    <div class="api-admin-block__item">
      <span class="api-admin-block__item-title">API Key</span>
      <span class="api-admin-block__item-key"
        >Cf5032ce-de95-11h6-8c05-00182993j0987hd</span
      >
      <BaseButton
        label="Info"
        variant="outlined"
        class="api-admin-block__button"
      >
        Regenerate
      </BaseButton>
    </div>
    <div class="api-admin-block__item">
      <span class="api-admin-block__item-title">Allowed IPs</span>
      <ul class="api-example-block">
        <li class="api-example-block__item">Example</li>
        <li class="api-example-block__item">0.0.0.0</li>
        <li class="api-example-block__item">192.168.1.1</li>
      </ul>
      <span class="api-admin-block__info"
        >No IP restrictions until you add an allowed IP</span
      >
      <BaseButton
        label="Info"
        variant="outlined"
        class="api-admin-block__button"
      >
        Save
      </BaseButton>
    </div>
    <div class="api-admin-block__item">
      <span class="api-admin-block__item-title">Customer UUID</span>
      <span class="api-admin-block__item-key"
        >Cf5032ce-de95-11h6-8c05-00182993j0987hd</span
      >
    </div>
    <div class="api-admin-block__item">
      <span class="api-admin-block__item-title">Base URL</span>
      <span class="api-admin-block__item-key">https://myserve.ca</span>
    </div>
    <div class="api-admin-block__item">
      <span class="api-admin-block__item-title">Mail Server Static IP</span>
      <span class="api-admin-block__item-key">198.2.179.247</span>
      <span class="api-admin-block__info"
        >Whitelist this IP address to avoid spam blocking</span
      >
    </div>
  </div>
</template>

<script>
import BaseButton from 'primevue/button'

export default {
  name: 'ApiAdminBlock',
  components: { BaseButton },
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.api-admin-block {
  display: flex;
  flex-direction: column;
  border-top: solid 1px #bdbfc1;
  gap: 18px;

  &__item {
    display: flex;
    flex-direction: column;
    padding-bottom: 15px;
    border-bottom: solid 1px #bdbfc1;
    gap: 8px;
    &:first-child {
      padding-top: 18px;
    }
    & > a {
      font-size: 0.8rem;
    }
  }

  &__item-title {
    font-size: 0.8rem;
    font-weight: 600;
  }

  &__item-key {
    font-size: 0.8rem;
    font-weight: 600;
    color: #e51c23;
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid #bdbfc1;
    background-color: #f9f9f9;
    width: fit-content;
  }

  &__button {
    border-radius: 12px;
    border: 1px solid #bdbfc1;
    color: #004b85;
    width: fit-content;
    font-size: 0.8rem;
    font-weight: 600;
    text-align: end;
    padding: 10px 16px;
  }

  &__info {
    color: #6d6e70;
    font-size: 0.8rem;
    font-weight: 500;
  }
}

.api-example-block {
  min-height: 128px;
  border: 1px solid #bdbfc1;
  padding: 20px;
  border-radius: 16px;
  background-color: #f9f9f9;
  margin: 0;
  &__item {
    list-style-type: none;
    color: #6d6e70;
    font-size: 0.8rem;
    font-weight: 500;
  }
}
</style>
