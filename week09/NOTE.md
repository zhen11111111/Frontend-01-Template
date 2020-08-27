# 每周总结可以写在这里

Animation（需要配合@keyframes关键帧使用）;
它是一个动画复合属性，有以下的属性
animation-name ：动画名称
animation-duration ：动画的持续时间
animation-timing-function ：动画的过渡类型，运动函数
animation-delay ：动画延迟的时间
animation-iteration-count ：动画的循环次数
animation-direction：动画在循环中是否反向运动
animation-fill-mode：动画结束后的状态
animation-play-state：动画状态
Transition
transition-property 要变换的属性
transition-duration 变换的时长
transition-timing-function 时间曲线
transition-delay 延迟

合法元素
Element
Text 文本
Comment
DocumentType <!Doctype html>
ProcessingInstruction 处理信息(没有用)
CDATA

NODE
Element 元素型节点
Document 文档根节点
Character 字符数据 包括文本节点 注释 处理信息
DocumentFragment 文档片段 不会产生真实dom 减少dom操作 可以作为性能优化的手段
DocumentType 文档类型

导航类操作
parentNode
childNodes
firstChild
lastChild
nextSibling
previousSibling

修改操作
appendChild
insertBefore
removeChild
replaceChild

高级操作
compareDocumentPosition 用于比较两个节点关系的函数
contains 检查一个节点是否包含另外一个节点
isEqualNode 检查两个节点是否完全相同
isSameNode 检查两个节点是否是同一个节点 实际可以在JS中用===去判断
cloneNode 复制一个节点 如果参数为true 会连同子元素做深拷贝

css属性
animation-delay
animation-direction
animation-duration
animation-fill-mode
animation-iteration-count
animation-name
animation-play-state
animation-timing-function
background-attachment
background-blend-mode
background-clip
background-color
background-image
background-origin
background-position
background-repeat
background-size
border-bottom-color
border-bottom-left-radius
border-bottom-right-radius
border-bottom-style
border-bottom-width
border-collapse
border-image-outset
border-image-repeat
border-image-slice
border-image-source
border-image-width
border-left-color
border-left-style
border-left-width
border-right-color
border-right-style
border-right-width
border-top-color
border-top-left-radius
border-top-right-radius
border-top-style
border-top-width
bottom
box-shadow
box-sizing
break-after
break-before
break-inside
caption-side
clear
clip
color
content
cursor
direction
display
empty-cells
float
font-family
font-kerning
font-optical-sizing
font-size
font-stretch
font-style
font-variant
font-variant-ligatures
font-variant-caps
font-variant-numeric
font-variant-east-asian
font-weight
height
image-orientation
image-rendering
isolation
justify-items
justify-self
left
letter-spacing
line-height
list-style-image
list-style-position
list-style-type
margin-bottom
margin-left
margin-right
margin-top
max-height
max-width
min-height
min-width
mix-blend-mode
object-fit
object-position
offset-distance
offset-path
offset-rotate
opacity
orphans
outline-color
outline-offset
outline-style
outline-width
overflow-anchor
overflow-wrap
overflow-x
overflow-y
padding-bottom
padding-left
padding-right
padding-top
pointer-events
position
resize
right
scroll-behavior
speak
table-layout
tab-size
text-align
text-align-last
text-decoration
text-decoration-line
text-decoration-style
text-decoration-color
text-decoration-skip-ink
text-underline-position
text-indent
text-rendering
text-shadow
text-size-adjust
text-overflow
text-transform
top
touch-action
transition-delay
transition-duration
transition-property
transition-timing-function
unicode-bidi
vertical-align
visibility
white-space
widows
width
will-change
word-break
word-spacing
z-index
zoom
backface-visibility
column-count
column-gap
column-rule-color
column-rule-style
column-rule-width
column-span
column-width
backdrop-filter
align-content
align-items
align-self
flex-basis
flex-grow
flex-shrink
flex-direction
flex-wrap
justify-content
grid-auto-columns
grid-auto-flow
grid-auto-rows
grid-column-end
grid-column-start
grid-template-areas
grid-template-columns
grid-template-rows
grid-row-end
grid-row-start
row-gap
hyphens
order
perspective
perspective-origin
shape-outside
shape-image-threshold
shape-margin
transform
transform-origin
transform-style
user-select
buffered-rendering
clip-path
clip-rule
mask
filter
flood-color
flood-opacity
lighting-color
stop-color
stop-opacity
color-interpolation
color-interpolation-filters
color-rendering
fill
fill-opacity
fill-rule
marker-end
marker-mid
marker-start
mask-type
shape-rendering
stroke
stroke-dasharray
stroke-dashoffset
stroke-linecap
stroke-linejoin
stroke-miterlimit
stroke-opacity
stroke-width
alignment-baseline
baseline-shift
dominant-baseline
text-anchor
writing-mode
vector-effect
paint-order
d
cx
cy
x
y
r
rx
ry
caret-color
line-break