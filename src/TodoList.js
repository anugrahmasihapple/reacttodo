import React from 'react';
//we created this file Todo.js so we will import it here
import Todo from './Todo';

export default function TodoList({ todos, toggleTodo }) {
  return (
    // here every time we update array it will change
    todos.map(todo => {
      return <Todo key={ todo.id } toggleTodo={toggleTodo} todo = { todo } />
    })
  )
}
