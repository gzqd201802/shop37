// component/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 父级传过来的数据
    propTabs:{
      type: Array,
      value:''
    },
    // 父级传过来的数据
    propId:{
      type:Number,
      value:1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 小程序组件的事件需要写到 methods 中
    changeTabs(e){
      // console.log(e);
      const { id } = e.currentTarget.dataset;
      console.log(id);
      // 实现切换
      this.setData({
        propId:id
      });
      // 触发父级调用时候的 aaaa 事件，把 id 值传递
      this.triggerEvent('aaaa', id );
    }
  }
})
