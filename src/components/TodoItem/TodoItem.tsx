import React from 'react';
import { Todo } from '../../core/domain/Todo';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
  onRemove: (itemId: number) => void;
  onCompleted: (itemId: number) => void;
}
export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onRemove,
  onCompleted,
}) => {
  return (
    <div className={styles.itemContainer}>
      <input
        type="checkbox"
        data-testid={`cbx-${todo.id}`}
        name={`${todo.id}`}
        checked={todo.completed}
        onChange={() => onCompleted(todo.id)}
      ></input>
      <div className={todo.completed ? styles.completed : ''}>{todo.title}</div>
      <button
        data-testid={`btn-remove-${todo.id}`}
        className={styles.closeBtn}
        onClick={() => onRemove(todo.id)}
      >
        X
      </button>
    </div>
  );
};
