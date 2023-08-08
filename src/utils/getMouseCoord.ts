export const getMouseCoord = (e) => {
  return {
    x: e.pageX || e.clientX + document.body.scrollLeft - document.body.clientLeft,
    y: e.pageY || e.clientY + document.body.scrollTop - document.body.clientTop,
  };
};
