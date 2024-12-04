<template>
    <Dialog :visible="visible"  :style="{ width: '50vw' }">
        <div>
          <p><strong>{{category}}</strong></p>
          <p><strong>Description:</strong></p>
        </div>
        <Button label="Close" icon="pi pi-times" @click="closeDialog" />


    </Dialog>
</template>
<script>
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
export default {
    components: {Dialog, Button},
    name: "AddItemModal",
    emits: ['update:visible'],
    props: {
      header: {type: String, required: true},
      visible: {type: Boolean, required: true},
      category: {type: String, required: true}
    },
    methods: {
      closeDialog() {
        this.$emit('update:visible', false);
        
      }
  
    }

}
</script>
<style lang="scss">
.soy {
    width: 400px;
}
</style>