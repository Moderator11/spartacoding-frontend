import { Todo } from '../../types/todo';
import { deleteTodo, updateToggle } from '../todo';

describe('Unit Test', () => {
  it('updateToggleWorks', () => {
    const todos: Todo[] = [
      {
        id: 1,
        text: 'Hello',
        completed: false,
        deadline: '2025-05-02',
      },
    ];
    const result = updateToggle(todos, 1);
    expect(result[0].completed).toBe(true);
  });
  it('deleteTodoWorks', () => {
    const todos: Todo[] = [
      {
        id: 1,
        text: 'Hello',
        completed: false,
        deadline: '2025-05-02',
      },
    ];
    const result = deleteTodo(todos, 1);
    expect(result.length).toBe(0);
  });
});
