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
});
