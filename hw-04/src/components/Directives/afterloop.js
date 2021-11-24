const afterLoop = (el, binding) => {
  const arr = binding.value.arr;
  const i = binding.value.index;
  const style = binding.value.border;
  if (arr.length === i + 1) {
    setTimeout(() => {
      const parent = el.closest('.list-wrapper');
      binding.value.func(parent, style);
    }, 0);
  }
};

export default afterLoop