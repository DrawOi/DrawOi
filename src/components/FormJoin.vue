<template>
  <form>
    <div class="form-group">
      <label>Username</label>
      <input type="text" v-model="username" placeholder="Input your username" class="form-control">
      <br>
      <button type="submit" class="btn btn-primary" @click.prevent="submit">JOIN</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'form-join',
  data: () => ({
    username: '',
  }),
  methods: {
    ...mapActions([
      "addPlayer",
      "readyCheck"
    ]),
    submit(){
      let inputObj = {
        name: this.username,
        points: 0,
        ready: false
      }
      this.addPlayer(inputObj)
      this.$router.push({ path: '/room' })
    }
  },
}
</script>

<style>

</style>
