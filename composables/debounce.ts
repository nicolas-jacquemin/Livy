export const useDebounce = () => ({
  debounce: (fn: Function, wait: number) => {
    let timer: any;
    return function (this: any, ...args: any) {
      if (timer) {
        clearTimeout(timer);
      }
      const context = this;
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, wait);
    };
  }
});