/***********************************************************
 * 文件名称： slm.js
 * 内容摘要： 基于ES6的JQuery的微型库，多用设计模式
 * 完成日期： 0000/00/00 00:00:00
 * 当前版本： 1.0
 * 采   用： ES6
 * 企   鹅： 478889187
/* ====================================================================================================== *\
 *                                                                                                        *
 *  作    者 ： 史莱姆                                                                                     *
 *  创建时间 ： 2019/02/08 11:11:30 [星期五]                                                               *
 *                                                                                                        *
 *    ________   ___        ____    ____            ________   ___        _________    _________          *
 *   |\   ____\ |\  \      |\   \  |    \          |\   __  \ |\  \      |\   ____  \ |\   ______\        *
 *   \ \  \___/_\ \  \     \ \    \| |\  \         \ \  \|\ /_\ \  \     \ \  \__|\  \\ \  \_____|        *
 *    \ \_____  \\ \  \     \ \  \ _|\ \  \         \ \   __  \\ \  \     \ \  \ \ \  \\ \  \    ___      *
 *     \|____|\  \\ \  \____ \ \  \-- \ \  \         \ \  \|\  \\ \  \____ \ \  \_\_\  \\ \  \_|_\  \     *
 *       |\_______\\ \_______\\ \__\   \ \__\         \ \_______\\ \_______\\ \_________\\ \_________\    *
 *       \|_______| \|_______| \|__|    \|__|          \|_______| \|_______| \|_________| \|_________|    *
 *                                                                                                        *
\* ====================================================================================================== */

