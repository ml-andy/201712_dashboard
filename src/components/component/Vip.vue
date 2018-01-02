<template lang="pug">
  section.vip
    .btn_close(@click="changeSection(-1)")
      span.top
      span.bottom
    .main
      .leftside
        h1 {{ data.vip_notation != "V" ? data.vip_notation : '' }}VIP
        .subbtn(v-if="data.vip_status")
          .btn
            |升等VIP
            br
            |{{ data.vip_status }}
            
      .rightside
        .unitbox(v-bar)
          .unitboxin(ref="unitboxin")
            .interests
              .icon
              .right
                .title 權益偏好
                .description 
                  |{{ data.rights_preference }}
            .unit
              .topbar
                |話術
              .content
                |{{ data.apitch }}

    .bgcover(@click="changeSection(-1)")
    
</template>

<script>
export default {
  name: 'Vip',
  data(){
    return {

    }
  },
  computed: {
    ...Vuex.mapState({
      loadingShow: state => state.loadingShow,
      data: state => state.vip.dataset,
    }),
  },
  beforeMount(){
    this.changeLoading(true)
    this.getVipData()
  },
  mounted(){
    
  },
  methods:{
    ...Vuex.mapMutations(['changeLoading']),
    ...Vuex.mapMutations('nav',['changeSection']),
    ...Vuex.mapActions('vip',['getVipData']),
  },
  watch:{
    
  }
}
</script>

<style lang="scss" scoped>
@import "./css/component/vip.scss";
</style>
