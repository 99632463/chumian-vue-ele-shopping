export default {
  bind(el) {
    el.style.background = "#ccc"
    el.style.color = '#ccc'
  },
  update(el, binding) {
    el.style.background = ""
    el.style.color = ''
    
    for (let key in binding.modifiers) {
      switch (key) {
        case "img":
          el.src = binding.value;
          break;
        case "text":
          el.innerHTML = binding.value;
          break;
        default:
          break;
      }
    }
  }
}