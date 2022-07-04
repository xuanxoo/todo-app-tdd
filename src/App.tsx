import React, { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import './App.css';
import { Todo } from './core/domain/Todo';
import { getTodos } from './core/application/GetTodos';
import TodoList from './components/TodoList/TodoList';
import addTodo from './core/application/AddTodo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const getTodosFromApi = async () => {
      const todosRp = await getTodos();
      setTodos(todosRp);
      setLoading(false);
    };
    getTodosFromApi();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    const newTodoItem: Todo = {
      userId: 3,
      id: Math.floor(Math.random() * 1000) + 1,
      title: newTodo,
      completed: true,
    };
    try {
      const newItem = await addTodo(newTodoItem);
      if (!newItem) return;
      setTodos(todos.concat(newItem));
    } catch (e) {}
  };

  const removeHandler = (todoId: number) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  const handleOnComplete = (todoId: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, completed: !todo.completed }; //nos evitamos mutar el objeto!
        }
        return todo;
      }),
    );
  };

  return (
    <div className="App">
      <h1>My todo list</h1>
      {loading ? (
        'Loading'
      ) : (
        <TodoList
          todos={todos}
          onRemove={removeHandler}
          onCompleted={handleOnComplete}
        ></TodoList>
      )}
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-testid="add-item-input"
            onChange={(event) => setNewTodo(event.target.value)}
          ></input>
          <button type="submit" data-testid="add-item-button">
            Add item
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
