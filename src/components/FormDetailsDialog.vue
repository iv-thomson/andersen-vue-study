<template>
  <PrimeDialog :visible="visible" :header="header" :style="{ width: '50vw' }">
    <div>
      <div v-for="(value, key) in data" :key="key">
        <p v-if="Array.isArray(value)">
          <b>{{ formatKey(key) }}:</b> {{ value.join(', ') }}
        </p>
        <p v-else-if="typeof value === 'boolean'">
          <b>{{ formatKey(key) }}:</b> {{ value ? 'yes' : 'no' }}
        </p>
        <p v-else-if="key==='file'">
          <b>Photo of Device:</b> {{ data.file.name }}
        </p>
        <p v-else>
          <b>{{ formatKey(key) }}:</b> {{ value }}
        </p>
      </div>
    </div>
    <template #footer>
      <PrimeButton label="Close" @click="$emit('close')" />
    </template>
  </PrimeDialog>
</template>
  
<script>
 import PrimeDialog from "primevue/dialog";
 import PrimeButton from "primevue/button";
  
  export default {
    name: 'FormDetailsDialog',
    components: { PrimeDialog, PrimeButton },
    props: {
      visible: { type: Boolean, required: true },
      data: { type: Object, required: true },
      header: { type: String, default: "Form Details" },
    },
    emits: ['close'],
    methods: {
      formatKey(key) {
        return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
      },
    },
  }
</script>
  
<style lang="scss">
.p-dialog-header .p-button{
  display: none;
}
</style>
  