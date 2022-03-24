import React,{ useState, useRef, useEffect } from 'react';

import TodoList from './TodoList';

// we install uuid npm i uuid then we import
//import uuidv4 from   'uuid/v4';
import { v4 as uuidv4 } from "uuid";
//this is for local storage
const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  //here we will call inbuilt fun usestate whcih we import as an empty array
  const [todos, setTodos ] = useState([ ])
  // useRef will allow us to refference element in html
  const todoNameRef = useRef()

//this will load data from local storage
useEffect(() =>{
  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  if(storedTodos) setTodos(storedTodos)
}, []) // pass empty array to load once only


useEffect(() =>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [ todos ])

  //this fun is for chechbox work for todo list
  function toggleTodo(id){
    //it will take new list and copy the prev one
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  //create a fun which handles click
  function handleAddTodo(e){
    //this will be value from input
    const name = todoNameRef.current.value
    if(name === '') return 
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null

  }

  //this function is to clear our todos
  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete) //this will del all the todos whci is not complete i.e not right tick
    setTodos(newTodos)

  }

  return (
    <>
    <TodoList  todos  ={ todos } toggleTodo={toggleTodo} />

    <input ref={todoNameRef} type="text" />

    <button onClick={handleAddTodo}>Add Todo </button>
    <button onClick={handleClearTodos}>Clear Complete</button>
    <div>{todos.filter(todo => !todo.complete).length}  left to do </div>

    </>
  )
    
}

export default App;
