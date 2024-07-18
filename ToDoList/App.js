/*import React, {useState, useEffect} from 'react';
import './App.css';

//importing components
import Form from './components/Form'
import TodoList from './components/TodoList';

function App() {

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);


  const filterHandler = () => {
    switch(status){
      case "completed":
        setFilteredTodos(todos.filter((todo) => 
          todo.completed === true
        ))
        break;

      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => 
          todo.completed === false
      ))
        break;

      default:
          setFilteredTodos(todos);
          break;
    }
  };

  useEffect(() => {
    getLocalTodos();
  },[]);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos,status]);

  const saveLocalTodos = () =>{

    localStorage.setItem('todos', JSON.stringify(todos));
    console.log(localStorage.getItem('todos'))
  };

  const getLocalTodos = () =>{

    console.log(localStorage.getItem('todos'))
    if (localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    }
    else{
      const todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
      console.log("get local todos function");
      console.log(todos)
    }

    /*const todolocal = JSON.parse(
      localStorage.getItem('todos')
    );

    if (todolocal){
      setTodos(todolocal)
    }*
  };

  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <Form inputText={inputText} 
            todos={todos} 
            setTodos={setTodos} 
            setInputText = {setInputText}
            setStatus={setStatus}
            />
      <TodoList setTodos={setTodos} 
                todos={todos}
                filteredTodos={filteredTodos}
                />
    </div>
  );
}

export default App;

*/

import React, { useState, useEffect } from 'react';
import './App.css';

// Importing components
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  const getInitialTodos = () => {
    const todoLocal = JSON.parse(localStorage.getItem('todos'));
    if (todoLocal) {
      return todoLocal;
    } else {
      return [];
    }
  };

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState(getInitialTodos);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList setTodos={setTodos} todos={todos} filteredTodos={filteredTodos} />
    </div>
  );
}

export default App;

