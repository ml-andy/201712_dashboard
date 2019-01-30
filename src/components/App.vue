<template lang="pug">
#app
  Loading
  Nav(:class="[showNav ? 'on' : '']")
  .menubtn(
    :class="showNav === true ? 'on' : ''"
    @click="changeShowNav(!showNav)"
  )
    span.top
    span.middle
    span.bottom
  transition(name="fade",mode="out-in")
    Contact(v-if="itemlist.find(i=>i.title === 'CONTACT').show")
    Bonus(v-else-if="itemlist.find(i=>i.title === 'BONUS').show")
    Complain(v-else-if="itemlist.find(i=>i.title === 'COMPLAIN').show")
    Creditcard(v-else-if="itemlist.find(i=>i.title === 'CREDITCARD').show")
    Preference(v-else-if="itemlist.find(i=>i.title === 'PREFERENCE').show")
    Vip(v-else-if="itemlist.find(i=>i.title === 'VIP').show")
  .wrapper(:class="[itemlist.some(i=>i.show) ? 'off' : '',showNav === true ? 'open' : '']")
    transition(name="fade",mode="out-in")
      router-view
</template>

<script>
const Loading = require('./component/Loading.vue')
const Nav = require('./component/Nav.vue')
const Contact = require('./component/Contact.vue')
const Bonus = require('./component/Bonus.vue')
const Complain = require('./component/Complain.vue')
const Creditcard = require('./component/Creditcard.vue')
const Preference = require('./component/Preference.vue')
const Vip = require('./component/Vip.vue')

export default {
  name: 'app',
  data(){
    return {
      nowDate: null,
    }
  },
  computed: {
    ...Vuex.mapState({
      loadingShow: state => state.loadingShow,
      showNav: state => state.showNav,
      anyError: state => state.anyError,
      windowSize: state => state.windowSize,
      itemlist: state => state.nav.itemlist,
    }),
  },
  beforeMount(){
    if(this.getUrlVars()['teller_id'] && this.getUrlVars()['customer_id']){
      this.changeStateKeyValue({key: 'teller_id', value: this.getUrlVars()['teller_id']})
      this.changeStateKeyValue({key: 'customer_id', value: this.getUrlVars()['customer_id']})
    }else{
      this.catchError({ api_code: 'CustomerJourney_4001' });
    }
    if(this.getUrlVars()['customer_name']) this.changeStateKeyValue({key: 'customer_name', value: decodeURI(this.getUrlVars()['customer_name'])})
    if(this.getUrlVars()['token']) this.changeStateKeyValue({key: 'token', value: this.getUrlVars()['token']})
    if(this.getUrlVars()['branch']) this.changeStateKeyValue({key: 'branch', value: this.getUrlVars()['branch']})
  },
  mounted(){
    window.setTimeout(()=>{
      this.catchError({ api_code: 'close_page' });
    },600000);
    
    let openSize = 380;
    if (window.screen.availWidth >= 1600) openSize = 675;
    window.resizeTo(openSize, window.screen.availHeight);
    const _left = window.screen.availWidth - openSize;
    window.moveTo(_left, 0);
    
    $(window).load(()=>{
      document.addEventListener('contextmenu', event => event.preventDefault());
    
      this.changeWindowSize({
        width:window.innerWidth,
        height:window.innerHeight
      })
    })

    $(window).on('resize',()=>{
      this.changeWindowSize({
        width:window.innerWidth,
        height:window.innerHeight
      })
    })
  },
  methods:{
    ...Vuex.mapMutations(['changeLoading','changeShowNav','changeWindowSize','changeStateKeyValue','catchError']),
    getUrlVars(){
      var vars=[],hash;var hashes=window.location.href.slice(window.location.href.indexOf('?')+1).split('&');
      for(var i=0;i<hashes.length;i++){hash=hashes[i].split('=');vars.push(hash[0]);vars[hash[0]]=hash[1]}
      return vars
    },
  },
  watch:{
    windowSize:{
      handler(e){
        this.windowSize.width >= 980 ? this.changeShowNav(true) : this.changeShowNav(false)
      },
      deep: true
    }
  },
  components:{
    Loading,
    Nav,
    Contact,
    Bonus,
    Complain,
    Creditcard,
    Preference,
    Vip,
  }
}
</script>

<style lang="scss">
@import "../css/app.scss";
</style>
