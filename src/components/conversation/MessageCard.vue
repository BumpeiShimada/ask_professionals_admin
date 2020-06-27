<template>
  <div class="container">
    <div class="card">
      <div class="card-content">
        <p v-if="message.isUser" class="subtitle">
          🤔 User
        </p>
        <p v-else class="subtitle">
          🧙‍♂️ Advisor
        </p>
        <p class="content">
          {{ message.content }}
        </p>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item">
          {{ message.sendTimestamp }}
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Message } from "@/models/message";

@Component
export default class MessageCard extends Vue {
  @Prop() readonly message!: Message;
}
</script>
