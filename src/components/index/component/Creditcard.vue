<template lang="pug">
  .panel.creditcard
    .container(v-if="data.card_amount")
      .btn_hascreditcard#lnkIndexCreditcard(@click="changeSection(5)")
        |持有 {{ data.card_amount }} 張信用卡
      .bouns#lnkIndexBonus(@click="changeSection(6)")
        .title 近一期帳單紅利
        .content {{ thousandsSeparators(data.bonus_points) }}
      .sum
        .quoda
          .title 額度
          .content {{ thousandsSeparators(data.credit_limit) }}
        .auto
          |{{ data.auto_payment ? '有' : '無'}} 自扣
      .des(v-if="data.myreward_downloaded")
        |{{ data.myreward_downloaded ? '已' : '未'}}下載  國泰優惠
      .datetime
        |時間：{{ data.updated_time }}
    .container_empty(v-if="!data.card_amount")
      |非本行信用卡客戶
      br
      |時間：{{ data.updated_time }}
    
</template>

<script>

export default {
  name: 'Creditcard',
  data(){
    return {
      
    }
  },
  computed: {
    ...Vuex.mapState({
      loadingShow: state => state.loadingShow,
      data: state => state.creditcardBonus.dataset
    }),
  },
  beforeMount(){
    this.getCreditcardBonus({
      path: 'creditcardBonus',
      title: ['CREDITCARD','BONUS'],
    })
  },
  mounted(){
    
  },
  methods:{
    ...Vuex.mapMutations('nav',['changeSection']),
    ...Vuex.mapActions('creditcardBonus',['getCreditcardBonus']),
    thousandsSeparators(value){
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
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
@import "./css/index/component/creditcard.scss";
</style>
