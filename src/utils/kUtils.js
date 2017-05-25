import { PropTypes } from 'react';
import invariant from 'invariant';
import styleMaps from './styleMaps';

//处理样式前缀
export function prefix(props = {}, variant) {
    invariant(
        (props.kClass || '').trim(),
        'A `kClass` prop is required for this component'
    );
    return props.kClass + (variant ? `-${variant}` : '');
}

export function kClass(defaultClass, Component){
    let propTypes = Component.propTypes || (Component.propTypes = {});
    let defaultProps = Component.defaultProps || (Component.defaultProps = {});
    propTypes.kClass = PropTypes.string;
    defaultProps.kClass = defaultClass;
    return Component;
}

export const kStyles = (styles, defaultStyle, Component) => {
    if (typeof defaultStyle !== 'string') {
        Component = defaultStyle;
        defaultStyle = undefined;
    }

    let existing = Component.STYLES || [];
    let propTypes = Component.propTypes || {};

    styles.forEach(style => {
        if (existing.indexOf(style) === -1) {
            existing.push(style);
        }
    });

    //设置样式属性，唯一
    let propType = PropTypes.oneOf(existing);

    Component.STYLES = propType._values = existing;

    Component.propTypes = {
        ...propTypes,
        kStyle: propType
    };

    if (defaultStyle !== undefined) {
        let defaultProps = Component.defaultProps || (Component.defaultProps = {});
        defaultProps.kStyle = defaultStyle;
    }
    return Component;
};

export const kSize = (sizes, defaultSize, Component) => {

    if (typeof defaultSize !== 'string') {
        Component = defaultSize;
        defaultSize = undefined;
    }
    let existing = Component.SIZES || [];
    let propTypes = Component.propTypes || {};
    sizes.forEach(size => {
        if (existing.indexOf(size) === -1) {
            existing.push(size);
        }
    });
    
    const values = [];
    existing.forEach(size => {
        const mappedSize = styleMaps.SIZES[size];
        if (mappedSize && mappedSize !== size) {
            values.push(mappedSize);
        }
        values.push(size);
    });

    let propType = PropTypes.oneOf(values);

    propType._values = values;

    Component.SIZES = existing;

    Component.propTypes = {
        ...propTypes,
        kSize: propType
    };

    if (defaultSize !== undefined) {
        let defaultProps = Component.defaultProps || (Component.defaultProps = {});
        defaultProps.kSize = defaultSize;
    }

    return Component;

};


export function getClassSet(props) {
    const classes = {
        [prefix(props)]: true,
    };
    if (props.kStyle) {
        classes[prefix(props, props.kStyle)] = true;
    }
    if (props.kSize) {
        const kSize =styleMaps.SIZES[props.kSize] || props.kSize;
        classes[prefix(props, kSize)] = true;
    }
    return classes;
}