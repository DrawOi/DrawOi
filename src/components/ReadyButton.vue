<template lang="html">
  <button type="button" class="btn btn-success" @click="readyPlayer">Ready</button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ready-button',
  methods: {
    ...mapActions([
      'readyPlayer'
    ])
  }
}
</script>

<style lang="css">
</style>
