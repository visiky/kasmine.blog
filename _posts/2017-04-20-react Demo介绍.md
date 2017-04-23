---
layout: post
title: react 入门 demo 
tag: [react]
---
## React 实例

src文件夹下有多个文件夹，每个文件夹是一个独立的实例[demo]()

### 渲染一个虚拟 DOM 为真实 DOM
    
创建react组件有三种方法，详细请看这一篇[React入门1](http://localhost:4000/kasmine.blog/2017/04/10/react入门介绍1.html),使用 render() 方法生成真实 DOM 并插入到网页中。

将组件插入到网页制定位置

```javascript
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```
**⚠️注⚠️**  下面我基本上使用的是 ES6的方法来创建组件（当需要维护状态的时候使用，不需要维护状态的，尽量使用最简单的函数声明组件方法）

### 购物车 [实例]()

#### 介绍
每个MVVM框架的入门，基本上都是从购物车入手的，学习react时候也不例外，下面主要介绍一下这个demo

Cart主要包括`<Item />` & `<List />`两个组件。

#### 根组件

```javascript
// 继承Component类
export default class Cart extends Component {
    constructor(props) {
        super(props);
    // this.state 用于存储数据
        this.state = {
            items: [],
            qtyTotal: 0,
            priceTotal: 0,
            subTotal: 0,
            tax: 0.10,
            grandTotal: 0
        }
    }
    // 使用 componentDidMount 在组件初始化后执行一些操作
    componentDidMount() {
        this.initData();
        this.handleSubTotal();
    }
  
    initData(){
        // 使用 [faker.js]() 产生模拟数据
        // 选择轻量的axios 获取api接口，代替传统的jquery
        axios.get(`http://localhost:9999/cartItems`)
            .then(result => {
                // 使用 setState 更新组件数据
                this.setState({ items:result.data });
            }).catch(result=>{
                console.log(result);
            });
    }
    removeItem(itemId) {
        let items=[].filter.call(this.state.items,function(item){
            return item.id !== itemId;
        });
        //  这里在 setState的回调函数中执行 this.handleSubTotal()，避免setState的延迟导致数据错误
        this.setState({items: items},function(){
            this.handleSubTotal();
        });  
    }
    // ... 省略其他方法的实现，详细看demo源代码
    render(){
        return (
            // ... 省略
            // 使用 <List />组件，传递属性
             <List
                    items={this.state.items} removeItem={this.removeItem.bind(this)} changeQty={this.changeQty.bind(this)} 
                    handleSubTotal={this.handleGrandTotal.bind(this)}/> 
                    // ⚠️注意⚠️：这里使用bind(this)绑定上下文。
            // ... 省略                    
        )
    }
}
```
* 关于`this`还是需要再梳理一下：首先，new一下我们定义的类，调用`constructor()`函数,`this.state`的`this`就是实例对象，同理，`render()`的`this.state`的`this`也是该实例对象。主要是方法中的`this`。在ES5写法的`createClass`中，Facebook的ES6创建组件的方法(extends Component)取消了自动绑定this,所以我们需要使用`bind(this)`来绑定上下文，才能够正确的执行方法中的`this.state`（笔者认为：如果我们不绑定 this 上下文，那么当我们将该方法作为属性传递个子组件的时候，this的上下文便会是子组件，于是便无法正常访问父组件的this.state）

比如：
```javascript
 removeItem(itemId) {
        let items=[].filter.call(this.state.items,function(item){
            return item.id !== itemId;
        });
        //  这里在 setState的回调函数中执行 this.handleSubTotal()，避免setState的延迟导致数据错误
        this.setState({items: items},function(){
            this.handleSubTotal();
        });  
    }
// ........
 <List
        items={this.state.items} removeItem={this.removeItem} changeQty={this.changeQty.bind(this)} 
        handleSubTotal={this.handleGrandTotal.bind(this)}/> 
