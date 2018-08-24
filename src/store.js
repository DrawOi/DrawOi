import Vue from 'vue'
import Vuex from 'vuex'
import database from './firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    room: []
  },
  mutations: {
    ASSIGN_PLAYER (state, payload){
      state.room = payload
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
    }
  }
})
