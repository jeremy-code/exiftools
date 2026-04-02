type Titlecase<T extends string> = Capitalize<Lowercase<T>>;

const titlecase = <T extends string>(str: T) => {
  return (str.charAt(0).toUpperCase() +
    str.slice(1).toLowerCase()) as Titlecase<T>;
};

export { titlecase, type Titlecase };
