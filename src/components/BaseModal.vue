<template>
  <teleport to="body">
    <div v-if="visible" class="modal">
      <div class="modal__content">
        <h2>{{ isEdit ? 'Edit API Token' : 'Add API Token' }}</h2>
        <form @submit.prevent="handleSubmit">
          <label for="userName">Name</label>
          <input
            id="userName"
            v-model="formData.userName"
            type="text"
            required
          />
          <label for="userEmail">Email</label>
          <input
            id="userEmail"
            v-model="formData.userEmail"
            type="text"
            required
          />
          <label for="description">Description</label>
          <textarea id="description" v-model="formData.description"></textarea>
          <label for="tokenValue">Token value</label>
          <input
            id="tokenValue"
            v-model="formData.tokenValue"
            type="text"
            required
          />
          <label
            >IP Restricted
            <BaseTableCheckbox
              :value="isChecked"
              @update:value="toggleCheckbox"
            />
          </label>
          <label for="AllowIPs">Allow IPs</label>
          <input
            id="AllowIPs"
            v-model="formData.AllowIPs"
            type="text"
            required
          />
          <div class="modal__actions">
            <button type="submit">{{ isEdit ? 'Save' : 'Add' }}</button>
            <button type="button" @click="closeModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script>
import BaseTableCheckbox from '@/components/BaseTable/BaseTableCheckbox.vue'

export default {
  name: 'BaseModal',
  components: { BaseTableCheckbox },
  props: {
    visible: Boolean,
    isEdit: Boolean,
    item: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['close', 'submit'],
  data() {
    return {
      isChecked: true,
      formData: {
        userName: this.item?.userName || '',
        userEmail: this.item?.userEmail || '',
        description: this.item?.description || '',
        tokenValue: this.item?.tokenValue || '',
        AllowIPs: this.item?.AllowIPs || '',
        IPRestricted: 'yes',
      },
    }
  },
  watch: {
    visible(newValue) {
      if (newValue) {
        this.initializeForm(this.item)
      }
    },
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },

    handleSubmit() {
      this.$emit('submit', this.formData)
      this.resetForm()
      this.closeModal()
    },

    resetForm() {
      this.isChecked = true
      this.formData = {
        userName: '',
        userEmail: '',
        description: '',
        tokenValue: '',
        AllowIPs: '',
        IPRestricted: 'yes',
      }
    },

    initializeForm(item) {
      this.formData = {
        userName: item?.userName || '',
        userEmail: item?.userEmail || '',
        description: item?.description || '',
        tokenValue: item?.tokenValue || '',
        AllowIPs: item?.AllowIPs || '',
        IPRestricted: item?.IPRestricted || 'yes',
      }
      this.isChecked = this.formData.IPRestricted === 'yes'
    },

    toggleCheckbox(isChecked) {
      this.isChecked = isChecked
      this.formData.IPRestricted = isChecked ? 'yes' : 'no'
    },
  },
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal__content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}
.modal__actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
