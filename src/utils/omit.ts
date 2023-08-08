export default function omit(object: object, fields: string[]) {
  const shallow = { ...object };
  fields.forEach((field: string) => {
    delete shallow[field];
  });
  return shallow;
}
