export default {
  inserted(el, binding) {
    const user = JSON.parse(localStorage.getItem('user') || {})
    if(!user.super){
      const ruleNames = user.ruleNames || []
      !ruleNames.includes(binding.value) && el.parentNode.removeChild(el)
    }
  }
}