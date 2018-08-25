let state = {
  index: 0,
  status: false,
  songList: JSON.parse(localStorage.getItem('songList')) || []
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
  setSongList(state,data){
    state.songList = data
  },
  play(state,index){
    state.index = index;
    state.status = true;
  },
  stop(state){
    state.status = false;
  }
};

let actions = {
  setSongList({commit}, data){
    commit('setSongList', data);
  },
  play({commit}, index){
    commit('play', index);
  },
  stop({commit}){
    commit('stop');
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
