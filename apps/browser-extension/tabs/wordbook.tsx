import { useEffect } from "react"

import { useStorage } from "@plasmohq/storage/hook"


function TabManage() {
  const [favorites] = useStorage<string[]>("favorites", [])

  useEffect(() => {
  }, [])

  return (
    <div>
      favorites:
      {JSON.stringify(favorites)}
    </div>
  )
}

export default TabManage
