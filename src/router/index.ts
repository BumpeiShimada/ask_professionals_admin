import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/auth",
    name: "Auth",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "auth" */ "@/views/Auth.vue")
  },
  {
    path: "/advisor/:advisorId",
    props: true,
    name: "Advisor",
    component: () => import("@/views/Advisor.vue")
  },
  {
    path: "/conversation/:conversationId",
    props: true,
    name: "Conversation",
    component: () => import("@/views/Conversation.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
