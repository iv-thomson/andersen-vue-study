<template>
  <div v-if="currentJob" class="background-job">
    <div class="background-job__header">
      <h1 class="background-job__page-title">
        Background Job #{{ currentJob.id }}
      </h1>
      <div class="background-job__bread-crumbs">
        <span
          class="background-job__bread-crumb"
          @click="navigateTo('activity')"
          >Activity</span
        >
        <img src="@/assets/icons/chevron-right.svg" alt="chevron" />
        <span
          class="background-job__bread-crumb"
          @click="navigateTo('background-jobs')"
          >Background Jobs</span
        >
        <img src="@/assets/icons/chevron-right.svg" alt="chevron" />
        <span class="background-job__bread-crumb"> #{{ currentJob.id }}</span>
      </div>
    </div>
    <div class="background-job__wrapper">
      <div class="background-job__info">
        <span class="background-job__info-item"
          >Status:
          <span
            :class="{
              'background-job__badge background-job__badge_green':
                currentJob.status === 'completed',
              'background-job__badge background-job__badge_red':
                currentJob.status === 'incompleted',
            }"
          >
            {{ capitalize(currentJob.status) }}
          </span>
        </span>
        <span class="background-job__info-item"
          >Created At: <span v-html="safeHtml(currentJob.createdAt)"></span
        ></span>
        <span class="background-job__info-item"
          >User: <span> {{ capitalize(currentJob.user) }}</span></span
        >
        <span class="background-job__info-item"
          >Name: <span> {{ capitalize(currentJob.name) }}</span></span
        >
      </div>
      <div class="background-job__tabs">
        <span class="background-job__tab background-job__tab_inactive"
          >Params</span
        ><span class="background-job__tab background-job__tab_active"
          >Results</span
        ><span class="background-job__tab background-job__tab_inactive"
          >Info</span
        >
      </div>
      <div class="background-job__statistics">
        <pre class="background-job__statistics-item">{{ formatJson }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchBackgroundJobs } from '@/api/background-jobs.api'
import DOMPurify from 'dompurify'

export default {
  name: 'ActivityBacgroundJobs',
  data() {
    return {
      jobsData: [],
    }
  },
  computed: {
    currentJob() {
      const jobId = this.$route.params.jobId
      return this.jobsData.find(el => el.id === +jobId)
    },

    formatJson() {
      return JSON.stringify(this.currentJob.statistics, null, 2)
    },
  },
  async created() {
    try {
      const data = await fetchBackgroundJobs()
      this.jobsData = data
    } catch (error) {
      console.error('Data fetching error:', error)
    }
  },
  methods: {
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },

    safeHtml(content) {
      return DOMPurify.sanitize(content)
    },

    navigateTo(route) {
      switch (route) {
        case 'activity':
        case 'background-jobs':
          this.$router.push('/activity/background-jobs')
          break
        default:
          console.error(`Unknown route: ${route}`)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.background-job {
  position: relative;
  padding: 0 80px 30px;

  &__header {
    max-width: 1308px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__page-title {
    padding-left: 40px;
  }

  &__page-title::before {
    content: '';
    position: absolute;
    top: 25px;
    left: 0;
    width: 32px;
    height: 32px;
    background: url('../assets/icons/bolt.svg') no-repeat center/contain;
  }

  &__wrapper {
    max-width: 1308px;
    min-height: 67vh;
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 25px;
    padding: 36px;
    border: 1px solid #bdbfc1;
    border-radius: 28px;
    box-shadow: 0px 10px 10px -5px #0000000a;
    box-shadow: 0px 20px 25px -5px #0000001a;
  }

  &__bread-crumbs {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__bread-crumb {
    font-size: 0.8rem;
    font-weight: 600;
    text-decoration: underline;
    color: #007bff;
    cursor: pointer;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__badge {
    border: 1px solid;
    border-radius: 32px;
    padding: 4px 8px;
    font-size: 0.8rem;
    margin-left: 5px;
    &_green {
      border-color: #11cc6e;
      color: #11cc6e;
      background-color: #edfbf4;
    }
    &_red {
      border-color: #cc1111;
      color: #cc1111;
      background-color: #fbeded;
    }
  }

  &__info-item {
    font-size: 0.8rem;
    font-weight: 600;
    span {
      font-weight: initial;
      padding-left: 5px;
    }
  }

  &__tabs {
    display: flex;
    flex-grow: 0;
    border: 1px solid #bdbfc1;
    border-radius: 16px;
    background-color: #f9f9f9;
    height: 44px;
    width: 233px;
  }

  &__tab {
    font-size: 0.8rem;
    padding: 10px 18px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &_inactive {
      color: #aaacad;
    }
    &_active {
      color: #ffffff;
      box-shadow: 0px 3px 6px 0px #0000003b;
      box-shadow: 0px 3px 6px 0px #00000029;
      background: linear-gradient(135deg, #0e1629 -0.52%, #485066 99.48%);
    }
  }

  &__statistics {
    flex: 1;
    padding: 20px;
    background: #f9f9f9;
    border: 1px solid #bdbfc1;
    border-radius: 16px;
  }

  &__statistics-item {
    font-size: 0.8rem;
  }
}
</style>
