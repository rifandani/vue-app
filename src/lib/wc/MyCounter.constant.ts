export interface MyCounterEventDetail {
  count: string
}
export interface MyCounterProps {
  initialCount: string
}

export const myCounterEventDecrement = 'my-counter:decrement' as const
export const myCounterEventIncrement = 'my-counter:increment' as const
