"use client"

import { useState } from "react"
import RetroLandingPage from "@/components/retro-landing-page"
import DesktopView from "@/components/desktop-view"

export default function Home() {
  const [showDesktop, setShowDesktop] = useState(false)

  const handleEnterDesktop = () => {
    setShowDesktop(true)
  }

  const handleReturnToLanding = () => {
    setShowDesktop(false)
  }

  return (
    <main className="h-screen w-screen overflow-hidden">
      {!showDesktop ? (
        <RetroLandingPage onEnterDesktop={handleEnterDesktop} />
      ) : (
        <DesktopView onReturnToLanding={handleReturnToLanding} />
      )}
    </main>
  )
}

