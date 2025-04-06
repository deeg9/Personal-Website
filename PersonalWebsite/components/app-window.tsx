"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import type { ReactNode } from "react"

// Define animation keyframes
const animationKeyframes = `
@keyframes windowOpen {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-window-open {
  animation: windowOpen 0.3s ease-out forwards;
}
`

// Add resizing state to the component props and state
interface AppWindowProps {
  title: string
  children: ReactNode
  onClose: () => void
  initialPosition?: { x: number; y: number }
  initialSize?: { width: number; height: number }
}

export default function AppWindow({ title, children, onClose, initialPosition, initialSize }: AppWindowProps) {
  const [position, setPosition] = useState(initialPosition || { x: 50, y: 50 })
  const [size, setSize] = useState(initialSize || { width: 750, height: 625 })
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<string | null>(null)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [previousSize, setPreviousSize] = useState(initialSize || { width: 750, height: 625 })
  const [previousPosition, setPreviousPosition] = useState(initialPosition || { x: 50, y: 50 })
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  // Inject animation styles
  useEffect(() => {
    const styleTag = document.createElement("style")
    styleTag.innerHTML = animationKeyframes
    document.head.appendChild(styleTag)

    return () => {
      document.head.removeChild(styleTag)
    }
  }, [])

  // Handle mouse down on the title bar
  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setIsDragging(true)
    }
  }

  // Add resize handlers
  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    setResizeDirection(direction)
  }

  // Update the useEffect to handle both dragging and resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        })
      } else if (isResizing && resizeDirection) {
        e.preventDefault()

        const minWidth = 400
        const minHeight = 300

        if (resizeDirection.includes("e")) {
          const newWidth = Math.max(minWidth, e.clientX - position.x)
          setSize((prev) => ({ ...prev, width: newWidth }))
        }

        if (resizeDirection.includes("s")) {
          const newHeight = Math.max(minHeight, e.clientY - position.y)
          setSize((prev) => ({ ...prev, height: newHeight }))
        }

        if (resizeDirection.includes("w")) {
          const newWidth = Math.max(minWidth, size.width + (position.x - e.clientX))
          if (newWidth !== size.width) {
            setPosition((prev) => ({ ...prev, x: e.clientX }))
            setSize((prev) => ({ ...prev, width: newWidth }))
          }
        }

        if (resizeDirection.includes("n")) {
          const newHeight = Math.max(minHeight, size.height + (position.y - e.clientY))
          if (newHeight !== size.height) {
            setPosition((prev) => ({ ...prev, y: e.clientY }))
            setSize((prev) => ({ ...prev, height: newHeight }))
          }
        }
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
      setResizeDirection(null)
    }

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, isResizing, dragOffset, position, size, resizeDirection])

  // Bring window to front when clicked
  const handleWindowClick = () => {
    if (windowRef.current) {
      const windows = document.querySelectorAll(".app-window")
      windows.forEach((window) => {
        ;(window as HTMLElement).style.zIndex = "50"
      })
      windowRef.current.style.zIndex = "51"
    }
  }

  // Handle minimize (yellow button)
  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClose()
  }

  // Handle maximize (green button)
  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!isMaximized) {
      // Save current position and size before maximizing
      setPreviousPosition({ x: position.x, y: position.y })
      setPreviousSize({ width: size.width, height: size.height })

      // Set to maximum size (with some padding)
      setPosition({ x: 20, y: 50 })
      setSize({
        width: window.innerWidth - 40,
        height: window.innerHeight - 100,
      })
    } else {
      // Restore previous position and size
      setPosition(previousPosition)
      setSize(previousSize)
    }

    setIsMaximized(!isMaximized)
  }

  // Update the return JSX to include resize handles
  return (
    <div
      ref={windowRef}
      className="app-window absolute z-50 flex flex-col overflow-hidden rounded-lg border-2 border-[#0080FF] bg-[#333333] shadow-[0_0_30px_rgba(0,128,255,0.6)] transition-all duration-300 animate-window-open"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        cursor: isDragging ? "grabbing" : "default",
      }}
      onClick={handleWindowClick}
    >
      <div
        className="flex items-center bg-[#0080FF] px-4 py-3 font-bold text-white drop-shadow-md cursor-grab relative"
        onMouseDown={handleMouseDown}
      >
        <div className="flex space-x-1.5 z-10">
          <div
            className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
          ></div>
          <div
            className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer hover:bg-yellow-600 transition-colors"
            onClick={handleMinimize}
          ></div>
          <div
            className="w-3 h-3 rounded-full bg-green-500 cursor-pointer hover:bg-green-600 transition-colors"
            onClick={handleMaximize}
          ></div>
        </div>
        <div className="absolute left-0 right-0 text-center text-lg">{title}</div>
      </div>
      <div className="flex-1 overflow-auto p-6 text-[#00ffd5]">{children}</div>

      {/* Resize handles */}
      <div
        className="absolute top-0 left-0 w-3 h-3 cursor-nwse-resize"
        onMouseDown={(e) => handleResizeStart(e, "nw")}
      />
      <div
        className="absolute top-0 right-0 w-3 h-3 cursor-nesw-resize"
        onMouseDown={(e) => handleResizeStart(e, "ne")}
      />
      <div
        className="absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize"
        onMouseDown={(e) => handleResizeStart(e, "sw")}
      />
      <div
        className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize"
        onMouseDown={(e) => handleResizeStart(e, "se")}
      />
      <div
        className="absolute top-0 left-3 right-3 h-1 cursor-ns-resize"
        onMouseDown={(e) => handleResizeStart(e, "n")}
      />
      <div
        className="absolute bottom-0 left-3 right-3 h-1 cursor-ns-resize"
        onMouseDown={(e) => handleResizeStart(e, "s")}
      />
      <div
        className="absolute left-0 top-3 bottom-3 w-1 cursor-ew-resize"
        onMouseDown={(e) => handleResizeStart(e, "w")}
      />
      <div
        className="absolute right-0 top-3 bottom-3 w-1 cursor-ew-resize"
        onMouseDown={(e) => handleResizeStart(e, "e")}
      />
    </div>
  )
}