;(function(doc) {

  // 观察者
  const observer = {
    task: [],
    $on (key, cb) {
    },
    $emit () {

    },
    $remove () {

    }
  }

  // 基于构造函数模式
  function JQuery (element) {
    return new JQuery.prototype.init(element)
  }

  JQuery.prototype = {
    constructor: JQuery,

    // 选择器内容
    selectString: '',

    // 初始化
    init: function (element) {
      let self = this;
      // 选择元素
      self.each(self.select(element), (data, i) => {
        self[i] = data;
      });
      return self;
    },



    //------------ 属性类 ------------\\

    /**
     * 设置元素的值
     * @param {string} index 属性
     * @param {string} value 值
     */
    val (index = 0, value) {
      let self = this;
      if (!value) {
        self.each(self, el => {
          el.value = index;
        });
      } else {
        if (self[index]) {
          self[index].value = value;
        } else throw Error(`下标[${index}]元素不存在!`);
      }
      return self;
    },

    /**
     * 设置或返回被选元素的属性值
     * @param {object/string} pro 对象/属性/包含函数的对象
     * @param {*} val 值/函数
     */
    attr (pro, val) {
      let self = this;
      if (val) {
        self.each(self, data => {
          if (self.type(item) === 'string') {
            data.setAttribute(pro, val);
          } else {
            data.setAttribute(pro, val(data.getAttribute(pro)));
          }
        });
      } else {
        // 返回属性值
        if (self.type(pro) === 'string') {
          return self[0].getAttribute(pro);
        }
        // 对象赋值
        self.each(self, data => {
          self.each(pro, (item, index) => {
            // 字符判断
            if (data.setAttribute) {
              if (self.type(item) === 'string') {
                data.setAttribute(index, item);
              } else {
                data.setAttribute(index, item(data.getAttribute(index)));
              }
            }
          });
        });
      }
      return self;
    },

    /**
     * 从每一个匹配的元素中删除一个属性
     * @param {string} name 要删除的属性名
     */
    removeAttr (name) {
      let self = this;
      self.each(self, data => {
        data.removeAttribute && data.removeAttribute(name);
      });
      return self;
    },

    /**
     * 设定HTML内容
     * @param {number} index 元素下标
     * @param {string} html 用于设定HTML内容的值
     */
    html (index, html) {
      let self = this;

      if (!html) {
        self.each(self, data => {
          data.innerHTML = index;
        });
      } else {
        self[index - 1].innerHTML = html;
      }
      return self;
    },

    /**
     * 设定文本内容
     * @param {number} index 元素下标
     * @param {string} html 用于设定文本内容的值
     */
    text (index, html) {
      let self = this;

      if (!html) {
        self.each(self, data => {
          data.innerText = index;
        });
      } else {
        self[index - 1].innerText = html;
      }
      return self;
    },
    

    //------------ 文档类 ------------\\
    /**
     * 追加到元素末尾
     * @param {number} index 下标
     * @param {string/el} el 元素选择器
     */
    append (index, el) {
      let self = this,
          node = self.select(el || index);

      if (el) {
        self.each(node, data => {
          self[index - 1].append(data);
        });
      } else {
        self.each(self, data => {
          self.each(node, nodeData => {
            data.appendChild(nodeData.cloneNode(true));
          });
        });
      }
      return self;
    },

    /**
     * 清空内容
     */
    empty () {
      this.each(this, data => {
        data.innerText = '';
      });
      return this;
    },



    //------------ 筛选类 ------------\\
    /**
     * 选择元素
     * @param {number} index 元素下标
     */
    eq (index) {
      let self = this,
          arr = self.moveAll();

      // 被选元素装入 负数/正数
      if (index > 0) {
        self[0] = arr[index];
      } else {
        self[0] = arr[arr.length - -index];
      }
      return slef;
    },

    /**
     * 选择第一个
     */
    first () {
      let self = this,
          arr = self.moveAll();

      self[0] = arr[0];
      return self;
    },

    /**
     * 选择最后一个
     */
    last () {
      let self = this,
          arr = self.moveAll();

      self[0] = arr[arr.length - 1];
      return self;
    },
    
    /**
     * 转移全部元素
     */
    moveAll () {
      let self = this,
          arr = [];

      // 删除之外的元素
      self.each(self, (data, i) => {
        arr.push(data);
        delete self[i];
      });
      self.prevObject = arr;
      Object.defineProperty(self, 'prevObject', {
        enumerable: false
      });
      return arr;
    },


    //------------ 事件类 ------------\\
    on () {

    },



    //------------ CSS类 ------------\\

    /**
     * 设置选中对象的样式
     * @param {object} pro 对象或者属性名
     * @param {string} value 值
     */
    css (pro, value) {
      let self = this;

      if (value) {
        self.each(self, data => {
          data.style[pro] = value;
        });
      } else {
        self.each(self, data => {
          self.each(pro, (val, key) => {
            // 如果为自执行
            if (self.type(val) === 'string') {
              data.style[key] = val;
            } else {
              data.style[key] = val(key, parseFloat(data.style[key].replace(/[^\d+]/g, '')) || 0);
            }
          });
        });
      }
      return self;
    },

    /**
     * 设置垂直滚动条值
     * @param {number} val 垂直滚动条值
     */
    scrollTop (val) {
      this.each(this, data => {
        data.scrollTop = val;
      });
      return this;
    },

    /**
     * 设置水平滚动条值
     * @param {number} val 水平滚动条值
     */
    scrollLeft (val) {
      this.each(this, data => {
        data.scrollLeft = val;
      });
      return this;
    },



    //------------ 工具类 ------------\\

    /**
     * 判断参数类型
     * @param {*} value 任意类型的参数
     * @returns {string} 小写数据类型
     */
    type (value) {
      let toString = Object.prototype.toString,
          type = toString.call(value).match(/\w+/g)[1];

      return type.toLowerCase();
    },


    /**
     * 元素选择器
     * @param {string/object} el 选择器或元素节点
     * @returns {array} 节点数组
     */
    select (element) {
      let elementNode = [];
      if (this.type(element) === 'string') {
        this.selectString = element;
        let select = element.trim();
        
        // 选择器 获取元素
        if (/^\.\w+$/.test(select)) {

          // class
          elementNode = doc.getElementsByClassName(select.slice(1, select.length));
        } else if (/^\#\w+$/.test(select)) {
          
          // ID
          elementNode = doc.getElementById(select.slice(1, select.length));
        } else if (/^\w+$/.test(select)) {

          // tag
          elementNode = doc.getElementsByTagName(select);
        } else if (/^\</.test(select)) {

          // html
          let el = doc.createElement('div');
          el.innerHTML = select;
          elementNode = el.children;
        } else {

          // css3
          elementNode = doc.querySelectorAll(select);
        }

      } else if (element instanceof HTMLElement) {
        // 元素节点
        this.selectString = 'Element Node';
        elementNode = [element];
      } else {
        throw Error('选择器参数只能是 节点或字符串');
      }
      return elementNode;
    },

    
    /**
     * 遍历数组或对象
     * @param {*} obj 遍历的数据
     * @param {function} cb 回调
     * @param {object} self 指向
     */
    each (obj, cb, self) {
      const arr = Object.keys(obj);
      if (!cb) return arr.length;
      for (let index = 0, len = arr.length; index < len; index++) {
        const key = arr[index],
              ret = cb.call(self || obj[key], obj[key], key, obj);
        if (ret === false) break;
      }
    },

    /**
     * @returns {number} 元素数量
     */
    length () {
      return this.each(this);
    },

    /**
     * @returns {string} 选择器字符串
     */
    selector () {
      return this.selectString;
    },

    /**
     * @returns {string} 当前的文档(document)字符串
     */
    context () {
      return this.select(this.selectString).toString();
    },

    /**
     * 选中的节点
     * @param {number} index 选定的下标
     * @returns {element} 返回选中的元素节点
     */
    get (index) {
      return this[index - 1];
    }


  }

  JQuery.prototype.init.prototype = JQuery.prototype;
  window.$ = JQuery;
})(document);