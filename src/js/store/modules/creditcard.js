const axios = require('axios')
const creditcard = {
  namespaced:true,
  state:{
    dataset:[
      {
        name: 'Costco聯名卡',
        card_type: '無限卡',
      },
      {
        name: '長榮航空聯名卡',
        card_type: '御璽卡',
      },
    ],
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
          token: rootState.token,
          branch: rootState.branch,
        }
      })
      .then(({data})=>{
        if (data.api_code !== 'CustomerJourney_0000'){
          commit('catchError', data, { root: true });
          return
        }
        state.dataset = data.results.cards
        state.has_electronic_bill = data.results.has_electronic_bill;
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

module.exports = creditcard
