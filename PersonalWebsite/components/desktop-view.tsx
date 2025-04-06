"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import AppWindow from "@/components/app-window"
import Image from "next/image"
import type { JSX } from "react/jsx-runtime"
import PongGame from "@/components/pong-game"

interface DesktopViewProps {
  onReturnToLanding?: () => void
}

interface DraggableIcon {
  id: string
  name: string
  position: { x: number; y: number }
  icon: JSX.Element
  onClick: () => void
}

export default function DesktopView({ onReturnToLanding }: DesktopViewProps) {
  const [openWindows, setOpenWindows] = useState<string[]>([])
  const [resumeUrl, setResumeUrl] = useState<string | null>(null)
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const clickSoundRef = useRef<HTMLAudioElement>(null)
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 })
  const [hasDragged, setHasDragged] = useState(false)

  // State for draggable desktop icons with initial positions
  const [desktopIcons, setDesktopIcons] = useState<DraggableIcon[]>([
    {
      id: "beach",
      name: "Beach",
      position: { x: 1050, y: 50 },
      icon: (
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <linearGradient id="beach-gradient" gradientUnits="userSpaceOnUse" x1="256" y1="84" x2="256" y2="428">
            <stop offset="0" style={{ stopColor: "#60A5FA" }} />
            <stop offset="1" style={{ stopColor: "#3B82F6" }} />
          </linearGradient>
          <rect x="84" y="107" width="344" height="298" rx="42" ry="42" fill="url(#beach-gradient)" />
          {/* Beach Scene */}
          <rect x="104" y="127" width="304" height="150" fill="#87CEEB" /> {/* Sky */}
          <circle cx="150" cy="160" r="30" fill="#FFD700" /> {/* Sun */}
          <rect x="104" y="277" width="304" height="108" fill="#F0E68C" /> {/* Sand */}
          {/* Waves */}
          <path
            d="M104,277 Q134,260 164,277 Q194,294 224,277 Q254,260 284,277 Q314,294 344,277 Q374,260 408,277 L408,300 L104,300 Z"
            fill="#00BFFF"
          />
          {/* Palm Tree */}
          <rect x="350" y="230" width="10" height="47" fill="#8B4513" /> {/* Trunk */}
          <path d="M355,230 Q335,210 325,220 Q315,230 325,240 Q335,250 355,230" fill="#32CD32" /> {/* Leaves */}
          <path d="M355,230 Q375,210 385,220 Q395,230 385,240 Q375,250 355,230" fill="#32CD32" /> {/* Leaves */}
          {/* Beach Umbrella */}
          <rect x="150" y="290" width="4" height="30" fill="#A0522D" /> {/* Pole */}
          <path d="M152,290 Q122,270 152,250 Q182,270 152,290" fill="#FF6347" /> {/* Umbrella */}
        </svg>
      ),
      onClick: () => handleReturnToLanding(),
    },
    {
      id: "gallery",
      name: "Gallery",
      position: { x: 1050, y: 150 },
      icon: (
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <linearGradient
            id="photos-desktop-gradient"
            gradientUnits="userSpaceOnUse"
            x1="256"
            y1="84"
            x2="256"
            y2="428"
          >
            <stop offset="0" style={{ stopColor: "#FF453A" }} />
            <stop offset="1" style={{ stopColor: "#FF9F0A" }} />
          </linearGradient>
          <rect x="84" y="107" width="344" height="298" rx="42" ry="42" fill="url(#photos-desktop-gradient)" />
          <circle cx="180" cy="180" r="28" fill="white" />
          <path d="M84,321V363c0,23.2,18.8,42,42,42h260c23.2,0,42-18.8,42-42V321H84z" fill="rgba(0,0,0,0.2)" />
          <path d="M84,321l86-86l86,86H84z M256,235l86,86h86v-43l-86-86L256,235z" fill="white" />
        </svg>
      ),
      onClick: () => openWindow("gallery"),
    },
    {
      id: "projects",
      name: "My Projects",
      position: { x: 1050, y: 250 },
      icon: (
        <div className="w-full h-full rounded-lg overflow-hidden">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Mar%2026%2C%202025%2C%2012_44_23%20PM-Prc4AhFBMk0N4jH7UFqh30en1R8nOg.png"
            alt="Safari Browser"
            className="w-full h-full object-cover"
          />
        </div>
      ),
      onClick: () => openWindow("projects"),
    },
    {
      id: "mail",
      name: "Mail",
      position: { x: 1050, y: 350 },
      icon: (
        <div className="w-full h-full rounded-lg overflow-hidden">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Mar%2026%2C%202025%2C%2012_30_01%20PM-1EgX0Z7aQXA9l2aYRW9MvLbUoE7YnL.png"
            alt="Mail"
            className="w-full h-full object-cover"
          />
        </div>
      ),
      onClick: () => openWindow("contact"),
    },
    {
      id: "game",
      name: "Pong Game",
      position: { x: 1050, y: 450 },
      icon: (
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <linearGradient id="game-gradient" gradientUnits="userSpaceOnUse" x1="256" y1="84" x2="256" y2="428">
            <stop offset="0" style={{ stopColor: "#FF5252" }} />
            <stop offset="1" style={{ stopColor: "#FF9F0A" }} />
          </linearGradient>
          <rect x="84" y="107" width="344" height="298" rx="42" ry="42" fill="url(#game-gradient)" />
          <path
            d="M256,160 C200,160 180,190 180,230 C180,270 200,300 256,300 C312,300 332,270 332,230 C332,190 312,160 256,160 Z"
            fill="white"
            fillOpacity="0.9"
          />
          <rect x="210" y="210" width="20" height="40" rx="4" fill="black" />
          <rect x="200" y="220" width="40" height="20" rx="4" fill="black" />
          <circle cx="290" cy="210" r="10" fill="black" />
          <circle cx="290" cy="250" r="10" fill="black" />
        </svg>
      ),
      onClick: () => openWindow("game"),
    },
  ])

  const [draggingIcon, setDraggingIcon] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  // Update window size on mount and resize
  useEffect(() => {
    // Update window size on client side
    if (typeof window !== "undefined") {
      const updateWindowSize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      // Initial update
      updateWindowSize()

      // Update on resize
      window.addEventListener("resize", updateWindowSize)

      // Update icon positions based on window size
      setDesktopIcons((prevIcons) =>
        prevIcons.map((icon, index) => ({
          ...icon,
          position: {
            x: window.innerWidth - 150,
            y: 50 + index * 100,
          },
        })),
      )

      return () => window.removeEventListener("resize", updateWindowSize)
    }
  }, [])

  // Create a blob URL for the resume when the component mounts
  useEffect(() => {
    const resumeText = `Diego Fill 
Personal Website ▪ LinkedIn 
(602) 373-1118 ▪ christopherfill9@gmail.com 
 
PROJECTS                                                                                                                                                                              .
 
shipwiz.app 
Product Manager & Co-Founder                         Jan 2022 – Present              
● Served as Product Manager and Developer for shipwiz.app, spearheading the design and implementation of key iOS features 
(onboarding flows, shipping label templates) using Swift/SwiftUI. 
● Integrated product enhancements through data-driven A/B testing, user surveys, and monitoring Apple Store ad performance, 
resulting in a 25% increase in user retention and growing the user base to over 1,000 users in the first two years. 
● Implemented a comprehensive social media strategy, leveraging Facebook, Twitter, and LinkedIn, which grew the company's 
online presence by 50% and increased website traffic by 40% within six months. 
 
WORK EXPERIENCE                                                                                                                                                           .  
Oracle (NetSuite)   Santa Monica, CA 
Account Manager (NetSuite Accelerator) - Full-Time  June 2023 - Present 
● Implemented data-driven customer segmentation and targeting techniques, resulting in a 40% increase in customer 
engagement and a 10% reduction in customer churn rate.  
● Identified and leveraged upselling and cross-selling opportunities, driving a 25% increase in revenue streams and expanding 
product utilization among existing clients, resulting in an outstanding 90% client retention rate. 
● Spearheaded the implementation of a new technology infrastructure for clients, resulting in a 40% reduction in system 
downtime and a 20% increase in overall team productivity, saving 5 hours per week. 
● Offer strategic guidance to clients, leveraging profound product expertise to align Oracle NetSuite offerings. 
 
Business Development Representative (Mid-Market) - Full-Time     Jun 2022 – June 2023 
● Achieved Quota Attainment: 127%  - Q1, 111% - Q2, 113%  - Q3. 118% - Q4 FY23 
● Spearheaded the development and execution of targeted email marketing campaigns, resulting in a 30% increase in open rates 
and a 20% decrease in unsubscribe rates, driving higher customer engagement and retention. 
● Developed and executed data-driven marketing strategies, resulting in a 25% increase in lead generation and a 20% boost in 
conversion rates, driving $500k in potential ARR by converting 25+ leads into opportunities.  
● Nominated and selected amongst 800+ BDRs to represent NetSuite as a mentor and leader for prospective and new hire 
BDRs. 
                
LEADERSHIP EXPERIENCE                                                                                                                                              .              
Oracle Latino Alliance, Executive Board Member                                          
● Spearheaded inclusive initiatives by coordinating mentorship and networking events for new hires, developing career 
advancement pathways, and organizing a high-impact startup pitch competition with 150+ attendees that awarded a $30K 
grant to support local business growth. 
AngelPath Academy by Inicio Ventures, Venture Fellow                                           
● The Inicio Ventures AngelPath Fellowship is an intensive eight-week program designed to equip young professionals from 
across the country with a comprehensive understanding of venture capital and angel investing. Through a combination of 
expert-led workshops, case studies, and collaborative projects, participants gain exposure to the core principles of sourcing, 
evaluating, and supporting early-stage startups. 
 
EDUCATION                                                                                                                                                                           .  
ARIZONA STATE UNIVERSITY                                                                                                                         Aug 2018 - May 2022  
Bachelor of Business Administration                                                                                                                                                   
 
HARD SKILLS                                                                                                                                                                       .               
● Skills: Leadership, Public Speaking, Product Management, A/B Testing and Experimentation, Multi-thread Communication 
 
TECHNICAL SKILLS                                                                                                                                                           . 
● Skills: Google Ads, Google Analytics, Google Suite, Microsoft Office, Excel, Figma, Swift, SwiftUI, HTML, Python, 
Firebase, GitHub, Salesforce, Apple Ads, Notion, Tableau`

    const blob = new Blob([resumeText], { type: "text/plain" })
    setResumeUrl(URL.createObjectURL(blob))

    // Update the date and time every second
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    // Clean up the URL and timer when the component unmounts
    return () => {
      if (resumeUrl) {
        URL.revokeObjectURL(resumeUrl)
      }
      clearInterval(timer)
    }
  }, [])

  // Handle icon dragging
  const handleIconMouseDown = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    playClickSound()

    // Find the icon element
    const iconElement = e.currentTarget as HTMLElement
    const rect = iconElement.getBoundingClientRect()

    // Calculate the offset from the mouse position to the top-left corner of the icon
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })

    setDraggingIcon(id)
    setHasDragged(false) // Reset drag state on mouse down
  }

  // Handle mouse move for icon dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggingIcon) {
        e.preventDefault()
        setHasDragged(true) // Set to true when dragging occurs

        setDesktopIcons((icons) =>
          icons.map((icon) =>
            icon.id === draggingIcon
              ? {
                  ...icon,
                  position: {
                    x: e.clientX - dragOffset.x,
                    y: e.clientY - dragOffset.y,
                  },
                }
              : icon,
          ),
        )
      }
    }

    const handleMouseUp = () => {
      setDraggingIcon(null)
    }

    if (draggingIcon) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [draggingIcon, dragOffset])

  const playClickSound = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0
      clickSoundRef.current.play().catch((err) => console.log("Audio play error:", err))
    }
  }

  const openWindow = (appName: string) => {
    playClickSound()

    // If it's the mail icon, make sure we only open the contact window
    if (appName === "contact") {
      if (!openWindows.includes("contact")) {
        // Replace all open windows with just the contact window
        setOpenWindows(["contact"])
      } else {
        // If already open, just bring to front by moving to end of array
        setOpenWindows([...openWindows.filter((window) => window !== "contact"), "contact"])
      }
    } else if (!openWindows.includes(appName)) {
      // For desktop icons, replace all open windows with just the clicked app
      // For dock icons, add to existing windows
      const isDesktopIcon = desktopIcons.some(
        (icon) =>
          icon.id === appName ||
          (icon.id === "mail" && appName === "contact") ||
          (icon.id === "gallery" && appName === "gallery"),
      )

      if (isDesktopIcon) {
        setOpenWindows([appName])
      } else {
        // Add new window to the end of the array (will be on top)
        setOpenWindows([...openWindows, appName])
      }
    } else {
      // If window is already open, move it to the end of the array to bring it to front
      setOpenWindows([...openWindows.filter((window) => window !== appName), appName])
    }
  }

  const closeWindow = (appName: string) => {
    playClickSound()
    setOpenWindows(openWindows.filter((window) => window !== appName))
  }

  const handleReturnToLanding = () => {
    playClickSound()
    if (onReturnToLanding) {
      onReturnToLanding()
    }
  }

  // Format date as "Mon DD, YYYY"
  const formattedDate = currentDateTime.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })

  return (
    <div className="h-full w-full bg-gradient-to-b from-[#2c5364] via-[#203a43] to-[#0f2027] overflow-auto p-5">
      {/* Audio element for click sound */}
      <audio
        ref={clickSoundRef}
        src="https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"
        preload="auto"
      ></audio>

      {/* Menu Bar - With Pear Logo */}
      <div className="sticky top-0 z-[999] flex h-[30px] items-center bg-[rgba(50,50,50,0.8)] backdrop-blur-md px-4">
        <div className="relative group z-[999]">
          <button className="flex items-center justify-center mr-6 cursor-pointer z-[999]" aria-label="Menu">
            <div className="w-6 h-6 rounded-full overflow-hidden z-[999] relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Mar%2026%2C%202025%2C%2011_15_33%20AM-2wmX6X0hU5ZWLp4ryf56DAtFen1qll.png"
                alt="Pear Logo"
                className="w-full h-full object-contain z-[999]"
              />
            </div>
          </button>

          {/* Pear Menu Dropdown - Now appears on hover */}
          <div className="absolute top-full left-0 mt-1 w-40 bg-[rgba(50,50,50,0.95)] backdrop-blur-md rounded-md shadow-lg overflow-hidden z-[999] invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100">
            <div
              className="px-4 py-2 text-white hover:bg-[rgba(80,80,80,0.8)] cursor-pointer"
              onClick={() => openWindow("about")}
            >
              About
            </div>
            <div
              className="px-4 py-2 text-white hover:bg-[rgba(80,80,80,0.8)] cursor-pointer"
              onClick={() => {
                // Could implement file manager functionality here
                alert("File Manager would open here")
              }}
            >
              File Manager
            </div>
            <div
              className="px-4 py-2 text-white hover:bg-[rgba(80,80,80,0.8)] cursor-pointer"
              onClick={() => {
                if (onReturnToLanding) {
                  onReturnToLanding()
                }
              }}
            >
              Shut Down
            </div>
          </div>
        </div>
        <div className="ml-auto text-white text-sm">
          {formattedDate} {currentDateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>

      {/* Desktop Icons - Now draggable */}
      {desktopIcons.map((icon) => (
        <div
          key={icon.id}
          className={`absolute group flex flex-col items-center cursor-${draggingIcon === icon.id ? "grabbing" : "grab"} hover:scale-105 transition-transform`}
          style={{
            left: `${icon.position.x}px`,
            top: `${icon.position.y}px`,
            zIndex: draggingIcon === icon.id ? 10 : 1,
          }}
          onMouseDown={(e) => handleIconMouseDown(e, icon.id)}
          onClick={() => {
            if (!draggingIcon && !hasDragged) {
              icon.onClick()
            }
          }}
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 mb-2 shadow-lg">{icon.icon}</div>
          </div>
          {/* Removed the name text that was here */}
        </div>
      ))}

      {/* App Windows - Now draggable and centered */}
      {openWindows.includes("about") && (
        <AppWindow
          title="About Me"
          onClose={() => closeWindow("about")}
          initialPosition={{
            x: windowSize.width / 2 - 375,
            y: windowSize.height / 2 - 312.5,
          }}
        >
          <h2 className="mb-5 text-[#0080FF] drop-shadow-[0_0_5px_rgba(0,128,255,0.5)] text-2xl">
            Welcome to My Personal Website!
          </h2>
          <div className="flex mb-6">
            <div className="w-28 h-28 rounded-full mr-5 flex-shrink-0 overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DiegoFill%20%281%29.jpg-QssDuFGzF7tloluxyvLvepKOeiqS1T.jpeg"
                alt="Christopher Diego Fill"
                width={112}
                height={112}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#00ffd5]">Diego Fill</h3>
              <p className="mb-2.5 leading-relaxed text-base">Account Manager at Oracle (NetSuite)</p>
              <p className="mb-2.5 leading-relaxed text-sm">Santa Monica, California</p>
            </div>
          </div>
          <p className="mb-3 leading-relaxed text-base">
            I'm Diego Fill, an Account Manager at Oracle for the NetSuite Accelerator, based in sunny Santa Monica,
            California.
          </p>
          <p className="mb-3 leading-relaxed text-base">
            Thanks for stopping by my digital corner. I'm excited to share a slice of my journey in tech,
            entrepreneurship, and the ever-evolving startup ecosystem. Whether you're here to learn more about my
            projects or simply drop a line, feel free to get in touch!
          </p>

          <h3 className="mb-2 mt-5 text-[#00ffd5] text-lg">Looking for My Resume?</h3>
          <p className="mb-3 leading-relaxed text-base">
            <a
              href="https://docs.google.com/document/d/1VcJT_i79HLr3xcDEnKM9TXZ-xVg1702h/edit?usp=sharing&ouid=108130036513656333204&rtpof=true&sd=true"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#0080FF]"
            >
              Click here to download it!
            </a>
          </p>

          <h3 className="mb-2 mt-5 text-[#00ffd5] text-lg">About Me</h3>
          <p className="mb-3 leading-relaxed text-base">
            I've been fascinated by technology since I was a kid—building my first computer at 14 to play video games
            with friends and explore the world of software. Growing up in a family that ran a small autoglass business,
            my entrepreneurial spirit was sparked early. I even launched my first venture, Yum Yum Diego's Bubble Gum,
            at the age of 10, running a network of bubble gum machines around town!
          </p>
          <p className="mb-3 leading-relaxed text-base">
            Over the years, my interests have broadened from gaming into cybersecurity, game design, UI/UX, and even the
            exciting realm of AI—always with the aim of automating tasks and making life a bit easier. While I majored
            in Business Administration at Arizona State University, I was constantly surrounded by friends diving into
            computer science. This blend of business savvy and tech curiosity led me to co-found ShipWiz, an app that
            helps users find and print the most affordable shipping labels. As Product Manager and Developer, I've
            helped grow it to over 1,000 active users in just two years!
          </p>

          <h3 className="mb-2 mt-5 text-[#00ffd5] text-lg">Hobbies & Beyond</h3>
          <p className="mb-3 leading-relaxed text-base">
            When I'm not immersed in work or coding a new project, you'll likely find me out on a hike, training for my
            next half-iron man race, or recording my latest podcast episode. I love exploring new restaurants, hitting
            the gym, and paddle boarding at the marina. Whether it's socializing with the Venice Run Club, watching the
            newest episode of Invincible, or challenging friends (and sometimes getting my butt kicked) in video games
            and chess on Discord, I believe in balancing work with plenty of fun.
          </p>

          <h3 className="mb-2 mt-5 text-[#00ffd5] text-lg">More Links & Adventures</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <a
                href="https://www.youtube.com/@WODLPodcast"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#0080FF]"
              >
                Podcast
              </a>
            </li>
            <li>
              <a
                href="https://shipwiz.app"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#0080FF]"
              >
                ShipWiz
              </a>
            </li>
            <li>
              <a
                href="https://www.goodreads.com/user/show/183244577-christopher"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#0080FF]"
              >
                Goodreads
              </a>
            </li>
          </ul>

          <p className="mt-5 leading-relaxed text-base">
            Looking forward to connecting and sharing more of this journey with you!
          </p>
        </AppWindow>
      )}

      {openWindows.includes("projects") && (
        <AppWindow
          title="My Projects"
          onClose={() => closeWindow("projects")}
          initialPosition={{
            x: windowSize.width / 2 - 375,
            y: windowSize.height / 2 - 312.5,
          }}
        >
          <h2 className="mb-5 text-[#0080FF] drop-shadow-[0_0_5px_rgba(0,128,255,0.5)] text-2xl">Projects</h2>

          <h2 className="mb-4 text-[#0080FF] drop-shadow-[0_0_5px_rgba(0,128,255,0.5)] text-xl">Active Projects</h2>
          <h3 className="mb-2 mt-4 text-[#00ffd5] text-lg">shipwiz.app</h3>
          <p className="mb-3 leading-relaxed text-base">
            As Product Manager & Co-Founder (Jan 2022 - Present), I spearheaded the design and implementation of key iOS
            features using Swift/SwiftUI. I integrated product enhancements through data-driven A/B testing, user
            surveys, and monitoring Apple Store ad performance, resulting in a 25% increase in user retention and
            growing the user base to over 1,000 users in the first two years.
          </p>
          <h3 className="mb-2 mt-5 text-[#00ffd5] text-lg">Oracle NetSuite Implementation</h3>
          <p className="mb-3 leading-relaxed text-base">
            Spearheaded the implementation of a new technology infrastructure for clients, resulting in a 40% reduction
            in system downtime and a 20% increase in overall team productivity, saving 5 hours per week.
          </p>

          <h2 className="mb-4 mt-8 text-[#0080FF] drop-shadow-[0_0_5px_rgba(0,128,255,0.5)] text-xl">
            Deprecated Projects
          </h2>
          <h3 className="mb-2 mt-4 text-[#00ffd5] text-lg">Marketing Campaign Development</h3>
          <p className="mb-3 leading-relaxed text-base">
            Developed and executed data-driven marketing strategies, resulting in a 25% increase in lead generation and
            a 20% boost in conversion rates, driving $500k in potential ARR by converting 25+ leads into opportunities.
          </p>
          <h3 className="mb-2 mt-5 text-[#00ffd5] text-lg">Breast Cancer Awareness Event</h3>
          <p className="mb-3 leading-relaxed text-base">
            Coordinated the annual Breast Cancer Awareness Philanthropy Event attended by 200+ Arizona State students by
            collaborating with campus organizations, designing marketing content, and arranging event logistics to raise
            $10,400.
          </p>
        </AppWindow>
      )}

      {openWindows.includes("skills") && (
        <AppWindow
          title="My Skills"
          onClose={() => closeWindow("skills")}
          initialPosition={{
            x: windowSize.width / 2 - 375,
            y: windowSize.height / 2 - 312.5,
          }}
        >
          <h2 className="mb-5 text-[#0080FF] drop-shadow-[0_0_5px_rgba(0,128,255,0.5)] text-2xl">Skills & Expertise</h2>

          <h3 className="mb-2 mt-4 text-[#00ffd5] text-lg">Programming Languages</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-400"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 8v8"></path>
                <path d="M8 12h8"></path>
              </svg>
              <span>React</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
              <span>NextJS</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-500"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                <path d="M12 3a6 6 0 0 1-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9Z"></path>
                <circle cx="12" cy="12" r="1"></circle>
              </svg>
              <span>SwiftUI</span>
            </div>
          </div>

          <h3 className="mb-2 mt-5 text-[#00ffd5] text-lg">Databases</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-orange-500"
              >
                <path d="M15 12c0 1.657-2.239 3-5 3s-5-1.343-5-3"></path>
                <path d="M15 4c0 1.657-2.239 3-5 3s-5-1.343-5-3"></path>
                <path d="M15 20c0 1.657-2.239 3-5 3s-5-1.343-5-3"></path>
                <path d="M5 20V4"></path>
                <path d="M15 12V4"></path>
                <path d="M15 20v-8"></path>
              </svg>
              <span>Firebase</span>
            </div>
          </div>

          <h3 className="mb-2 mt-5 text-[#00ffd5] text-lg">Tools</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-500"
              >
                <path d="M20 7h-3a2 2 0 0 1-2-2V2"></path>
                <path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2H9Z"></path>
                <path d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8"></path>
              </svg>
              <span>Visual Studio Code</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-500"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
              <span>GitHub</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-400"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
              <span>Claude</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-500"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>ChatGPT</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-cyan-500"
              >
                <path d="m18 16-4-4 4-4"></path>
                <path d="m6 8 4 4-4 4"></path>
              </svg>
              <span>Cursor</span>
            </div>
          </div>

          <h3 className="mb-2 mt-5 text-[#00ffd5] text-lg">Product Management</h3>
          <p className="mb-3 leading-relaxed text-base">
            Leadership, Public Speaking, Product Management, A/B Testing and Experimentation, Multi-thread
            Communication, Project Management
          </p>

          <h3 className="mb-2 mt-5 text-[#00ffd5] text-lg">Account Management</h3>
          <p className="mb-3 leading-relaxed text-base">
            Strategic Client Relations, Upselling/Cross-selling, Customer Retention, Client Success
          </p>

          <h3 className="mb-2 mt-5 text-[#00ffd5] text-lg">Business Development</h3>
          <p className="mb-3 leading-relaxed text-base">
            Lead Generation, Sales Techniques, Market Research, Proposal Development
          </p>

          <h3 className="mb-2 mt-5 text-[#00ffd5] text-lg">Marketing</h3>
          <p className="mb-3 leading-relaxed text-base">
            Email Campaigns, Social Media Strategy, Data-driven Marketing, Content Creation
          </p>
        </AppWindow>
      )}

      {openWindows.includes("contact") && (
        <AppWindow
          title="Contact Me"
          onClose={() => closeWindow("contact")}
          initialPosition={{
            x: windowSize.width / 2 - 375,
            y: windowSize.height / 2 - 312.5,
          }}
        >
          <h2 className="mb-5 text-[#0080FF] drop-shadow-[0_0_5px_rgba(0,128,255,0.5)] text-2xl">Get In Touch</h2>
          <p className="mb-3 leading-relaxed text-base">
            Feel free to reach out if you have any questions or want to collaborate on a project!
          </p>
          <form
            className="mb-6"
            onSubmit={(e) => {
              e.preventDefault()
              alert("Thanks for your message! This is a demo form.")
            }}
          >
            <input
              type="text"
              className="mb-3 w-full border border-[#00ffd5] bg-[#333] p-3 text-white text-base"
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              className="mb-3 w-full border border-[#00ffd5] bg-[#333] p-3 text-white text-base"
              placeholder="Your Email"
              required
            />
            <input
              type="text"
              className="mb-3 w-full border border-[#00ffd5] bg-[#333] p-3 text-white text-base"
              placeholder="Subject"
            />
            <textarea
              className="mb-3 w-full border border-[#00ffd5] bg-[#333] p-3 text-white text-base"
              rows={5}
              placeholder="Your Message"
              required
            ></textarea>
            <button
              type="submit"
              className="cursor-pointer border-none bg-[#0080FF] p-3 px-5 font-bold text-white hover:bg-[#0066CC] text-base"
            >
              Send Message
            </button>
          </form>
          <h3 className="mb-2 mt-5 text-[#00ffd5] text-lg">Connect with me:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#0080FF]"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <a
                href="https://www.linkedin.com/in/diegofill/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#0080FF]"
              >
                linkedin.com/in/diegofill
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#0080FF]"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              <a
                href="https://www.goodreads.com/user/show/183244577-christopher"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#0080FF]"
              >
                Goodreads
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#0080FF]"
              >
                <path d="M12 2c2.8 0 5 2.2 5 5 0 2.2-1.5 4.1-3.5 4.7V14h2c.8 0 1.5.7 1.5 1.5v5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-5c0-.8.7-1.5 1.5-1.5h2v-2.3C8.5 11.1 7 9.2 7 7c0-2.8 2.2-5 5-5z"></path>
              </svg>
              <a
                href="https://www.youtube.com/@WODLPodcast"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#0080FF]"
              >
                Podcast
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#0080FF]"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <a
                href="https://github.com/deeg9"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#0080FF]"
              >
                github.com/deeg9
              </a>
            </div>
          </div>
        </AppWindow>
      )}

      {openWindows.includes("gallery") && (
        <AppWindow
          title="Gallery"
          onClose={() => closeWindow("gallery")}
          initialPosition={{
            x: windowSize.width / 2 - 375,
            y: windowSize.height / 2 - 312.5,
          }}
        >
          <h2 className="mb-5 text-[#0080FF] drop-shadow-[0_0_5px_rgba(0,128,255,0.5)] text-2xl">Photo Gallery</h2>

          <div className="mb-8">
            <h3 className="text-[#00ffd5] text-lg mb-3 border-b border-[#00ffd5] pb-1">Project Photos</h3>
            <p className="mb-3 text-base">Photos from my professional projects and work.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-video bg-[#444] rounded-lg flex items-center justify-center border-2 border-[#00ffd5] hover:shadow-[0_0_15px_rgba(0,255,213,0.5)] transition-shadow">
                <span className="text-center px-4">
                  ShipWiz App
                  <br />
                  Screenshot
                </span>
              </div>
              <div className="aspect-video bg-[#444] rounded-lg flex items-center justify-center border-2 border-[#00ffd5] hover:shadow-[0_0_15px_rgba(0,255,213,0.5)] transition-shadow">
                <span className="text-center px-4">
                  NetSuite
                  <br />
                  Implementation
                </span>
              </div>
              <div className="aspect-video bg-[#444] rounded-lg flex items-center justify-center border-2 border-[#00ffd5] hover:shadow-[0_0_15px_rgba(0,255,213,0.5)] transition-shadow">
                <span className="text-center px-4">
                  Marketing
                  <br />
                  Campaign
                </span>
              </div>
              <div className="aspect-video bg-[#444] rounded-lg flex items-center justify-center border-2 border-[#00ffd5] hover:shadow-[0_0_15px_rgba(0,255,213,0.5)] transition-shadow">
                <span className="text-center px-4">
                  Add Project
                  <br />
                  Photo
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-[#00ffd5] text-lg mb-3 border-b border-[#00ffd5] pb-1">Volunteer Work</h3>
            <p className="mb-3 text-base">Photos from my volunteer and philanthropy activities.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-video rounded-lg overflow-hidden border-2 border-[#00ffd5] hover:shadow-[0_0_15px_rgba(0,255,213,0.5)] transition-shadow">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VIfDEydyNDqE5qPNlW56sXE6fP0TTh.png"
                  alt="Baby2Baby Charity Event"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-video rounded-lg overflow-hidden border-2 border-[#00ffd5] hover:shadow-[0_0_15px_rgba(0,255,213,0.5)] transition-shadow">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-bj9XAcFDh3WWfihCRfft0qC7CK8eqR.png"
                  alt="Los Angeles Regional Fundraiser"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-video rounded-lg overflow-hidden border-2 border-[#00ffd5] hover:shadow-[0_0_15px_rgba(0,255,213,0.5)] transition-shadow">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UysADBpCL9QrbcKNVue3EytVV2vSjv.png"
                  alt="LEAP Volunteer Team"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-video rounded-lg overflow-hidden border-2 border-[#00ffd5] hover:shadow-[0_0_15px_rgba(0,255,213,0.5)] transition-shadow">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NXfc6UnRLnNWfkHgif8vLo2A4iK7eW.png"
                  alt="Volunteer Work Session"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[#00ffd5] text-lg mb-3 border-b border-[#00ffd5] pb-1">Travel Adventures</h3>
            <p className="mb-3 text-base">Photos from my travels and adventures around the world.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-video rounded-lg overflow-hidden border-2 border-[#00ffd5] hover:shadow-[0_0_15px_rgba(0,255,213,0.5)] transition-shadow">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YtCxuF2Lc5J0N2sOMQ0k1lc9HbsX9R.png"
                  alt="Ironman Triathlon"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="aspect-video rounded-lg overflow-hidden border-2 border-[#00ffd5] hover:shadow-[0_0_15px_rgba(0,255,213,0.5)] transition-shadow">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-oTS9SPH7Y2lvTfVPvLPPUkPJokwZlV.png"
                  alt="Winter Hiking Adventure"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="aspect-video rounded-lg overflow-hidden border-2 border-[#00ffd5] hover:shadow-[0_0_15px_rgba(0,255,213,0.5)] transition-shadow">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3pvWFDgvAUlrU3PUxbHA0MeZWCz8TA.png"
                  alt="Santa Monica Hiking"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="aspect-video rounded-lg overflow-hidden border-2 border-[#00ffd5] hover:shadow-[0_0_15px_rgba(0,255,213,0.5)] transition-shadow">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tjqnb6tZEOIf0W921yiQn5tOj9iuzK.png"
                  alt="Skydiving Adventure"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </AppWindow>
      )}

      {openWindows.includes("resume") && (
        <AppWindow
          title="Resume"
          onClose={() => closeWindow("resume")}
          initialPosition={{
            x: windowSize.width / 2 - 375,
            y: windowSize.height / 2 - 312.5,
          }}
        >
          <h2 className="mb-5 text-[#0080FF] drop-shadow-[0_0_5px_rgba(0,128,255,0.5)] text-2xl">
            Professional Resume
          </h2>

          <div className="mb-5 flex justify-between items-center">
            <h3 className="text-xl font-bold text-[#00ffd5]">Diego Fill</h3>
            <a
              href="https://docs.google.com/document/d/1VcJT_i79HLr3xcDEnKM9TXZ-xVg1702h/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0080FF] hover:bg-[#0066CC] text-white font-bold py-2 px-5 rounded transition-colors text-base"
            >
              Download PDF
            </a>
          </div>

          <p className="mb-3 text-base">
            <a href="mailto:christopherfill9@gmail.com" className="underline hover:text-[#0080FF]">
              christopherfill9@gmail.com
            </a>{" "}
            ▪{" "}
            <a
              href="https://www.linkedin.com/in/diegofill/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#0080FF]"
            >
              linkedin.com/in/diegofill
            </a>
          </p>

          <h3 className="mb-2 mt-6 text-[#00ffd5] border-b border-[#00ffd5] pb-1 text-lg">PROJECTS</h3>
          <div className="mb-5 mt-3">
            <div className="flex justify-between">
              <p className="font-bold text-base">shipwiz.app</p>
              <p className="text-base">Jan 2022 – Present</p>
            </div>
            <p className="italic text-base">Product Manager & Co-Founder</p>
            <ul className="list-disc pl-6 mt-2 space-y-1.5 text-base">
              <li>
                Served as Product Manager and Developer for shipwiz.app, spearheading the design and implementation of
                key iOS features (onboarding flows, shipping label templates) using Swift/SwiftUI.
              </li>
              <li>
                Integrated product enhancements through data-driven A/B testing, user surveys, and monitoring Apple
                Store ad performance, resulting in a 25% increase in user retention and growing the user base to over
                1,000 users in the first two years.
              </li>
              <li>
                Implemented a comprehensive social media strategy, leveraging Facebook, Twitter, and LinkedIn, which
                grew the company's online presence by 50% and increased website traffic by 40% within six months.
              </li>
            </ul>
          </div>

          <h3 className="mb-2 mt-6 text-[#00ffd5] border-b border-[#00ffd5] pb-1 text-lg">WORK EXPERIENCE</h3>
          <div className="mb-5 mt-3">
            <div className="flex justify-between">
              <p className="font-bold text-base">Oracle (NetSuite)</p>
              <p className="text-base">Santa Monica, CA</p>
            </div>
            <div className="flex justify-between text-base">
              <p className="italic">Account Manager (NetSuite Accelerator) - Full-Time</p>
              <p>June 2023 - Present</p>
            </div>
            <ul className="list-disc pl-6 mt-2 space-y-1.5 text-base">
              <li>
                Implemented data-driven customer segmentation and targeting techniques, resulting in a 40% increase in
                customer engagement and a 10% reduction in customer churn rate.
              </li>
              <li>
                Identified and leveraged upselling and cross-selling opportunities, driving a 25% increase in revenue
                streams and expanding product utilization among existing clients, resulting in an outstanding 90% client
                retention rate.
              </li>
              <li>
                Spearheaded the implementation of a new technology infrastructure for clients, resulting in a 40%
                reduction in system downtime and a 20% increase in overall team productivity, saving 5 hours per week.
              </li>
              <li>
                Offer strategic guidance to clients, leveraging profound product expertise to align Oracle NetSuite
                offerings.
              </li>
            </ul>
          </div>

          <div className="mb-5">
            <div className="flex justify-between text-base">
              <p className="italic">Business Development Representative (Mid-Market) - Full-Time</p>
              <p>Jun 2022 – June 2023</p>
            </div>
            <ul className="list-disc pl-6 mt-2 space-y-1.5 text-base">
              <li>Achieved Quota Attainment: 127% - Q1, 111% - Q2, 113% - Q3. 118% - Q4 FY23</li>
              <li>
                Spearheaded the development and execution of targeted email marketing campaigns, resulting in a 30%
                increase in open rates and a 20% decrease in unsubscribe rates, driving higher customer engagement and
                retention.
              </li>
              <li>
                Developed and executed data-driven marketing strategies, resulting in a 25% increase in lead generation
                and a 20% boost in conversion rates, driving $500k in potential ARR by converting 25+ leads into
                opportunities.
              </li>
              <li>
                Nominated and selected amongst 800+ BDRs to represent NetSuite as a mentor and leader for prospective
                and new hire BDRs.
              </li>
            </ul>
          </div>

          <h3 className="mb-2 mt-6 text-[#00ffd5] border-b border-[#00ffd5] pb-1 text-lg">LEADERSHIP EXPERIENCE</h3>
          <div className="mb-5 mt-3">
            <p className="font-bold text-base">Oracle Latino Alliance, Executive Board Member</p>
            <ul className="list-disc pl-6 mt-2 space-y-1.5 text-base">
              <li>
                Spearheaded inclusive initiatives by coordinating mentorship and networking events for new hires,
                developing career advancement pathways, and organizing a high-impact startup pitch competition with 150+
                attendees that awarded a $30K grant to support local business growth.
              </li>
            </ul>
          </div>

          <div className="mb-5">
            <p className="font-bold text-base">AngelPath Academy by Inicio Ventures, Venture Fellow</p>
            <ul className="list-disc pl-6 mt-2 space-y-1.5 text-base">
              <li>
                The Inicio Ventures AngelPath Fellowship is an intensive eight-week program designed to equip young
                professionals from across the country with a comprehensive understanding of venture capital and angel
                investing. Through a combination of expert-led workshops, case studies, and collaborative projects,
                participants gain exposure to the core principles of sourcing, evaluating, and supporting early-stage
                startups.
              </li>
            </ul>
          </div>

          <h3 className="mb-2 mt-6 text-[#00ffd5] border-b border-[#00ffd5] pb-1 text-lg">EDUCATION</h3>
          <div className="flex justify-between mt-3">
            <p className="font-bold text-base">ARIZONA STATE UNIVERSITY</p>
            <p className="text-base">Aug 2018 - May 2022</p>
          </div>
          <p className="text-base">Bachelor of Business Administration</p>

          <h3 className="mb-2 mt-6 text-[#00ffd5] border-b border-[#00ffd5] pb-1 text-lg">HARD SKILLS</h3>
          <ul className="list-disc pl-6 mt-3 space-y-1.5 text-base">
            <li>
              Skills: Leadership, Public Speaking, Product Management, A/B Testing and Experimentation, Multi-thread
              Communication
            </li>
          </ul>

          <h3 className="mb-2 mt-6 text-[#00ffd5] border-b border-[#00ffd5] pb-1 text-lg">TECHNICAL SKILLS</h3>
          <ul className="list-disc pl-6 mt-3 space-y-1.5 text-base">
            <li>
              Skills: Google Ads, Google Analytics, Google Suite, Microsoft Office, Excel, Figma, Swift, SwiftUI, HTML,
              Python, Firebase, GitHub, Salesforce, Apple Ads, Notion, Tableau
            </li>
          </ul>
        </AppWindow>
      )}

      {openWindows.includes("game") && (
        <AppWindow
          title="Super Pong"
          onClose={() => closeWindow("game")}
          initialPosition={{
            x: windowSize.width / 2 - 400,
            y: windowSize.height / 2 - 250,
          }}
          initialSize={{ width: 800, height: 500 }}
        >
          <div className="w-full h-full bg-black rounded-lg overflow-hidden">
            <PongGame />
          </div>
        </AppWindow>
      )}

      {/* macOS Dock with tooltips - Half size */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 h-24 bg-[rgba(255,255,255,0.2)] backdrop-blur-md rounded-2xl px-3 flex items-center space-x-4 z-50 shadow-lg">
        {/* Contacts (About Me) */}
        <div
          className="group relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 hover:scale-110 transition-transform cursor-pointer shadow-md"
          onClick={() => openWindow("about")}
        >
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <linearGradient id="contacts-gradient" gradientUnits="userSpaceOnUse" x1="256" y1="84" x2="256" y2="428">
              <stop offset="0" style={{ stopColor: "#30D158" }} />
              <stop offset="1" style={{ stopColor: "#17913C" }} />
            </linearGradient>
            <rect x="84" y="107" width="344" height="298" rx="42" ry="42" fill="url(#contacts-gradient)" />
            <circle cx="256" cy="186" r="50" fill="white" />
            <path d="M350,350H162c0-50,42-90.5,94-90.5S350,300,350,350z" fill="white" />
          </svg>
        </div>

        {/* Numbers (Skills) */}
        <div
          className="group relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 hover:scale-110 transition-transform cursor-pointer shadow-md"
          onClick={() => openWindow("skills")}
        >
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <linearGradient id="numbers-gradient" gradientUnits="userSpaceOnUse" x1="256" y1="84" x2="256" y2="428">
              <stop offset="0" style={{ stopColor: "#66D4FF" }} />
              <stop offset="1" style={{ stopColor: "#0080FF" }} />
            </linearGradient>
            <rect x="84" y="107" width="344" height="298" rx="42" ry="42" fill="url(#numbers-gradient)" />
            <rect x="124" y="167" width="80" height="40" rx="4" fill="white" opacity="0.9" />
            <rect x="124" y="217" width="80" height="40" rx="4" fill="white" opacity="0.7" />
            <rect x="124" y="267" width="80" height="40" rx="4" fill="white" opacity="0.5" />
            <rect x="214" y="167" width="80" height="40" rx="4" fill="white" opacity="0.7" />
            <rect x="214" y="217" width="80" height="40" rx="4" fill="white" opacity="0.9" />
            <rect x="214" y="267" width="80" height="40" rx="4" fill="white" opacity="0.7" />
            <rect x="304" y="167" width="80" height="40" rx="4" fill="white" opacity="0.5" />
            <rect x="304" y="217" width="80" height="40" rx="4" fill="white" opacity="0.7" />
            <rect x="304" y="267" width="80" height="40" rx="4" fill="white" opacity="0.9" />
          </svg>
        </div>

        {/* Projects */}
        <div
          className="group relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 hover:scale-110 transition-transform cursor-pointer shadow-md"
          onClick={() => openWindow("projects")}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Mar%2026%2C%202025%2C%2012_44_23%20PM-Prc4AhFBMk0N4jH7UFqh30en1R8nOg.png"
            alt="Safari Browser"
            className="w-full h-full object-cover"
          />
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs py-1 px-3 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            My Projects
          </div>
        </div>

        {/* Mail (Contact) */}
        <div
          className="group relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 hover:scale-110 transition-transform cursor-pointer shadow-md"
          onClick={() => openWindow("contact")}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Mar%2026%2C%202025%2C%2012_30_01%20PM-1EgX0Z7aQXA9l2aYRW9MvLbUoE7YnL.png"
            alt="Mail"
            className="w-full h-full object-cover"
          />
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs py-1 px-3 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Contact Me
          </div>
        </div>

        {/* Gallery (Photos) */}
        <div
          className="group relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 hover:scale-110 transition-transform cursor-pointer shadow-md"
          onClick={() => openWindow("gallery")}
        >
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <linearGradient id="photos-gradient" gradientUnits="userSpaceOnUse" x1="256" y1="84" x2="256" y2="428">
              <stop offset="0" style={{ stopColor: "#FF453A" }} />
              <stop offset="1" style={{ stopColor: "#FF9F0A" }} />
            </linearGradient>
            <rect x="84" y="107" width="344" height="298" rx="42" ry="42" fill="url(#photos-gradient)" />
            <circle cx="180" cy="180" r="28" fill="white" />
            <path d="M84,321V363c0,23.2,18.8,42,42,42h260c23.2,0,42-18.8,42-42V321H84z" fill="rgba(0,0,0,0.2)" />
            <path d="M84,321l86-86l86,86H84z M256,235l86,86h86v-43l-86-86L256,235z" fill="white" />
          </svg>
        </div>

        {/* Microsoft Word (Resume) */}
        <div
          className="group relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 hover:scale-110 transition-transform cursor-pointer shadow-md"
          onClick={() => openWindow("resume")}
        >
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <linearGradient id="file-gradient" gradientUnits="userSpaceOnUse" x1="256" y1="84" x2="256" y2="428">
              <stop offset="0" style={{ stopColor: "#4B91F7" }} />
              <stop offset="1" style={{ stopColor: "#367AF6" }} />
            </linearGradient>
            <path
              d="M128,84h170l86,86v258c0,11.046-8.954,20-20,20H128c-11.046,0-20-8.954-20-20V104C108,92.954,116.954,84,128,84z"
              fill="white"
            />
            <path
              d="M128,84h170l86,86v258c0,11.046-8.954,20-20,20H128c-11.046,0-20-8.954-20-20V104C108,92.954,116.954,84,128,84z"
              fill="url(#file-gradient)"
              fillOpacity="0.9"
            />
            <path d="M298,84v66c0,11.046,8.954,20,20,20h66L298,84z" fill="white" fillOpacity="0.5" />
            <rect x="148" y="235" width="216" height="12" rx="6" fill="white" />
            <rect x="148" y="275" width="216" height="12" rx="6" fill="white" />
            <rect x="148" y="315" width="216" height="12" rx="6" fill="white" />
            <rect x="148" y="355" width="140" height="12" rx="6" fill="white" />
          </svg>
        </div>
      </div>
    </div>
  )
}

