<template>
  <div class="container">
    <div v-for="advisor in advisors" :key="advisor.id" class="container">
      <div class="columns">
        <advisor-card
          v-bind:advisor="advisor"
          class="column is-half is-offset-one-quarter"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Advisor } from "@/models/advisor";
import AdvisorCard from "@/components/home/AdvisorCard.vue";

@Component({
  components: {
    AdvisorCard
  }
})
export default class AdvisorCards extends Vue {
  @Prop() readonly advisors!: Advisor[];
}
</script>
