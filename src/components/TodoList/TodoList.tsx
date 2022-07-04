import React from 'react';
import { Todo } from '../../core/domain/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface TodoListProps {
  todos: Todo[];
  onRemove: (itemId: number) => void;
  onCompleted: (itemId: number) => void;
}

const TodoList: React.FC<TodoListProps> = (props: TodoListProps) => {
  const { todos, onRemove, onCompleted } = props;
  return (
    <>
      <h1>Todo list</h1>
      <div>
        {todos.map((todo, i) => (
          <div key={i} data-testid={i}>
            <TodoItem
              todo={todo}
              onRemove={onRemove}
              onCompleted={onCompleted}
            ></TodoItem>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
