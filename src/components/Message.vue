<template>
    <div>
        <div class="message" v-for="(message,index) in messages" :key="index">
            <!-- <div class="username" v-if="index>0 && message[index-1].user != message.user">
                {{message.user}}
            </div>
            <div class="username" v-if="index == 0">
                {{message.user}}
            </div> -->
            <div style="margin-top:5px"></div>
            <div class="content">
                {{message.content}}
            </div>
        </div>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'  

export default {
    data(){
        return{}
    },
    props:[
        'messages'
    ],
    computed:{
        // username(){
        //     return this.$store.getters.user.username
        // }
        ...mapState([
            'messages'
        ]),
    },
    methods:{
        ...mapActions([
            'getMessages'
        ])
    },
    mounted(){
        this.getMessages()
    }

}
</script>

<style>

</style>
