<template lang="pug">
  section.creditcard
    .btn_close(@click="changeSection(-1)")
      span.top
      span.bottom
    .main
      .leftside
        h1 持卡查詢
        .subbtn
          .btn(v-if="!has_electronic_bill") 無電子帳單
      .rightside
        .unitbox(v-bar)
          .unitboxin(ref="unitboxin")
            .card(v-for="i in dataset")
              .icon
              .content
                .name {{ i.name }}
                .class {{ i.card_type }}

    .bgcover(@click="changeSection(-1)")
    
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
      dataset: state => state.creditcard.dataset,
      has_electronic_bill: state => state.creditcard.has_electronic_bill,
    }),
  },
  beforeMount(){
    this.changeLoading(true)
    this.getCreditcardData()
  },
  mounted(){
    
  },
  methods:{
    ...Vuex.mapMutations(['changeLoading']),
    ...Vuex.mapMutations('nav',['changeSection']),
    ...Vuex.mapActions('creditcard',['getCreditcardData']),
    
  },
  watch:{
    
  }
}
</script>

<style lang="scss" scoped>
@import "./css/component/creditcard.scss";
</style>
