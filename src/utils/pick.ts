export default function pick(object: object, fields: string[]): any {
  const p = {};
  fields.forEach((field: string) => {
    if (object.hasOwnProperty(field)) {
      p[field] = object[field];
    }
  });
  return p;
}
