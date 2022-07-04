import { Todo } from '../domain/Todo';

const addTodo = async (todo: Todo): Promise<Todo | undefined> => {
  try {
    const response = fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return (await response).json();
  } catch (e) {
    Promise.reject(e);
  }
};

export default addTodo;
