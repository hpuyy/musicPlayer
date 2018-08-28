let state = {
  reload: false
};

const mutations = {
  reload(state){
    state.reload = !state.reload;
  }
};

const actions = {
  reload({ commit }){
    commit('reload');
  }
};

export default ({
  strict: true,//严格模式
  namespaced: true,
  state,
  mutations,
  actions
})
