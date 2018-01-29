<template lang="pug">
  section.error {{ errorText }}

</template>

<script>
export default {
  name: 'Error',
  data(){
    return {
    }
  },
  computed: {
    ...Vuex.mapState({
      loadingShow: state => state.loadingShow,
      errorText: state => state.errorText,
    }),
  },
  mounted(){
    document.title = this.errorText;
    this.changeLoading(false);
  },
  methods:{
    ...Vuex.mapMutations(['changeLoading']),
  },
  watch:{
    errorText(){
      document.title = this.errorText;
    },
  },
  destroyed(){
    
  },
  components:{
  }
}
</script>

<style lang="scss" scoped>
.error{
  position: relative;
  font-size: 18px;
  line-height: 27px;
  color: #000;
  text-align: center;
}
</style>
