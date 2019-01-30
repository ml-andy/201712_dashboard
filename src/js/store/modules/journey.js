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
        event_description: '銀行_開卡/掛失/補發作業_金融卡掛失',
        date_time: '2019/01/02  11:00',
      },
      {
        event_type: '網銀',
        event_description: '個金授信_還款_房屋貸款',
        date_time: '2018/12/21  10:30',
      },
      {
        event_type: '臨櫃',
        event_description: '台幣存匯_轉帳_自行轉帳',
        date_time: '2018/12/01  14:30',
      },
      {
        event_type: '客服進線',
        event_description: '客戶表示欲向媒體申訴',
        date_time: '2018/10/05  20:30',
      },
      {
        event_type: '網銀',
        event_description: '台幣存匯_轉帳_繳費扣款',
        date_time: '2018/10/01   15:00',
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
