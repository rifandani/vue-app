import type { ComponentOptionsBase, DefineComponent, EmitsOptions, IntrinsicElementAttributes, ObjectEmitsOptions } from 'vue'

export type SvgProps = IntrinsicElementAttributes['svg']
export type ButtonProps = IntrinsicElementAttributes['button']
export type TableProps = IntrinsicElementAttributes['table']
export type FormProps = IntrinsicElementAttributes['form']
export type InputProps = IntrinsicElementAttributes['input']

export type FocusableElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | HTMLAnchorElement
  | HTMLButtonElement
  | HTMLAreaElement

type DefineComponentReturnType =
  | DefineComponent<any, any>
  | DefineComponent<any, any, any, any, any, any, any, any, any>

type ExtractOptions<Props = any, Emits extends EmitsOptions = any, Defaults = any> = ComponentOptionsBase<
  Props,
  any,
  any,
  any,
  any,
  any,
  any,
  Emits,
  any,
  Defaults
>

type PropOptionsToPropTypes<Props, Defaults> = Partial<Defaults> & Omit<Props, keyof Defaults>

// based on `EmitsToProps` type
type EmitsToEventHandlers<T extends EmitsOptions> = T extends string[]
  ? { [K in T[number]]?: (...args: any[]) => any }
  : T extends ObjectEmitsOptions
    ? {
        [K in keyof T]?: T[K] extends null
          ? (...args: any[]) => any
          : (...args: T[K] extends (...args: infer P) => any ? P : never) => any;
      }
    : Record<string, never>

export type ComponentProps<T extends DefineComponentReturnType> = T extends ExtractOptions<infer P, any, infer D>
  ? PropOptionsToPropTypes<P, D>
  : never

export type ComponentEventHandlers<T extends DefineComponentReturnType> = T extends ExtractOptions<any, infer E, any>
  ? EmitsToEventHandlers<E>
  : never
