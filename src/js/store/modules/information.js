const axios = require('axios')
const information = {
  namespaced:true,
  state:{
    dataset:{
      "birthday": "1983.06.08",
      "have_any_children": true,
      "account_type": true,
      "gender": "F",
      "financial_advisor_name": "王大樹",
      "person_in_charge": true,
      "financial_advisor_series": "NT10000",
      "vip_notation": "S",
      "annual_income_date": "106/10",
      "complaint": 2,
      "financial_advisor_branch": "館前分行",
      "vip_status": "106/10",
      "age": '29',
      "annual_income": "100萬以上",
      "availability" : false,
    }
  },
  mutations:{
    
  },
  actions:{
    getInformationData({ state, rootState, commit }, {path, title} ){
      axios.get(`${rootState.backEndUrl}/profile`, {
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
        state.dataset = data.results
        commit('changeLoading', false, { root: true });
      })
      .catch(err => {
        commit('catchError', err, { root: true });
      })
      .finally(()=>{
        let result = [
          {
            title:'COMPLAIN',
            value: state.dataset.complaint.length > 0 ? false : true
          },
          {
            title:'VIP',
            value: state.dataset.vip_notation ? false : true
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

module.exports = information
