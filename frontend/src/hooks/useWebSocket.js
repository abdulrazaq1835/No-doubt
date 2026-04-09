import { useEffect, useRef, useState } from "react"

const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:5001"

const useWebSocket = () => {
  const [results, setResults] = useState([])
  const [connected, setConnected] = useState(false)
  const ws = useRef(null)

  useEffect(() => {
    ws.current = new WebSocket(WS_URL)

    ws.current.onopen = () => {
      setConnected(true)
      console.log("WebSocket connected")
    }

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === "search_result") {
        setResults(data.data)
      }
    }

    ws.current.onclose = () => {
      setConnected(false)
      console.log("WebSocket disconnected")
    }

    return () => {
      ws.current.close()
    }
  }, [])

  const search = (query) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ query }))
    }
  }

  return { results, connected, search }
}

export default useWebSocket