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
    dataset:[
      {
        event_type: '客服進線',
        event_description: '信用卡_行銷企劃詢問：106年6～8月 最適卡片推薦升等／加辦專案',
        date_time: '2017/10/14 11:10',
      },
      {
        event_type: '臨櫃',
        event_description: '台幣存匯_轉帳',
        date_time: '2017/10/14 11:10',
      },
      {
        event_type: '網銀',
        event_description: '定存_外幣定存',
        date_time: '2017/10/14 11:10',
      },
    ],
  },
  mutations:{
    
  },
  actions:{
    getJourneyData({ state, rootState, commit }){
      axios.get(`${rootState.backEndUrl}/journey`, {
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
        state.dataset = [];
        data.results.forEach(i => {
          let obj = i
          if(obj.event_type === '客服') obj.event_type = '客服進線'
          if(state.schema.find(d => d.name === obj.event_type)) state.dataset.push(obj)
        })
        commit('changeLoading', false, { root: true });
      })
      .catch(err => {
        commit('catchError', err, { root: true });
      })
    },
  }
}

module.exports = journey
