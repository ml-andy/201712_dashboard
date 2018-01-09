<style lang="scss" scoped>
@import "./css/component/nav.scss";
</style>

<template lang="pug">
  nav
    .menu
      .menuContent(v-bar)
        .main
          .link(
            v-for="(d,idx) in itemlist",
            :class="d.show ? 'on' : ''",
            :id="'lnkNav' + d.title.slice(0,1).toUpperCase() + d.title.slice(1).toLowerCase()"
            v-if="!d.empty"
            @click="linkClick(idx)")
            span(:style="{ backgroundImage:`url(./images/${d.bgPhoto})` }")
    .warning(ref="warning")
      |僅供內部使用　勿外流<br>!

</template>

<script>
export default {
  name: 'Nav',
  data(){
    return {
      
    }
  },
  computed: {
    ...Vuex.mapState({
      loadingShow: state => state.loadingShow,
      itemlist: state => state.nav.itemlist,
      windowSize: state => state.windowSize,
    }),
  },
  mounted(){
    
  },
  methods:{
    ...Vuex.mapMutations('nav',['changeSection']),
    ...Vuex.mapMutations(['changeShowNav']),
    linkClick(idx){
      this.changeSection(idx)
      if(this.windowSize.width <= 768) this.changeShowNav(false)
    }    
  },
  watch:{
    
  }
}
</script>