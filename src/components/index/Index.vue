<template lang="pug">
  section.index
    .namebar(
      v-if="showName"
      :class="updateTime ? 'hasTime' : ''"
    )
      .name {{ customer_name }}
      .male {{ data.gender === 'F' ? '小姐' : '先生' }}
      .datetime(v-if="updateTime")
        |更新時間：{{ updateTime }}
    .datetime(v-if="!showName && updateTime")
      |更新時間：{{ updateTime }}
    .area.recommend
      Recommend
    .area.information
      Information
    .area.creditcard
      Creditcard
    .area.news
      Journey

</template>

<script>
const Recommend = require('./component/Recommend.vue')
const Information = require('./component/Information.vue')
const Creditcard = require('./component/Creditcard.vue')
const Journey = require('./component/Journey.vue')

export default {
  name: 'Index',
  data(){
    return {
      showName: false,
    }
  },
  computed: {
    ...Vuex.mapState({
      loadingShow: state => state.loadingShow,
      windowSize: state => state.windowSize,
      data: state => state.information.dataset,
      customer_name: state => state.customer_name,
      updateTime: state => state.creditcardBonus.dataset.updated_time,
    }),
  },
  beforeMount() {
    this.changeLoading(true);
  },
  mounted(){
    // let name = decodeURI(this.getUrlVars()['customer_name']).split('');
    let name = this.customer_name.split('');
    if(name && name.length >= 2) name[1] = 'O';
    document.title = `【${name.join('')}】 客戶視圖`
  },
  methods:{
    ...Vuex.mapMutations(['changeLoading']),
    getUrlVars(){
      var vars=[],hash;var hashes=window.location.href.slice(window.location.href.indexOf('?')+1).split('&');
      for(var i=0;i<hashes.length;i++){hash=hashes[i].split('=');vars.push(hash[0]);vars[hash[0]]=hash[1]}
      return vars
    },
  },
  watch:{
    windowSize:{
      handler(e){
        this.windowSize.width >= 768 ? this.showName = false : this.showName = true
      },
      deep: true
    }
  },
  destroyed(){
    
  },
  components:{
    Recommend,
    Information,
    Creditcard,
    Journey,
  }
}
</script>

<style lang="scss" scoped>
@import "./css/index/index.scss";
</style>
