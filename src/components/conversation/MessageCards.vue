<template>
  <div class="container">
    <div
      v-for="message in messages"
      :key="message.sendTimestamp"
      class="container"
    >
      <div class="columns">
        <message-card
          v-bind:message="message"
          class="column is-half is-offset-one-quarter"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Message } from "@/models/message";
import MessageCard from "@/components/conversation/MessageCard.vue";

@Component({
  components: {
    MessageCard
  }
})
export default class MessageCards extends Vue {
  @Prop() readonly messages!: Message[];
}
</script>
