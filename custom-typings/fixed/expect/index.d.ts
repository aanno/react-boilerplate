declare module "expect" {
  type IExpectFactory = (actual:any) => Expect.Expectation;
  const expect: IExpect & IExpectFactory;

  interface IExpect {
    createSpy(fn?: Function, restore?: Function): Expect.Spy;
    spyOn(object: Object, methodName: string): Expect.Spy;
    isSpy(object: any): Boolean;
    restoreSpies(): void;
    assert(condition: any, messageFormat: string, ...extraArgs: Array<any>): void;
    extend(extension: Expect.Extension): void;
  }

  export = expect;
}
