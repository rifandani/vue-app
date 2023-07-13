export interface UnknownKeyString<T> {
  [key: string]: T
}
export interface UnknownKeyNumber<T> {
  [key: number]: T
}

export type FocusableElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | HTMLAnchorElement
  | HTMLButtonElement
  | HTMLAreaElement

export type Fn<T> = () => T
type Fn2<T, R> = (args: T) => R

export interface Environment {
  readonly browser?: boolean | Fn2<never, boolean>
  readonly server?: boolean | Fn2<never, boolean>
}

export interface Pauseable {
  /**
   * A state value that indicates whether a pauseable instance is active
   */
  isActive: boolean

  /**
   * Temporary pause the effect from executing
   */
  pause: VoidFunction

  /**
   * Resume the effects
   */
  resume: VoidFunction
}

export interface ConfigurableWindow {
  /*
   * Specify a custom `window` instance, e.g. working with iframes or in testing environments.
   */
  window?: Window
}

export interface ConfigurableDocument {
  /*
   * Specify a custom `document` instance, e.g. working with iframes or in testing environments.
   */
  document?: Document
}

export interface ConfigurableNavigator {
  /*
   * Specify a custom `navigator` instance, e.g. working with iframes or in testing environments.
   */
  navigator?: Navigator
}

export interface ConfigurableLocation {
  /*
   * Specify a custom `location` instance, e.g. working with iframes or in testing environments.
   */
  location?: Location
}
