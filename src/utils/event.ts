export const eventOmitHandler = (event: any) => {
  if (event.stopPropagation) {
    event.stopPropagation();
  }
  if (event.preventDefault) {
    event.preventDefault();
  }
  if (event.nativeEvent) {
    event.nativeEvent.stopImmediatePropagation();
  }
};
