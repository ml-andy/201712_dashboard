const axios = require('axios')
const vip = {
  namespaced:true,
  state:{
    dataset:{
      vip_status:'',
      vip_notation:'',
      rights_preference:'',
      apitch:''
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
