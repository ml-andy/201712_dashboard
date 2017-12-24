const nav = {
  namespaced:true,
  state:{
    nowSection:0,
    itemlist:[
      {
        title: 'CATHAY',
        bgPhoto: 'logo.png',
        show: false,
        empty: false,
      },
      {
        title: 'CONTACT',
        bgPhoto: 'nav_icon3.png',
        show: false,
        empty: false,
      },
      {
        title: 'PREFERENCE',
        bgPhoto: 'nav_icon4.png',
        show: false,
        empty: false,
      },
      {
        title: 'COMPLAIN',
        bgPhoto: 'nav_icon1.png',
        show: false,
        empty: false,
      },
      {
        title: 'VIP',
        bgPhoto: 'nav_icon2.png',
        show: false,
        empty: false,
      },
      {
        title: 'CREDITCARD',
        bgPhoto: 'nav_icon5.png',
        show: false,
        empty: false,
      },
      {
        title: 'BONUS',
        bgPhoto: 'nav_icon6.png',
        show: false,
        empty: false,
      },
    ],
  },
  mutations:{
    changeSection (state, value) {
      state.nowSection = value
      state.itemlist.forEach((i,idx) => {
        if(idx === value) state.itemlist[idx].show = true
        else state.itemlist[idx].show = false
      })
    },
    changeItemEmpty (state, {title,emptyValue}){
      state.itemlist.find( d=> d.title === title).empty = emptyValue
    }
  },
  actions:{
    
  }
}

module.exports = nav
