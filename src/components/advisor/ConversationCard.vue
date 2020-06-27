<template>
  <div class="container">
    <div class="card">
      <header class="card-header">
        <p v-if="conversation.userName.length > 0" class="card-header-title">
          {{ conversation.userName }}
        </p>
        <p v-else class="card-header-title">
          {{ conversation.userEmoji }} user
        </p>
      </header>
      <div class="card-content">
        <div v-if="conversation.lastMessage.length > 0" class="content">
          {{ conversation.lastMessage }}
        </div>
        <p v-else class="card-header-title">No message at the moment 🤷‍♂️</p>
      </div>
      <footer class="card-footer">
        <a :href="`/conversation/${conversation.id}`" class="card-footer-item">
          See this conversation
        </a>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Conversation } from "@/models/conversation";

@Component
export default class ConversationCard extends Vue {
  @Prop() readonly conversation!: Conversation;
}
</script>
