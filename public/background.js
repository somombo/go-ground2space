const redirectUrl = 'https://goplay.space'

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {

    const segs = new URL(details.url)
      .pathname
      .split("/")
      .map(seg => seg.trim())
      .filter( seg => !!seg.length )
    
    // Next check if shareId exists e.g. shareId=="mysid123" 
    // in https://play.golang.org/p/mysid123
    const pIdx = segs.indexOf("p") 
    if (0 <= pIdx && pIdx <= segs.length - 2) {
      shareId = segs[pIdx + 1]
      return {
        redirectUrl: `${redirectUrl}#${shareId}` ,
      }
    }
    
    return {redirectUrl}
  },
  {
    urls: ['*://play.golang.org/*'],
    types: ['main_frame'],
  },
  ['blocking']
)
