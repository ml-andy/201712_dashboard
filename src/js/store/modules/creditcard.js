const axios = require('axios')
const creditcard = {
  namespaced:true,
  state:{
    dataset:[],
    has_electronic_bill: false
  },
  mutations:{
    
  },
  actions:{
    getCreditcardData({ state, rootState, commit }){
      axios.get(`${rootState.backEndUrl}/credit_cards/list`, {
        params: {
          teller_id: rootState.teller_id,
          customer_id: rootState.customer_id,
        }
      })
      .then(({data})=>{
        state.dataset = data.results.cards
        state.has_electronic_bill = data.results.has_electronic_bill
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

module.exports = creditcard
