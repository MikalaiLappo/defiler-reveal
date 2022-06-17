function injectScript(filePath) {
  var th = document.getElementsByTagName('body')[0]
  var s = document.createElement('script')
  s.setAttribute('type', 'text/javascript')
  s.setAttribute('src', filePath)
  th.appendChild(s)
}
injectScript(chrome.runtime.getURL('/js/custom.js'))
