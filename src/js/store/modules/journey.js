const axios = require('axios')
const journey = {
  namespaced:true,
  state:{
    schema:[
      {
        type: 'customer_service',
        name: '客服進線',
      },
      {
        type: 'bank_counter',
        name: '臨櫃',
      },
      {
        type: 'web_atm',
        name: '網銀'
      }
    ],
    dataset:[],
  },
  mutations:{
    
  },
  actions:{
    getJourneyData({ state, rootState, commit }){
      axios.get(`${rootState.backEndUrl}/journey`, {
        params: {
          teller_id: rootState.teller_id,
          customer_id: rootState.customer_id,
        }
      })
      .then(({data})=>{
        console.log(data.results)
        state.dataset = []
        data.results.forEach(i => {
          if(state.schema.find(d => d.name === i.event_type)) state.dataset.push(i)
        })
      })
      .catch(err => console.log(err))
      // .finally(()=>{
      //   console.log('123')
      // })
    },
  }
}

module.exports = journey
