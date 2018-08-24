import Vue from 'vue'
import Vuex from 'vuex'
import { database } from '@/firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pictures: [],
    room: [],
    allReady: false
  },
  mutations: {
    ASSIGN_PLAYER (state, payload){
      state.room = payload
    },
    READY_CHECK (state, payload){
      // console.log(payload);
      if (payload) {
        state.allReady = payload
      }
    },
    GET_PICTURE ( state, payload ) {
      state.allReady = payload
    }
  },
  actions: {
    addPlayer(context, payload){
      console.log(payload);
      database.ref('player/').push().set(payload, function(err){
        if (err) {
          console.log(err);
        }else {
          database.ref('player/').on('value', function(snapshot) {
            let players = snapshot.val();
            let keyArr = []
            for(let value in players){
              keyArr.push(value)
            }
            console.log('dasdasdasd',keyArr[keyArr.length - 1]);
            localStorage.setItem('id', keyArr[keyArr.length - 1])
          })
          swal(
            'Yeay!',
            'You have logged in!',
            'success'
          )
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
        // console.log(keyArr);
        context.commit('ASSIGN_PLAYER', keyArr)
      })
    },
    readyPlayer(context, payload){
      database.ref(`player/${localStorage.getItem('id')}`).update({ready: true}, function(err){
        if (err) {
          // console.log(err);
        }else {
          swal(
            'Yeay!',
            'You are ready!',
            'success'
          )
        }
      })
    },
    readyCheck(context, payload){
      // console.log(payload);
      context.commit('READY_CHECK', payload)
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
