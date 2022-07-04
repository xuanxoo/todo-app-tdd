import React from 'react';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import App from './App';
import mockData from './mockData';
import { getTodos } from './core/application/GetTodos';
import userEvent from '@testing-library/user-event';
import addTodo from './core/application/AddTodo';

jest.mock('./core/application/GetTodos');
jest.mock('./core/application/AddTodo');
const mockAddTodo = addTodo as jest.Mock;
const mockGetTodos = getTodos as jest.Mock;

const renderComponet = (): void => {
  render(<App />);
};

describe('App', () => {
  beforeEach(() => {
    mockGetTodos.mockImplementation(() => mockData);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should load todos data component', async () => {
    renderComponet();
    expect(getTodos).toHaveBeenCalledTimes(1);
    expect(await screen.findByText('Eat breakfast')).toBeInTheDocument();
  });
  it('should add a todo item', async () => {
    const newTodoMocked = {
      userId: 3,
      id: Math.floor(Math.random() * 1000) + 1,
      title: 'new todo item',
      completed: true,
    };
    mockAddTodo.mockImplementation(() => newTodoMocked);

    renderComponet();

    userEvent.type(screen.getByTestId('add-item-input'), 'new todo item');
    userEvent.click(screen.getByTestId('add-item-button'));

    expect(addTodo).toHaveBeenCalledTimes(1);
    await waitFor(() => screen.findByText(/new todo item/i));
  });
  it('should remove a todo item', async () => {
    renderComponet();
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
    userEvent.click(screen.getByTestId('btn-remove-1'));
    expect(screen.queryByText(/Eat breakfast/i)).not.toBeInTheDocument();
  });
  it('should complete a todo item', async () => {
    renderComponet();
    await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i));
    const chcbkx = screen.getByTestId('cbx-1') as HTMLInputElement;
    userEvent.click(chcbkx);
    expect(screen.getByText(/Eat breakfast/i)).toHaveClass('completed');
  });
});
