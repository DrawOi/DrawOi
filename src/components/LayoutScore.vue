<template>
  <div class="card">
    <h5 class="card-header">Scores</h5>
    <div class="card-body">
      <table class="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Score</th>
            <th>Ready</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(player, index) in room" :key="index">
            <td>{{player.name}}</td>
            <td>{{player.points}}</td>
            <td>{{player.ready}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer">
      <h5>Good luck boiz}</h5>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
export default {
  name: 'table-score',
  methods: {
    ...mapActions([
      'getPlayer',
      'readyCheck'
    ])
  },
  computed: {
    ...mapState([
      'room',
      'allReady'
    ])
  },
  mounted() {
    // console.log('ayamfAdsadsa')
    this.getPlayer()
  },
  watch: {
    room: function(){
      let allReady = true
      this.room.forEach(player=>{
        if (player.ready === false) {
          allReady = false
        }
      })
      this.readyCheck(allReady)
    }
  }
}
</script>

<style>

</style>
