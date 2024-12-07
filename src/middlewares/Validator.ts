export function requiredBody(form:{[key:string]:any}, required:string[]){
  return required.every(x=>form[x] != undefined);
}