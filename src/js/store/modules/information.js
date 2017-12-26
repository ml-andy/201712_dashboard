const axios = require('axios')
const information = {
  namespaced:true,
  state:{
    dataset:{
      "birthday": "",
      "have_any_children": false,
      "account_type": false,
      "gender": "",
      "financial_advisor_name": "",
      "person_in_charge": false,
      "financial_advisor_series": "",
      "vip_notation": "",
      "annual_income_date": "",
      "complaint": [],
      "financial_advisor_branch": "",
      "vip_status": "",
      "age": '',
      "annual_income": "",
      "availability" : true,
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
        console.log(data)
        state.dataset = data.results
        console.log(state.dataset)
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
