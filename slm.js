/***********************************************************
 * 文件名称： slm.js
 * 内容摘要： 一个兼容IE8以上浏览器的微型库
 * 其他说明： 课堂作业
 * 完成日期： 2018/10/20 16:38:46
 * 当前版本： 1.2
 * 采   用： ES5
 * 企   鹅： 478889187
/* ====================================================================================================== *\
 *                                                                                                        *
 *  作    者 ： 史莱姆                                                                                     *
 *  创建时间 ： 2018/10/19 11:05:30 [星期六]                                                               *
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
 *      _$()
 *      _$(Element Object / String)      // 元素节点选择器: ID选择器 | class选择器 | css选择器 | 标签选择器 | 标签创建器 "[可继续链式]"
 * 
 *      ID选择器    : _$("#id")
 *      class选择器 : _$(".class")
 *      css选择器   : _$(".warp > div")
 *      标签选择器  : _$("div")
 *      标签创建器  : _$("<div>sss<span>max</span></div><span></span>")  创建标签并加入document子节点内 (需配合 _$(Element).copyElement(parent))
 * 
 *      _$(Element).addList(Element)     // 在操作列表内添加被操作元素
 * 
 *  -文本操作：
 *      _$(Element).html(html)           // 有实参则赋值所有元素的innerHTML | 没有实参返回所有元素的innerHTML"[不可链式]"
 *      _$(Element).text(text)           // 有实参则赋值所有元素的innerText | 没有实参返回所有元素的innerText"[不可链式]"
 * 
 *  -事件操作：
 *      _$(Element).addEvent(EventName, EventFunction)     // 为所有元素委托事件函数                       "[可继续链式]"
 *      _$(Element).removeEvent(EventName, EventFunction)  // 移除所有元素委托事件函数                     "[可继续链式]"
 * 
 *  -类操作：
 *      _$(Element).addClass(className)                    // 为所有元素添加类                             "[可继续链式]"
 *      _$(Element).removeClass(className)                 // 为所有元素移除类                             "[可继续链式]"
 *      _$(Element).toggleClass(className)                 // 为所有元素切换类                             "[可继续链式]"
 * 
 *  -节点操作:
 *      _$(Element).append(Element)                        // 添加子节点                                  "[可继续链式]"
 *      _$(Element).remove(Element)                        // 移除子节点                                  "[可继续链式]"
 *      _$(Element).copyElement(parent)                    // 复制所有元素到指定的父节点内                  "[可继续链式]"
 * 
 *  -样式操作:
 *      _$(Element).css(json)                              // 设置全部元素多个样式                         "[可继续链式]"
 *      _$(Element).css(key, value)                        // 设置全部元素单个样式                         "[可继续链式]"
 *      _$(Element).css(key)                               // 获取第一个元素的样式                         "[不续链式]"
 * 
 * 
 * 静态API:
 *      _$.removeClass(el, ClassName)                      // 移除元素单个类
 *      _$.addClass(el, ClassName)                         // 添加元素单个类
 *      _$.toggleClass(el, ClassName)                      // 切换元素单个类
 *      _$.classList(el, ClassName)                        // 返回类列表
 *      _$.hasClass(el, ClassName)                         // 返回类是否存在
 *      _$.isElement(el)                                   // 返回是否为HTML元素
 *      _$.typeOf(value)                                   // 返回值的类型，或者对象名称
 * 
 */

