<template>
    <section class="data-usage__cards">
      <SelectButton v-model="selectedValue" :options="options" />
      <TransitionGroup 
        name="fade"
        tag="div" 
        appear
        class="data-usage__card-list"
        >
        <Card
          v-for="figure in figures"
          :key="figure"
          style="width: 25rem; overflow: hidden"
        >
          <template #title>{{ figure.value }}</template>
          <template #subtitle>{{ figure.description }}</template>
        </Card>
      </TransitionGroup>
    </section>
</template>
  
<script>
  import SelectButton from 'primevue/selectbutton';
  import Card from 'primevue/card';
  
  export default {
    name: "DataCards",
    components: { SelectButton, Card },
    props: {
      value: {
        type: String,
        required: true,
        default: 'All'
      },
      options: {
        type: Array,
        required: true,
      },
      figures: {
        type: Array,
        required: true,
      },
    },
    emits: ['update:value'],
    computed: {
      selectedValue: {
        get() {
          return this.value;
        },
        set(newValue) {
          this.$emit('update:value', newValue);
        }
      }
    }
  };
</script>
  
<style lang="scss">
.data-usage__cards {
  > .p-selectbutton.p-component {
    height: 44px;
    border-radius: 16px;
    border: 1px solid #BDBFC1;
  }
}
.data-usage__card-list {
  > .p-card {
    min-width: 419px;
    height: 164px;
    justify-content: center;
    background: linear-gradient(135deg, #0E1629 -0.52%, #485066 99.48%);
    color: #FFFFFF;
  }
  .p-card-title {
    font-size: 49px;
  }
}

.p-togglebutton {
  &.p-component {
    color: #AAACAD;
    background: #FFFFFF;
    font-size: 13px;
    border-radius: 16px !important;
    border-color: #FFFFFF;

    &.p-togglebutton-checked {
      padding: 10px 18px;
      color: #FFFFFF;
      background: #FFFFFF;
      border: none;

      &::before {
        border-radius: 16px;
        background: linear-gradient(135deg, #0E1629 -0.52%, #485066 99.48%);
      }
    }
  }
}
</style>

<style scoped lang="scss">
.data-usage__cards {
  padding: 36px;
  border: 1px solid #BDBFC1;
  border-radius: 28px;
  background: #ffffff;
  box-shadow: 0px 20px 25px -5px #0000001A;

    .data-usage__card-list {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 36px;
    }
  }

.fade-move, .fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.fade-leave-active {
  position: absolute;
}
</style>
  