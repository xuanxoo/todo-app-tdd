import { render, screen } from '@testing-library/react';
import React from 'react';
import TodoList from './TodoList';
import mockData from './../../mockData';

describe('TodoList', () => {
  const onRemoveTodoItem = jest.fn();
  const onCompleted = jest.fn();
  it('should show h1 title', () => {
    render(
      <TodoList
        todos={[]}
        onRemove={onRemoveTodoItem}
        onCompleted={onCompleted}
      />,
    );
    expect(screen.getByText(/Todo list/)).toBeInTheDocument();
  });
  it('should display title for each todo', () => {
    render(
      <TodoList
        todos={mockData}
        onRemove={onRemoveTodoItem}
        onCompleted={onCompleted}
      />,
    );
    mockData.forEach((todo) =>
      expect(screen.getByText(todo.title)).toBeInTheDocument(),
    );
  });
});