;(function(doc) {

    // 调用库前缀
    window._$ = function(el) {
        return new slm(el);
    }

    function slm(el) {
        if(!el) throw Error('Element is empty!');
        
        var _self = this;

        // 元素的获取的API
        if(_$.typeOf(el) === 'object') {

            if(el instanceof HTMLElement) {
                _self._el = [el];
            } else throw Error('Element is not HTMLElement!');

        } else if(_$.typeOf(el) === 'string') {
            
            // 公共条件:[至少一个字符 && 不能为数字开头]
            // ID 识别 [不能包含特殊符号]
            if((/^#([a-z])[a-z0-9]{0,}$/ig).test(el)) {
                
                if(!(_self._el = doc.getElementById(el.slice(1)))) _self._el = [];

            // class 识别 [不能包含特殊符号]
            } else if((/^\.([a-z])[a-z0-9]{0,}$/ig).test(el)) {

                _self._el = Array.from(doc.getElementsByClassName ? 
                        doc.getElementsByClassName(el.slice(1)) :
                        doc.querySelectorAll(el)
                    );

            // css选择器 识别 [必须包含特殊符号]
            } else if((/^([`~!@#$%^&*()_+>?:"{},.\/;'[\]]){1,}/).test(el)) {

                _self._el = Array.from(doc.querySelectorAll(el));

            // 标签名选择器 [不能包含特殊符号 && 开头不能为字符]
            } else if((/^(?![`~!@#$%^&*()_+>?:"{},.\/;'[\]0-9]+)[a-z0-9]{0,}$/ig).test(el)) {
               
                _self._el = Array.from(doc.getElementsByTagName(el));

            // html前缀选择器
            } else if((/<(\s+|[^>]*?)>[/s+/S+]*?/img).test(el)) {

                var ls = doc.createElement('div');
                ls.innerHTML = el;
                ls.className = 'select';
                doc.body.appendChild(ls);
                _self._el = Array.from(doc.querySelectorAll('.select > *'));
                doc.body.removeChild(ls);

            } else throw Error('Element tag format error!');

        } else throw Error('Element typeof error!');

    }

    slm.prototype = {

        constructor: slm,

        // 往列表内添加操作元素
        addList: function(el) {
            if(_$.isElement(el)) {
                this._el.push(el);
                return this.getSelf();
            } else throw Error('Add Element is not HTMLElement!');
        },

        // 复制到其他元素内
        copyElement: function(parent) {
            if(_$.isElement(parent)) {
                this._el.forEach(function(el) {
                    parent.appendChild(el);
                });
                return this.getSelf();
            } else throw Error('Parent is not HTMLElement!');
        },

        // 返回本体
        getSelf: function() {
            var _self = this;
            return _self;
        },

        // 返回 全部元素的数组集合
        // getElArray: function() {
        //     return this._el instanceof Array ? this._el : [this._el];
        // },

        // 事件绑定
        addEvent: function(eventName, fun) {
            var el  = this._el,
                num = el.length;

            while(num > 0) {
                num --;
                el[num].addEventListener ?
                    el[num].addEventListener(eventName, fun) :
                    el[num].attachEvent('on' + eventName, fun);
            }
            return this.getSelf();
        },

        // 事件解绑
        removeEvent: function(eventName, fun) {
            var el  = this._el,
                num = el.length;
    
            while(num > 0) {
                num --;
                el[num].removeEventListener ?
                    el[num].removeEventListener(eventName, fun) :
                    el[num].detachEvent('on' + eventName, fun);
            }
            return this.getSelf();
        },

        // innerHTML 封装
        html: function(html) {
            var ht = '';
            this._el.forEach(function(el) {
                if(html) {
                    el.innerHTML = html;
                } else ht += el.innerHTML;
            });
            return html ? this.getSelf() : ht;
        },

        // innerText 封装
        text: function(Texts) {
            var txt = '';
            this._el.forEach(function(el) {
                if(Texts) {
                    el.innerText = Texts;
                } else txt += el.innerText;
            });
            return Texts ? this.getSelf() : txt;
        },

        // addClass 添加类
        addClass: function(className) {
            this._el.forEach(function(el) {
                _$.addClass(el, className);
            });
            return this.getSelf();
        },

        // removeClass 移除类
        removeClass: function(className) {
            this._el.forEach(function(el) {
                _$.removeClass(el, className);
            });
            return this.getSelf();
        },

        // toggleClass 切换类
        toggleClass: function(className) {
            this._el.forEach(function(el) {
                _$.toggleClass(el, className);
            });
            return this.getSelf();
        },

        // 添加节点
        append: function(el) {
            if(_$.isElement(el)) {
                this._el.forEach(function(parent) {
                    parent.appendChild(el);
                });
            } else {
                var ls = doc.createElement('div');
                ls.innerHTML = el;
                ls.className = 'select';
                doc.body.appendChild(ls);
                var elList = Array.from(doc.querySelectorAll('.select > *'));
                this._el.forEach(function(parent) {
                    elList.forEach(function(node) {
                        parent.appendChild(node);
                    });
                });
                doc.body.removeChild(ls);
            }
            return this.getSelf();
        },

        // 删除节点
        remove: function(el) {
            if(_$.isElement(el)) {
                this._el.forEach(function(parent) {
                    parent.removeChild(el);
                });
                return this.getSelf();
            } else throw Error('Element is not HTMLElement!');
        },

        // 设置标签属性
        css: function(json, vlaue) {
            if(vlaue) {
                this._el.forEach(function(el) {
                    el.style[json] = vlaue;
                });
            } else if(_$.typeOf(json) == 'object') {
                json.__proto__ = undefined;
                for(var key in json) {
                    this._el.forEach(function(el) {
                        el.style[key] = json[key];
                    });
                }
            } else if(_$.typeOf(json) == 'string') {
                return this._el[0].style[json];
            }
            return this.getSelf();
        }
    }

    // IE8 没这玩意儿，，只能操作doc
    // console.dir(Object.defineProperty)
    // if(Object.defineProperty) {
    //     for(var pro in slm.prototype) {
    //         Object.defineProperty(slm.prototype,pro,{
    //             enumerable:false,
    //         })
    //     }
    // }

    /*==================================================*\
      ==================  静 态 方 法  ==================
    \*==================================================*/

    // 移除类
    _$.removeClass = function(el, ClassName) {
        if(_$.hasClass(el, ClassName)) {
            el.className = (el.className + ' ').replace(ClassName + ' ', '');

            // 修复替换后唯一类时后方的空格
            if(_$.classList(el).length === 1) el.className = el.className.replace(' ', '');
        }

        // 修复残留class
        el.className ? "" : el.removeAttribute('class');
        return el.className;
    }

    // 添加类
    _$.addClass = function(el, ClassName) {
        if(!_$.hasClass(el, ClassName)) {
            el.className += ' ' + ClassName;
        }
        return el.className;
    }
    
    // 切换类
    _$.toggleClass = function(el, ClassName) {
        !_$.hasClass(el, ClassName) ? _$.addClass(el, ClassName) : _$.removeClass(el, ClassName);
    }
    
    // 返回数组 类列表
    _$.classList = function(el) {
        if(!_$.isElement(el)) throw Error('el is not HTMLElement!');
        var list = el.className.split(' ');

        // 如果尾数为空字符串则清除
        list[list.length - 1] === "" && list.pop();
        return list;
    }

    // 返回布尔 是否存在该类名
    _$.hasClass = function(el, ClassName) {
        if(!_$.isElement(el)) throw Error('el is not HTMLElement!');
        return (new RegExp(' ' + ClassName + ' ').test(' ' + el.className + ' '));
    }

    // 返回布尔 是否为HTML节点元素
    _$.isElement = function(object) {
        return (object instanceof HTMLElement);
    }

    // 返回字符 判断类型
    _$.typeOf = function(value) {
        var $name = value.constructor ? value.constructor.name : false;
        return value === undefined ?
        'undefined' : $name === 'String' ?
        'string'    : $name === 'Number' ?
        'number'    : (/function/i).test(value.toString()) ? 
        'function'  : value.toString() === '[object Object]' ?
        'object'    : $name ?
        // 如果constructor被覆盖或丢失
        $name       : typeof value;
    }
    
    window.HTMLElement = window.HTMLElement || Element;

    // 简易的兼容 IE8+ 
    Array.from = function(object) {
        var arr = [];
        // 此处滑稽一万个
        object.__proto__ = null;

        for(var key in object) {
            if(object[key] instanceof HTMLElement) {
                arr.push(object[key]);
            };
        }
        return arr;
    };
    Array.prototype.forEach = function(callback) {
        var i   = 0,
            arr = Object(this),
            l   = arr.length;

        if(_$.typeOf(callback) !== 'function') throw Error('callback is not Function!!!');
        while(i < l) {
            callback(arr[i], i, arr);
            i ++;
        }
    }

}(document));