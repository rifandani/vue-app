import { fireEvent, render, screen } from '@testing-library/svelte';
import { vi } from 'vitest';
import TestWrapper from '../../../shared/components/atoms/TestWrapper.app.svelte';
import TodosFilter from './TodosFilter.svelte';

describe('TodosFilter', () => {
  const validLimit = '10';
  const mockChangeFn = vi.fn();

  it('should render properly', () => {
    const result = render(TestWrapper, { component: TodosFilter });
    expect(() => result).not.toThrow();
  });

  it('should render and change limit correctly', async () => {
    // ARRANGE
    render(TestWrapper, {
      component: TodosFilter,
    });
    const form: HTMLFormElement = screen.getByTestId('form');
    const label: HTMLLabelElement = screen.getByTestId('label-limit');
    const select: HTMLInputElement = screen.getByTestId('select-limit');
    const options: HTMLOptionElement[] = screen.getAllByRole('option');
    select.addEventListener('select', mockChangeFn);

    // ASSERT
    expect(form).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(options.length).toBe(4);

    // ACT & ASSERT
    await fireEvent.select(select, { target: { value: validLimit } });
    expect(select.value).toBe(validLimit);
    expect(mockChangeFn).toHaveBeenCalled();
  });
});
