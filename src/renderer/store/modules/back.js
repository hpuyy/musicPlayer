let state = {
  show: false,
  fullPath: []
};

let getters = {
  /*printData: state => {
    console.log(state.a1, state.name, state.data);
    return state.data;
  },
  playState:state => {
    if(!state.playing)
      state.src.pause();
    else
      state.src.play();
    return state.playing;
  }*/
};

let mutations = {
  show(state, data){
    state.show = data;
  },
  removePath(state){
    state.fullPath.shift();
  },
  setFullPath(state, url){
    state.fullPath.unshift(url);
  }
};

let actions = {
  show({commit}, data){
    commit('show', data);
  },
  removePath({commit}){
    commit('removePath');
  },
  setFullPath({commit}, url){
    commit('setFullPath', url);
  }
};

export default ({
  strict: true,//严格模式
  namespaced: true,
  state,
  getters,
  mutations,
  actions
})
