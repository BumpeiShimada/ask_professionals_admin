<template>
  <div class="conteiner">
    <div class="card">
      <div class="card-image">
        <figure class="image is-1by1">
          <img :src="advisor.imageUrl" />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ advisor.name }}</p>
          </div>
        </div>
        <div class="content">
          {{ advisor.cardProfile }}
        </div>
      </div>
      <footer class="card-footer">
        <a :href="`/advisor/${advisor.id}`" class="card-footer-item">
          See conversations
        </a>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Advisor } from "@/models/advisor";

@Component
export default class AdvisorCard extends Vue {
  @Prop() readonly advisor!: Advisor;
}
</script>
