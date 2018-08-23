<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-12 col-sm-12">
        <LayoutQuestion></LayoutQuestion>
        <br>
      </div>
      <div class="col-lg-4 col-md-12 col-sm-12">
        <LayoutScore></LayoutScore><br>
        <Timing></Timing>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12">
        <RoomChat></RoomChat>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
import LayoutQuestion from "@/components/LayoutQuestion.vue";
import LayoutScore from "@/components/LayoutScore.vue";
import Timing from "@/components/Timing.vue";
import RoomChat from "@/components/RoomChat.vue";

export default {
  name: 'room-game',
  components: {
    LayoutQuestion,
    LayoutScore,
    Timing,
    RoomChat,
  },
  data: () => ({
    answer: ''
  }),
};
</script>

<style scoped>
  .row {
    margin-top: 90px !important;
  }
</style>
