import { useKeyPress } from "ahooks"
import contentStyleText from "data-text:./popover.module.less"
// ui components lib styles
import uiStyleText from "data-text:@repo/ui/styles.css"
import globalStyleText from "data-text:~assets/style.less"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { useCallback, useEffect, useRef, useState } from "react"

import useTextSelection from "hooks/use-text-selection"
import { useClickAway } from "@/hooks/use-click-away"

import { WordSummary } from "./components/word-summary-panel/word-summary-panel"
import * as style from "./popover.module.less"
const queryClient = new QueryClient()

function PopoverContainer() {
  const [mode, setMode] = useState<"icon" | "panel">("icon")

  const pinRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [textSelection, clearSelection] = useTextSelection()

  useEffect(() => {
    if (textSelection) {
      setIsOpen(true)
      setMode("icon")
    }
  }, [textSelection])

  const handleClosePanel = useCallback(() => {
    setIsOpen(false)
    clearSelection()
    setMode("icon")
  }, [clearSelection])

  useKeyPress("esc", () => {
    handleClosePanel()
  })

  useClickAway(pinRef, handleClosePanel)

  const handleClickIcon = useCallback(() => {
    console.log(pinRef.current)
    if (!textSelection) return
    setMode("panel")
  }, [textSelection])

  if (!isOpen || !textSelection) {
    return null
  }

  const position = {
    top: `${textSelection.rect.top + 30}px`,
    left: `${textSelection.rect.left}px`
  }

  return (
    <QueryClientProvider client={queryClient}>
      {mode === "icon" ? (
        <div
          ref={pinRef}
          className={style.pin}
          onClick={handleClickIcon}
          style={{
            ...position
          }}
        />
      ) : (
        <WordSummary
          onClose={handleClosePanel}
          word={textSelection.text}
          position={position}
        />
      )}
    </QueryClientProvider>
  )
}

export default PopoverContainer

export const config = {
  matches: ["http://*/*", "https://*/*", "<all_urls>"]
}

export const appendStyle = (style: HTMLStyleElement) => () => {
  style.textContent =
    globalStyleText +
    uiStyleText.replace(":root", ":host") +
    contentStyleText +
    style.textContent
  return style
}
