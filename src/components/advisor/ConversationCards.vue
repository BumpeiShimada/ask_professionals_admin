<template>
  <div class="container">
    <div
      v-for="conversation in conversations"
      :key="conversation.id"
      class="container"
    >
      <div class="columns">
        <conversation-card
          v-bind:conversation="conversation"
          class="column is-half is-offset-one-quarter"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Conversation } from "@/models/conversation";
import ConversationCard from "@/components/advisor/ConversationCard.vue";

@Component({
  components: {
    ConversationCard
  }
})
export default class ConversationCards extends Vue {
  @Prop() readonly conversations!: Conversation[];
}
</script>
