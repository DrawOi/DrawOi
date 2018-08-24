import Vue from 'vue'
import Vuex from 'vuex'
import { database } from '@/firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
<<<<<<< HEAD
    pictures: [],
    room: []
  },
  mutations: {
    ASSIGN_PLAYER (state, payload){
      state.room = payload
    },
    GET_PICTURE ( state, pictureArr ) {
      state.pictures = pictureArr
    }
  },
  actions: {
    addPlayer(context, payload){
      console.log(payload);
      database.ref('player/').push().set(payload, function(err){
        if (err) {
          console.log(err);
        }else {
          console.log('success');
        }
      })
    },
    getPlayer(context, payload){
      // console.log('asdfasdfasd');
      database.ref('player/').on('value', function(snapshot) {
        let players = snapshot.val();
        let keyArr = []
        for(let value in players){
          keyArr.push(players[value])
        }
        console.log(keyArr);
        context.commit('ASSIGN_PLAYER', keyArr)
      })
    },
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
