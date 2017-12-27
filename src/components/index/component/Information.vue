<template lang="pug">
  .panel.information
    .unit_basic
      .leftside
        .icon_basic
        .customername
          .name {{ customer_name }}
          .male {{ data.gender === 'F' ? '小姐' : '先生' }}
        .btn_complain(
          :class="data.complaint > 0 ? '' : 'off'"
          @click="changeSection(3)"
        )
          span.big {{ data.complaint }}
          span.small 項
          br
          span 重大抱怨

      .rightside
        .watermark {{ teller_id }}
        .title 基本資料
        .content
          ul
            li(v-if="data.birthday")
              |{{ new Date().getFullYear() - new Date(`${data.birthday}`).getFullYear() }}歲 {{ new Date(`${data.birthday}`).getMonth() + 1 }}月壽星
            li(v-if="data.have_any_children") 有子女
            li(v-if="data.person_in_charge") 企業主
            li(v-if="data.account_type")
              span.green 薪轉戶
            li(v-if="data.annual_income")
              span.green 年收入
              span.smallgray {{ data.annual_income_date }}
              br
              |{{ data.annual_income }}

    .unit_info
      .leftside
        .icon_info
        .btn_vip(
          v-if="data.vip_status"
          @click="changeSection(4)"
        )
          |新升等VIP
          br
          |{{ data.vip_status }}
        .btn_failcontact(v-if="data.availability == false")
          |理專-多次
          br
          |聯絡不上
        .notvip(v-if="!data.vip_status")
          |非本行<br>VIP客戶

      .rightside
        .watermark {{ teller_id }}
        .title 經管資訊
        .content
          ul
            li(v-if="data.financial_advisor_branch")
              |{{ data.financial_advisor_branch }}
            li(v-if="data.vip_notation")
              span.green {{ data.vip_notation != "V" ? data.vip_notation : '' }}VIP
            li(v-if="data.financial_advisor_series")
              span.green 理專
              br
              |{{ data.financial_advisor_name }} 
              span.smallgray {{ data.financial_advisor_series }}
      
</template>

<script>

export default {
  name: 'Information',
  data(){
    return {
      
    }
  },
  computed: {
    ...Vuex.mapState({
      loadingShow: state => state.loadingShow,
      data: state => state.information.dataset,
      customer_name: state => state.customer_name,
      teller_id: state => state.teller_id,
    }),
  },
  beforeMount(){
    this.getInformationData({
      path: 'information',
      title: ['COMPLAIN','VIP'],
    })
  },
  mounted(){
    
  },
  methods:{
    ...Vuex.mapMutations('nav',['changeSection']),
    ...Vuex.mapActions('information',['getInformationData']),
  },
  watch:{
    
  },
  destroyed(){
    
  },
  components:{

  }
}
</script>

<style lang="scss" scoped>
@import "./css/index/component/information.scss";
</style>
