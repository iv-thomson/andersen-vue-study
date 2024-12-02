<template>
  <div class="spinner-wrapper">
    <ProgressSpinner v-if="loading" />
  </div>
  <form class="spare-hardware" @submit.prevent="handleSubmit">
    <div class="overview-header">
      <h1 class="overview-header__title">
        <i class="pi pi-mobile title-icon"></i>
        <b>New Spare Hardware</b>
      </h1>
    </div>
    <section class="card">
      <h1 class="card__title">New Spare Hardware</h1>
      <div class="form-group">
        <label for="device" class="form-label">Device Make and Model</label>
        <select
          id="device"
          v-model="formData.device"
          :class="{ 'input-error': errors.device }"
          class="custom-select"
          @blur="validateField('device')"
          @input="clearError('device')"
        >
          <option disabled value="">Input</option>
          <option v-for="device in devices" :key="device" :value="device">
            {{ device }}
          </option>
        </select>
        <i class="pi pi-angle-down select-icon"></i>
        <span v-if="errors.device" class="error-message">{{ errors.device }}</span>
      </div>
      <div class="form-group">
        <label for="imei" class="form-label">IMEI</label>
        <div class="wrapper">
          <input
            id="imei"
            v-model="formData.imei"
            :class="{ 'input-error': errors.imei }"
            type="text"
            placeholder="Input"
            class="custom-input"
            style="flex: 1;"
            @blur="validateField('imei')"
            @input="clearError('imei')"
          />
          <PrimeButton label="Check IMEI" severity="info" variant="text" raised class="prime-button"/>
       </div>
       <span v-if="errors.imei" class="error-message">{{ errors.imei }}</span>
      </div>
      <div class="imei-checkbox">
        <input id="update-imei" v-model="formData.updateImei" type="checkbox" :value="true" class="rounded-checkbox">
        <label for="update-imei" class="form-label">Update an Existing IMEI If It Exists</label>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="serial-number" class="form-label">Serial Number</label>
          <input
            id="serial-number"
            v-model="formData.serialNumber"
            :class="{ 'input-error': errors.serialNumber }"
            type="text"
            placeholder="Input"
            class="custom-input"
            @blur="validateField('serialNumber')"
            @input="clearError('serialNumber')"
          />
          <span v-if="errors.serialNumber" class="error-message">{{ errors.serialNumber }}</span>
        </div>
        <div class="form-group">
          <label for="eid" class="form-label">EID</label>
          <input
            id="eid"
            v-model="formData.eid"
            :class="{ 'input-error': errors.eid }"
            type="text"
            placeholder="Input"
            class="custom-input"
            @blur="validateField('eid')"
            @input="clearError('eid')"
          />
          <span v-if="errors.eid" class="error-message">{{ errors.eid }}</span>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="carrier" class="form-label">Carrier</label>
          <select
            id="carrier"
            v-model="formData.carrier"
            :class="{ 'input-error': errors.carrier }"
            class="custom-select"
            @blur="validateField('carrier')"
            @input="clearError('carrier')"
          >
            <option disabled value="">Input</option>
            <option v-for="carrier in carriers" :key="carrier" :value="carrier">
              {{ carrier }}
            </option>
          </select>
          <i class="pi pi-angle-down select-icon"></i>
          <span v-if="errors.carrier" class="error-message">{{ errors.carrier }}</span>
        </div>
        <div class="form-group">
          <label for="status" class="form-label">Status</label>
          <select
            id="status"
            v-model="formData.status"
            :class="{ 'input-error': errors.status }"
            class="custom-select"
            @blur="validateField('status')"
            @input="clearError('status')"
          >
            <option disabled value="">Input</option>
            <option v-for="status in statuses" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
          <i class="pi pi-angle-down select-icon"></i>
          <span v-if="errors.status" class="error-message">{{ errors.status }}</span>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="condition" class="form-label">Condition</label>
          <select
            id="condition"
            v-model="formData.condition"
            :class="{ 'input-error': errors.condition }"
            class="custom-select"
            @blur="validateField('condition')"
            @input="clearError('condition')"
          >
          <option disabled value="">Input</option>
          <option v-for="condition in conditions" :key="condition" :value="condition">
            {{ condition }}
          </option>
        </select>
          <i class="pi pi-angle-down select-icon"></i>
          <span v-if="errors.condition" class="error-message">{{ errors.condition }}</span>
        </div>
        <div class="form-group">
          <label for="location" class="form-label">Location</label>
          <select
            id="location"
            v-model="formData.location"
            :class="{ 'input-error': errors.location }"
            class="custom-select"
            @blur="validateField('location')"
            @input="clearError('location')"
          >
            <option disabled value="">Input</option>
            <option v-for="location in locations" :key="location" :value="location">
              {{ location }}
            </option>
          </select>
          <i class="pi pi-angle-down select-icon"></i>
          <span v-if="errors.location" class="error-message">{{ errors.location }}</span>
        </div>
      </div>
      <div>
        <p class="form-label">Options</p>
        <div class="options-group">
          <label for="wall-charger">
            <input id="wall-charger" v-model="formData.options" type="checkbox" :value="'Wall Charger'" class="rounded-checkbox">
            Wall Charger
          </label>
          <label for="car-charger">
            <input id="car-charger" v-model="formData.options" type="checkbox" :value="'Car Charger'" class="rounded-checkbox">
            Car Charger
          </label>
          <label for="case">
            <input id="case" v-model="formData.options" type="checkbox" :value="'Case'" class="rounded-checkbox">
            Case
          </label>
        </div>
       </div>
      <div class="form-group">
        <label for="contact" class="form-label">Contact</label>
        <input
          id="contact"
          v-model="formData.contact"
          :class="{ 'input-error': errors.contact }"
          type="text"
          placeholder="Input"
          class="custom-input"
          @blur="validateField('contact')"
          @input="clearError('contact')"
        />
        <span v-if="errors.contact" class="error-message">{{ errors.contact }}</span>
      </div>
      <div class="form-group">
        <label for="notes" class="form-label">Notes</label>
        <textarea 
          id="notes" 
          v-model="formData.notes"
          :class="{ 'input-error': errors.notes }" 
          placeholder="Text Area" 
          class="custom-input notes-field"
          @blur="validateField('notes')"
          @input="clearError('notes')">
        </textarea>
        <span v-if="errors.notes" class="error-message">{{ errors.notes }}</span>
      </div>
      <div class="form-group">
        <label for="file" class="form-label">Photo of Device</label>
        <div class="wrapper">
          <input
            id="file"
            ref="file"
            type="file"
            accept="image/*"
            class="custom-input"
            style="display: none"
            @change="handleFileChange"
         />
          <input
            :value="fileName"
            :class="{ 'input-error': errors.file }"
            type="text"
            placeholder="No File Choosen"
            class="custom-input"
            readonly
            style="flex: 1;"
            @blur="validateField('file')"
            @input="clearError('file')"
          />
          <PrimeButton label="Choose File" severity="info" variant="text" raised class="prime-button" @click="triggerFileInput"/>
       </div>
       <span v-if="errors.file" class="error-message">{{ errors.file }}</span>
      </div>
      <div class="button-group">
        <PrimeButton 
          label="Cancel"
          icon="pi pi-times" 
          severity="info" 
          variant="text"
          raised
          class="prime-button"
          @click="close" 
        />
        <PrimeButton 
          label="Create Spare Hardware"
          icon="pi pi-plus-circle" 
          class="submit-button"
          severity="info" 
          type="submit"
          :disabled="!isFormValid"
        />
      </div>
    </section>
  </form>
  <FormDetailsDialog
    :visible="dialogVisible"
    :data="formData"
    header="Form Details"
    @close="dialogVisible = false"
  />
