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
 *      $(Element).addList(Element)     // 在操作列表内添加被操作元素
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

  // 基于构造函数模式
  function JQuery (element) {
    return new JQuery.prototype.init(element)
  }

  JQuery.prototype = {
    constructor: JQuery,

    // 初始化
    init: function (element) {
      
    },

    // 工具类
    type: function () {

    },

    // 事件类
    on: function () {

    },

    // CSS类
    css: function() {
      
    }
  }

  JQuery.prototype.init.prototype = JQuery.prototype
  window.$ = JQuery
})(document);