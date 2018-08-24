import Vue from 'vue'
import Vuex from 'vuex'
import { database } from '@/firebase.js'
import { stat } from 'fs';
import Router from './router.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pictures: [],
    currentPic: '',
    finished: '',
    room: [],
    allReady: false
  },
  mutations: {
    ASSIGN_PLAYER (state, payload){
      console.log(payload)
      state.room = payload
    },
    READY_CHECK (state, payload){
      // console.log(payload);
      if (payload) {
        state.allReady = payload
      }
    },
    GET_PICTURE ( state, pictureObj ) {
     for ( var key in pictureObj ) {
      state.pictures.push(pictureObj[key])
     }
     console.log(state.pictures)
    },
    GET_CURRENT_PIC ( state, pictureObj ) {
      state.currentPic = pictureObj
      let show = pictureObj.show
      if ( pictureObj.show ) {
        swal('rick roll', 'a new picture has beeen posted, please query ur answers', 'info')
      }
      
    },
    TALLEY ( state, talleyObj ) {
      state.finished = talleyObj
      if ( talleyObj.show ) {
        let self = this
        setTimeout(() => {
          swal('time is up', 'the games has been concluded, winners will rewarded while losers will be branded as scrubs', 'success')
          setTimeout(() => {
            Router.push('/score')
          })
        }, 5000)
      }
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
      console.log(payload);
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
      database.ref('picture/').on('value', function ( snapshot ) {
        let pictureObj = snapshot.val()
        commit('GET_PICTURE', pictureObj)
      })
    },
    setCurrentPic ({ commit, dispatch }, currentObj) {
      database.ref('current/').set(currentObj,
        function ( err ) {
        if ( err ) {
          alert('error')
        } else {
          console.log('success')
        }
      });
    },
    getCurrentPic ({ commit, context }, condition ) {
      if ( condition ) {
        database.ref('current/').set({
          image: 'https://orlandoespinosa.files.wordpress.com/2017/06/get-ready-for-it-orlando-espinosa.jpg?w=812',
          answer: 'default pic',
          show: false
        },
          function ( err ) {
          if ( err ) {
            alert('error')
          } else {
            console.log('success')
          }
        });
      }

      database.ref('current/').on('value', function ( snapshot ) {
        commit('GET_CURRENT_PIC', snapshot.val())
      })
    },
    talley ({ commit, dispatch }, rankingObj) {
      database.ref('ranking/').set(rankingObj,
        function ( err ){
        if (!err) {
          console.log('we did it')
        } else {
          console.log(err)
        }
      })
    },
    getTalley ({ commit, context }, start ) {
      if ( start ) {
        database.ref('ranking/').set({ show: false })
        console.log('this is the start')
      }
      database.ref('ranking/').on('value', function ( snapshot ) {
        commit('TALLEY', snapshot.val())
      })
    }
  }
})
