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
        console.log(data.results)
        state.dataset = data.results
      })
      .catch(err => {
        console.log(err)
        
        commit(
          'changeLoading',
          false
          ,
          { root: true }
        )
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
