const axios = require('axios')
const Qs = require('qs')

const preference = {
  namespaced:true,
  state:{
    nowUnit:0,
    schema:[
      {
        name: '偏好',
        params: 'preference'
      },
      {
        name: '產品',
        params: 'product',
      },
      {
        name: '專案',
        params: 'program',
      }
    ],
    dataset:[
      {
        title: '偏好',
        tag: '',
        content:[
          {
            subtitle: '話術',
            text:''
          }
        ],
        remarks:{
          text: '',
          isWriting: false,
        },
      },
      {
        title: '產品',
        tag: '',
        content:[
          {
            subtitle: '話術',
            text:''
          }
        ],
        remarks:{
          text: '',
          isWriting: false,
        },
      },
      {
        title: '專案',
        tag: '',
        content:[
          {
            subtitle: '話術',
            text:''
          },
        ],
        remarks:{
          text: '',
          isWriting: false,
        },
      },
    ],
  },
  mutations:{
    changeUnit (state, value) {
      state.nowUnit = value
    },
  },
  actions:{
    getPreferenceData({ state, rootState, commit }){
      axios.get(`${rootState.backEndUrl}/teller_reference/preference`, {
        params: {
          teller_id: rootState.teller_id,
          customer_id: rootState.customer_id,
        }
      })
      .then(({data})=>{
        state.dataset[0].tag = data.results.preference.item
        state.dataset[0].remarks.text = data.results.preference.annotation
        state.dataset[0].content[0].text = data.results.preference.apitch
        
        state.dataset[1].tag = data.results.product.item
        state.dataset[1].remarks.text = data.results.product.annotation
        state.dataset[1].content[0].text = data.results.product.apitch

        state.dataset[2].tag = data.results.program.item
        state.dataset[2].remarks.text = data.results.program.annotation
        state.dataset[2].content[0].text = data.results.program.apitch
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
    changeDatasetRemarks ({ state, rootState }, {idx,text,isWriting}) {
      if(isWriting){
        state.dataset[idx].remarks.text = text
        state.dataset[idx].remarks.isWriting = isWriting
        return
      }

      let postData = Qs.stringify({
        "teller_id":rootState.teller_id,
        "customer_id": rootState.customer_id,
        "annotation": {
          [state.schema[idx].params]: text
        }
      })

      axios.post(`${rootState.backEndUrl}/teller_reference/preference`, postData)
        .then(({data})=>{
          console.log(data)
          state.dataset[idx].remarks.text = text
          state.dataset[idx].remarks.isWriting = isWriting
        })
        .catch(err => console.log(err))
    }
  }
}

module.exports = preference
