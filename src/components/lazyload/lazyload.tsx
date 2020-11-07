import React, { memo, useRef, useEffect, useCallback } from 'react';
import classnames from 'classnames';
import domHepers from 'dom-helpers';

import { LazyLoadProps } from './typing';

const LazyLoad = (props: LazyLoadProps) => {
  const { prefixCls = 'k-lazyload', className, children, loading, container, ...others } = props;
  const count = useRef(0);
  const cache = useRef<any>([]);
  const elmContainer = useRef<any>(null);
  const loadingImgs = useRef<any>([]);
  const timer = useRef<any>(null);

  useEffect(() => {
    let elmImgs;
    if (container === window) {
      elmContainer.current = window;
      elmImgs = document.querySelectorAll('img');
    } else {
      if (typeof container === 'string') {
        elmContainer.current = document.querySelector(container);
      }
      elmImgs = elmContainer.current.querySelectorAll(`img`);
    }

    elmImgs.forEach(img => {
      if (!img.getAttribute('data-src')) {
        return;
      }
      if (!img.getAttribute('src') && loading) {
        img.setAttribute('src', loading);
      }
      cache.current.push(img);
      count.current++;
    });

    if (loading) {
      loadImageAsync(
        loading,
        ret => {
          load();
        },
        null,
      );
    } else {
      timer.current = window.setTimeout(() => {
        load();
      }, 300);
    }

    elmContainer.current.addEventListener('scroll', handleScroll);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      elmContainer.current.removeEventListener('scroll', handleScroll);
    };
  }, [loading, container]);

  const handleScroll = useCallback(() => {
    load();
  }, []);

  const load = () => {
    if (count.current <= 0) {
      return;
    }
    const { onSuccess, onError, error } = props;
    const containerHeight =
      elmContainer.current === window
        ? document.documentElement.offsetHeight
        : domHepers.height(elmContainer.current);

    const containerTop =
      elmContainer.current === window
        ? document.body.scrollTop || document.documentElement.scrollTop
        : domHepers.offset(elmContainer.current).top;

    cache.current.forEach((img: HTMLElement) => {
      const src = img.getAttribute('data-src');
      const imgTop = domHepers.offset(img).top;
      const imgHeight = domHepers.height(img);
      const range = [imgTop - containerTop, imgTop - containerTop + imgHeight];

      if (
        (range[0] >= 0 && range[0] < containerHeight) ||
        (range[1] > 0 && range[1] <= containerHeight)
      ) {
        loadImageAsync(
          src,
          ret => {
            img.setAttribute('src', ret.src);
            if (onSuccess) {
              onSuccess({
                ...ret,
                target: img,
              });
            }
            count.current--;
          },
          e => {
            if (error) {
              img.setAttribute('src', error);
            }
            if (onError) {
              onError({
                target: img,
                src,
              });
            }
            count.current--;
          },
        );
      }
    });
  };

  const loadImageAsync = (src, resolve?, reject?) => {
    if (loadingImgs.current[src]) {
      return;
    }
    loadingImgs.current[src] = true;
    const image = new Image();
    image.src = src;
    image.onload = () => {
      if (resolve) {
        resolve({
          naturalHeight: image.naturalHeight,
          naturalWidth: image.naturalWidth,
          src,
        });
      }
    };
    image.onerror = e => {
      if (reject) {
        reject(e);
      }
    };
  };

  const classString = classnames(prefixCls, className);

  return (
    <div className={classString} ref={elmContainer} {...others}>
      {children}
    </div>
  );
};

export default memo(LazyLoad);
