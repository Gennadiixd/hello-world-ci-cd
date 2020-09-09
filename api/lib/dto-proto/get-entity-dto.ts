export default class GetEntityDTO {
  get params() {
    return Object.keys(this).reduce((accum, param) => {
      const currentParam = this[param];
      if (currentParam) accum[param] = currentParam;
      return accum;
    }, {});
  }
}
