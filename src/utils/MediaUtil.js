const MOBILE_DESKTOP_BREAKPOINT = 830

export function isMobile() {
  return document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT
}

let lastDevice = 'D'

export function deviceChange(handler) {
  window.addEventListener('resize', () => {
    const nextDevice = isMobile() ? 'M' : 'D'
    if (nextDevice !== lastDevice) {
      handler(nextDevice)
    }
    lastDevice = nextDevice
  }, false)
}
