import React from "react";
import request from "superagent";

export default class Index extends React.Component {
  constructor(props) {
    super();
    this.state = props;
  }
  onInputChange(e) {
    if (e.keyCode !== 13/*ENTER*/) return;
    var value = e.target.value;
    this.setState({
      todos: this.state.todos.concat(value)
    });
    // 为简单起见，就直接将内容写在querystring上了
    request.post('/api/add?content=' + value)
           .end(function(){});
  }
  render() {
    var {todos=[]} = this.state;
    return (
      <div>
      <input onKeyUp={(e) => this.onInputChange(e)}/>
      <ul>
        {todos.map(todo => {
          return (
            <li> {todo} </li>
          );
        })}
     </ul>
     </div>
    );
  }
}

// 启动页面..(这种代码不应该在每个React页面里写，可以抽象到更底层，做为demo，先不管这么多)
if (typeof window !== 'undefined') {
  // 取数据
  var data = JSON.parse(document.getElementById('iso-data').innerHTML);
  // Data + React Component => 渲染结果
  React.render(<Index {...data} />, document.getElementById('app'));
}