</template>

<script>
import ProgressSpinner from "primevue/progressspinner";
import PrimeButton from "primevue/button";
import FormDetailsDialog from '@/components/FormDetailsDialog.vue';

export default {
  name: "SpareHardware",
  components: { ProgressSpinner, PrimeButton, FormDetailsDialog},
  data() {
    return {
      loading: false,
      dialogVisible: false,
      fileName: "No File Chosen",
      formData: {
        device: "",
        imei: "",
        updateImei: false,
        serialNumber: "",
        eid: "",
        carrier: "",
        status: "",
        condition: "",
        location: "",
        contact: "",
        options: [],
        notes: "",
        file: null
      },
      devices: ["iPhone 13", "Samsung Galaxy S22", "Google Pixel 7", "OnePlus 10"],
      carriers: ["AT&T", "Verizon", "T-Mobile", "Sprint", "Orange"],
      statuses: ["Active", "Inactive", "Pending", "Archived"],
      conditions: ["New", "Good", "Poor", "Damaged"],
      locations: ["New York", "Los Angeles", "Chicago", "Houston", "San Francisco"],
      errors: {}
    };
  },
  computed: {
    isFormValid() {
      return this.validateRequiredFields().valid;
    },
  },
  methods: {
    validateRequiredFields() {
      const requiredFields = [
        "device", "imei", "serialNumber", "condition", "eid",
        "carrier", "status", "location", "options", "contact",
        "notes", "file",
      ];
      const errors = {};
      let valid = true;

      requiredFields.forEach((field) => {
        if (!this.formData[field]) {
          errors[field] = `${field} is required.`;
          valid = false;
        }
      });

      return { valid, errors };
    },

    triggerFileInput() {
      this.$refs.file.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.fileName = file.name;
        this.formData.file = file; 
        this.errors['file'] = '';
      }
    },
    close() {
      this.$router.push("/");
    },
    validateField(field) {
      this.errors[field] = !this.formData[field] ? 'The field is required' : '';
    },
    clearError(field) {
      if (this.errors[field]) {
        delete this.errors[field];
      }
    },
    handleSubmit() {
      const { valid, errors } = this.validateRequiredFields();
      this.errors = errors;

      if (!valid) {
        return;
      }
      this.dialogVisible = true;
    },
}
};
</script>

