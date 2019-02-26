let state = {
  show: false,
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || {nickname: '点我登入！', avatarUrl: 'static/icon.ico'}
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
  Show(state){
    state.show = true;
  },
  Hide(state){
    state.show = false;
  },
  setInfo(state, data){
    state.userInfo = data;
  }
};

let actions = {
  Hide({commit}){
    commit('Hide');
  },
  Show({commit}){
    commit('Show');
  },
  setInfo({commit}, data){
    commit('setInfo', data);
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
