const store = new Vuex.Store({
  state: {
    loadingShow: true,
    showNav: true,
    windowSize:{
      width: 380,
      height: 768
    },
    backEndUrl: process.env.apiUrl,
    teller_id: '',
    customer_id: '',
    customer_name: '',
    token: '',
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
    changeStateKeyValue(state, {key, value}){
      state[key] = value
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
    nav: require('./modules/nav.js'),
    recommend: require('./modules/recommend.js'),
    information: require('./modules/information.js'),
    creditcardBonus: require('./modules/creditcardBonus.js'),
    preference: require('./modules/preference.js'),
    complain: require('./modules/complain.js'),
    vip: require('./modules/vip.js'),
    creditcard: require('./modules/creditcard.js'),
    bonus: require('./modules/bonus.js'),
    contact: require('./modules/contact.js'),
    journey: require('./modules/journey.js'),
  }
})

module.exports = store;

