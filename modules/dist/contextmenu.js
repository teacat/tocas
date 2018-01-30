// Generated by CoffeeScript 2.0.0-beta4
// Checkbox

// 核取方塊。
var ContextMenu;

ContextMenu = (function() {
  class ContextMenu {
    constructor() {
      // 元素初始化函式。
      this.init = this.init.bind(this);
      // 元素摧毀函式。
      this.destroy = this.destroy.bind(this);
      // $Parent

      // 取得父容器、複合式選單應該在哪個容器開啟的元素選擇器。
      this.$parent = this.$parent.bind(this);
      // Contract

      // 收起複合式選單。
      this.contract = this.contract.bind(this);
      // Expand

      // 展開複合式選單，並且從接收到的 X、Y 座標找出滑鼠正指向的元素。
      this.expand = this.expand.bind(this);
      // Get Menu Rect

      // 取得選單的渲染屬性。
      this.getMenuRect = this.getMenuRect.bind(this);
      // Show

      // 在指定的 X、Y 座標以指定的方向顯示複合式選單。
      this.show = this.show.bind(this);
      // 模組可用的方法。
      this.methods = this.methods.bind(this);
    }

    init() {
      // 當網頁背景被按下時。
      $selector(this.selector.BODY).on(`click.contextmenu-${this.$elements.selector}`, () => {
        if (this.$this.data('closable')) {
          // 這個複合式選單允許關閉，那就就閉合這個選單。
          return this.contract();
        }
      });
      // 監聽父容器的多功能事件，並且開啟指定複合式選單。
      this.$parent().on('contextmenu.contextmenu', (event) => {
        // 阻止系統原生的多功能事件（如：右鍵選單、長按選單）。
        event.preventDefault();
        // 如果選單正處於停用中，就返回。
        if (this.$this.data('disable')) {
          return;
        }
        // 在指定的位置展開複合式選單。
        return this.show(event.clientX, event.clientY);
      });
      // 監聽複合式選單內所有項目的點擊事件，並在點擊後呼叫複合式選單的相關函式供使用者處理。
      this.$this.find(this.selector.ITEM).on('click.contextmenu', (event) => {
        return this.$this.data('onSelect').call(this.$this.get(), $selector(event.target).attr('data-value'), event.target);
      });
      return ts.fn;
    }

    destroy() {
      // 移除網頁背景的點擊事件。
      $selector(this.selector.BODY).off(`click.contextmenu-${this.$elements.selector}`);
      // 移除父容器的多功能監聽事件。
      this.$parent().off('contextmenu.contextmenu');
      // 移除複合式選單內項目的點擊事件。
      return this.$this.find(this.selector.ITEM).off('click.contextmenu');
    }

    $parent() {
      if (this.$this.data('target') === null) {
        return $selector(this.$this.parent());
      } else {
        return $selector(this.$this.data('target'));
      }
    }

    contract() {
      // 如果這個複合式選單不是可見的，就不需要收起。
      if (!this.$this.hasClass(this.className.VISIBLE)) {
        return;
      }
      // 呼叫 `onHide` 回呼函式，如果回傳的是 `false` 就不要收起。
      if (this.$this.data('onHide').call(this.$this.get()) === false) {
        return;
      }
      // 執行收起動畫，並在動畫結束後清理多餘的樣式。
      return this.$this.off('animationend').removeClass(this.className.VISIBLE).addClass(`${this.className.HIDDEN} ${this.className.ANIMATING}`).one('animationend', () => {
        return this.$this.removeClass(`${this.className.VISIBLE} ${this.className.ANIMATING} ${this.className.DOWNWARD} ${this.className.UPWARD} ${this.className.RIGHTWARD} ${this.className.LEFTWARD}`);
      }).emulate('animationend', this.duration);
    }

    expand(x, y) {
      // 呼叫 `onShow` 回呼函式，並且傳入滑鼠正指向的元素。
      // 當此函式回傳 `false` 則不要展開。
      if (this.$this.data('onShow').call(this.$this.get(), document.elementFromPoint(x, y)) === false) {
        return;
      }
      // 執行展開動畫，並在動畫結束後清理多餘的樣式。
      return this.$this.off('animationend').removeClass(this.className.HIDDEN).addClass(`${this.className.VISIBLE} ${this.className.ANIMATING}`).one('animationend', () => {
        return this.$this.removeClass(this.className.ANIMATING);
      }).emulate('animationend', this.duration);
    }

    getMenuRect() {
      var rect;
      this.$this.addClass(this.className.VISIBLE);
      rect = this.$this.get().getBoundingClientRect();
      this.$this.removeClass(this.className.VISIBLE);
      return rect;
    }

    show(x, y, position) {
      var d, h, r, w;
      r = this.getMenuRect();
      w = window.innerWidth / 2;
      h = window.innerHeight / 2;
      d = this.$this.data('distance');
      position = position || this.$this.data('position');
      // 如果方向是「自動」，那麼就以滑鼠在螢幕上的象限決定。
      if (position === 'auto') {
        switch (false) {
          case !(x < w && y < h):
            position = 'top left';
            break;
          case !(x < w && y > h):
            position = 'bottom left';
            break;
          case !(x > w && y > h):
            position = 'bottom right';
            break;
          case !(x > w && y < h):
            position = 'top right';
        }
      }
      // 移除先前的方向樣式。
      this.$this.removeClass(`${this.className.DOWNWARD} ${this.className.UPWARD} ${this.className.RIGHTWARD} ${this.className.LEFTWARD}`);
      // 依照指定的方向決定複合式選單的座標。
      switch (position) {
        case 'top left':
          this.$this.addClass(`${this.className.DOWNWARD} ${this.className.RIGHTWARD}`).css('left', `${x + d}px`).css('top', `${y + d}px`);
          break;
        case 'bottom left':
          this.$this.addClass(`${this.className.UPWARD} ${this.className.RIGHTWARD}`).css('left', `${x + d}px`).css('top', `${y + d - r.height}px`);
          break;
        case 'bottom right':
          this.$this.addClass(`${this.className.UPWARD} ${this.className.LEFTWARD}`).css('left', `${x + d - r.width}px`).css('top', `${y + d - r.height}px`);
          break;
        case 'top right':
          this.$this.addClass(`${this.className.DOWNWARD} ${this.className.LEFTWARD}`).css('left', `${x + d - r.width}px`).css('top', `${y + d}px`);
      }
      // 展開複合式選單，並且傳入滑鼠的 X、Y 座標好作處理。
      return this.expand(x, y);
    }

    methods() {
      return {
        // Show

        // 在目前游標或指定的位置顯示複合選單。
        show: (x, y) => {
          (async() => {
            await this.delay();
            return this.show(x, y);
          })();
          return ts.fn;
        },
        // Hide

        // 隱藏複合選單。
        hide: () => {
          (async() => {
            await this.delay();
            return this.contract();
          })();
          return ts.fn;
        },
        // Disable

        // 停用複合選單的監聽事件，避免顯示。
        disable: () => {
          this.$this.data('disable', true);
          return ts.fn;
        },
        // Enable

        // 啟用複合選單的監聽事件。
        enable: () => {
          this.$this.data('disable', false);
          return ts.fn;
        },
        // Destroy

        // 銷毀一個複合式選單。
        destroy: () => {
          this.destroy();
          return ts.fn;
        },
        // Is Disable

        // 回傳複合選單是否被停用的布林值。
        'is disable': () => {
          return this.$this.data('disable') === true;
        },
        // Is Enable

        // 回傳複合選單是否啟用中的布林值。
        'is enable': () => {
          return this.$this.data('disable') === false;
        },
        // Is Visible

        // 回傳複合選單現在是否正在顯示中的布林值。
        'is visible': () => {
          return this.$this.hasClass(this.className.VISIBLE);
        },
        // Is Hidden

        // 回傳複合選單現在是否正在隱藏中的布林值。
        'is hidden': () => {
          return !this.$this.hasClass(this.className.VISIBLE);
        }
      };
    }

  };

  // 模組名稱。
  ContextMenu.module = 'contextmenu';

  // 模組屬性。
  ContextMenu.prototype.props = {
    // 複合式選單應該出現在游標的哪個位置，如：`top left`、`top right`、`bottom left`、`bottom right`。
    position: 'auto',
    // 複合式選單離游標的距離（單位：像素）。
    distance: 0,
    // 是否停用。
    disable: false,
    // 目標選擇器。
    target: null,
    // 複合式選單是否可因為使用者點擊選單外面而自動關閉。
    closable: true,
    // 複合式選單是否可以因為在觸控裝置上長按而顯示。
    touch: true,
    // 當複合式選單出現時所會呼叫的回呼函式。
    onShow: (target) => {
      return true;
    },
    // 當複合式選單隱藏時所會呼叫的回呼函式。
    onHide: () => {
      return true;
    },
    // 當複合式選單被點擊項目時所會呼叫的回呼函式。
    onSelect: (value, element) => {
      return true;
    }
  };

  // 選單閉合的毫秒時間。
  ContextMenu.prototype.duration = 300;

  // 類別樣式名稱。
  ContextMenu.prototype.className = {
    VISIBLE: 'visible',
    ANIMATING: 'animating',
    DOWNWARD: 'downward',
    UPWARD: 'upward',
    RIGHTWARD: 'rightward',
    LEFTWARD: 'leftward',
    HIDDEN: 'hidden'
  };

  // 選擇器名稱。
  ContextMenu.prototype.selector = {
    BODY: 'body',
    ITEM: ':scope > .item'
  };

  return ContextMenu;

})();

ts(ContextMenu);