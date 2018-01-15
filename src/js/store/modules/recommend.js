const axios = require('axios')
const Qs = require('qs')

const recommend = {
  namespaced:true,
  state:{
    data:{
      can_market: true,
      upgradable_card: '',
      expiring_credit_card_points:[
        {
          date:'',
          points: 0,
        }
      ],
      myreward_recommendation: false,
      is_contact_information_correct: false,
      preference: '',
      product: '',
      program: ''
    },
    preference: 0,
    product: 0,
    program: 0,
  },
  mutations:{
    
  },
  actions:{
    getRecommendData({ state, rootState, commit }, {path, title} ){
      axios.get(`${rootState.backEndUrl}/teller_reference`, {
          params: {
            teller_id: rootState.teller_id,
            customer_id: rootState.customer_id,
            token: rootState.token,
          }
        })
        .then(({data})=>{
          console.log(data)
          state.data = data.results
          let isExpiring = ((new Date(state.data.expiring_credit_card_points[0].date) - new Date()) / 86400000) <= 30 ? state.data.expiring_credit_card_points[0].points : 0
          state.data.expiring_credit_card_points[0].points = isExpiring
        })
        .catch(err => console.log(err))
        .finally(()=>{
          let emptyValue = [
            state.data.is_contact_information_correct || !state.data.can_market ? true : false,
            !state.data.preference && !state.data.product && !state.data.program || !state.data.can_market ? true : false
          ]
          
          title.forEach((i,idx) => {
            commit(
              'nav/changeItemEmpty',
              {
                title: i,
                emptyValue: emptyValue[idx]
              },
              { root: true }
            )
          })
        })
    },
    postRecommendData({ state, rootState, commit }, {key, type} ){
      let postData = {
        "teller_id":rootState.teller_id,
        "customer_id": rootState.customer_id,
        "token": rootState.token,
        recommendation: {
          [key]: type
        }
      }

      axios.post(`${rootState.backEndUrl}/teller_reference`, postData)
        .then(({data})=>{
          console.log(data)
          type ? state[key] = 1 : state[key] = -1
        })
        .catch(err => console.log(err))
        // .finally(()=>{

        // })
    },
  }
}

module.exports = recommend
