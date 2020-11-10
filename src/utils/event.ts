export const eventOmitHandler = (event: any) => {
  if (event.stopPropagation) {
    event.stopPropagation();
  }
  if (event.preventDefault) {
    event.preventDefault();
  }
};
