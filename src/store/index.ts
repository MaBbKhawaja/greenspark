
import { createStore } from 'vuex';
import axios from 'axios';

export interface ProductWidget {
  id: number;
  type: 'carbon' | 'plastic bottles' | 'trees';
  amount: number;
  action: 'collects' | 'plants' | 'offsets';
  active: boolean;
  linked: boolean;
  selectedColor: 'white' | 'black' | 'blue' | 'green' | 'beige';
}

const store = createStore({
  state: {
    widgets: [] as ProductWidget[],
  },
  mutations: {
    setWidgets(state, widgets: ProductWidget[]) {
      state.widgets = widgets;
    },
    updateWidget(state, updatedWidget: ProductWidget) {
      const index = state.widgets.findIndex((w) => w.id === updatedWidget.id);
      if (index !== -1) {
        state.widgets.splice(index, 1, updatedWidget);
      }
    },
    setActiveWidget(state, widgetId: number) {
      state.widgets.forEach((w) => (w.active = w.id === widgetId));
    },
  },
  actions: {
    async fetchWidgets({ commit }) {
      const response = await axios.get(
        'https://b795b019-1f84-41f4-93a3-a702d686c75a.mock.pstmn.io/product-widgets'
      );
      commit('setWidgets', response.data);
    },
  },
  getters: {
    widgets(state) {
      return state.widgets;
    },
  },
});

export default store;
