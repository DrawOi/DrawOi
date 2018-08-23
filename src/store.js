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
      console.log(state);
      state.room.push(payload)
      console.log(payload);
      if (state.players.length !== 4) {
        console.log('room full');
      }else {
      }
    }
  },
  actions: {
    addPlayer(context, payload){
      context.commit("ASSIGN_PLAYER", payload)
      // Event.preventDefault();
      console.log(payload);
      database.ref('player/').push().set(payload, function(){
        if (err) {
          console.log(err);
        }else {
        }
      })
    }
  }
})
