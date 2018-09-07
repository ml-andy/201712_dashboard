const axios = require('axios')
const creditcardBonus = {
  namespaced:true,
  state:{
    dataset:{
      "bonus_points": '2000',
      "updated_time": "2018.01.01",
      "auto_payment": false,
      "credit_limit": '100000',
      "card_amount": '2',
      "myreward_downloaded": true
    }
  },
  mutations:{
    
  },
  actions:{
    getCreditcardBonus({ state, rootState, commit }, {path, title} ){
      axios.get(`${rootState.backEndUrl}/credit_cards`, {
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
        state.dataset = data.results;
        commit('changeLoading', false, { root: true });
      })
      .catch(err => {
        commit('catchError', err, { root: true });
      })
      .finally(()=>{
        let result = [
          {
            title:'CREDITCARD',
            value: state.dataset.card_amount > 0 ? false : true
          },
          {
            title:'BONUS',
            value: state.dataset.bonus_points > 0 ? false : true
          },
        ]
  
        title.forEach(i => {
          commit(
            'nav/changeItemEmpty',
            {
              title: i,
              emptyValue: result.find(d=>d.title === i).value
            },
            { root: true }
          )
        })
      })
    },
  }
}

module.exports = creditcardBonus
