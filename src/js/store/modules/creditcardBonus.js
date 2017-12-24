const axios = require('axios')
const creditcardBonus = {
  namespaced:true,
  state:{
    dataset:{
      "bonus_points": 6,
      "updated_time": "2000-01-23",
      "auto_payment": true,
      "credit_limit": 1,
      "card_amount": 1,
      "myreword_downloaded": true
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
        }
      })
      .then(({data})=>{
        // state.dataset = data.results
      })
      .catch(err => console.log(err))
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
