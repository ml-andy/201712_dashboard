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
          token: rootState.token,
        }
      })
      .then(({data})=>{
        if (data.api_code !== 'CustomerJourney_0000'){
          commit('catchError', data, { root: true });
          return
        }
        
        console.log(data);
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

module.exports = complain
