import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Todo } from '../../core/domain/Todo';
import { TodoItem } from './TodoItem';

const handleClick = jest.fn();
const handleCompleted = jest.fn();
const mockedTodo: Todo = {
  userId: 1,
  title: 'item title',
  completed: true,
  id: 1,
};
const renderComponent = () =>
  render(
    <TodoItem
      todo={mockedTodo}
      onRemove={handleClick}
      onCompleted={handleCompleted}
    />,
  );

describe('test suites for todoitem', () => {
  it('should render a todo item with the title', () => {
    renderComponent();
    const title = screen.getByText(/item title/i);
    const btnRemove = screen.getByTestId('btn-remove-1');
    expect(title).toBeInTheDocument();
    expect(btnRemove).toBeInTheDocument();
  });
  it('should render a todo item with a checkbox completed to true', () => {
    renderComponent();
    const checkboxBtn = screen.getByTestId('cbx-1') as HTMLInputElement;
    expect(checkboxBtn).toBeInTheDocument();
    expect(checkboxBtn.checked).toEqual(true);
  });
  it('should handle checkbox event on click', () => {
    renderComponent();
    const checkboxBtn = screen.getByTestId('cbx-1') as HTMLInputElement;
    fireEvent.click(checkboxBtn);
    expect(handleCompleted).toHaveBeenCalledTimes(1);
  });
});
