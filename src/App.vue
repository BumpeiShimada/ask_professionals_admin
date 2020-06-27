<template>
  <div v-if="isUserStateSet" id="app">
    <header-component />
    <router-view />
  </div>
  <b-loading v-else :is-full-page="true" :active="true" :can-cancel="false" />
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { auth } from "@/scripts/firebase";
import { Unsubscribe } from "firebase";
import HeaderComponent from "@/components/Header.vue";

@Component({
  components: {
    HeaderComponent
  }
})
export default class App extends Vue {
  isUserStateSet = false;
  detacher: Unsubscribe | undefined = undefined;
  created() {
    this.detacher = auth.onAuthStateChanged(user => {
      this.$store.commit("setUser", user);
      this.isUserStateSet = true;
    });
  }
  get isLoggingIn(): boolean {
    return this.$store.state.user !== undefined;
  }
  destroyed() {
    if (this.detacher) {
      this.detacher();
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
