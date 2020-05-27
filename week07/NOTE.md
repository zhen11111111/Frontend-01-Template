# 每周总结可以写在这里
收集CSS 标准
访问 https://www.w3.org/TR/?tag=css，通过下面的代码获取分散的 CSS 标准
const standards = [];
[...document.getElementById('container').children]
  .filter((e) => e.getAttribute('data-tag').includes('css'))
  .forEach((e) => {
    standards.push({
      tag: e.getAttribute('data-tag'),
      profile: e.children[0].innerText,
      name: e.children[1].innerText,
      url: e.children[1].children[0].href,
    });
  });
  JSON.stringify(standards,null,2);
针对单个标准链接获取详情
let iframe = document.createElement('iframe');
document.body.innerHTML = '';
document.body.appendChild(iframe);

function happen(element, event) {
  return new Promise(function (resolve) {
    let handler = () => {
      resolve();
      element.removeEventListener(event, handler);
    };
    element.addEventListener(event, handler);
  });
}

void (async function () {
  for (let standard of standards) {
    iframe.src = standard.url;
    console.log(standard.name);
    await happen(iframe, 'load');
  }
})();
CSS Layout之 布局方式详解
常见的布局有几种样式：传统盒模型布局、flex 布局

-[CSS 常见布局方式](https://juejin.im/post/599970f4518825243a78b9d5)

> 传统盒模型布局

- 盒子模型分为：普通盒子模型和怪异盒子模型
- 盒模型布局主要是使用 display 属性（文档流布局） + position 属性（定位布局） + float 属性（浮动布局）

> flex 布局样式属性汇总：

- react-native 已经实现了**只用**flex 来进行页面布局

- 作用在父容器上的属性：

  - flex-direction: row | row-reverse | column | column-reverse // 控制主轴的方向
  - flex-wrap: wrap | nowrap | wrap-reverse // 控制主轴上元素的换行方式
  - justify-content: center | flex-start | flex-end | space-between | space-around | space-evenly // 控制主轴上元素的对齐方式
  - align-items: center | flex-start | flex-end | stretch | baseline // flex 子项们相对于 flex 容器在垂直方向上的对齐方式
  - align-content: center | flex-start | flex-end | space-between | space-around | space-evenly // 控制垂直方向每行的对齐方式（只有多行的情况下才会起作用）

- 作用在子容器上的属性：
  - align-self 属性，可以覆盖父元素上的 align-items 属性
  - flex 是 flex-grow,flex-shrink,flex-basis 的简写
