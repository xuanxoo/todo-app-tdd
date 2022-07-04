import addTodo from './AddTodo';

describe('AddTodo suite tests', () => {
  it('should add a new todo with a post to api', async () => {
    const mockedTodo = {
      userId: 3,
      id: Math.floor(Math.random() * 100) + 1,
      title: 'Do math homework',
      completed: false,
    };

    const mockFetchPromise = Promise.resolve({
      json: () => Promise.resolve(mockedTodo),
    });

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const newTodo = await addTodo(mockedTodo);
    expect(mockedTodo.id).toBe(newTodo?.id);
  });
});
