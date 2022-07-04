import { Todo } from '../domain/Todo';

export const getTodos = async (): Promise<Todo[]> => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    return response.json();
  } catch (e) {
    return Promise.reject();
  }
};
