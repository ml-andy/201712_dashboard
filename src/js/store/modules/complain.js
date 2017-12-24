const axios = require('axios')
const complain = {
  namespaced:true,
  state:{
    dataset:[
      {
        datetime: '',
        description: ''
      },
    ]
  },
  mutations:{
    
  },
  actions:{
    getComplainData({ state, rootState, commit }){
      axios.get(`${rootState.backEndUrl}/profile/complaint`, {
        params: {
          teller_id: rootState.teller_id,
          customer_id: rootState.customer_id,
        }
      })
      .then(({data})=>{
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

module.exports = complain
