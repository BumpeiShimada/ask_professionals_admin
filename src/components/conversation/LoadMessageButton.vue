<template>
  <div
    v-if="isLoadedAll === false"
    class="container"
    id="load-message-button-container"
  >
    <b-button
      type="is-light"
      :loading="this.isLoadingOlderMessages"
      @click="loadOlderMessages"
    >
      Load older messages
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { firestore } from "firebase";
import { Message } from "@/models/message";
import { conversationsCollectionRef } from "@/scripts/firebase";
import moment from "moment";

@Component
export default class LoadMessageButton extends Vue {
  isLoadingOlderMessages = false;
  isLoadedAll = false;

  @Prop() readonly showNotification!: (value: string) => void;
  @Prop() readonly conversationId!: string;
  @Prop() readonly lastDocumentSnapshot!: firestore.QueryDocumentSnapshot;
  @Prop() readonly setLastDocumentSnapshot!: (
    lastDocumentSnapshot: firestore.QueryDocumentSnapshot
  ) => void;
  @Prop() readonly messages!: Message[];
  @Prop() readonly setMessages!: (messages: Message[]) => void;

  async loadOlderMessages() {
    this.isLoadingOlderMessages = true;

    try {
      const conversationDocumentReference = conversationsCollectionRef.doc(
        this.conversationId
      );
      const querySnapshot = await conversationDocumentReference
        .collection("messages")
        .orderBy("sendTimestamp", "desc")
        .startAfter(this.lastDocumentSnapshot)
        .limit(10)
        .get();

      if (querySnapshot.size < 10) {
        this.isLoadedAll = true;
      }

      let counter = 0;
      const fetchedMessages: Message[] = [];
      querySnapshot.forEach(doc => {
        fetchedMessages.push({
          isUser: doc.data().isUser,
          content: doc.data().content,
          sendTimestamp: moment(doc.data().sendTimestamp.toDate())
            .format()
            .toString()
        });

        counter = counter + 1;
        if (counter === querySnapshot.size) {
          this.setLastDocumentSnapshot(doc);
        }
      });

      const newMessages = fetchedMessages.reverse().concat(this.messages);
      this.setMessages(newMessages);
    } catch (error) {
      this.showNotification(error.message);
    }

    this.isLoadingOlderMessages = false;
  }
}
</script>

<style>
#load-message-button-container {
  text-align: center;
  padding-bottom: 1.5em;
}
</style>
