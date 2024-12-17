<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import WidgetCard from "./WidgetCard.vue";
import type { ProductWidget } from "../store";

const store = useStore();
const widgets = computed(() => store.getters.widgets);

const updateWidget = (widget: ProductWidget) => {
  store.commit("updateWidget", widget);
};
</script>

<template>
  <div class="widget-list">
    <WidgetCard
      v-for="widget in widgets"
      :key="widget.id"
      :widget="widget"
      @update="updateWidget"
    />
  </div>
</template>

<style>
.widget-list {
  display: flex;
  flex-wrap: wrap;
  gap: 56px;
}
</style>
