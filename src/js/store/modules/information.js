const axios = require('axios')
const information = {
  namespaced:true,
  state:{
    dataset:{
      "birthday": "2000-01-23",
      "hava_any_children": true,
      "account_type": true,
      "gender": "",
      "financial_advisor_name": "",
      "person_in_charge": true,
      "financial_advisor_series": "",
      "vip_notation": "",
      "annual_income_date": "2000-01-23",
      "complaint": [],
      "financial_advisor_branch": "",
      "vip_status": "",
      "age": 0,
      "annual_income": "",
      availability :true,
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
        }
      })
      .then(({data})=>{
        state.dataset = data.results
      })
      .catch(err => console.log(err))
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
