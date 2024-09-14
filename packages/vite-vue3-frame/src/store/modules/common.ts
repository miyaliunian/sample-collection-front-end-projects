export default {
  namespaced: true,
  state: {
    mockPath: [],
  },

  getters: {
    getMockPath(state: any) {
      return state.mockPath;
    },
  },

  mutations: {
    MOCKPATH(state: any, val: any) {
      state.mockPath = val;
    },
  },

  actions: {
    setMockPath({ commit }: any, fn: any) {
      commit("MOCKPATH", fn);
    },
  },
};
