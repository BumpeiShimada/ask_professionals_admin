<template>
  <section v-if="isFetchingMessagesDone" class="section">
    <b-notification
      :active.sync="isNotificationActive"
      aria-close-label="Close notification"
      type="is-danger"
      role="alert"
    >
      Error: {{ errorMessage }}
    </b-notification>
    <div v-if="this.messages.length > 0">
      <h1 class="title">Conversation id: {{ conversationId }}</h1>
      <load-message-button
        v-bind:showNotification="this.showNotification"
        v-bind:conversationId="this.conversationId"
        v-bind:lastDocumentSnapshot="this.lastDocumentSnapshot"
        v-bind:setLastDocumentSnapshot="this.setLastDocumentSnapshot"
        v-bind:messages="this.messages"
        v-bind:setMessages="this.setMessages"
      />
    </div>
    <div v-else>
      <h1 class="title">No messages yet</h1>
      <h1 class="title">Conversation id: {{ conversationId }}</h1>
    </div>
    <message-cards v-bind:messages="this.messages" />
  </section>
  <b-loading v-else :active="true" :can-cancel="false" />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import moment from "moment";
import { conversationsCollectionRef } from "@/scripts/firebase";
import { Message } from "@/models/message";
import MessageCards from "@/components/conversation/MessageCards.vue";
import LoadMessageButton from "@/components/conversation/LoadMessageButton.vue";

@Component({
  components: {
    MessageCards,
    LoadMessageButton
  }
})
export default class Advisor extends Vue {
  isFetchingMessagesDone = false;
  messages: Message[] = [];
  lastDocumentSnapshot?: firebase.firestore.QueryDocumentSnapshot<
    firebase.firestore.DocumentData
  >;
  isNotificationActive = false;
  errorMessage = "";

  @Prop() readonly conversationId!: string;

  async created() {
    try {
      const fetchedMessages: Message[] = [];
      if (this.isLoggingIn) {
        const conversationDocumentReference = conversationsCollectionRef.doc(
          this.conversationId
        );
        const querySnapshot = await conversationDocumentReference
          .collection("messages")
          .orderBy("sendTimestamp", "desc")
          .limit(10)
          .get();
        let counter = 0;
        querySnapshot.forEach(doc => {
          if (doc.exists) {
            fetchedMessages.push({
              isUser: doc.data().isUser,
              content: doc.data().content,
              sendTimestamp: moment(doc.data().sendTimestamp.toDate())
                .format()
                .toString()
            });
          }

          counter = counter + 1;
          if (counter === querySnapshot.size) {
            this.lastDocumentSnapshot = doc;
          }
        });
      }
      this.messages = fetchedMessages.reverse();
    } catch (error) {
      this.showNotification(error.message);
    }
    this.isFetchingMessagesDone = true;
  }
  get isLoggingIn(): boolean {
    return !!this.$store.state.user;
  }

  showNotification(value: string) {
    this.isNotificationActive = true;
    this.errorMessage = value;
  }
  setMessages(value: Message[]) {
    this.messages = value;
  }
  setLastDocumentSnapshot(
    value: firebase.firestore.QueryDocumentSnapshot<
      firebase.firestore.DocumentData
    >
  ) {
    this.lastDocumentSnapshot = value;
  }
}
</script>
