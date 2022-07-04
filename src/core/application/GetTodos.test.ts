import mockData from './../../mockData';
import { getTodos } from './GetTodos';

beforeEach(() => {
  const mockFetchPromise = Promise.resolve({
    json: () => Promise.resolve(mockData),
  });
  //var globalRef: any = global;
  global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
});

describe('Test suit for GetTodos', () => {
  it('should call to api and get a list of todos', async () => {
    const todosData = await getTodos();
    expect(todosData).toBeDefined();
    expect(todosData.length).toBe(5);
  });
});
