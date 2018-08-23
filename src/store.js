import Vue from 'vue'
import Vuex from 'vuex'
import { app, database} from '@/firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pictures: []

  },
  mutations: {

  },
  actions: {
    addPicture ({ commit, dispatch}, pictureObj) {
      database().ref('picture/').push.set({
        answer: pictureObj.answer,
        image: pictureObj.image,
        hint : pictureObj.hint
      }, function ( err ) {
        if ( err ) {
          alert('error')
        } else {
          console.log ('success')
        }
      });
    } 
  }
})
