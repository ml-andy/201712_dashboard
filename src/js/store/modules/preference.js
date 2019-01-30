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
        tag: '理財族',
        content:[
          {
            subtitle: '推薦商品',
            text:'理財商品'
          },
          {
            subtitle: '話術',
            text:'#資產配置  #保單健檢<br>市場波動較大，平常有檢視基金績效的習慣嗎？還是說我請專業的同事幫您做【投資部位檢視】。'
          },
        ],
        remarks:{
          text: '',
          isWriting: false,
        },
      },
      {
        title: '偏好',
        tag: '樂活族',
        content:[
          {
            subtitle: '推薦商品',
            text:'保險商品'
          },
          {
            subtitle: '話術',
            text:'#保單健檢  #保障型保單  #意外/儲蓄險<br>不曉得您對【保障型保單】這塊基礎保障有規劃了嗎 ? 或是單純想要儲蓄也可以，還是說我請專業的同事幫您看一下，也幫您試算看看目前保障夠不夠。'
          },
        ],
        remarks:{
          text: '',
          isWriting: false,
        },
      },
      {
        title: '產品',
        tag: '基金',
        content:[
          {
            subtitle: '話術',
            text:'您平常有在投資嗎？最近我們有推出申購基金3年0手續費專案唷，不知道您有沒有興趣？可以請專人跟您介紹一下？'
          }
        ],
        remarks:{
          text: '',
          isWriting: false,
        },
      },
      {
        title: '專案',
        tag: 'UBER 108/1綁定刷萬事達卡促刷活動',
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
      const targetTitle = state.schema[value].name;
      state.nowUnit = state.dataset.findIndex(item => item.title === targetTitle);
    },
  },
  actions:{
    getPreferenceData({ state, rootState, commit }){
      axios.get(`${rootState.backEndUrl}/teller_reference/preference`, {
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
        //偏好
        state.dataset[0].tag = data.results.preference.item
        state.dataset[0].remarks.text = data.results.preference.annotation
        if(data.results.preference.apitch.match(/\${(.+?)\}/g)){
          state.dataset[0].content[0].text = data.results.preference.apitch.match(/\${(.+?)\}/g)[0]
            .slice(2)
            .slice(0,-1)
            .split('/n')
            .join('<br>')
          state.dataset[0].content[1].text = data.results.preference.apitch.match(/\${(.+?)\}/g)[1]
            .slice(2)
            .slice(0,-1)
            .split('/n')
            .join('<br>')
        }
        
        //產品
        state.dataset[1].tag = data.results.product.item
        state.dataset[1].remarks.text = data.results.product.annotation
        state.dataset[1].content[0].text = data.results.product.apitch
        
        //專案
        state.dataset[2].tag = data.results.program.item
        state.dataset[2].remarks.text = data.results.program.annotation
        state.dataset[2].content[0].text = data.results.program.apitch

        commit('changeLoading', false, { root: true });
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
    changeDatasetRemarks ({ state, rootState, commit }, {idx,text,isWriting}) {
      if(isWriting){
        state.dataset[idx].remarks.text = text
        state.dataset[idx].remarks.isWriting = isWriting
        return
      }

      let postData = {
        teller_id:rootState.teller_id,
        customer_id: rootState.customer_id,
        token: rootState.token,
        annotation: JSON.stringify({
          [state.schema[idx].params]: text
        })
      }
      // let postDataQs = Qs.stringify(postData);
      state.dataset[idx].remarks.text = text
      state.dataset[idx].remarks.isWriting = isWriting
      // $.ajax({
      //   url: `${rootState.backEndUrl}/teller_reference/preference`,
      //   type: 'POST',
      //   dataType: 'json',
      //   data: postData,
      //   success: (data)=>{
      //     console.log(data);
      //     if (data.api_code !== 'CustomerJourney_0000'){
      //       commit('catchPostError', data, { root: true });
      //       return
      //     }
          
      //     state.dataset[idx].remarks.text = text
      //     state.dataset[idx].remarks.isWriting = isWriting
      //   },
      //   error: (xhr, textStatus, errorThrown)=>{
      //     commit('catchPostError', errorThrown, { root: true });
      //   }
      // })

      // axios.post(`${rootState.backEndUrl}/teller_reference/preference`, postData)
      // .then(({data})=>{
      //   if (data.api_code !== 'CustomerJourney_0000'){
      //     commit('catchPostError', data, { root: true });
      //     return
      //   }
        
      //   console.log(data);
      //   state.dataset[idx].remarks.text = text
      //   state.dataset[idx].remarks.isWriting = isWriting
      // })
      // .catch(err => {
      //   commit('catchPostError', err, { root: true });
      // })
    }
  }
}

module.exports = preference
