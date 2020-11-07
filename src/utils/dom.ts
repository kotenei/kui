import domHelpers from 'dom-helpers';

export default {
  ...domHelpers,
  outerWidth(node: HTMLElement) {
    const width = domHelpers.width(node);
    let marginLeft: any = domHelpers.style(node, 'margin-left');
    let marginRight: any = domHelpers.style(node, 'margin-right');

    marginLeft = marginLeft ? parseFloat(marginLeft) : 0;
    marginRight = marginRight ? parseFloat(marginRight) : 0;

    return width + marginLeft + marginRight;
  },
  outerHeight(node: HTMLElement) {
    const height = domHelpers.height(node);
    let marginTop: any = domHelpers.style(node, 'margin-top');
    let marginBottom: any = domHelpers.style(node, 'margin-bottom');

    marginTop = marginTop ? parseFloat(marginTop) : 0;
    marginBottom = marginBottom ? parseFloat(marginBottom) : 0;

    return height + marginTop + marginBottom;
  },
};
