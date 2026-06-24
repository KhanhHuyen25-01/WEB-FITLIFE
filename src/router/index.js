import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/admin/dashboard",
  },
  {
    path: "/admin/dashboard",
    component: () => import("../pages/admin/dashboard/index.vue"),
    meta: {
      layout: "admin",
    },
  },
  {
    path: "/admin/hoadon",
    component: () => import("../pages/admin/hoadon/index.vue"),
    meta: {
      layout: "admin",
    },
  },
  {
    path: "/admin/hoivien",
    component: () => import("../pages/admin/hoivien/index.vue"),
    meta: {
      layout: "admin",
    },
  },
  {
    path: "/admin/huanluyenvien",
    component: () => import("../pages/admin/huanluyenvien/index.vue"),
    meta: {
      layout: "admin",
    },
  },
  {
    path: "/admin/lich",
    component: () => import("../pages/admin/lich/index.vue"),
    meta: {
      layout: "admin",
    },
  },
  {
    path: "/admin/lichsuhoatdong",
    component: () => import("../pages/admin/lichsuhoatdong/index.vue"),
    meta: {
      layout: "admin",
    },
  },
  {
    path: "/admin/solieu",
    component: () => import("../pages/admin/solieu/index.vue"),
    meta: {
      layout: "admin",
    },
  },
  {
    path: "/admin/profile",
    component: () => import("../pages/admin/profile/index.vue"),
    meta: {
      layout: "admin",
    },
  },
   {
    path: "/admin/caidat",
    component: () => import("../pages/admin/caidat/index.vue"),
    meta: {
      layout: "admin",
    },
  },
    {
    path: "/admin/profile",
    component: () => import("../pages/admin/profile/index.vue"),
    meta: {
      layout: "admin",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
