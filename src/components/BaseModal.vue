<template>
  <teleport to="body">
    <div v-if="visible" class="modal">
      <div class="modal__content">
        <div class="modal__header">
          <h2 class="modal__header-title">
            {{ isEdit ? 'Edit API Token' : 'Add API Token' }}
          </h2>
          <button
            type="button"
            class="modal__button modal__button_close"
            @click="closeModal"
          >
            <img src="@/assets/icons/close-out.svg" alt="close" />
          </button>
        </div>
        <form class="modal__form" @submit.prevent="handleSubmit">
          <label for="userName" class="modal__label"
            >Name
            <input
              id="userName"
              v-model="formData.userName"
              type="text"
              required
          /></label>
          <label for="userEmail" class="modal__label"
            >Email
            <input
              id="userEmail"
              v-model="formData.userEmail"
              type="text"
              required
          /></label>
          <label class="modal__label" for="description"
            >Description
            <textarea
              id="description"
              v-model="formData.description"
            ></textarea>
          </label>
          <label class="modal__label" for="tokenValue"
            >Token value
            <input
              id="tokenValue"
              v-model="formData.tokenValue"
              type="text"
              required
          /></label>
          <label class="modal__label-checkbox"
            >IP Restricted
            <BaseTableCheckbox
              :value="isChecked"
              @update:value="toggleCheckbox"
            />
          </label>
          <label class="modal__label" for="AllowIPs"
            >Allow IPs
            <input
              id="AllowIPs"
              v-model="formData.AllowIPs"
              type="text"
              required
          /></label>
          <div class="modal__bottom-actions">
            <button type="submit" class="modal__button modal__button_info">
              <img src="@/assets/icons/check-circle.svg" alt="check-circle" />{{
                isEdit ? 'Save' : 'Add'
              }}
            </button>
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

<style lang="scss" scoped>
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
  &__header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #bdbfc1;
  }

  &__header-title {
    margin-top: 0;
  }

  &__content {
    min-width: 626px;
    background: #fff;
    padding: 20px;
    border-radius: 28px;
    width: 400px;
  }

  &__form {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__label {
    display: flex;
    flex-direction: column;
    gap: 3px;
    font-size: 0.8rem;
    font-weight: 600;
    & > input {
      padding: 10px 16px;
      border-radius: 12px;
      border: 1px solid #bdbfc1;
    }
  }

  &__label-checkbox {
    font-size: 0.8rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__bottom-actions {
    display: flex;
    justify-content: end;
    margin-top: 20px;
  }

  &__button {
    width: fit-content;
    font-size: 0.8rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    cursor: pointer;
    &_info {
      padding: 10px 16px;
      background-color: #004b85;
      border: 1px solid #bdbfc1;
      border-radius: 12px;
      color: #fff;
    }
    &_close {
      width: 24px;
      height: 24px;
      border: none;
      background-color: transparent;
      padding: 0;
    }
  }
}
</style>
