<template>
  <div class="card">
    <h5 class="card-header">Question</h5>
    <img :src="currentPic.image" class="card-img">
    <div class="card-body">
      <h5>Ayo tebak, gambar apa ini?</h5>
    </div>
    <div class="card-footer">
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'card-question',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['pictures', 'currentPic', 'allReady'])
  },
  methods: {
    ...mapActions(['getPicture', 'setCurrentPic', 'getCurrentPic', 'talley', 'getTalley']),
    startGame () {
      console.log('game start')
      let self = this
      let play = setInterval(() => {
        let random =  Math.floor(Math.random() * Math.floor(this.pictures.length))
        let image = this.pictures[random]
        this.setCurrentPic({
          answer: image.answer,
          image: image.image,
          show: true
          })
      }, 5000);
        setTimeout(function(){ 
        clearInterval(play)
        self.talley({
          rank1 : 'james',
          rank2 : 'gordon',
          rank3: 'levit',
          show: true
        })
         }, 120000);
    }
  },
  mounted () {
    this.getPicture()
    this.getCurrentPic( true )
    this.getTalley( true )
  },
  watch: {
    allReady ( val ) {
      if ( val ) {
        this.startGame()
      }
    }
  }
}
</script>

<style>

</style>
