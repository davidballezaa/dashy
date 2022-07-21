import { useState } from 'react'

export default function Todo() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  function handleChange(id) {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id !== id ? todo : { ...todo, completed: !todo.completed }
      )
    )
  }

  function handleNewTodo(event) {
    setNewTodo(event.target.value)
  }

  function addTodo(event) {
    event.preventDefault()
    setTodos(prevTodos => {
      return [
        {
          id: new Date().getTime(),
          content: newTodo,
          completed: false
        },
        ...prevTodos
      ]
    })
    setNewTodo('')
  }

  return (
    <div>
      <p>Todos</p>
      <form onSubmit={addTodo}>
        <input
          type="text"
          id="newTodo"
          value={newTodo}
          onChange={handleNewTodo}
        />
        <button type="submit">Add</button>
      </form>
      {todos &&
        todos.map(todo => (
          <div key={todo.id}>
            <label
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleChange(todo.id)}
              />
              {todo.content}
            </label>
          </div>
        ))}
    </div>
  )
}
