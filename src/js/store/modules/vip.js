const axios = require('axios')
const vip = {
  namespaced:true,
  state:{
    dataset:{
      vip_status:'SVIP',
      vip_notation:'新升等VIP',
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
