const router = require('../../js/router.js')

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
    branch: '',
    token: '',
    anyError: false,
    errorText: '',
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
    catchError(state, value) {
      console.log(value);
      state.anyError = true;
      router.push('/error');
      switch (value.request.response.api_code) {
        case 'CustomerJourney_1001':
          state.errorText = '系統異常:1001 請洽系統管理員';
          break;
        case 'CustomerJourney_2001':
          state.errorText = '系統異常:2001 請洽系統管理員';
          break;
        case 'CustomerJourney_3001':
          state.errorText = '系統異常:3001 請洽系統管理員';
          break;
        case 'CustomerJourney_4001':
          state.errorText = '連結有誤:4001 請洽系統管理員';
          break;
        case 'CustomerJourney_5001':
          state.errorText = '連結失效:5001 請回 etabs 重新點選';
          break;
        case 'CustomerJourney_5002':
          state.errorText = '連結有誤:5002 請洽系統管理員';
          break;
        case 'CustomerJourney_5003':
          state.errorText = '連結有誤:5003 請洽系統管理員';
          break;
        case 'CustomerJourney_6001':
          state.errorText = '系統異常:6001 請洽系統管理員';
          break;
        case 'CustomerJourney_6002':
          state.errorText = '系統異常:6002 請洽系統管理員';
          break;
        default:
          state.errorText = '網頁已失效';
          break;
      }
    },
    catchPostError(state, value) {
      console.log(value);
      alert('送出失敗 請洽系統管理員');
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

