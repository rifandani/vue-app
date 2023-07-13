import { fireEvent, render, screen } from '@testing-library/svelte';
import TestWrapper from '../../../shared/components/atoms/TestWrapper.app.svelte';
import HomeClock from './HomeClock.svelte';

describe('HomeClock', () => {
  it('should render properly', () => {
    const result = render(TestWrapper, { props: { component: HomeClock } });
    expect(() => result).not.toThrow();
  });

  it('should render toggle clock correctly', async () => {
    // ARRANGE
    render(TestWrapper, { props: { component: HomeClock } });
    const clockBtn: HTMLButtonElement = screen.getByTestId('clock');

    // ACT
    await fireEvent.click(clockBtn);

    // ASSERT
    const div: HTMLDivElement = screen.getByTestId('show-clock');
    expect(div).toBeInTheDocument();
  });

  it('should render buttons correctly', () => {
    // ARRANGE
    render(TestWrapper, { props: { component: HomeClock } });
    const sortBtn: HTMLButtonElement = screen.getByTestId('sort');
    const clockBtn: HTMLButtonElement = screen.getByTestId('clock');
    const languageBtn: HTMLButtonElement = screen.getByTestId('language');
    const startBtn: HTMLButtonElement = screen.getByTestId('start');

    // ASSERT
    expect(sortBtn).toBeInTheDocument();
    expect(clockBtn).toBeInTheDocument();
    expect(languageBtn).toBeInTheDocument();
    expect(startBtn).toBeInTheDocument();
  });
});
