
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
