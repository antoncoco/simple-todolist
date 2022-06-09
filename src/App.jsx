import React, {Fragment, useState, useRef, useEffect} from "react";
import {v4 as uuidv4} from "uuid";
import { TodoList } from "./components/TodoList";

const initialTodos = [
  {
    id: 1,
    task: "Tarea 1",
    completed: false
  }
];

const KEY = "todoApp.todos";
const localTodos = JSON.parse(localStorage.getItem(KEY));

export function App(){
  const [todos, setTodos] = useState(localTodos || initialTodos);

  const todoTaskRef = useRef();

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  },[todos]);

  const handleTodoAdd = () => {
    const task = todoTaskRef.current.value;
    if(task === "") return;
    setTodos((prevTodos)=>{
      return [...prevTodos, {id: uuidv4(), task, completed: false}];
    });
    todoTaskRef.current.value = null;
  }

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  const handleClearAll = () => {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
  }

  return (
    <Fragment>
      <div className="form">
        <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea"/>
        <button className="addButton" onClick={handleTodoAdd}>➕</button>
        <button className="trashButton" onClick={handleClearAll}>🗑️</button>
      </div>
      <div className="pending">
        Te quedan {todos.filter((todo) => !todo.completed).length} por completar
      </div>
      <div className="list">
        <TodoList todos={todos} toggleTodo={toggleTodo}/>
      </div>
      
    </Fragment>
  );
}