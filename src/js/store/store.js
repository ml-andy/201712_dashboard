const store = new Vuex.Store({
  state: {
    loadingShow: true,
    showNav: true,
    windowSize:{
      width: 380,
      height: 768
    }
  },

  mutations: {
    changeLoading (state, show) {
      state.loadingShow=show
    },
    changeShowNav (state, value){
      state.showNav = value
    },
    changeWindowSize (state, { width, height }){
      state.windowSize.width = width
      state.windowSize.height = height
    },
    
  },

  getters: {

  },

  actions: {
    // tracker_pg({ commit }, value ){
    //   let valueFin = value
    //   if(!device.desktop()) valueFin = '/m' + value

    //   ga('send', 'pageview',valueFin);
    //   ga('eventSite.send', 'pageview',valueFin);
    // },
    // tracker_btn({ commit }, valuebt ){
    //   let valueFin = valuebt
    //   if(!device.desktop()) valueFin = '/m' + valuebt

    //   ga('send', 'event', 'button', 'click', valueFin);
    //   ga('eventSite.send', 'event', 'button', 'click', valueFin);
    // },
  },
  modules:{
    
  }
})

module.exports = store;

