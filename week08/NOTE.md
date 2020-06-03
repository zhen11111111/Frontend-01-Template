重学CSS
选择器
1. 选择器语法
简单选择器
div svg|a
.cls
#id
[attr=value]
:hover
::before
复合选择器
<简单选择器> <简单选择器> <简单选择器>
*或者div必须写在最前面
复杂选择器
<复合选择器> <复合选择器>
<复合选择器> ">" <复合选择器>
<复合选择器> "~" <复合选择器>
<复合选择器> "+" <复合选择器>
<复合选择器> "||" <复合选择器>
2. 伪类
链接/行为
:any-link
:link :visited
:hover
:active
:focus
:target
树结构
:empty
:nth-child()
:nth-last-child()
:first-child :last-child :only-child
逻辑性
:not伪类
:where :has
3. 伪元素
::before
::after
::firstline
::first-letter
排版
1. 盒
HTML代码中可以书写开始标签，结束标签，和自封闭标签
一对起止标签，表示一个元素
DOM树种存储的是元素和其他类型的节点（Node）
CSS选择器选中的是元素
CSS选择器选中的元素，在排版时可能产生多个盒
排版和渲染的基本单位是盒子
2. 正常流
正常流排版
收集盒进行
计算盒在行中的排布
计算行的排布
Flex排版
收集盒入行
计算盒在主轴方向的排布
计算盒在交叉轴方向的排布
block-level 表示可以放入bfc block-container 表示可以容纳bfc block-box = block-level + block-container block-box 如何overflow是visible，那么就跟父bfc合并