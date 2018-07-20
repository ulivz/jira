export function nextTick() {
  return new Promise((resolve, reject) => {
    requestAnimationFrame(() => {
      resolve()
    })
  })
}