<style scoped lang="scss">
.error-message {
  color: red;
  font-size: 12px;
  margin-top: -5px;
}
.spinner-wrapper {
  display: flex;
  justify-content: center;
}
.spare-hardware {
  display: flex;
  flex-direction: column;
  margin-top: 41px;
  padding: 0 36px;
  gap: 36px;

  .overview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__title {
      margin: 0;
      font-weight: 400;
      font-size: 31px;
      color: #0e1629;
    }
  }

  .title-icon {
    font-size: 32px;
    color: #007bff;
  }

  .card {
    display: flex;
    flex-direction: column;
    gap: 18px;
    border: 1px solid #bdbfc1;
    border-radius: 28px;
    margin-bottom: 36px;
    color: #241f1f;
    box-shadow: 0px 20px 25px -5px #0000001a;
    padding: 36px;
    background: #ffffff;

    &__title {
      margin: 0;
      padding: 0;
      font-size: 25px;
    }

    .form-label {
      color: #0E1629;
      font-weight: 600;
      font-size: 13px;
    }

    .imei-checkbox {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .options-group {
      display: flex;
      align-items: center;
      gap: 18px;

      & label {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #6D6E70;
      }
    }

    .rounded-checkbox {
      appearance: none;
      width: 16px;
      height: 16px;
      border: 2px solid #BDBFC1;
      border-radius: 50%;
      outline: none;
      cursor: pointer;
      position: relative;

        &:checked {
          background-color: #007BFF;
          border: 5px solid #007BFF;
        }

        &:checked::after {
          content: '';
          width: 7px;
          height: 7px;
          background-color: #fff;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
    }

    .form-row {
      display: flex;
      gap: 18px;

      .form-group {
        flex: 1; 
        display: flex;
        flex-direction: column;
        gap: 8px;

        .custom-input, .custom-select {
          width: 100%; 
        }
      }
    }

    .form-group {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;

      .input-error {
        border: 1px solid red;
      }

      .custom-select {
        appearance: none;
      }
    }
    .custom-input, .custom-select {
      padding: 12px 20px 12px 20px;
      border: 1px solid #bdbfc1;
      background: transparent;
      border-radius: 14px;
      color: #485066;
      font-size: 13px;
    }

    .pi.select-icon {
      position: absolute;
      top: 48px;
      right: 10px;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      color: #6D6E70;
      pointer-events: none;
    }

     .notes-field {
      height: 176px;
     }

    .button-group {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
    
    .wrapper {
      display: flex; 
      gap: 18px;
    }
  }

  .prime-button {
    &.p-button {
      color: #004b85;
      border: none;
      height: 36px;
      border-radius: 16px;

      &.p-component:hover {
        border: none;
        color: #004b85;
      }
    }
  }

  .submit-button {
    &.p-button {
      background: #004b85;
      border: none;
      height: 36px;
      border-radius: 16px;

      &.p-component:hover {
        background: #005a9c;
        border: none;
      }
    }
  }
}
</style>
