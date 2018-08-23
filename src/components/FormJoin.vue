<template>
  <form>
    <div class="form-group">
      <label>Username</label>
      <input type="text" v-model="username" placeholder="Input your username" class="form-control">
      <br>
      <button type="submit" class="btn btn-primary">JOIN</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'form-join',
  data: () => ({
    username: ''
  })
}
</script>

<style>

</style>
