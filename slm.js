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
/**
 * 接口API:
 *      $()
 *      $(Element Object / String)      // 元素节点选择器: ID选择器 | class选择器 | css选择器 | 标签选择器 | 标签创建器 "[可继续链式]"
 * 
 *      ID选择器    : $("#id")
 *      class选择器 : $(".class")
 *      css选择器   : $(".warp > div")
 *      标签选择器  : $("div")
 *      标签创建器  : $("<div>sss<span>max</span></div><span></span>")  创建标签并加入document子节点内 (需配合 _$(Element).copyElement(parent))
 * 
 *      
 *  -工具类：
 *      $.type(value)             // 返回数据类型
 *      $.each(obj, cb, self)     // 遍历对象
 *      $.select(string/element)  // 选择器
 * 
 *  -工具类：
 *      $.append(index[, value])  // 向匹配的元素内添加内容
 * 
 *  -属性类：
 *      $.val(index[, value])     // 设置value值
 *      $.css(pro, value)         // 设置css属性
 * 
 *  -选择类：
 *      $.eq(index)               // 正数/负数 选择其中一个
 *      $.first()                 // 选中第一个
 *      $.last()                  // 选中最后一个
 * 
 * 
 * 
 * 
 *  -文本操作：
 *      $(Element).html(html)           // 有实参则赋值所有元素的innerHTML | 没有实参返回所有元素的innerHTML"[不可链式]"
 *      $(Element).text(text)           // 有实参则赋值所有元素的innerText | 没有实参返回所有元素的innerText"[不可链式]"
 * 
 *  -事件操作：
 *      $(Element).addEvent(EventName, EventFunction)     // 为所有元素委托事件函数                       "[可继续链式]"
 *      $(Element).removeEvent(EventName, EventFunction)  // 移除所有元素委托事件函数                     "[可继续链式]"
 * 
 *  -类操作：
 *      $(Element).addClass(className)                    // 为所有元素添加类                             "[可继续链式]"
 *      $(Element).removeClass(className)                 // 为所有元素移除类                             "[可继续链式]"
 *      $(Element).toggleClass(className)                 // 为所有元素切换类                             "[可继续链式]"
 * 
 *  -节点操作:
 *      $(Element).append(Element)                        // 添加子节点                                  "[可继续链式]"
 *      $(Element).remove(Element)                        // 移除子节点                                  "[可继续链式]"
 *      $(Element).copyElement(parent)                    // 复制所有元素到指定的父节点内                  "[可继续链式]"
 * 
 *  -样式操作:
 *      $(Element).css(json)                              // 设置全部元素多个样式                         "[可继续链式]"
 *      $(Element).css(key, value)                        // 设置全部元素单个样式                         "[可继续链式]"
 *      $(Element).css(key)                               // 获取第一个元素的样式                         "[不续链式]"
 * 
 * 
 * 静态API:
 *      .removeClass(el, ClassName)                      // 移除元素单个类
 *      .addClass(el, ClassName)                         // 添加元素单个类
 *      .toggleClass(el, ClassName)                      // 切换元素单个类
 *      .classList(el, ClassName)                        // 返回类列表
 *      .hasClass(el, ClassName)                         // 返回类是否存在
 *      .isElement(el)                                   // 返回是否为HTML元素
 *      .typeOf(value)                                   // 返回值的类型，或者对象名称
 * 
 */
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
            if (self.type(item) === 'string') {
              data.setAttribute(index, item);
            } else {
              data.setAttribute(index, item(data.getAttribute(index)));
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
        data.removeAttribute(name);
      });
      return self;
    },

    

    //------------ 文档类 ------------\\
    /**
     * 
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
      for (let index = 0, len = arr.length; index < len; index++) {
        const key = arr[index],
              ret = cb.call(self || obj[key], obj[key], key, obj);
        if (ret === false) break;
      }
    }


  }

  JQuery.prototype.init.prototype = JQuery.prototype;
  window.$ = JQuery;
})(document);