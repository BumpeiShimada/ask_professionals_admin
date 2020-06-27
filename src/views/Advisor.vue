<template>
  <section v-if="isFetchingConversationsDone" class="section">
    <div v-if="this.conversations.length > 0">
      <b-notification
        :active.sync="isNotificationActive"
        aria-close-label="Close notification"
        type="is-danger"
        role="alert"
      >
        Error: {{ errorMessage }}
      </b-notification>
      <h1 class="title">Advisor id: {{ advisorId }}</h1>
      <conversation-cards v-bind:conversations="this.conversations" />
    </div>
    <div v-else>
      <h1 class="title">No conversations yet</h1>
      <h1 class="title">Advisor id: {{ advisorId }}</h1>
    </div>
  </section>
  <b-loading v-else :active="true" :can-cancel="false" />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { conversationsCollectionRef } from "@/scripts/firebase";
import { Conversation } from "@/models/conversation";
import ConversationCards from "@/components/advisor/ConversationCards.vue";

@Component({
  components: {
    ConversationCards
  }
})
export default class Advisor extends Vue {
  isFetchingConversationsDone = false;
  isNotificationActive = false;
  errorMessage = "";
  conversations: Conversation[] = [];
  @Prop() readonly advisorId!: string;
  async created() {
    try {
      const fetchedConversations: Conversation[] = [];
      if (this.isLoggingIn) {
        const querySnapshot = await conversationsCollectionRef
          .where("advisorId", "==", this.advisorId)
          .get();
        querySnapshot.forEach(doc => {
          if (doc.exists) {
            fetchedConversations.push({
              id: doc.id,
              userName: doc.data().userName,
              userEmoji: doc.data().userEmoji,
              lastMessage: doc.data().lastMessage
            });
          }
        });
      }
      this.conversations = fetchedConversations;
    } catch (error) {
      this.errorMessage = error.message;
      this.isNotificationActive = true;
    }
    this.isFetchingConversationsDone = true;
  }
  get isLoggingIn(): boolean {
    return !!this.$store.state.user;
  }
}
</script>
