import { fireEvent, render, screen } from '@testing-library/svelte';
import { vi } from 'vitest';
import TestWrapper from '../../../shared/components/atoms/TestWrapper.app.svelte';
import TodosCreate from './TodosCreate.svelte';

describe('TodosCreate', () => {
  const validInput = 'new todo';
  const mockSubmitFn = vi.fn();

  it('should render properly', () => {
    const result = render(TestWrapper, { component: TodosCreate });
    expect(() => result).not.toThrow();
  });

  it('should render and submit form correctly', async () => {
    // ARRANGE
    render(TestWrapper, {
      component: TodosCreate,
    });
    const form: HTMLFormElement = screen.getByTestId('form');
    const input: HTMLInputElement = screen.getByTestId('input-todo');
    const button: HTMLButtonElement = screen.getByTestId('button-submit');
    form.addEventListener('submit', mockSubmitFn);

    // ASSERT
    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    // ACT & ASSERT
    await fireEvent.change(input, { target: { value: validInput } });
    expect(input.value).toBe(validInput);
    await fireEvent.click(button);
    expect(mockSubmitFn).toHaveBeenCalled();
  });
});
