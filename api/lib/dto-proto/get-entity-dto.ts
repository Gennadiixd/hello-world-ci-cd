export interface IGetEntityDTO {
  params: object;
}

export default class GetEntityDTO implements IGetEntityDTO {
  get params() {
    return Object.keys(this).reduce((accum, param) => {
      const currentParam = this[param];
      if (currentParam) accum[param] = currentParam;
      return accum;
    }, {});
  }
}
