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
            :class="nowItem === idx ? 'on' : ''",
            @click="menuLinkClick(idx)")
            span(:style="{ backgroundImage:`url(./images/${d.bgPhoto})` }")
    .warning(ref="warning")
      |僅供內部使用　勿外流<br>!

</template>

<script>
export default {
  name: 'Nav',
  data(){
    return {
      nowItem: 0,
      itemlist:[
        {
          title: 'CATHAY',
          bgPhoto: 'logo.png',
          path: '/',
          items:[],
        },
        {
          title: 'CONTACT',
          bgPhoto: 'nav_icon1.png',
          path: '/CONTACT',
        },
        {
          title: 'PREFERENCE',
          bgPhoto: 'nav_icon2.png',
          path: '/PREFERENCE',
        },
        {
          title: 'COMPLAIN',
          bgPhoto: 'nav_icon3.png',
          path: '/complain',
        },
        {
          title: 'VIP',
          bgPhoto: 'nav_icon4.png',
          path: '/vip',
        },
        {
          title: 'CREDITCARD',
          bgPhoto: 'nav_icon5.png',
          path: '/creditcard',
        },
        {
          title: 'BONUS',
          bgPhoto: 'nav_icon6.png',
          path: '/bonus',
        },
      ],
    }
  },
  computed: {
    ...Vuex.mapState({
        loadingShow: state => state.loadingShow,
    }),
  },
  mounted(){
    
  },
  methods:{
    // ...Vuex.mapMutations(['changeCurstomerAccount']),
    menuLinkClick(idx){
      console.log(idx)
      this.nowItem = idx
      
    },
    
  },
  watch:{
    
  }
}
</script>