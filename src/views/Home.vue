<template>
  <section v-if="isLoggingIn" class="section">
    <div v-if="this.isFetchingAdvisorsDone">
      <div v-if="this.advisors.length > 0">
        <b-notification
          :active.sync="isNotificationActive"
          aria-close-label="Close notification"
          type="is-danger"
          role="alert"
        >
          Error: {{ errorMessage }}
        </b-notification>
        <advisor-cards v-bind:advisors="this.advisors" />
      </div>
      <div v-else>
        <h1 class="title">No advisors yet</h1>
      </div>
    </div>
  </section>
  <section v-else class="section">
    <h1 class="title">
      Please login ↗️
    </h1>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { advisorsCollectionRef } from "@/scripts/firebase";
import { Advisor } from "@/models/advisor";
import AdvisorCards from "@/components/home/AdvisorCards.vue";

@Component({
  components: {
    AdvisorCards
  }
})
export default class Home extends Vue {
  isFetchingAdvisorsDone = false;
  isNotificationActive = false;
  errorMessage = "";
  advisors: Advisor[] = [];
  async created() {
    try {
      const fetchedAdvisors: Advisor[] = [];
      if (this.isLoggingIn) {
        const querySnapshot = await advisorsCollectionRef.get();
        querySnapshot.forEach(doc => {
          if (doc.exists) {
            fetchedAdvisors.push({
              id: doc.id,
              imageUrl: doc.data().imageUrl,
              name: doc.data().name,
              cardProfile: doc.data().cardProfile
            });
          }
        });
      }
      this.advisors = fetchedAdvisors;
    } catch (error) {
      this.errorMessage = error.message;
      this.isNotificationActive = true;
    }
    this.isFetchingAdvisorsDone = true;
  }
  get isLoggingIn(): boolean {
    return !!this.$store.state.user;
  }
}
</script>
