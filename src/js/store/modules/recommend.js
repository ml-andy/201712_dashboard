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
      is_contact_information_correct: true,
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
          if (data.api_code !== 'CustomerJourney_0000'){
            commit('catchError', data, { root: true });
            return
          }
          
          console.log(data);
          state.data = data.results
          let isExpiring = ((new Date(state.data.expiring_credit_card_points[0].date) - new Date()) / 86400000) <= 30 ? state.data.expiring_credit_card_points[0].points : 0
          state.data.expiring_credit_card_points[0].points = isExpiring

          commit('changeLoading', false, { root: true });
        })
        .catch(err => {
          commit('catchError', err, { root: true });
        })
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
      console.log('v12');
      let datas = {
        teller_id: rootState.teller_id,
        customer_id: rootState.customer_id,
        token: rootState.token,
        recommendation: JSON.stringify({
          [key]: type
        })
      }
      console.log(datas);

      $.ajax({
        url: `${rootState.backEndUrl}/teller_reference`,
        type: 'POST',
        dataType: 'json',
        data: datas,
        success: (data)=>{
          console.log(data);
          if (data.api_code !== 'CustomerJourney_0000'){
            commit('catchPostError', data, { root: true });
            return
          }

          type ? state[key] = 1 : state[key] = -1
        },
        error: (xhr, textStatus, errorThrown)=>{
          commit('catchPostError', errorThrown, { root: true });
        }
      })

      // axios.post(`${rootState.backEndUrl}/teller_reference`, datas)
      // .then(({data})=>{
      //   console.log(data);
      //   if (data.api_code !== 'CustomerJourney_0000'){
      //     commit('catchPostError', data, { root: true });
      //     return
      //   }

      //   type ? state[key] = 1 : state[key] = -1
      // })
      // .catch(err => {
      //   commit('catchPostError', err, { root: true });
      // })
    },
  }
}

module.exports = recommend
