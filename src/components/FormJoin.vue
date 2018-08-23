<template>
  <form>
    <div class="form-group">
      <label>Username</label>
      <input type="text" v-model="username" placeholder="Input your username" class="form-control">
      <br>
      <button type="submit" class="btn btn-primary" @click="submit">JOIN</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'form-join',
  data: () => ({
    username: ''
  }),
  methods: {
    ...mapActions([
      "addPlayer"
    ]),
    submit(){
      let inputObj = {
        name: this.username,
        points: 0
      }
      this.addPlayer(inputObj)
    }
  }
}
</script>

<style>

</style>
