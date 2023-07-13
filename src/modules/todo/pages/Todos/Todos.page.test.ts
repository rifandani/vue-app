import { render, screen } from '@testing-library/svelte';
import TestWrapper from '../../../shared/components/atoms/TestWrapper.app.svelte';
import Todos from './Todos.page.svelte';

describe('TodosPage', () => {
  it('should render properly', () => {
    const result = render(TestWrapper, { props: { component: Todos } });
    expect(() => result).not.toThrow();
  });

  it('should render title correctly', () => {
    // ARRANGE
    render(TestWrapper, { props: { component: Todos } });
    const title = screen.getByTestId('title');

    // ASSERT
    expect(title).toBeInTheDocument();
  });
});
