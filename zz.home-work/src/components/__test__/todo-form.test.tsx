import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoForm } from '../todo-form';

describe('Integration Test', () => {
  it('should enable Add Todo button only when all fields are filled', () => {
    render(<TodoForm todos={[]} setTodos={vi.fn()} />);
    const todoInput = screen.getByLabelText(/New Todo/i);
    const deadlineInput = screen.getByLabelText('Deadline');
    const submitButton = screen.getByRole('button', { name: /Add Todo/i });

    expect(submitButton).toBeDisabled();
    fireEvent.change(todoInput, { target: { value: 'Buy milk' } });
    fireEvent.change(deadlineInput, { target: { value: '2024-12-31' } });
    expect(submitButton).not.toBeDisabled();
  });

  it('User cannot write more than 100 characters', () => {
    render(<TodoForm todos={[]} setTodos={vi.fn()} />);
    const todoInput = screen.getByLabelText(/New Todo/i);
    const deadlineInput = screen.getByLabelText('Deadline');

    fireEvent.change(todoInput, {
      target: {
        value:
          '10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
      },
    });
    fireEvent.change(deadlineInput, { target: { value: '2029-11-29' } });
    expect(todoInput.value).toBe('');
  });

  it('User cannot write if dead line is in the past', () => {
    render(<TodoForm todos={[]} setTodos={vi.fn()} />);
    const todoInput = screen.getByLabelText(/New Todo/i);
    const deadlineInput = screen.getByLabelText('Deadline');

    expect(todoInput).not.toBeDisabled();
    fireEvent.change(todoInput, {
      target: {
        value: 'Nothing',
      },
    });
    fireEvent.change(deadlineInput, { target: { value: '2024-12-31' } });
    expect(todoInput).toBeDisabled();
  });
});
