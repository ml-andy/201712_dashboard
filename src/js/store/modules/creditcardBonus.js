const axios = require('axios')
const creditcardBonus = {
  namespaced:true,
  state:{
    dataset:{
      "bonus_points": '',
      "updated_time": "",
      "auto_payment": false,
      "credit_limit": '',
      "card_amount": '',
      "myreward_downloaded": false
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
        }
      })
      .then(({data})=>{
        console.log(data)
        state.dataset = data.results
        console.log(state.dataset)
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
