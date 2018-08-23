<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm12">
          <div class="card text-center">
            <h5 class="card-header">JOIN PictOi</h5>
            <div class="card-body">
              <div class="row">
                <div class="col-lg-6 offset-lg-3">
                  <form-join></form-join>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Navbar from "@/components/Navbar.vue";
import FormJoin from "@/components/FormJoin.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    Navbar,
    FormJoin,
  },
  data: () => ({
    username: ''
  }),
};
</script>

<style scoped>
  .container {
    margin-top: 20px !important;
  }
</style>

