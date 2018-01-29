const routes = [
  { path: '/', component: require('../components/index/Index.vue') },
  { path: '/error', component: require('../components/error/Error.vue') },
  
  // { path:'*', component:require('error')}  //404
]

const router = new VueRouter({
  routes
})

module.exports = router;
