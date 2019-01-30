const axios = require('axios')
const bonus = {
  namespaced:true,
  state:{
    dataset:[
      {
        name: 'expire',
        list:[
          {
            date: '2017/11/31',
            count: 200,
            ontime: true,
          },
          {
            date: '2018/01/21',
            count: 2000,
          },
          {
            date: '2018/02/01',
            count: 2000,
          },
          {
            date: '2018/04/25',
            count: 1000,
          },
          {
            date: '2018/06/17',
            count: 2000,
          },
          {
            date: '2018/07/02',
            count: 100,
          },
        ]
      },
      {
        name: 'points',
        list:[
          {
            date: '2017/11/30',
            count: 7000,
          },
          {
            date: '2017/10/31',
            count: 7000,
          },
          {
            date: '2017/09/30',
            count: 7000,
          },
          {
            date: '2017/08/31',
            count: 4000,
          },
          {
            date: '2017/07/31',
            count: 3000,
          },
          {
            date: '2017/06/30',
            count: 5000,
          },
        ]
      },
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
          token: rootState.token,
          branch: rootState.branch,
        }
      })
      .then(({data})=>{
        if (data.api_code !== 'CustomerJourney_0000'){
          commit('catchError', data, { root: true });
          return
        }

        state.dataset[0].list = data.results.expiring_points.map(i=>{
          let dayDistance = (new Date(i.date) - new Date()) / 86400000
          return {
            date: i.date.slice(2),
            count: i.points,
            ontime: dayDistance <= 30 ? true : false
          }
        })

        state.dataset[1].list = data.results.remaining_points.map(i=>{
          let year = i.date.slice(0,4),
            month = i.date.slice(-2),
            day = new Date(year, month * 1, 0).getDate()

          return {
            date: `${year}-${month}`,
            count: i.points
          }
        })

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

module.exports = bonus
