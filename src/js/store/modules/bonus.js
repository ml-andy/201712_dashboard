const axios = require('axios')
const bonus = {
  namespaced:true,
  state:{
    dataset:[
      {
        name: 'expire',
        list:[]
      },
      {
        name: 'points',
        list:[
        ]
      }
    ]
  },
  mutations:{
    
  },
  actions:{
    getBonusData({ state, rootState, commit }){
      axios.get(`${rootState.backEndUrl}/credit_cards/bonus_points`, {
        params: {
          teller_id: rootState.teller_id,
          customer_id: rootState.customer_id,
        }
      })
      .then(({data})=>{
        console.log(data.results)
        state.dataset[0].list = data.results.expiring_points.map(i=>{
          let dayDistance = (new Date(i.date) - new Date()) / 86400000
          return {
            date: i.date.slice(2),
            count: i.points,
            ontime: dayDistance <= 30 ? true : false
          }
        })

        state.dataset[1].list = data.results.remaining_points.map(i=>{
          return {
            date: i.date.slice(2),
            count: i.points
          }
        })
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

module.exports = bonus
