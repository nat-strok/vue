const classBuilder = (el, binding) => {
  let colorNumber = binding.value.id + 1;
  let classPattern = binding.value.classPattern;
  el.classList.add(classPattern + '-' + colorNumber);
}

export default classBuilder