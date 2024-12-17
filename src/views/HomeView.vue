<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "vuex";
import WidgetList from "../components/WidgetList.vue";

const store = useStore();

onMounted(() => {
  store.dispatch("fetchWidgets");
});
</script>

<template>
  <div>
    <h1>Product Widgets</h1>
    <WidgetList />
  </div>
</template>

<style>
h1 {
  text-align: center;
}
</style>
