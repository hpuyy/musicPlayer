let state = {
  index: 0,
  status: false,
  id: '',
  songList: JSON.parse(localStorage.getItem('songList')) || [],
  localMusic: JSON.parse(localStorage.getItem('localMusic')) || [],
  isLocal: false
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
    state.songList = data;
    state.isLocal = false;
  },
  setLocalMusic(state,data){
    state.localMusic = data;
    state.isLocal = true;
  },
  play(state,index){
    if(state.isLocal){
      state.id = state.localMusic[index].id;
    }
    else{
      state.id = state.songList[index].id;
    }
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
  setLocalMusic({commit}, data){
    commit('setLocalMusic', data);
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
