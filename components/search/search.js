// pages/components/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    focused: false,
      placeholder: '',
      data: '',
      list: [],
      historylist: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goSearch: function goSearch(ev) {
      this.focused = true;
      this.placeholder = '请输入您要搜索的内容'; // 触发父组件自定义事件

      this.$emit('search', {
        pageHeight: uni.getSystemInfoSync().windowHeight
      }); // 隐藏tabBar

      uni.hideTabBar();
    },
    cancleSearch: function cancleSearch() {
      this.focused = false;
      this.placeholder = ''; // 触发父组件自定义事件

      this.$emit('search', {
        pageHeight: 'auto'
      });
      this.data = '';
      this.historylist = []; // 显示tabBar

      uni.showTabBar();
    },
    oninput: function oninput() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var res;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log(20, _this.data);
                _context.next = 3;
                return _this.request({
                  method: 'get',
                  url: 'api/public/v1/goods/qsearch',
                  data: {
                    query: _this.data
                  }
                });

              case 3:
                res = _context.sent;
                console.log(res);
                _this.list = res.message;

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    onconfirm: function onconfirm(e) {
      return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // const res = await this.request({
                //   method: 'get',
                //   url: 'api/public/v1/goods/search',
                //   data: {
                //     query: this.data
                //   }
                // })
                wx.navigateTo({
                  url: "/pages/list/index?query=".concat(e.detail.value)
                });

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  },
  onLoad: function onLoad() {
    var history = wx.getStorageInfoSync('history');
    this.historylist = history;
  }
})
