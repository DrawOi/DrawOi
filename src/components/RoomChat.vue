<template>
  <div class="card">
    <div class="chat-container" @scroll="onScroll" ref="chatContainer">
      <!-- {{content}} -->
      <message :messages="content" @imageLoad="scrollToEnd"></message>
    </div>
    <div class="card-footer">
      <div class="row">
        <div class="col-lg-10 col-md-10 col-sm-10">
          <input type="text" class="form-control" placeholder="Type your answer" v-on:keyup.enter="sendMessage" v-model="content">
        </div>
        <div class="col-lg-2 col-md-2 col-sm-2">
          <button type="submit" class="btn btn-primary" @click="sendMessage">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Message from "./Message.vue";
import {database} from '@/firebase.js'

export default {
  name: "room-chat",
  data() {
    return {
      room: null,
      db: null,
      content: "",
      chatMessages: [],
      currentRef: {},
      loading: false,
      totalChatHeight: 0
    };
  },
  props: ["id"],
  mounted() {
    // this.db = firebase.initializeApp({
    //   apiKey: "AIzaSyAz2d6i6PQDgY1aEATUsn2ePY3RaVAb2kA",
    //   authDomain: "first-chat-room-270a6.firebaseapp.com",
    //   databaseURL: "https://first-chat-room-270a6.firebaseio.com",
    //   storageBucket: "first-chat-room-270a6.appspot.com",
    //   messagingSenderId: "299521664452"
    // });
    // this.init()
    // this.database = Firebase.database();
    // this.room = this.db.database().ref().child("rooms/"+"test")
    // this.messageListener()
    // this.db =
    this.loadChat();
  },
  components: {
    message: Message
  },
  computed: {
    ...mapState(['currentPic']),
    messages() {
      return this.chatMessages;
    },
    // username(){
    // return this.$store.getters.user.username
    // },
    onChildAdded() {
      const that = this;
      let onChildAdded = function(snapshot, newMessage = true) {
        let message = snapshot.val();
        message.key = snapshot.key;

        var urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

        message.content = message.content
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");

        message.content = message.content.replace(
          urlPattern,
          "<a href='$1'>$1</a>"
        );

        if (!newMessage) {
          that.chatMessages.unshift(that.processMessage(message));
          that.scrollTo();
        } else {
          that.chatMessages.push(that.processMessage(message));
          that.scrollToEnd();
        }
      };
      return onChildAdded;
    }
  },
  watch: {
    "$route.params.id"(newId, oldId) {
      this.currentRef.on("child_added", this.onChildAdded);
      this.loadChat();
    }
  },
  methods: {
    loadChat() {
      this.totalChatHeight = this.$refs.chatContainer.scrollHeight;
      this.loading = false;
      if (this.id !== undefined) {
        this.chatMessages = [];
        let chatID = this.id;
        this.currentRef = database
          .ref("messages")
          // .child(chatID)
          .child("messages")
          .limitToLast(20);
        this.currentRef.on("child_added", this.onChildAdded);
      }
    },
    onScroll() {
      let scrollValue = this.$refs.chatContainer.scrollTop;
      const that = this;
      if (scrollValue < 100 && !this.loading) {
        this.totalChatHeight = this.$refs.chatContainer.scrollHeight;
        this.loading = true;
        let chatID = this.id;
        let currentTopMessage = this.chatMessages[0];
        if (currentTopMessage === undefined) {
          this.loading = false;
          return;
        }
          database
          .ref("messages")
          // .child(chatID)
          .child("messages")
          .orderByKey()
          .endAt(currentTopMessage.key)
          .limitToLast(20)
          .once("value")
          .then(function(snapshot) {
            let tempArray = [];
            snapshot.forEach(function(item) {
              tempArray.push(item);
            });
            if (tempArray[0].key === tempArray[1].key) {
              return;
              console.log(tempArray);
              tempArray.reverse();
              tempArray.forEach(function(child) {
                that.onChildAdded(child, false);
              });
              that.loading = false;
            }
          });
      }
    },
    processMessage() {},
    send(content) {
      let data = { message: content };
      let key = this.room.push().key;
      this.room.child("messages/" + key).set(data);
      this.message = "";
    },
    messageListener() {
      this.room.child("messages").on("child_added", function(snapshot) {
        this.messages.push(snapshot.val());
      });
    },
    // init(){
    //   this.room = this.db().database().ref().child('rooms/'+"testing")
    //   this.messageListener()
    // },
    sendMessage() {
      if (this.content !== "") {
        console.log(this.currentPic.answer)
        console.log(this.content)
        // console.log('ini this conten',this.content);
        this.$store.dispatch("sendMessage", {
          content: this.content,
          date: new Date().toString(),
          // chatID: this.id
        });
        this.content = "";
      }
    },
    scrollToEnd() {
      this.$nextTick(() => {
        var container = this.$el.querySelector(".chat-container");
        container.scrollTop = container.scrollHeight;
      });
    },
    scrollTo() {
      this.$nextTick(() => {
        let currentHeight = this.$refs.chatContainer.scrollHeight;
        let difference = currentHeight - this.totalChatHeight;
        var container = this.$el.querySelector(".chat-container");
        container.scrollTop = difference;
      });
    }
  }
};
</script>

<style>
.chat-container {
  box-sizing: border-box;
  height: calc(100vh - 9.5rem);
  overflow-y: auto;
  padding: 10px;
  background-color: #f2f2f2;
}
.chat-container .content {
  padding: 8px;
  background-color: lightgreen;
  border-radius: 10px;
  display: inline-block;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
  max-width: 50%;
  word-wrap: break-word;
}
.message {
  margin-bottom: 3px;
}
.message.own {
  text-align: right;
}
.message.own .content {
  background-color: lightskyblue;
}
</style>
