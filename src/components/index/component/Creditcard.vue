<template lang="pug">
  .panel.creditcard
    .container(v-if="data.card_amount")
      .btn_hascreditcard(@click="changeSection(5)")
        |持有 {{ data.card_amount }} 張信用卡
      .sum
        .bouns(@click="changeSection(6)")
          .title 紅利
          .content {{ data.bonus_points }}
        .quoda
          .title 額度
          .content {{ data.credit_limit }}
      .des
        |{{ data.auto_payment ? '有' : '無'}} 自動扣繳
      .des
        |{{ data.myreword_downloaded ? '已' : '未'}}下載  國泰優惠
      .datetime
        |時間：{{ data.updated_time }}
    .container_empty(v-if="!data.card_amount") 非本行信用卡客戶
    
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
