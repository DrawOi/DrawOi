import Vue from 'vue'
import Vuex from 'vuex'
import { database } from '@/firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pictures: [],
  },
  mutations: {
    GET_PICTURE ( state, pictureArr ) {
      state.pictures = pictureArr
    }
  },
  actions: {
    addPicture ({ commit, dispatch }, pictureObj) {
      database.ref('picture/').push().set({
        answer: pictureObj.answer,
        image: pictureObj.image
      }, function ( err ) {
        if ( err ) {
          alert('error')
        } else {
          alert(`succesfully added ${pictureObj.answer}`)
        }
      });
    },
    getPicture ({ commit, dispatch }) {
      const getData = database.ref('picture/')
      getData.on('value', function(snapshot) {
        let pictureObj = snapshot.val()
        commit('GET_PICTURE', pictureObj)
      })
    }
  }
})