```
这里，removeItem不绑定this上下文，那么子组件执行该方法时候，便会因为不存在`this.state.items`而报错 
![]({{site.imgurl}}/in-post/react/react-unbind-this.png)
![]({{site.imgurl}}/in-post/react/react-bind-this.png)

#### 组件间通信
在 React 中，数据流是单向的，且组件之间可以嵌套，我们可以通过对最顶层组件传递属性方式，向下层组件传送数据。
    
- 嵌套组件间，使用`this.props`属性向下传递数据
        
- 独立组件之间，自行维护数据则需要自行维护一个全局数据存储，或者使用`发布订阅`方式通知数据的更新。

react组件间通信方式主要有四种，具体可以看看[这一篇]()

在这里的实例中，使用的是：最顶层组件从服务器获取数据，通过`this.props`向下传递数据

```javascript
export default class List extends Component{
    renderItems(){
        // 这里使用lodash，将每一个 Item 封装成一个组件，并且使用 ES6的语法，使表达更加简洁
        // 注意，当使用map等等初始化列表的时候，记得给每一个 li 元素绑定一个key属性（具体原因：。。。）
        const props=_.omit(this.props,'items');
        return _.map(this.props.items,(item,index) => <Item key={index} {...item} {...props} />);
    }
    render(){
        return (
            <tbody>
                 { this.renderItems() } 
            </tbody>
        );
    }
}
```

`<Item />`组件：

```javascript
export default class Item extends Component{

    constructor(props){
        super(props);
        this.state={
            itemTotal:0
        }
    }
    // 初始化数据
    getInitialState(){
        this.setState({itemTotal:this.props.quantity*this.props.price});
    }

    handleChange(itemId,e){
        this.setState({itemTotal:e.target.value*this.props.price});
        // 使用父组件传递的属性方法
        this.props.changeQty(itemId,e.target.value);
    }

    render(){
        return(
            // ... 省略
            <button type="button" className="am-btn am-btn-danger" onClick={this.props.removeItem.bind(this, this.props.id)}>
                    <span className="fa fa-trash"></span> Remove
            </button>	
            // 使用父组件传递的属性方法&&使用bind(this)绑定上下文
            // ... 省略
        );
    }
}
```


### 时钟[实例]()

主要是学习state的使用以及lifecycle钩子的使用

*  由于这是一个时钟，所以date是变化的，所以为了管理这个状态，必须使用`this.state`，`setState`来更新`state`
#### 生命周期钩子
(顾名思义，就不解释了)
* componentWillMount 
* componentDidMount
* componentWillUnmount
* componentDidUnmount
    
```javascript
export default class Clock extends Component{
    constructor(props){
        super(props);
        this.state={
            date:new Date()
        }
    }
    componentDidMount(){
        this.tickId=setInterval(()=>{
            // use setState to update state!!!
            this.setState({date:new Date()})
        },1000)
    }

    componentWillUnmount(){
        clearInterval(this.tickId);
    }

    render(){
        return (
            <div className="clock">
                现在时间：{this.state.date.toLocaleTimeString()}
            </div>
        )
    }
}
```

### 聊天Demo

#### 父子间通信

这个demo主要用于了解父子间通信的方式，包括**父子组件通信**和**兄弟组件的通信**

主要思想和购物车大致一致，就不详细贴代码了

- 子组件向父组件通讯，同样也需要父组件向子组件传递 props 进行通讯，只是父组件传递的，是作用域为父组件自身的函数，子组件调用该函数，将子组件想要传递的信息，作为参数，传递到父组件的作用域中。

```javascript
// 子组件
    handleSubmit(){
        this.props.sendMessage(this.props.name,this.state.inputMsg);
        this.clearMessage();
    }
// 父组件
  constructor(){
        super();
         // ...
         // 将作用域绑定到父组件的作用域
        this.sendMessage=this.sendMessage.bind(this);
    }
    sendMessage(speaker,content){
       // ...
    }

    render(){
        return(
                <List {...this.state} sendMessage={this.sendMessage}/>
        )
    }

```

- 对于没有直接关联关系的两个节点(兄弟组件)，他们唯一的关联点，就是拥有相同的父组件。我们可以在父组件维持一个全局的状态，传递给各个组件，然后子组件向父组件通信，从而修改这个状态，从而每个子组件都可以收到相关的消息
    - 缺点：每个参与组件（包括父组件）都会触发componentcomponentDidUpdate事件
```javascript
// 父组件
 sendMessage(speaker,content){
        // 更新父组件的this.state.message(包括所有通信信息)
        this.setState((prevState,props)=>({
            message:prevState.message.concat({speaker,content})
        }));
    }
// 子组件接收 this.props.message
```