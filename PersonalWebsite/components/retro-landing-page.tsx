"use client"

import { useEffect, useState, useRef } from "react"

interface RetroLandingPageProps {
  onEnterDesktop: () => void
}

export default function RetroLandingPage({ onEnterDesktop }: RetroLandingPageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const clickSoundRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // First set the component as loaded
    setIsLoaded(true)

    // Then start animations after a short delay
    const animationTimer = setTimeout(() => {
      setShowAnimation(true)
    }, 500)

    // Update the date and time every second
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    return () => {
      clearTimeout(animationTimer)
      clearInterval(timer)
    }
  }, [])

  // Format date as "Mon DD, YYYY"
  const formattedDate = currentDateTime.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })

  // Simplify the className logic to avoid template literal issues
  const baseClasses = "relative h-full w-full transition-opacity duration-700"
  const opacityClass = isLoaded ? "opacity-100" : "opacity-0"

  const handleClick = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0
      clickSoundRef.current.play().catch((err) => console.log("Audio play error:", err))
    }
    onEnterDesktop()
  }

  return (
    <div className={`${baseClasses} ${opacityClass}`}>
      {/* Audio element for click sound */}
      <audio
        ref={clickSoundRef}
        src="https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"
        preload="auto"
      ></audio>

      <div
        className={`absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-400 to-blue-500 ${showAnimation ? "overflow-visible" : "overflow-hidden"}`}
      >
        {/* Sand layer */}
        <div className="absolute bottom-0 h-[40%] w-full bg-amber-100 overflow-hidden">
          <div
            className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-black text-center w-full text-2xl"
            style={{ textShadow: "1px 1px 3px rgba(255,255,255,0.3)" }}
          >
            Click the screen to enter
          </div>

          {/* Sand Castle - positioned on the left side towards the bottom */}
          <div className="absolute bottom-[15%] left-[5%] w-[120px] h-[120px] z-10">
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 511.995 511.995"
              xmlSpace="preserve"
            >
              <path
                style={{ fill: "#DA4453" }}
                d="M394.676,96.003h-0.016h-85.325c-5.891,0-10.672-4.781-10.672-10.671V42.661 c0-5.891,4.781-10.656,10.672-10.656h85.325c3.703,0,7.141,1.906,9.078,5.047c1.938,3.156,2.125,7.078,0.469,10.375l-8.281,16.577 l8.031,16.078c0.891,1.547,1.391,3.344,1.391,5.25C405.348,91.222,400.566,96.003,394.676,96.003z"
              ></path>
              <path
                style={{ fill: "#ED5564" }}
                d="M330.663,10.663h-74.678c-5.875,0-10.656,4.78-10.656,10.671v42.67 c0,5.891,4.781,10.656,10.656,10.656h74.678c5.891,0,10.671-4.766,10.671-10.656v-42.67 C341.334,15.443,336.554,10.663,330.663,10.663z"
              ></path>
              <path
                style={{ fill: "#434A54" }}
                d="M255.985,170.657c-5.875,0-10.656-4.766-10.656-10.656V10.663c0-5.891,4.781-10.656,10.656-10.656 c5.906,0,10.672,4.766,10.672,10.656v149.338C266.657,165.892,261.892,170.657,255.985,170.657z"
              ></path>
              <path
                style={{ fill: "#F6BB42" }}
                d="M319.991,128.002h-31.999c-5.875,0-10.656,4.766-10.656,10.656v10.671h-42.678v-10.671 c0-5.891-4.766-10.656-10.671-10.656h-32c-5.875,0-10.656,4.766-10.656,10.656v138.667c0,5.89,4.781,10.671,10.656,10.671h128.004 c5.906,0,10.672-4.781,10.672-10.671V138.658C330.663,132.768,325.897,128.002,319.991,128.002z"
              ></path>
              <path
                style={{ opacity: 0.2, fill: "#FFFFFF" }}
                d="M319.991,128.002h-31.999 c-5.875,0-10.656,4.766-10.656,10.656v10.671h-42.678v-10.671c0-5.891-4.766-10.656-10.671-10.656h-32 c-5.875,0-10.656,4.766-10.656,10.656v21.343c0-5.906,4.781-10.672,10.656-10.672h31.999c5.906,0,10.671,4.766,10.671,10.672v10.656 h42.678v-10.656c0-5.906,4.781-10.672,10.656-10.672h31.999c5.906,0,10.672,4.766,10.672,10.672v-21.343 C330.663,132.768,325.897,128.002,319.991,128.002z"
              ></path>
              <path
                style={{ fill: "#FFCE54" }}
                d="M394.66,192h-42.67c-5.875,0-10.656,4.766-10.656,10.656v31.998h-42.671v-31.998 c0-5.891-4.766-10.656-10.671-10.656h-64.006c-5.875,0-10.656,4.766-10.656,10.656v31.998h-42.67v-31.998 c0-2.828-1.125-5.547-3.125-7.547S162.832,192,159.988,192h-42.655c-5.89,0-10.671,4.766-10.671,10.656v255.991 c0,5.89,4.781,10.671,10.671,10.671H394.66c5.891,0,10.672-4.781,10.672-10.671V202.656C405.332,196.766,400.551,192,394.66,192z"
              ></path>
              <g style={{ opacity: 0.2 }}>
                <path
                  style={{ fill: "#FFFFFF" }}
                  d="M223.986,213.327h64.006c5.905,0,10.671,4.766,10.671,10.671v-21.342 c0-5.891-4.766-10.656-10.671-10.656h-64.006c-5.875,0-10.656,4.766-10.656,10.656v21.342 C213.33,218.093,218.111,213.327,223.986,213.327z"
                ></path>
                <rect x="298.667" y="234.658" style={{ fill: "#FFFFFF" }} width="42.671" height="21.344"></rect>
                <rect x="170.657" y="234.658" style={{ fill: "#FFFFFF" }} width="42.67" height="21.344"></rect>
                <path
                  style={{ fill: "#FFFFFF" }}
                  d="M117.333,213.327h42.655c2.844,0,5.547,1.125,7.547,3.125s3.125,4.703,3.125,7.53v-21.326 c0-2.828-1.125-5.547-3.125-7.547S162.832,192,159.988,192h-42.655c-5.89,0-10.671,4.766-10.671,10.656v21.342 C106.663,218.093,111.443,213.327,117.333,213.327z"
                ></path>
                <path
                  style={{ fill: "#FFFFFF" }}
                  d="M394.66,192h-42.67c-5.875,0-10.656,4.766-10.656,10.656v21.342c0-5.905,4.781-10.671,10.656-10.671 h42.67c5.891,0,10.672,4.766,10.672,10.671v-21.342C405.332,196.766,400.551,192,394.66,192z"
                ></path>
              </g>
              <path
                style={{ fill: "#434A54" }}
                d="M255.985,298.652c-23.562,0-42.655,19.109-42.655,42.671v92.668h85.333v-92.668 C298.663,317.762,279.57,298.652,255.985,298.652z"
              ></path>
              <path
                style={{ fill: "#FFCE54" }}
                d="M510.578,496.005c-0.688-1.188-16.984-29.062-56.826-56.779 c-23.141-16.094-49.576-28.906-78.576-38.077c-36.013-11.39-76.122-17.155-119.19-17.155c-43.062,0-83.153,5.766-119.168,17.155 c-28.999,9.171-55.436,21.983-78.575,38.077C18.4,466.944,2.104,494.818,1.417,496.005c-1.891,3.297-1.891,7.359,0.016,10.656 s5.438,5.328,9.234,5.328H501.33c3.812,0,7.328-2.031,9.234-5.328S512.469,499.302,510.578,496.005z"
              ></path>
              <path
                style={{ opacity: 0.2, fill: "#FFFFFF" }}
                d="M5.744,510.77c7.203-10.047,23.702-30.172,52.498-50.218 c23.14-16.093,49.577-28.905,78.575-38.077c36.015-11.391,76.106-17.155,119.168-17.155c43.068,0,83.178,5.765,119.19,17.155 c29,9.172,55.436,21.984,78.576,38.077c28.796,20.046,45.295,40.171,52.482,50.218c1.781-0.922,3.297-2.328,4.328-4.109 c1.906-3.297,1.906-7.359,0.016-10.656c-0.688-1.188-16.984-29.062-56.826-56.779c-23.141-16.094-49.576-28.906-78.576-38.077 c-36.013-11.39-76.122-17.155-119.19-17.155c-43.062,0-83.153,5.766-119.168,17.155c-28.999,9.171-55.436,21.983-78.575,38.077 c-39.843,27.718-56.139,55.592-56.826,56.779c-1.891,3.297-1.891,7.359,0.016,10.656C2.463,508.442,3.978,509.849,5.744,510.77z"
              ></path>
              <g>
                <path
                  style={{ fill: "#F6BB42" }}
                  d="M124.88,461.771c4.156,4.172,4.156,10.922,0,15.094c-4.171,4.155-10.921,4.155-15.093,0 c-4.171-4.172-4.171-10.922,0-15.094C113.959,457.616,120.708,457.616,124.88,461.771z"
                ></path>
                <path
                  style={{ fill: "#F6BB42" }}
                  d="M167.535,419.101c4.172,4.172,4.172,10.922,0,15.094c-4.156,4.156-10.921,4.156-15.078,0 c-4.172-4.172-4.172-10.922,0-15.094C156.614,414.944,163.379,414.944,167.535,419.101z"
                ></path>
                <path
                  style={{ fill: "#F6BB42" }}
                  d="M210.205,461.771c4.156,4.172,4.156,10.922,0,15.094c-4.171,4.155-10.921,4.155-15.093,0 c-4.156-4.172-4.156-10.922,0-15.094C199.284,457.616,206.034,457.616,210.205,461.771z"
                ></path>
                <path
                  style={{ fill: "#F6BB42" }}
                  d="M252.876,419.101c4.156,4.172,4.156,10.922,0,15.094c-4.172,4.156-10.922,4.156-15.093,0 c-4.156-4.172-4.156-10.922,0-15.094C241.954,414.944,248.704,414.944,252.876,419.101z"
                ></path>
                <path
                  style={{ fill: "#F6BB42" }}
                  d="M295.538,461.771c4.172,4.172,4.172,10.922,0,15.094c-4.156,4.155-10.921,4.155-15.077,0 c-4.172-4.172-4.172-10.922,0-15.094C284.617,457.616,291.382,457.616,295.538,461.771z"
                ></path>
                <path
                  style={{ fill: "#F6BB42" }}
                  d="M338.21,419.101c4.155,4.172,4.155,10.922,0,15.094c-4.172,4.156-10.922,4.156-15.094,0 c-4.156-4.172-4.156-10.922,0-15.094C327.288,414.944,334.038,414.944,338.21,419.101z"
                ></path>
                <path
                  style={{ fill: "#F6BB42" }}
                  d="M380.863,461.771c4.172,4.172,4.172,10.922,0,15.094c-4.156,4.155-10.906,4.155-15.078,0 c-4.172-4.172-4.172-10.922,0-15.094C369.957,457.616,376.707,457.616,380.863,461.771z"
                ></path>
              </g>
            </svg>
          </div>

          {/* Volleyball Net */}
          <div className="absolute top-[15%] right-[1%] h-[240px] w-[240px] z-10 -translate-y-1/2">
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 60 60"
              xmlSpace="preserve"
              fill="#000000"
            >
              <g id="SVGRepo_iconCarrier">
                <rect x="6" y="53.5" style={{ fill: "#fef3c7" }} width="48" height="6"></rect>
                <circle style={{ fill: "#FBD490" }} cx="12" cy="55.5" r="1"></circle>
                <circle style={{ fill: "#FBD490" }} cx="18" cy="55.5" r="1"></circle>
                <circle style={{ fill: "#FBD490" }} cx="15" cy="58.5" r="1"></circle>
                <circle style={{ fill: "#FBD490" }} cx="21" cy="58.5" r="1"></circle>
                <circle style={{ fill: "#FBD490" }} cx="24" cy="55.5" r="1"></circle>
                <circle style={{ fill: "#FBD490" }} cx="30" cy="55.5" r="1"></circle>
                <circle style={{ fill: "#FBD490" }} cx="27" cy="58.5" r="1"></circle>
                <circle style={{ fill: "#FBD490" }} cx="33" cy="58.5" r="1"></circle>
                <circle style={{ fill: "#FBD490" }} cx="36" cy="55.5" r="1"></circle>
                <circle style={{ fill: "#FBD490" }} cx="42" cy="55.5" r="1"></circle>
                <circle style={{ fill: "#FBD490" }} cx="39" cy="58.5" r="1"></circle>
                <circle style={{ fill: "#FBD490" }} cx="45" cy="58.5" r="1"></circle>
                <circle style={{ fill: "#FBD490" }} cx="48" cy="55.5" r="1"></circle>
                <g>
                  <path
                    style={{ fill: "#61a6fb" }}
                    d="M19,14.5c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S21.757,14.5,19,14.5z"
                  ></path>
                  <path
                    style={{ fill: "#60a5fa" }}
                    d="M19,15.5c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S22.309,15.5,19,15.5z M19,5.5 c-2.206,0-4,1.794-4,4s1.794,4,4,4s4-1.794,4-4S21.206,5.5,19,5.5z"
                  ></path>
                </g>
                <path
                  style={{ fill: "#60a5fa" }}
                  d="M19,18.5c-0.553,0-1-0.447-1-1v-3c0-0.553,0.447-1,1-1s1,0.447,1,1v3C20,18.053,19.553,18.5,19,18.5z"
                ></path>
                <path
                  style={{ fill: "#60a5fa" }}
                  d="M19,5.5c-0.553,0-1-0.447-1-1v-3c0-0.553,0.447-1,1-1s1,0.447,1,1v3C20,5.053,19.553,5.5,19,5.5z"
                ></path>
                <path
                  style={{ fill: "#60a5fa" }}
                  d="M27,10.5h-3c-0.553,0-1-0.447-1-1s0.447-1,1-1h3c0.553,0,1,0.447,1,1S27.553,10.5,27,10.5z"
                ></path>
                <path
                  style={{ fill: "#60a5fa" }}
                  d="M14,10.5h-3c-0.553,0-1-0.447-1-1s0.447-1,1-1h3c0.553,0,1,0.447,1,1S14.553,10.5,14,10.5z"
                ></path>
                <path
                  style={{ fill: "#60a5fa" }}
                  d="M24.657,16.157c-0.256,0-0.512-0.098-0.707-0.293l-2.122-2.122c-0.391-0.391-0.391-1.023,0-1.414 c0.391-0.391,1.023-0.391,1.414,0l2.122,2.122c0.391,0.391,0.391,1.023,0,1.414C25.169,16.06,24.913,16.157,24.657,16.157z"
                ></path>
                <path
                  style={{ fill: "#60a5fa" }}
                  d="M15.465,6.965c-0.256,0-0.512-0.098-0.707-0.293L12.636,4.55c-0.391-0.391-0.391-1.023,0-1.414 s1.023-0.391,1.414,0l2.122,2.122c0.391,0.391,0.391,1.023,0,1.414C15.977,6.867,15.721,6.965,15.465,6.965z"
                ></path>
                <path
                  style={{ fill: "#60a5fa" }}
                  d="M22.535,6.965c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l2.122-2.122 c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-2.122,2.122C23.047,6.867,22.791,6.965,22.535,6.965z"
                ></path>
                <path
                  style={{ fill: "#60a5fa" }}
                  d="M13.343,16.157c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l2.122-2.122 c0.391-0.391,1.023-0.391,1.414,0c0.391,0.391,0.391,1.023,0,1.414l-2.122,2.122C13.854,16.06,13.599,16.157,13.343,16.157z"
                ></path>
                <rect
                  x="1"
                  y="54.5"
                  style={{ fill: "#fef3c7", stroke: "#95A5A5", strokeWidth: "2", strokeMiterlimit: "10" }}
                  width="4"
                  height="4"
                ></rect>
                <rect
                  x="6"
                  y="23.5"
                  style={{ fill: "none", stroke: "#BDC3C7", strokeWidth: "2", strokeMiterlimit: "10" }}
                  width="48"
                  height="16"
                ></rect>
                <rect
                  x="6"
                  y="23.5"
                  style={{ fill: "none", stroke: "#BDC3C7", strokeWidth: "2", strokeMiterlimit: "10" }}
                  width="8"
                  height="8"
                ></rect>
                <rect
                  x="6"
                  y="31.5"
                  style={{ fill: "none", stroke: "#BDC3C7", strokeWidth: "2", strokeMiterlimit: "10" }}
                  width="8"
                  height="8"
                ></rect>
                <rect
                  x="14"
                  y="23.5"
                  style={{ fill: "none", stroke: "#BDC3C7", strokeWidth: "2", strokeMiterlimit: "10" }}
                  width="8"
                  height="8"
                ></rect>
                <rect
                  x="14"
                  y="31.5"
                  style={{ fill: "none", stroke: "#BDC3C7", strokeWidth: "2", strokeMiterlimit: "10" }}
                  width="8"
                  height="8"
                ></rect>
                <rect
                  x="22"
                  y="23.5"
                  style={{ fill: "none", stroke: "#BDC3C7", strokeWidth: "2", strokeMiterlimit: "10" }}
                  width="8"
                  height="8"
                ></rect>
                <rect
                  x="22"
                  y="31.5"
                  style={{ fill: "none", stroke: "#BDC3C7", strokeWidth: "2", strokeMiterlimit: "10" }}
                  width="8"
                  height="8"
                ></rect>
                <rect
                  x="30"
                  y="23.5"
                  style={{ fill: "none", stroke: "#BDC3C7", strokeWidth: "2", strokeMiterlimit: "10" }}
                  width="8"
                  height="8"
                ></rect>
                <rect
                  x="30"
                  y="31.5"
                  style={{ fill: "none", stroke: "#BDC3C7", strokeWidth: "2", strokeMiterlimit: "10" }}
                  width="8"
                  height="8"
                ></rect>
                <rect
                  x="38"
                  y="23.5"
                  style={{ fill: "none", stroke: "#BDC3C7", strokeWidth: "2", strokeMiterlimit: "10" }}
                  width="8"
                  height="8"
                ></rect>
                <rect
                  x="38"
                  y="31.5"
                  style={{ fill: "none", stroke: "#BDC3C7", strokeWidth: "2", strokeMiterlimit: "10" }}
                  width="8"
                  height="8"
                ></rect>
                <rect
                  x="46"
                  y="23.5"
                  style={{ fill: "none", stroke: "#BDC3C7", strokeWidth: "2", strokeMiterlimit: "10" }}
                  width="8"
                  height="8"
                ></rect>
                <rect
                  x="46"
                  y="31.5"
                  style={{ fill: "none", stroke: "#BDC3C7", strokeWidth: "2", strokeMiterlimit: "10" }}
                  width="8"
                  height="8"
                ></rect>
                <line
                  style={{ fill: "none", stroke: "#95A5A5", strokeWidth: "2", strokeMiterlimit: "10" }}
                  x1="3"
                  y1="54.5"
                  x2="3"
                  y2="19.5"
                ></line>
                <rect
                  x="55"
                  y="54.5"
                  style={{ fill: "#fef3c7", stroke: "#95A5A5", strokeWidth: "2", strokeMiterlimit: "10" }}
                  width="4"
                  height="4"
                ></rect>
                <line
                  style={{ fill: "none", stroke: "#95A5A5", strokeWidth: "2", strokeMiterlimit: "10" }}
                  x1="57"
                  y1="54.5"
                  x2="57"
                  y2="19.5"
                ></line>
                <line
                  style={{ fill: "none", stroke: "#BDC3C7", strokeWidth: "2", strokeMiterlimit: "10" }}
                  x1="3"
                  y1="25.5"
                  x2="6"
                  y2="25.5"
                ></line>
                <line
                  style={{ fill: "none", stroke: "#BDC3C7", strokeWidth: "2", strokeMiterlimit: "10" }}
                  x1="3"
                  y1="37.5"
                  x2="6"
                  y2="37.5"
                ></line>
                <line
                  style={{ fill: "none", stroke: "#BDC3C7", strokeWidth: "2", strokeMiterlimit: "10" }}
                  x1="54"
                  y1="25.5"
                  x2="57"
                  y2="25.5"
                ></line>
                <line
                  style={{ fill: "none", stroke: "#BDC3C7", strokeWidth: "2", strokeMiterlimit: "10" }}
                  x1="54"
                  y1="37.5"
                  x2="57"
                  y2="37.5"
                ></line>
              </g>
            </svg>
          </div>

          {/* Beach pebbles/shells - small black dots */}
          <div className="absolute bottom-[5%] left-[15%] w-2 h-2 rounded-full bg-black opacity-30"></div>
          <div className="absolute bottom  w-2 h-2 rounded-full bg-black opacity-30"></div>
          <div className="absolute bottom-[25%] left-[22%] w-1.5 h-1.5 rounded-full bg-black opacity-25"></div>
          <div className="absolute bottom-[18%] left-[35%] w-2 h-2 rounded-full bg-black opacity-30"></div>
          <div className="absolute bottom-[8%] left-[42%] w-1 h-1 rounded-full bg-black opacity-20"></div>
          <div className="absolute bottom-[22%] left-[55%] w-1.5 h-1.5 rounded-full bg-black opacity-25"></div>
          <div className="absolute bottom-[12%] left-[65%] w-2 h-2 rounded-full bg-black opacity-30"></div>
          <div className="absolute bottom-[28%] left-[75%] w-1 h-1 rounded-full bg-black opacity-20"></div>
          <div className="absolute bottom-[15%] left-[85%] w-1.5 h-1.5 rounded-full bg-black opacity-25"></div>
          <div className="absolute bottom-[7%] left-[28%] w-1 h-1 rounded-full bg-black opacity-20"></div>
          <div className="absolute bottom-[30%] left-[48%] w-1.5 h-1.5 rounded-full bg-black opacity-25"></div>
          <div className="absolute bottom-[20%] left-[68%] w-1 h-1 rounded-full bg-black opacity-20"></div>
          <div className="absolute bottom-[10%] left-[78%] w-2 h-2 rounded-full bg-black opacity-30"></div>
        </div>

        {/* Sun */}
        <div className="absolute right-[15%] top-[15%] h-24 w-24 rounded-full bg-yellow-400 shadow-[0_0_50px_rgba(255,215,0,0.9)] animate-pulse-sun"></div>

        {/* Clouds - now with gentle back and forth animation */}
        <div
          className="absolute left-[8%] top-[12%] h-40 w-64 animate-float-cloud-gentle z-[5]"
          style={{ animationDelay: "0s" }}
        >
          <div className="absolute inset-0">
            <svg
              fill="#ffffff"
              viewBox="0 0 46.094 46.093"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
            >
              <g>
                <path d="M33.798,30.849h-2.614c-0.817-2.922-3.488-5.04-6.657-5.04c-1.089,0-2.12,0.25-3.036,0.698 c-0.609-4.01-4.073-7.085-8.254-7.085c-4.611,0-8.349,3.744-8.349,8.354c0,1.084,0.207,2.112,0.582,3.075H5.092 C2.288,30.851,0,33.113,0,35.917v0.756c0,2.608,2.131,4.729,4.739,4.729h29.185c2.846,0,5.158-2.312,5.158-5.157v-0.127 C39.082,33.203,36.713,30.849,33.798,30.849z"></path>
                <path d="M42.756,11.912h-1.65c-0.519-1.846-2.205-3.185-4.207-3.185c-0.688,0-1.34,0.158-1.918,0.441 c-0.385-2.534-2.574-4.477-5.215-4.477c-2.914,0-5.274,2.365-5.274,5.278c0,0.685,0.131,1.334,0.368,1.942H24.62 c-1.771,0-3.217,1.429-3.217,3.201v0.478c0,1.649,1.346,2.988,2.994,2.988h18.438c1.799,0,3.259-1.461,3.259-3.258v-0.08 C46.094,13.399,44.598,11.912,42.756,11.912z"></path>
              </g>
            </svg>
          </div>
        </div>
        <div
          className="absolute left-[25%] top-[4%] h-36 w-56 animate-float-cloud-gentle"
          style={{ animationDelay: "2s" }}
        >
          <div className="absolute inset-0">
            <svg
              fill="#ffffff"
              viewBox="0 0 46.094 46.093"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
            >
              <g>
                <path d="M33.798,30.849h-2.614c-0.817-2.922-3.488-5.04-6.657-5.04c-1.089,0-2.12,0.25-3.036,0.698 c-0.609-4.01-4.073-7.085-8.254-7.085c-4.611,0-8.349,3.744-8.349,8.354c0,1.084,0.207,2.112,0.582,3.075H5.092 C2.288,30.851,0,33.113,0,35.917v0.756c0,2.608,2.131,4.729,4.739,4.729h29.185c2.846,0,5.158-2.312,5.158-5.157v-0.127 C39.082,33.203,36.713,30.849,33.798,30.849z"></path>
                <path d="M42.756,11.912h-1.65c-0.519-1.846-2.205-3.185-4.207-3.185c-0.688,0-1.34,0.158-1.918,0.441 c-0.385-2.534-2.574-4.477-5.215-4.477c-2.914,0-5.274,2.365-5.274,5.278c0,0.685,0.131,1.334,0.368,1.942H24.62 c-1.771,0-3.217,1.429-3.217,3.201v0.478c0,1.649,1.346,2.988,2.994,2.988h18.438c1.799,0,3.259-1.461,3.259-3.258v-0.08 C46.094,13.399,44.598,11.912,42.756,11.912z"></path>
              </g>
            </svg>
          </div>
        </div>
        <div
          className="absolute left-[55%] top-[18%] h-44 w-72 animate-float-cloud-gentle"
          style={{ animationDelay: "1.5s" }}
        >
          <div className="absolute inset-0">
            <svg
              fill="#ffffff"
              viewBox="0 0 46.094 46.093"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
            >
              <g>
                <path d="M33.798,30.849h-2.614c-0.817-2.922-3.488-5.04-6.657-5.04c-1.089,0-2.12,0.25-3.036,0.698 c-0.609-4.01-4.073-7.085-8.254-7.085c-4.611,0-8.349,3.744-8.349,8.354c0,1.084,0.207,2.112,0.582,3.075H5.092 C2.288,30.851,0,33.113,0,35.917v0.756c0,2.608,2.131,4.729,4.739,4.729h29.185c2.846,0,5.158-2.312,5.158-5.157v-0.127 C39.082,33.203,36.713,30.849,33.798,30.849z"></path>
                <path d="M42.756,11.912h-1.65c-0.519-1.846-2.205-3.185-4.207-3.185c-0.688,0-1.34,0.158-1.918,0.441 c-0.385-2.534-2.574-4.477-5.215-4.477c-2.914,0-5.274,2.365-5.274,5.278c0,0.685,0.131,1.334,0.368,1.942H24.62 c-1.771,0-3.217,1.429-3.217,3.201v0.478c0,1.649,1.346,2.988,2.994,2.988h18.438c1.799,0,3.259-1.461,3.259-3.258v-0.08 C46.094,13.399,44.598,11.912,42.756,11.912z"></path>
              </g>
            </svg>
          </div>
        </div>
        <div
          className="absolute left-[78%] top-[6%] h-32 w-52 animate-float-cloud-gentle"
          style={{ animationDelay: "3s" }}
        >
          <div className="absolute inset-0">
            <svg
              fill="#ffffff"
              viewBox="0 0 46.094 46.093"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
            >
              <g>
                <path d="M33.798,30.849h-2.614c-0.817-2.922-3.488-5.04-6.657-5.04c-1.089,0-2.12,0.25-3.036,0.698 c-0.609-4.01-4.073-7.085-8.254-7.085c-4.611,0-8.349,3.744-8.349,8.354c0,1.084,0.207,2.112,0.582,3.075H5.092 C2.288,30.851,0,33.113,0,35.917v0.756c0,2.608,2.131,4.729,4.739,4.729h29.185c2.846,0,5.158-2.312,5.158-5.157v-0.127 C39.082,33.203,36.713,30.849,33.798,30.849z"></path>
                <path d="M42.756,11.912h-1.65c-0.519-1.846-2.205-3.185-4.207-3.185c-0.688,0-1.34,0.158-1.918,0.441 c-0.385-2.534-2.574-4.477-5.215-4.477c-2.914,0-5.274,2.365-5.274,5.278c0,0.685,0.131,1.334,0.368,1.942H24.62 c-1.771,0-3.217,1.429-3.217,3.201v0.478c0,1.649,1.346,2.988,2.994,2.988h18.438c1.799,0,3.259-1.461,3.259-3.258v-0.08 C46.094,13.399,44.598,11.912,42.756,11.912z"></path>
              </g>
            </svg>
          </div>
        </div>

        {/* Airplane */}
        <div className="fixed top-10 left-[-100px] z-20 animate-fly-across w-32 h-24">
          <svg viewBox="0 0 511.998 511.998" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
            <path
              style={{ fill: "#E94E1B" }}
              d="M239.899,200.071h-40.014v-16.483c0-8.576,6.952-15.529,15.529-15.529h24.486V200.071z"
            ></path>
            <rect x="191.884" y="200.069" style={{ fill: "#F9B233" }} width="48.013" height="32.012"></rect>
            <polygon
              style={{ fill: "#86CBED" }}
              points="359.944,232.083 239.899,232.083 239.899,168.059 327.932,168.059"
            ></polygon>
            <g>
              <rect x="439.969" y="232.081" style={{ fill: "#575756" }} width="40.012" height="104.036"></rect>
              <circle style={{ fill: "#575756" }} cx="79.837" cy="368.129" r="16.006"></circle>
              <circle style={{ fill: "#575756" }} cx="319.932" cy="400.141" r="16.006"></circle>
            </g>
            <polygon
              style={{ fill: "#E94E1B" }}
              points="439.973,264.095 7.813,264.095 7.813,144.051 39.825,144.051 87.842,230.904 439.973,230.904"
            ></polygon>
            <polygon
              style={{ fill: "#F9B233" }}
              points="7.813,280.101 183.878,336.121 439.973,336.121 439.973,272.099 423.967,264.095 15.815,264.095 7.813,272.099"
            ></polygon>
            <path
              style={{ fill: "#E94E1B" }}
              d="M343.938,352.127H199.884c-8.84,0-16.006-7.166-16.006-16.006l0,0c0-8.84,7.166-16.006,16.006-16.006 h144.054c8.84,0,16.006,7.166,16.006,16.006l0,0C359.944,344.961,352.777,352.127,343.938,352.127z"
            ></path>
            <g>
              <rect x="23.819" y="224.268" style={{ fill: "#1D1D1B" }} width="40.012" height="15.626"></rect>
              <rect x="495.992" y="272.291" style={{ fill: "#1D1D1B" }} width="16.006" height="15.626"></rect>
              <rect x="496.179" y="160.057" style={{ fill: "#1D1D1B" }} width="15.626" height="104.036"></rect>
              <rect x="496.179" y="296.97" style={{ fill: "#1D1D1B" }} width="15.626" height="104.036"></rect>
              <rect x="151.861" y="224.268" style={{ fill: "#1D1D1B" }} width="224.083" height="15.626"></rect>
              <rect x="280.107" y="88.033" style={{ fill: "#1D1D1B" }} width="15.626" height="16.006"></rect>
              <path
                style={{ fill: "#1D1D1B" }}
                d="M375.95,224.27c-13.343,0-24.199-10.856-24.199-24.199c0-21.959-17.865-39.825-39.825-39.825H295.73 v-48.207h-15.626v48.207h-56.211c-21.959,0-39.825,17.865-39.825,39.825c0,13.343-10.856,24.199-24.199,24.199H92.481 l-48.018-88.032H0V285.94l121.567,35.917l-30.396,25.33c-3.372-1.831-7.232-2.872-11.331-2.872 c-13.134,0-23.819,10.685-23.819,23.819c0,13.134,10.685,23.819,23.819,23.819c13.133,0,23.819-10.685,23.819-23.819 c0-3.337-0.693-6.514-1.937-9.399l37.864-31.554l36.559,10.802c0.953,12.266,11.233,21.958,23.74,21.958h112.231v17.709 c-9.307,3.242-16.006,12.099-16.006,22.496c0,13.133,10.685,23.819,23.819,23.819c13.133,0,23.819-10.685,23.819-23.819 c0-10.397-6.699-19.254-16.006-22.496v-17.709h16.196c10.397,0,19.254-6.699,22.496-16.006h121.367V224.27H375.95z M79.84,376.326 c-4.518,0-8.193-3.675-8.193-8.193c0-4.518,3.675-8.193,8.193-8.193c4.517,0,8.193,3.675,8.193,8.193 C88.032,372.651,84.357,376.326,79.84,376.326z M319.928,408.338c-4.518,0-8.193-3.675-8.193-8.193 c0-4.518,3.675-8.193,8.193-8.193c4.517,0,8.193,3.675,8.193,8.193C328.122,404.663,324.446,408.338,319.928,408.338z M223.893,175.872h8.193v16.386h-31.09C204.253,182.738,213.283,175.872,223.893,175.872z M35.187,151.864l48.018,88.032h76.665 c19.285,0,35.409-13.781,39.051-32.012h33.166v24.199h15.626v-56.211h64.214c13.343,0,24.199,10.856,24.199,24.199 c0,21.959,17.865,39.825,39.825,39.825h56.211v16.386H15.626V151.864H35.187z M343.938,344.315H199.884 c-4.518,0-8.193-3.675-8.193-8.193s3.675-8.193,8.193-8.193h144.054c4.517,0,8.193,3.675,8.193,8.193 C352.13,340.639,348.455,344.315,343.938,344.315z M366.434,328.31h-24.389v-88.414h24.389 V328.31z"
              ></path>
            </g>
          </svg>
        </div>

        {/* Computer / Desktop Preview - Removed blue glow */}
        <div className="absolute left-1/2 top-1/2 z-10 flex w-[90%] max-w-[600px] -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <div className="relative w-full rounded-t-lg bg-gray-200 pb-3">
            <div className="relative m-6 aspect-[4/3] overflow-hidden rounded bg-black">
              <div
                className="flex h-full w-full cursor-pointer items-center justify-center bg-gradient-to-b from-[#2c5364] via-[#203a43] to-[#0f2027] relative"
                onClick={handleClick}
              >
                {/* macOS Desktop Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#2c5364] via-[#203a43] to-[#0f2027]"></div>

                {/* macOS Menu Bar */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-[rgba(50,50,50,0.8)] backdrop-blur-md flex items-center px-3 z-10">
                  <div className="text-white text-xs font-medium">File</div>
                  <div className="ml-auto text-white text-xs">
                    {formattedDate} {currentDateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>

                {/* Desktop Icons on the right side */}
                <div className="absolute right-4 top-12 flex flex-col space-y-6 z-10">
                  {/* Beach/Photos App */}
                  <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md hover:scale-110 transition-transform cursor-pointer">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <rect width="100" height="100" fill="#64B5F6" rx="10" ry="10" />
                      <circle cx="25" cy="25" r="10" fill="#FFEB3B" /> {/* Sun */}
                      <path d="M0,60 Q25,50,50,60 T100,60 V100 H0 Z" fill="#81D4FA" /> {/* Water */}
                      <rect x="0" y="60" width="100" height="40" fill="#FFF176" /> {/* Sand */}
                      <path d="M70,60 L75,40 L80,60 Z" fill="#4CAF50" /> {/* Tree trunk */}
                      <circle cx="75" cy="35" r="10" fill="#4CAF50" /> {/* Tree top */}
                      <path d="M20,60 L25,50 L30,60 Z" fill="#FF5722" /> {/* Small object */}
                    </svg>
                  </div>

                  {/* Gallery/Photos App */}
                  <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md hover:scale-110 transition-transform cursor-pointer">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <rect width="100" height="100" fill="#FF7043" rx="10" ry="10" />
                      <circle cx="30" cy="30" r="10" fill="white" /> {/* Sun */}
                      <path d="M0,70 L30,40 L60,70 H0 Z" fill="white" /> {/* Mountain */}
                      <path d="M40,70 L70,30 L100,70 H40 Z" fill="white" /> {/* Mountain */}
                      <rect x="0" y="70" width="100" height="30" fill="#A1887F" /> {/* Ground */}
                    </svg>
                  </div>

                  {/* Safari Browser */}
                  <div className="w-12 h-12 rounded-full overflow-hidden shadow-md hover:scale-110 transition-transform cursor-pointer">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Mar%2026%2C%202025%2C%2012_44_23%20PM-YiKPwVwew8icmOtPIRRCqbsLNQuQ1U.png"
                      alt="Safari Browser"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Mail/Dropbox App */}
                  <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md hover:scale-110 transition-transform cursor-pointer">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Mar%2026%2C%202025%2C%2012_30_01%20PM-CUbxIm7FgUiPJNTwPvJL6K6SZeKeKe.png"
                      alt="Mail"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Game Controller App */}
                  <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md hover:scale-110 transition-transform cursor-pointer">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <defs>
                        <linearGradient id="gameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FF5252" />
                          <stop offset="50%" stopColor="#FFAB40" />
                          <stop offset="100%" stopColor="#4DD0E1" />
                        </linearGradient>
                      </defs>
                      <rect width="100" height="100" fill="url(#gameGradient)" rx="10" ry="10" />
                      <path
                        d="M25,40 C25,30 35,25 50,25 C65,25 75,30 75,40 L75,60 C75,70 65,75 50,75 C35,75 25,70 25,60 Z"
                        fill="white"
                        stroke="black"
                        strokeWidth="2"
                      />
                      <rect x="35" y="45" width="10" height="10" fill="black" /> {/* D-pad horizontal */}
                      <rect x="30" y="50" width="10" height="10" fill="black" transform="translate(5, -5)" />{" "}
                      {/* D-pad vertical */}
                      <circle cx="65" cy="45" r="5" fill="black" /> {/* Button 1 */}
                      <circle cx="75" cy="55" r="5" fill="black" /> {/* Button 2 */}
                    </svg>
                  </div>
                </div>

                {/* About Me Window */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] bg-[#333333] rounded-lg shadow-xl overflow-hidden z-20 border-2 border-[#0080FF]">
                  <div className="flex items-center bg-[#0080FF] px-3 py-2 font-bold text-white drop-shadow-md">
                    <div className="flex space-x-1.5 mr-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs font-medium mx-auto">About Me</div>
                  </div>
                  <div className="p-4 flex flex-col h-[calc(100%-2rem)] overflow-auto">
                    <div className="flex mb-4">
                      <div className="w-20 h-20 rounded-full bg-gray-200 mr-4 flex-shrink-0 overflow-hidden">
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DiegoFill%20%281%29.jpg-QssDuFGzF7tloluxyvLvepKOeiqS1T.jpeg"
                          alt="Christopher Diego Fill"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-[#00ffd5]">Diego Fill</h2>
                        <p className="mb-2.5 leading-relaxed text-base text-[#00ffd5]">
                          Account Manager at Oracle (NetSuite)
                        </p>
                        <p className="mb-2.5 leading-relaxed text-sm text-[#00ffd5]">Santa Monica, California</p>
                      </div>
                    </div>
                    <div className="text-sm text-[#00ffd5] overflow-auto flex-grow">
                      <p className="mb-2">
                        I'm Diego Fill, an Account Manager at Oracle for the NetSuite Accelerator, based in sunny Santa
                        Monica, California.
                      </p>
                      <p className="mb-2">
                        Thanks for stopping by my digital corner. I'm excited to share a slice of my journey in tech,
                        entrepreneurship, and the ever-evolving startup ecosystem. Whether you're here to learn more
                        about my projects or simply drop a line, feel free to get in touch!
                      </p>
                      <h3 className="font-bold mt-3 mb-1">Looking for My Resume?</h3>
                      <p className="mb-2">
                        <a
                          href="https://docs.google.com/document/d/1VcJT_i79HLr3xcDEnKM9TXZ-xVg1702h/edit?usp=sharing&ouid=108130036513656333204&rtpof=true&sd=true"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-[#0080FF]"
                        >
                          Click here to download it!
                        </a>
                      </p>
                      <h3 className="font-bold mt-3 mb-1">About Me</h3>
                      <p className="mb-2">
                        I've been fascinated by technology since I was a kid—building my first computer at 14 to play
                        video games with friends and explore the world of software. Growing up in a family that ran a
                        small autoglass business, my entrepreneurial spirit was sparked early. I even launched my first
                        venture, Yum Yum Diego's Bubble Gum, at the age of 10, running a network of bubble gum machines
                        around town!
                      </p>
                      <p className="mb-2">
                        Over the years, my interests have broadened from gaming into cybersecurity, game design, UI/UX,
                        and even the exciting realm of AI—always with the aim of automating tasks and making life a bit
                        easier. While I majored in Business Administration at Arizona State University, I was constantly
                        surrounded by friends diving into computer science. This blend of business savvy and tech
                        curiosity led me to co-found ShipWiz, an app that helps users find and print the most affordable
                        shipping labels. As Product Manager and Developer, I've helped grow it to over 1,000 active
                        users in just two years!
                      </p>
                      <h3 className="font-bold mt-3 mb-1">Hobbies & Beyond</h3>
                      <p className="mb-2">
                        When I'm not immersed in work or coding a new project, you'll likely find me out on a hike,
                        training for my next half-iron man race, or recording my latest podcast episode. I love
                        exploring new restaurants, hitting the gym, and paddle boarding at the marina. Whether it's
                        socializing with the Venice Run Club, watching the newest episode of Invincible, or challenging
                        friends (and sometimes getting my butt kicked) in video games and chess on Discord, I believe in
                        balancing work with plenty of fun.
                      </p>
                      <h3 className="font-bold mt-3 mb-1">More Links & Adventures</h3>
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
                    </div>
                  </div>
                </div>

                {/* macOS Dock - with icons matching the screenshot */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 h-16 bg-[rgba(255,255,255,0.2)] backdrop-blur-md rounded-2xl px-2 flex items-center space-x-2 z-10">
                  {/* Contacts (About Me) */}
                  <div className="group relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 hover:scale-110 transition-transform">
                    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <rect x="84" y="107" width="344" height="298" rx="42" ry="42" fill="#4CAF50" />
                      <circle cx="256" cy="186" r="50" fill="white" />
                      <path d="M350,350H162c0-50,42-90.5,94-90.5S350,300,350,350z" fill="white" />
                    </svg>
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs py-1 px-3 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      Contact Me
                    </div>
                  </div>

                  {/* Finder/Files */}
                  <div className="group relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 hover:scale-110 transition-transform">
                    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <rect x="84" y="107" width="344" height="298" rx="42" ry="42" fill="#2196F3" />
                      <rect x="124" y="167" width="80" height="40" rx="4" fill="white" opacity="0.9" />
                      <rect x="124" y="217" width="80" height="40" rx="4" fill="white" opacity="0.9" />
                      <rect x="124" y="267" width="80" height="40" rx="4" fill="white" opacity="0.9" />
                      <rect x="214" y="167" width="80" height="40" rx="4" fill="white" opacity="0.9" />
                      <rect x="214" y="217" width="80" height="40" rx="4" fill="white" opacity="0.9" />
                      <rect x="214" y="267" width="80" height="40" rx="4" fill="white" opacity="0.9" />
                      <rect x="304" y="167" width="80" height="40" rx="4" fill="white" opacity="0.9" />
                      <rect x="304" y="217" width="80" height="40" rx="4" fill="white" opacity="0.9" />
                      <rect x="304" y="267" width="80" height="40" rx="4" fill="white" opacity="0.9" />
                    </svg>
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs py-1 px-3 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      Files
                    </div>
                  </div>

                  {/* Safari */}
                  <div className="group relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 hover:scale-110 transition-transform">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Mar%2026%2C%202025%2C%2012_44_23%20PM-YiKPwVwew8icmOtPIRRCqbsLNQuQ1U.png"
                      alt="Safari Browser"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs py-1 px-3 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      My Projects
                    </div>
                  </div>

                  {/* Mail */}
                  <div className="group relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 hover:scale-110 transition-transform">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Mar%2026%2C%202025%2C%2012_30_01%20PM-CUbxIm7FgUiPJNTwPvJL6K6SZeKeKe.png"
                      alt="Mail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs py-1 px-3 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      Skills
                    </div>
                  </div>

                  {/* Photos */}
                  <div className="group relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 hover:scale-110 transition-transform">
                    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <rect x="84" y="107" width="344" height="298" rx="42" ry="42" fill="#FF7043" />
                      <circle cx="180" cy="180" r="28" fill="white" />
                      <path
                        d="M84,321V363c0,23.2,18.8,42,42,42h260c23.2,0,42-18.8,42-42V321H84z"
                        fill="rgba(0,0,0,0.2)"
                      />
                      <path d="M84,321l86-86l86,86H84z M256,235l86,86h86v-43l-86-86L256,235z" fill="white" />
                    </svg>
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs py-1 px-3 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      Contact
                    </div>
                  </div>

                  {/* Document/Resume */}
                  <div className="group relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 hover:scale-110 transition-transform">
                    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <rect x="108" y="84" width="296" height="344" rx="20" ry="20" fill="#5C6BC0" />
                      <rect x="148" y="154" width="216" height="12" rx="6" fill="white" />
                      <rect x="148" y="194" width="216" height="12" rx="6" fill="white" />
                      <rect x="148" y="234" width="216" height="12" rx="6" fill="white" />
                      <rect x="148" y="274" width="216" height="12" rx="6" fill="white" />
                      <rect x="148" y="314" width="140" height="12" rx="6" fill="white" />
                    </svg>
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs py-1 px-3 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      Resume
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto h-4 w-[70%] rounded-sm bg-gray-800 shadow-inner"></div>
          </div>

          {/* Keyboard and Mouse - Removed blue glow */}
          <div className="relative mt-10 flex w-full justify-center">
            <div className="mr-6 grid h-[140px] w-[80%] grid-cols-[repeat(14,1fr)] grid-rows-[repeat(5,1fr)] gap-1 rounded bg-gray-300 p-2.5">
              {Array.from({ length: 70 }).map((_, i) => {
                if (i === 42 || i === 55) return <div key={i} className="col-span-2 rounded bg-white shadow"></div>
                if (i === 66) return <div key={i} className="col-span-7 rounded bg-white shadow"></div>
                if (i < 70) return <div key={i} className="rounded bg-white shadow"></div>
                return null
              })}
            </div>
            <div className="relative h-[120px] w-[70px] rounded-[35px] bg-gray-300">
              <div className="absolute left-1/2 top-[18px] h-[2px] w-1/2 -translate-x-1/2 rounded-[1px] bg-gray-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

