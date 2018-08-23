<template>
    <div>
        <br>
        <br>
        <br>
        <form class="container">
          <div class="form-group">
            <label for="exampleInputEmail1">answer</label>
            <input v-model="answer" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="answer">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">image</label>
            <input v-model="image" type="text" class="form-control" id="exampleInputPassword1" placeholder="image url">
          </div>
          <button type="submit" @click.prevent="submitPicture(answer, image)" class="btn btn-primary">Submit</button>
        </form>
        <br>
    </div>
</template>

<script>
import  { mapActions, mapState } from 'vuex'

export default {
    data () {
        return {
            image: '',
            answer: ''
        }
    },
    computed: {
        ...mapState([
            'pictures'
        ])
    },
    methods: {
        ...mapActions([
            'addPicture',
            'getPicture'
        ]),
        submitPicture ( image, answer ) {
            let pictureObj = {
                image,
                answer
            }
            this.addPicture(pictureObj)
        }
    }

}
</script>

<style>

</style>
