const axios = require('axios')
const contact = {
  namespaced:true,
  state:{
    dataset: {
      "bkc_email": true,
      "cc_com_tel": true,
      "bkc_residential_address": true,
      "bkc_permanent_address": true,
      "cc_email": true,
      "bkc_phone": true,
      "cc_phone": true,
      "cc_residential_address": true,
      "bkc_com_tel": true,
      "cc_home_tel": true,
      "bkc_home_tel": true,
      "cc_permanent_address": true
    }
  },
  mutations:{
    
  },
  actions:{
    getContactData({ state, rootState, commit }){
      axios.get(`${rootState.backEndUrl}/teller_reference/contact_information`, {
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
        state.dataset = data.results;
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

module.exports = contact
