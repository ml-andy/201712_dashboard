<template lang="pug">
  section.contact
    .btn_close(@click="changeSection(-1)")
      span.top
      span.bottom
    .main
      h1 通聯資料有誤
      .unit
        .title.orange 銀行 CIF 通聯狀態
        ul.orange(v-if="data.bkc_email === null ? false : true")
          li.top
            .subtitle 項目
            .status 狀態
          li
            .subtitle email
            .status(:class="data.bkc_email ? '' : 'error'")
              |{{ data.bkc_email ? '資料正確' : '待更新' }}
          li
            .subtitle 公司電話
            .status(:class="data.bkc_com_tel ? '' : 'error'")
              |{{ data.bkc_com_tel ? '資料正確' : '待更新' }}
          li
            .subtitle 家用電話
            .status(:class="data.bkc_home_tel ? '' : 'error'")
              |{{ data.bkc_home_tel ? '資料正確' : '待更新' }}
          li
            .subtitle 手機電話
            .status(:class="data.bkc_phone ? '' : 'error'")
              |{{ data.bkc_phone ? '資料正確' : '待更新' }}
          li
            .subtitle 戶籍地址
            .status(:class="data.bkc_permanent_address ? '' : 'error'")
              |{{ data.bkc_permanent_address ? '資料正確' : '待更新' }}
          li
            .subtitle 通訊地址
            .status(:class="data.bkc_residential_address ? '' : 'error'")
              |{{ data.bkc_residential_address ? '資料正確' : '待更新' }}
        span.notmatch(v-else) 非本行存戶
      .unit
        .title.blue 信用卡 通聯狀態
        ul.blue(v-if="data.cc_email === null ? false : true")
          li.top
            .subtitle 項目
            .status 狀態
          li
            .subtitle email
            .status(:class="data.cc_email ? '' : 'error'")
              |{{ data.cc_email ? '資料正確' : '待更新' }}
          li
            .subtitle 公司電話
            .status(:class="data.cc_com_tel ? '' : 'error'")
              |{{ data.cc_com_tel ? '資料正確' : '待更新' }}
          li
            .subtitle 家用電話
            .status(:class="data.cc_home_tel ? '' : 'error'")
              |{{ data.cc_home_tel ? '資料正確' : '待更新' }}
          li
            .subtitle 手機電話
            .status(:class="data.cc_phone ? '' : 'error'")
              |{{ data.cc_phone ? '資料正確' : '待更新' }}
          li
            .subtitle 戶籍地址
            .status(:class="data.cc_permanent_address ? '' : 'error'")
              |{{ data.cc_permanent_address ? '資料正確' : '待更新' }}
          li
            .subtitle 通訊地址
            .status(:class="data.cc_residential_address ? '' : 'error'")
              |{{ data.cc_residential_address ? '資料正確' : '待更新' }}
        span.notmatch(v-else) 非本行卡友
    .bgcover(@click="changeSection(-1)")
    
</template>

<script>
export default {
  name: 'Contact',
  data(){
    return {

    }
  },
  computed: {
    ...Vuex.mapState({
      loadingShow: state => state.loadingShow,
      data: state => state.contact.dataset
    }),
  },
  beforeMount(){
    this.changeLoading(true)
    this.getContactData()
  },
  mounted(){
    
  },
  methods:{
    ...Vuex.mapMutations(['changeLoading']),
    ...Vuex.mapMutations('nav',['changeSection']),
    ...Vuex.mapActions('contact',['getContactData']),
    
  },
  watch:{
    
  }
}
</script>

<style lang="scss" scoped>
@import "./css/component/contact.scss";
</style>
