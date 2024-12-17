<script setup lang="ts">
import { defineProps, ref, watch } from "vue";
import { useStore } from "vuex";
import type { ProductWidget } from "../store";

const props = defineProps<{ widget: ProductWidget }>();
const store = useStore();

const colors = ["purple", "green", "white", "beige", "black"];
const isLinked = ref(props.widget.linked);

watch(isLinked, (newValue) => {
  updateWidget({ ...props.widget, linked: newValue });
});

const updateColor = (color: string) => {
  updateWidget({ ...props.widget, selectedColor: color });
};

const toggleActive = () => {
  if (!props.widget.active) {
    store.commit("setActiveWidget", props.widget.id);
  } else {
    updateWidget({ ...props.widget, active: false });
  }
};
const updateWidget = (updatedWidget: ProductWidget) => {
  store.commit("updateWidget", updatedWidget);
};
</script>

<template>
  <div class="widget-card">
    <div
      class="widget-header"
      :style="{
        backgroundColor: widget.selectedColor,
        color:
          widget.selectedColor === 'beige' || widget.selectedColor === 'white'
            ? 'green'
            : '#fff',
      }"
    >
      <span class="widget-type">This product {{ widget.action }}</span
      ><br />
      <span class="widget-amount">{{ widget.amount }} {{ widget.type }}</span>
    </div>
    <div class="widget-settings">
      <div class="setting">
        <label> Link to Public Profile </label>
        <input type="checkbox" v-model="isLinked" />
      </div>
      <div class="setting">
        <span>Badge colour:</span>
        <div class="color-options">
          <span
            v-for="color in colors"
            :key="color"
            :class="['color-box', { selected: color === widget.selectedColor }]"
            :style="{ backgroundColor: color }"
            @click="updateColor(color)"
          ></span>
        </div>
      </div>
      <div class="setting">
        <button @click="toggleActive" class="active-button">
          {{ widget.active ? "Deactivate badge" : "Activate badge" }}
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.widget-card {
    width: 300px;
  max-width: 300px;
  text-align: left;
  color: green;
}
.widget-header {
  border-radius: 8px;
  margin-bottom: 12px;
  text-align: left;
  padding: 24px;
}
.widget-settings {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.widget-amount {
  font-weight: bold;
  font-size: 20px;
}
.setting {
  display: flex;
  justify-content: space-between;
}
.color-options {
  display: flex;
  gap: 8px;
}
.color-box {
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  cursor: pointer;
  /* border-radius: 50%; */
}
.color-box.selected {
  border: 2px solid #000;
}
.setting .active-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
}
.setting .active-button:hover {
  background-color: #45a049;
}
</style>
