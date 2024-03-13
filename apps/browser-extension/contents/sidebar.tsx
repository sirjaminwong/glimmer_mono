import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"

import Sidebar from "@/modules/sidebar/sidebar.container"

const styleElement = document.createElement("style")

const styleCache = createCache({
  key: "gpt-copilot-sidebar-emotion",
  prepend: true,
  container: styleElement
})

export const getStyle = () => styleElement

function PlasmoOverlay() {
  return (
    <CacheProvider value={styleCache}>
      <Sidebar />
    </CacheProvider>
  )
}

export default PlasmoOverlay

export const config = {
  matches: ["http://*/*", "https://*/*", "<all_urls>"]
}
