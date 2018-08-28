import Vue from 'vue'
import Vuex from 'vuex'
import  userCenter from './modules/userCenter'
import  songList from './modules/songList'
import  back from './modules/back'
import  playlistRe from './modules/playlistRe'

Vue.use(Vuex);

let state = {
  /*playing: false,
  show: false,
  src: ''*/
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
  /*setData(state, data){
    state.src = data;
  },
  playing(state){
    if(state.playing){
      state.playing = false;
    }
    else{
      state.playing = true;
    }
  },
  show(state){
    state.show = true;
  },
  hide(state){
    state.show = false;
  }*/
};

let actions = {
  /*setData({ commit },n){
    commit('setData', n);
  },
  hide({commit}){
    commit('hide');
  },
  show({commit}){
    commit('show');
  },
  playing({commit}){
    commit('playing');
  }*/
};

// export default new Vuex.Store({
//   strict: true,
//   state,
//   getters,
//   mutations,
//   actions,
//   modules: {
//     moduleA
//   }
// });

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production',
  modules:{
    userCenter,
    songList,
    back,
    playlistRe
  }
})
