import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    count: 0,
    noFinTask: 0
  },
  getters: {
    showName(state) {
      if (state.username) {
        return true;
      } else {
        return false;
      }
    },
    showIcon(state) {
      if (state.username) {
        return false;
      } else {
        return true;
      }
    }
  },
  mutations: {
    changeUsername(state, payload) {
      state.username = payload;
    },
    changeCount (state, payload) {
      state.count = payload;
    },
    changeNoFinTask (state, payload) {
      state.noFinTask = payload;
    }
  },
  actions: {

  }
});
