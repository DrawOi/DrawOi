<template>
  <div class="card text-center">
    <h5 class="card-header">Timing ⏰</h5>
    <div class="card-body">
      <div>
        <h1>
          <vue-countdown 
            v-on:time-expire="handleTimeExpire" 
            :seconds="120" 
            :start="start"
          >
          </vue-countdown>
        </h1>
        <button
          @click="startTimer"
          class="btn btn-primary"
        >
        Start Timer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import VueCountdown from '@dmaksimovic/vue-countdown';

export default {
  name: 'timing',
  components: {
    'vue-countdown': VueCountdown,
  },
  data: () => ({
    start: false
  }),
  methods: {
    handleTimeExpire() {
      alert('Times up');
    },
    startTimer() {
      this.start = true
    }
  }
}
</script>

<style>

</style>
