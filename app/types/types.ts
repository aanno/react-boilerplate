
import SyntheticEvent = React.SyntheticEvent;
import FormEvent = React.FormEvent;
export declare const TResponseError: ResponseErrorConstructor;

export interface ResponseErrorConstructor extends ErrorConstructor {

  new (message: string, response: Response): IResponseError;

  readonly prototype: IResponseError;
}

export interface IResponseError extends Error {
  response: Response;
}

export class ResponseError extends Error {

  constructor(message: string, public response: Response) {
    super(message);
  }

}

export class TestEventTarget<T> implements EventTarget {

  value: T;

  constructor(value: T) {
    this.value = value;
  }

  addEventListener(_1: string, _2?: EventListenerOrEventListenerObject, _3?: boolean): void {
  }

  dispatchEvent(_: Event): boolean {
    return true;
  }

  removeEventListener(_1: string, _2?: EventListenerOrEventListenerObject, _3?: boolean): void {
  }

}

export class TestSyntheticEvent<T> implements SyntheticEvent<T> {

  bubbles: boolean;
  currentTarget: EventTarget & T;
  cancelable: boolean;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  nativeEvent: Event;
  // If you thought this should be `EventTarget & T`, see https://github.com/DefinitelyTyped/DefinitelyTyped/pull/12239
  target: EventTarget;
  timeStamp: Date;
  type: string;

  //

  propagationStopped: boolean;

  constructor(target: EventTarget & T) {
    this.bubbles = false;
    this.defaultPrevented = false;
    this.cancelable = false;
    this.eventPhase = -9999;
    this.isTrusted = true;
    //
    this.currentTarget = target;
    //
    this.propagationStopped = false;
  }

  preventDefault(): void {
  }

  isDefaultPrevented(): boolean {
    return this.defaultPrevented;
  }

  stopPropagation(): void {
    this.propagationStopped = true;
  }

  isPropagationStopped(): boolean {
    return this.propagationStopped;
  }

  persist(): void {
  }

}

export class TestFormEvent<T> extends TestSyntheticEvent<T> implements FormEvent<T> {

}
