import Vue from 'vue'
import Vuex from 'vuex'
import {database} from '@/firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chats:[],
    messages:[]
  },
  mutations: {
    SET_MESSAGES_EMPTY(state,payload){
      state.messages = payload
    },
    SET_CHATS(state,payload){
      state.chats = payload
    }
  },
  actions: {
    sendMessage({commit},payload){
      console.log('ini payload',payload);
      // console.log(payload.chatID);
      // let chatID = payload.chatID
      const message = {
        // user: payload.username,
        content : payload.content,
        date: payload.date
      }

      database().ref('messages').push(message)
      .then((data)=>{
        console.log(data);        
      })
      .catch((err)=>{
        console.log(err);
      })

    },
    getMessages(context,payload){
      database().ref('messages').on('value', function(snapshot){
        var messages = snapshot.val()
        context.commit('SET_MESSAGES_EMPTY',messages)
      })
    },
    loadChats({commit}){
      database.ref('chats/').on('value',function(snapshot){
        commit('setChats', snapshot.val())
      })
    }
  },
  getters:{
    messages(state){
      return state.messages
    },
    chats(state){
      return state.chats
    }
  }
})
