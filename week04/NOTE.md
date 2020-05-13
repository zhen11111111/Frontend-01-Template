其实所有的JS代码都是一个微任务，只是哪些微任务构成了一个宏任务；执行在JS引擎里的就是微任务，执行在JS引擎之外的就是宏任务，循环宏任务的工作就是事件循环。

事件循环不属于JavaScript引擎实现的东西，而是由浏览器或NodeJS宿主环境实现的

一个宏任务里的同步代码可以理解为微任务，只不过比宏任务里的异步代码的微任务优先入队。

微任务是没有优先级的，一个宏任务中只存在一个微任务队列，根据入队时间决定微任务顺序，列表里的所有微任务执行完才会执行下一个宏任务。

Promise的then方法以及async函数里的await（await相当于语法上的then，then在分号之后）会将一个微任务入队，添加在微任务队列的最后。

ECMAScript相关章节：RunJobs（P.104）

拿浏览器举例：setTimeout、setInterval 这种其实不是 JS 语法本身的 API，是 JS 的宿主浏览器提供的 API， 所以是宏任务。 而 Promise 是 JS 本身自带的 API，这种就是微任务。

总结：宿主提供的方法是宏任务，JS 自带的是微任务

  async function afoo() {
    console.log('-2')
    await new Promise((resolve) => resolve())
    console.log('-1')
    await new Promise((resolve) => resolve())
    console.log('-0.5')
  }
  new Promise((resolve) => (console.log('0'), resolve())).then(
    () => (
      console.log('1'),
      new Promise((resolve) => resolve()).then(() => console.log('1.5'))
    )
  )

  setTimeout(function () {
    console.log('2')
    new Promise((resolve) => resolve()).then(console.log('3'))
  }, 0)
  console.log('4')
  console.log('5')
  afoo()
//0
//4
//5
//-2
//1
//-1
//1.5
//-0.5
//Promise {<resolved>: undefined}
//2
//3
宏任务1：
微任务1（同步代码）：0, 4, 5, -2
入队1（0执行后），-1（-2执行后）
微任务2：1
入队1.5（1执行后）
微任务3：-1
入队-0.5（-1执行后）
微任务4：1.5
微任务5：-0.5
宏任务2：
微任务1：2
微任务2：3
  new Promise((res) => res()).then(() => {
    setTimeout(() => {
      console.log(1)
    }, 1000)
  }, console.log(0)) // 这里是then的第二个参数
  console.log(2)
//0
//2
//undefined
//1
障眼法：console.log(0)是then的参数，属于同步代码

  async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
  }
  async function async2() {
    console.log('async2')
  }
  async1()
  new Promise(function (resolve) {
    console.log('promise1')
    resolve()
  }).then(function () {
    console.log('promise2')
  })
//async1 start（同步代码）
//async2（同步代码，入队async1 end）
//promise1（同步代码，入队promise2）
//async1 end（第二个微任务）
//promise2（第三个微任务）
//Promise {<resolved>: undefined}