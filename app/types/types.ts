
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

/*
export class TestElementEventTarget<T> extends TestEventTarget<T> implements Element {

}
 */

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

export class TestEvent implements Event {

  readonly bubbles: boolean;
  cancelBubble: boolean;
  readonly cancelable: boolean;
  readonly currentTarget: EventTarget;
  readonly defaultPrevented: boolean;
  readonly eventPhase: number;
  readonly isTrusted: boolean;
  returnValue: boolean;
  readonly srcElement: Element | null;
  readonly target: EventTarget;
  readonly timeStamp: number;
  readonly type: string;
  readonly AT_TARGET: number;
  readonly BUBBLING_PHASE: number;
  readonly CAPTURING_PHASE: number;

  //

  scoped: boolean;
  deepPath: () => EventTarget[];

  constructor(target: EventTarget) {
    this.bubbles = false;
    this.cancelBubble = false;
    this.cancelable = false;
    this.currentTarget = target;
    this.defaultPrevented = false;
    this.eventPhase = -9999;
    this.isTrusted = true;
    this.returnValue = true;
    this.srcElement = null;
    this.target = target;
    this.timeStamp = -9999;
    this.type = "TestEvent";
    this. AT_TARGET = -9900;
    this.BUBBLING_PHASE = -9990;
    this.CAPTURING_PHASE = -9000;
    //
    this.scoped = false;
    this.deepPath = () => [];
  }

  initEvent(_eventTypeArg: string, _canBubbleArg: boolean, _cancelableArg: boolean): void {
  }

  preventDefault(): void {
    // this.defaultPrevented = true;
  }

  stopImmediatePropagation(): void {
  }

  stopPropagation(): void {
  }
}

export class TestLocation implements Location {
  hash: string;
  host: string;
  hostname: string;
  href: string;
  readonly origin: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;

  //

  url: string;

  constructor(path: string) {
    this.hash = path;
    this.host = "128.0.0.1";
    this.hostname = "testhost";
    this.href = path;
    this.origin = "test";
    this.pathname = path;
    this.port = "-9999";
    this.protocol = "http";
    this.search = "";
    //
    this.url = path;
  }

  assign(url: string): void {
    this.url = url;
  }

  reload(_forcedReload?: boolean): void {
  }

  replace(url: string): void {
    this.url = url;
  }

  toString(): string {
    return this.url;
  }
}
