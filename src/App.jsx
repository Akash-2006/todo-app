import React, { Component, createElement } from "react";
class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.onChange = this.onChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  onChange(event) {
    this.setState((prev) => (prev.value = event.target.value));
  }
  submitHandler(event) {
    if (event.key === "Enter") {
      this.props.onSubmit(this.state.value);
      this.setState((prev) => {
        prev.value = "";
        return prev;
      });
    }
  }
  render() {
    return (
      <input
        placeholder="Enter Taks"
        value={this.state.value}
        onChange={this.onChange}
        onKeyDown={this.submitHandler}
      />
    );
  }
}

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  render() {
    return this.props.sub.map((items) => {
      return <p key={items.id}>{items.name}</p>;
    });
  }
}

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = { items: this.props.task };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(newTask) {
    this.setState((prev) => {
      console.log(prev.items);
      const newTaskObj = { id: Date.now(), name: newTask, done: false };
      prev.items.sub.push(newTaskObj);
      return prev;
    });
  }

  render() {
    return (
      <div>
        <h2>{this.props.task.name}</h2>
        <Input onSubmit={this.onSubmit} />
        <Task sub={this.props.task.sub} />
      </div>
    );
  }
}
class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(newTask) {
    this.setState((prev) => {
      const newTaskObj = { id: Date.now(), name: newTask, sub: [] };
      prev.items.push(newTaskObj);
      return prev;
    });
  }

  render() {
    const list = this.state.items.map((categories) => {
      return createElement(Category, {
        key: categories.id,
        task: categories,
      });
    });
    const input = <Input onSubmit={this.onSubmit} />;
    return createElement("div", null, input, list);
  }
}

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Todo
          items={[
            {
              id: 1,
              name: "buying",
              sub: [{ id: 1, name: "buy milk", done: false }],
            },
          ]}
        />
      </>
    );
  }
}

export default App;
