<template>
    <div>
        <br>
        <br>
        <div class="container">
            <div class="card">
              <h5 class="card-header">Scores</h5>
              <div class="card-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(player, index) in room" :key="index">
                      <td>{{player.name}}</td>
                      <td>{{player.points}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState([
            'room'
        ])
    }    
}
</script>

<style>

</style>
