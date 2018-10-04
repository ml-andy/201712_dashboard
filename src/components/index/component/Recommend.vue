<template lang="pug">
  .panel.recommend(v-bar)
    .main
      .unit_say
        .title 我可以說什麼
        .content(
          v-if="data.upgradable_card || data.expiring_credit_card_points[0].points != 0 || data.myreward_recommendation"
        )
          span(v-if="data.upgradable_card") {{ data.upgradable_card }} 可升等
          span(v-if="data.expiring_credit_card_points[0].points != 0 ? true : false") 信用卡紅利 {{ data.expiring_credit_card_points[0].date }}到期
          span(v-if="data.myreward_recommendation") 可下載 國泰優惠
          
        .content(v-else)
          span.cant_market(v-if="!data.can_market") 不適合行銷
          span.off(v-else) 請參考其他推薦
        .btn_fallcontact#lnkIndexFallcontact(
          v-if="!data.is_contact_information_correct && data.can_market"
          @click="changeSection(1)"
        ) 通聯資料有誤

      .unit_recommend
        .title 我可以推薦什麼
        .content(v-if="data.can_market")
          ul.btnbox
            li(v-if="data.preference")
              .btn.btn_recommend#lnkIndexPreference(@click="goPreference(2,0)")
                .subtitle 偏好
                .tag {{ data.preference }}
              .checkneed
                .yes#btnIndexPreference_yes(
                  :class="preference === 1 ? 'on' : ''"
                  @click="postRecommendData({key:'preference',type:true})"
                )
                .no#btnIndexPreference_no(
                  :class="preference === -1 ? 'on' : ''"
                  @click="postRecommendData({key:'preference',type:false})"
                )
            li(v-if="!data.preference")
              .btn.btn_recommend.off
                .subtitle 偏好
                .tag 無

            li(v-if="data.product")
              .btn.btn_product#lnkIndexProduct(@click="goPreference(2,1)")
                .subtitle 產品
                .tag {{ data.product }}
              .checkneed
                .yes#btnIndexProduct_yes(
                  :class="product === 1 ? 'on' : ''"
                  @click="postRecommendData({key:'product',type:true})"
                )
                .no#btnIndexProduct_no(
                  :class="product === -1 ? 'on' : ''"
                  @click="postRecommendData({key:'product',type:false})"
                )
            li(v-if="!data.product")
              .btn.btn_product.off
                .subtitle 產品
                .tag 無

            li(v-if="data.program")
              .btn.btn_project#lnkIndexProgram(@click="goPreference(2,2)")
                .subtitle 專案
                .tag {{ data.program }}
              .checkneed
                .yes#btnIndexProgram_yes(
                  :class="program === 1 ? 'on' : ''"
                  @click="postRecommendData({key:'program',type:true})"
                )
                .no#btnIndexProgram_no(
                  :class="program === -1 ? 'on' : ''"
                  @click="postRecommendData({key:'program',type:false})"
                )
            li(v-if="!data.program")
              .btn.btn_project.off
                .subtitle 專案
                .tag 無
          .des 請點選有 / 無需求
        .content(v-else)
          span.cant_market 不適合行銷
</template>

<script>

export default {
  name: 'Recommend',
  data(){
    return {
      
    }
  },
  computed: {
    ...Vuex.mapState({
      loadingShow: state => state.loadingShow,
      data: state => state.recommend.data,
      preference: state => state.recommend.preference,
      product: state => state.recommend.product,
      program: state => state.recommend.program,
    }),
  },
  beforeMount(){
    this.getRecommendData({
      path: 'recommend',
      title: ['CONTACT','PREFERENCE'],
    })
  },
  mounted(){
    
  },
  methods:{
    ...Vuex.mapMutations('nav',['changeSection']),
    ...Vuex.mapMutations('preference',['changeUnit']),
    ...Vuex.mapActions('recommend',['getRecommendData','postRecommendData']),
    goPreference(section,unit){
      this.changeSection(section)
      this.changeUnit(unit)
    },
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
@import "./css/index/component/recommend.scss";
</style>
