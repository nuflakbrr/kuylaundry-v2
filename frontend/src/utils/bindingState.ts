export const bindingState = (e: any, setState: any, nameIn: string) => {
  const { name, value } = e.target;
  if (name === nameIn) {
    setState(value);
  } else if (name === nameIn) {
    setState(value);
  }
};
