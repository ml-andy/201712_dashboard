const axios = require('axios')
const vip = {
  namespaced:true,
  state:{
    dataset:{
      vip_status:'',
      vip_notation:'',
      rights_preference:'換匯優惠',
      apitch:'歡迎您成為本行VIP貴賓，我們為VIP有提供專屬的特別換匯優惠，我可以介紹您專屬服務人員，您下次可以直接找他，他可以提供給您比較便宜的匯率並可以優先為您服務喔!'
    }
  },
  mutations:{
    
  },
  actions:{
    getVipData({ state, rootState, commit }){
      axios.get(`${rootState.backEndUrl}/profile/vip`, {
        params: {
          teller_id: rootState.teller_id,
          customer_id: rootState.customer_id,
          token: rootState.token,
          branch: rootState.branch,
        }
      })
      .then(({data})=>{
        if (data.api_code !== 'CustomerJourney_0000'){
          commit('catchError', data, { root: true });
          return
        }
        
        console.log(data);
        state.dataset = data.results
        commit('changeLoading', false, { root: true });
      })
      .catch(err => {
        commit('catchError', err, { root: true });
      })
      .finally(()=>{
        commit(
          'changeLoading',
          false
          ,
          { root: true }
        )
      })
    },
  }
}

module.exports = vip
