import './App.css'

import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function App() {
  const [todoList, updateList] = useState([])
  const [todo, updateTodo] = useState('')

  let newTodoList;

  let deleteTodo = (id) => {
    newTodoList = todoList.filter((todo) => {
      return todo.id !== id
    })
    updateList(newTodoList)
  }

  let onAdd = () => {
    if (todo === '') {
      alert("Enter the text")
    }
    else {
      newTodoList = [...todoList, { id: uuidv4(), todo: todo }]
      updateList(newTodoList)
    }
    updateTodo('')
  }

  let [markedTodos, setMarkedTodos] = useState(new Set());

let markTodo = (id) => {
  setMarkedTodos(prevMarkedTodos => {
    const newMarkedTodos = new Set(prevMarkedTodos);
    if (newMarkedTodos.has(id)) {
      newMarkedTodos.delete(id);
    } else {
      newMarkedTodos.add(id);
    }
    return newMarkedTodos;
  });
}




  return (
    <div className="main-container">
      <h1 className="heading">Todo App</h1>

      <div className="input-container">

        <input type="text" className="form-control"
          value={todo}
          onChange={(e) => { updateTodo(e.target.value) }}
          placeholder="Add what you want to do...">
        </input>

        <button className="btn btn-primary" onClick={onAdd}>ADD</button>
      </div>

      <div className="todo-container">
        {todoList.map((todo) => (
          <div className="todo" key={todo.id}>
            <div className="inner-todo">
              <input type="checkbox" 
              checked={markedTodos.has(todo.id)}
              onChange={() => markTodo(todo.id)}></input>
              <p style={{ textDecoration: markedTodos.has(todo.id) ? 'line-through' : 'none' }}>{todo.todo}</p>
            </div>
            <button className="btn" onClick={() => {
              deleteTodo(todo.id)
            }}><FontAwesomeIcon icon={faTrash} style={{color: "#d41629",}} /></button>
          </div>
        ))}
      </div>


    </div>
  )
}

export default App

