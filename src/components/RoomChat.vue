<template>
  <div class="card">
    <div class="card-body">
      <ul>
        <li>Anonymous: Cat</li>
        <li>Anonymous: Dog</li>
        <li>Anonymous: Fox</li>
        <li>Anonymous: Kucing</li>
        <li>{{ answer }}</li>
      </ul>
    </div>
    <div class="card-footer">
      <div class="row">
        <div class="col-lg-10 col-md-10 col-sm-10">
          <input type="text" class="form-control" placeholder="Type your answer" v-model="answer">
        </div>
        <div class="col-lg-2 col-md-2 col-sm-2">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'room-chat',
  data: () => ({
    answer: ''
  }),
}
</script>

<style>

</style>
