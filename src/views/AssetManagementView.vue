<template>
  <div class="asset-management">
    <div class="asset-management__headings">
      <div class="asset-management__header">
        <span>
          <img
            class="asset-management__header-icon"
            src="../assets/icons/mobile.svg"
            alt="mobile icon"
          />
        </span>
        Asset management
      </div>
      <ul class="asset-management__route">
        <li
          v-for="(route, index) in routes"
          :key="route.name"
          class="asset-management__route-item"
        >
          <span class="asset-management__route-item-name">
            {{ route.name }}
          </span>

          <img
            v-if="index < routes.length - 1"
            class="asset-management__route-item-separator"
            src="../assets/icons/angle-right.svg"
            alt="right arrow"
          />
        </li>
      </ul>
    </div>
    <div class="asset-management-container">
      <CategorySwitch v-model="selectedCategory" :categories="categoryOptions">
      </CategorySwitch>

      <AssetsTable :default-category="selectedCategory" />
    </div>
  </div>
</template>

<script>
import CategorySwitch from '@/components/AssetsTable/CategorySwitch.vue'
import AssetsTable from '@/components/AssetsTable/AssetsTable.vue'

export default {
  name: 'AssetManagementView',
  components: {
    CategorySwitch,
    AssetsTable,
  },
  data() {
    return {
      routes: [{ name: 'inventory' }, { name: 'asset management' }],
      categoryOptions: [
        {
          name: 'items',
        },
        {
          name: 'models',
        },
        {
          name: 'categories',
        },
      ],
      selectedCategory: 'items',
      assetsData: [],
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.asset-management {
  &__headings {
    display: flex;
    justify-content: space-between;
    align-items: base;
    margin-left: 44px;
    margin-right: 36px;
  }

  .asset-management {
    &__headings {
      font-weight: 700;
      font-size: 31.25px;
      line-height: 38px;
      color: #0e1629;
    }

    &__header {
      display: flex;
      align-items: center;
      gap: 18px;
    }

    &__route {
      display: flex;
      gap: 15px;
      align-items: baseline;
      list-style: none;
      color: #007bff;
      padding: 0;

      &-item {
        display: flex;
        align-items: center;
        gap: 17px;

        &-name {
          text-transform: capitalize;
          text-decoration: underline;
          font-weight: 600;
          font-size: 12.8px;
          line-height: 15.6px;
          cursor: pointer;
        }

        &-separator {
          height: 11px;
        }
      }
    }
  }

  .asset-management-container {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 36px;
    margin: 36px;
    border: 1px solid #bdbfc1;
    border-radius: 28px;
    box-shadow: 8px 12px 18px 2px rgba(0, 0, 0, 0.2);
    overflow: scroll;
  }
}
</style>
