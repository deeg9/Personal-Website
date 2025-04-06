"use client"

import { useEffect, useRef } from "react"

export default function PongGame() {
  const gameContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gameContainerRef.current) return

    // Game elements
    const gameContainer = gameContainerRef.current

    // Create game elements
    const ball = document.createElement("div")
    ball.id = "ball"

    const playerPaddle = document.createElement("div")
    playerPaddle.id = "player-paddle"
    playerPaddle.className = "paddle"

    const computerPaddle = document.createElement("div")
    computerPaddle.id = "computer-paddle"
    computerPaddle.className = "paddle"

    const scoreContainer = document.createElement("div")
    scoreContainer.id = "score-container"

    const playerScoreElement = document.createElement("span")
    playerScoreElement.id = "player-score"
    playerScoreElement.textContent = "0"

    const computerScoreElement = document.createElement("span")
    computerScoreElement.id = "computer-score"
    computerScoreElement.textContent = "0"

    const startScreen = document.createElement("div")
    startScreen.id = "start-screen"

    const title = document.createElement("h1")
    title.textContent = "SUPER PONG"

    const instructions = document.createElement("p")
    instructions.innerHTML =
      "Use your mouse or touch to move the paddle up and down.<br>Watch out for power-ups and try to beat the advanced AI opponent!"

    const startButton = document.createElement("button")
    startButton.id = "start-button"
    startButton.textContent = "START GAME"

    // Append elements to the DOM
    scoreContainer.appendChild(playerScoreElement)
    scoreContainer.appendChild(document.createTextNode(" : "))
    scoreContainer.appendChild(computerScoreElement)

    startScreen.appendChild(title)
    startScreen.appendChild(instructions)
    startScreen.appendChild(startButton)

    gameContainer.appendChild(ball)
    gameContainer.appendChild(playerPaddle)
    gameContainer.appendChild(computerPaddle)
    gameContainer.appendChild(scoreContainer)
    gameContainer.appendChild(startScreen)

    // Add CSS styles
    const style = document.createElement("style")
    style.textContent = `
      #game-container {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.2);
      }
      
      #ball {
        position: absolute;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle at 30% 30%, #fff, #ff0);
        border-radius: 50%;
        box-shadow: 0 0 15px #ff0;
      }
      
      .paddle {
        position: absolute;
        width: 15px;
        height: 100px;
        border-radius: 8px;
      }
      
      #player-paddle {
        left: 0;
        background: linear-gradient(to right, #00c6ff, #0072ff);
        box-shadow: 0 0 15px #0072ff;
      }
      
      #computer-paddle {
        right: 0;
        background: linear-gradient(to right, #ff512f, #dd2476);
        box-shadow: 0 0 15px #dd2476;
      }
      
      #score-container {
        position: absolute;
        top: 20px;
        width: 100%;
        text-align: center;
        color: #fff;
        font-size: 48px;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
        font-weight: bold;
      }
      
      #start-screen {
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9));
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #fff;
        text-align: center;
      }
      
      #start-screen h1 {
        font-size: 60px;
        margin-bottom: 10px;
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        background: linear-gradient(to right, #00c6ff, #0072ff, #ff512f, #dd2476, #fdbb2d);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      #start-screen p {
        font-size: 20px;
        margin-bottom: 30px;
        max-width: 80%;
      }
      
      button {
        padding: 15px 30px;
        font-size: 22px;
        background: linear-gradient(to right, #00c6ff, #0072ff);
        color: white;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        margin-top: 20px;
        text-transform: uppercase;
        font-weight: bold;
        transition: all 0.3s ease;
        box-shadow: 0 10px 20px rgba(0, 114, 255, 0.4);
      }
      
      button:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 25px rgba(0, 114, 255, 0.5);
        background: linear-gradient(to right, #0072ff, #00c6ff);
      }
      
      /* Add particle effects for fun */
      .particle {
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        pointer-events: none;
      }
    `
    document.head.appendChild(style)

    // Game variables
    const gameWidth = gameContainer.offsetWidth
    const gameHeight = gameContainer.offsetHeight
    const paddleHeight = 100
    const paddleWidth = 15
    const ballSize = 20

    let ballX = gameWidth / 2 - ballSize / 2
    let ballY = gameHeight / 2 - ballSize / 2
    let ballSpeedX = 6 // Faster initial speed
    let ballSpeedY = 6
    let baseSpeed = 6 // Base speed to increase over time
    let playerScore = 0
    let computerScore = 0
    let gameRunning = false
    let animationFrameId: number
    const particles: Array<{
      element: HTMLDivElement
      x: number
      y: number
      velocity: { x: number; y: number }
      life: number
    }> = [] // For visual effects
    let gameTime = 0 // Track game time for speed increases

    // Initialize paddle positions
    function initializePositions() {
      playerPaddle.style.top = (gameHeight - paddleHeight) / 2 + "px"
      computerPaddle.style.top = (gameHeight - paddleHeight) / 2 + "px"
      ball.style.left = ballX + "px"
      ball.style.top = ballY + "px"
    }

    // Update paddle positions
    function updatePaddlePositions(mouseY: number) {
      // Player paddle follows mouse/touch
      let playerPaddleY = mouseY - gameContainer.getBoundingClientRect().top - paddleHeight / 2

      // Keep paddle within game boundaries
      if (playerPaddleY < 0) {
        playerPaddleY = 0
      }
      if (playerPaddleY > gameHeight - paddleHeight) {
        playerPaddleY = gameHeight - paddleHeight
      }

      playerPaddle.style.top = playerPaddleY + "px"

      // Enhanced computer paddle AI (smarter and faster)
      const computerPaddleY = Number.parseInt(computerPaddle.style.top || "0")
      const computerPaddleCenter = computerPaddleY + paddleHeight / 2
      const ballCenter = ballY + ballSize / 2

      // Predict where the ball will be when it reaches the computer's side
      let predictedY = ballCenter
      if (ballSpeedX > 0) {
        // Ball moving toward computer
        // Calculate how many steps until ball reaches computer side
        const stepsToReach = (gameWidth - paddleWidth - ballSize - ballX) / ballSpeedX
        // Predict ball position
        predictedY = ballY + ballSpeedY * stepsToReach

        // Account for bounces off top/bottom
        while (predictedY < 0 || predictedY > gameHeight - ballSize) {
          if (predictedY < 0) {
            predictedY = -predictedY // Bounce off top
          }
          if (predictedY > gameHeight - ballSize) {
            predictedY = 2 * (gameHeight - ballSize) - predictedY // Bounce off bottom
          }
        }
      }

      // Adjust speed based on difficulty and ball position
      const difficultyFactor = 5 // Higher = harder
      const distanceToTarget = Math.abs(computerPaddleCenter - predictedY)
      let moveSpeed = Math.min(distanceToTarget / 10, difficultyFactor)
      moveSpeed = Math.max(moveSpeed, 2) // Minimum speed

      // Make the computer paddle move towards the predicted position
      if (computerPaddleCenter < predictedY - 10) {
        computerPaddle.style.top = computerPaddleY + moveSpeed + "px"
      } else if (computerPaddleCenter > predictedY + 10) {
        computerPaddle.style.top = computerPaddleY - moveSpeed + "px"
      }

      // Keep computer paddle within boundaries
      if (Number.parseInt(computerPaddle.style.top || "0") < 0) {
        computerPaddle.style.top = "0px"
      }
      if (Number.parseInt(computerPaddle.style.top || "0") > gameHeight - paddleHeight) {
        computerPaddle.style.top = gameHeight - paddleHeight + "px"
      }
    }

    // Update ball position
    function updateBallPosition() {
      // Move the ball
      ballX += ballSpeedX
      ballY += ballSpeedY

      // Ball collision with top and bottom
      if (ballY <= 0 || ballY >= gameHeight - ballSize) {
        ballSpeedY = -ballSpeedY

        // Create particles at the collision point
        if (ballY <= 0) {
          createParticles(ballX, 0, 5)
        } else {
          createParticles(ballX, gameHeight - ballSize, 5)
        }
      }

      // Add trail effect to the ball
      if (gameRunning && Math.random() < 0.3) {
        const trailParticle = document.createElement("div")
        trailParticle.className = "particle"
        trailParticle.style.left = ballX + "px"
        trailParticle.style.top = ballY + "px"
        trailParticle.style.width = "5px"
        trailParticle.style.height = "5px"
        trailParticle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`
        trailParticle.style.opacity = "0.7"

        gameContainer.appendChild(trailParticle)

        // Fade out and remove
        setTimeout(() => {
          trailParticle.style.opacity = "0"
          setTimeout(() => {
            if (trailParticle.parentNode) {
              gameContainer.removeChild(trailParticle)
            }
          }, 300)
        }, 200)
      }

      // Check for power-up collision
      checkPowerUpCollision()

      // Ball collision with paddles
      // Player paddle
      if (
        ballX <= paddleWidth &&
        ballY + ballSize >= Number.parseInt(playerPaddle.style.top || "0") &&
        ballY <= Number.parseInt(playerPaddle.style.top || "0") + paddleHeight
      ) {
        // Calculate hit position relative to the center of the paddle
        const hitPosition = ballY + ballSize / 2 - (Number.parseInt(playerPaddle.style.top || "0") + paddleHeight / 2)
        const normalizedHit = hitPosition / (paddleHeight / 2) // -1 to 1

        // Reverse X direction and adjust angle based on hit position
        ballSpeedX = -ballSpeedX * 1.05 // Slightly faster after each hit
        ballSpeedY = normalizedHit * 7 // More angle control

        // Create particles for visual feedback
        createParticles(ballX + ballSize, ballY + ballSize / 2, 10, "#0072ff")

        // Flash paddle for feedback
        playerPaddle.style.boxShadow = "0 0 30px #0072ff"
        setTimeout(() => {
          playerPaddle.style.boxShadow = "0 0 15px #0072ff"
        }, 100)

        // Add screen shake effect
        gameContainer.style.transform = "translateX(3px)"
        setTimeout(() => {
          gameContainer.style.transform = "translateX(0)"
        }, 50)
      }

      // Computer paddle
      if (
        ballX >= gameWidth - paddleWidth - ballSize &&
        ballY + ballSize >= Number.parseInt(computerPaddle.style.top || "0") &&
        ballY <= Number.parseInt(computerPaddle.style.top || "0") + paddleHeight
      ) {
        // Similar physics as player paddle
        const hitPosition = ballY + ballSize / 2 - (Number.parseInt(computerPaddle.style.top || "0") + paddleHeight / 2)
        const normalizedHit = hitPosition / (paddleHeight / 2)

        ballSpeedX = -ballSpeedX * 1.05
        ballSpeedY = normalizedHit * 7

        // Create particles for visual feedback
        createParticles(ballX, ballY + ballSize / 2, 10, "#dd2476")

        // Flash paddle for feedback
        computerPaddle.style.boxShadow = "0 0 30px #dd2476"
        setTimeout(() => {
          computerPaddle.style.boxShadow = "0 0 15px #dd2476"
        }, 100)

        // Add screen shake effect
        gameContainer.style.transform = "translateX(-3px)"
        setTimeout(() => {
          gameContainer.style.transform = "translateX(0)"
        }, 50)
      }

      // Ball out of bounds (scoring)
      if (ballX < 0) {
        // Computer scores
        computerScore++
        computerScoreElement.textContent = computerScore.toString()
        resetBall()
      } else if (ballX > gameWidth - ballSize) {
        // Player scores
        playerScore++
        playerScoreElement.textContent = playerScore.toString()
        resetBall()
      }

      // Update ball position
      ball.style.left = ballX + "px"
      ball.style.top = ballY + "px"
    }

    // Create particle effects
    function createParticles(x: number, y: number, count: number, color?: string) {
      for (let i = 0; i < count; i++) {
        const particle = document.createElement("div")
        particle.className = "particle"
        particle.style.left = x + "px"
        particle.style.top = y + "px"
        particle.style.backgroundColor = color || `hsl(${Math.random() * 360}, 80%, 60%)`

        // Random velocity
        const velocity = {
          x: (Math.random() - 0.5) * 8,
          y: (Math.random() - 0.5) * 8,
        }

        // Add to game container and particles array
        gameContainer.appendChild(particle)
        particles.push({ element: particle, x, y, velocity, life: 30 })
      }
    }

    // Update particles
    function updateParticles() {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]

        // Update position
        p.x += p.velocity.x
        p.y += p.velocity.y
        p.element.style.left = p.x + "px"
        p.element.style.top = p.y + "px"

        // Reduce opacity as life decreases
        p.life--
        p.element.style.opacity = (p.life / 30).toString()

        // Remove dead particles
        if (p.life <= 0) {
          gameContainer.removeChild(p.element)
          particles.splice(i, 1)
        }
      }
    }

    // Reset ball to center
    function resetBall() {
      ballX = gameWidth / 2 - ballSize / 2
      ballY = gameHeight / 2 - ballSize / 2

      // Slightly faster ball each round
      baseSpeed = Math.min(baseSpeed + 0.5, 15) // Cap at maximum speed

      // Random direction, using the current base speed
      ballSpeedX = Math.random() > 0.5 ? baseSpeed : -baseSpeed
      ballSpeedY = Math.random() * 6 - 3 // More vertical variation

      // Create particle explosion at center
      createParticles(ballX, ballY, 20)
    }

    // Game loop
    function gameLoop() {
      if (gameRunning) {
        gameTime += 1 // Increment game time

        // Gradually increase ball speed over time
        if (gameTime % 500 === 0 && baseSpeed < 15) {
          ballSpeedX *= 1.05
          ballSpeedY *= 1.05
        }

        updateBallPosition()
        updateParticles()
        animationFrameId = requestAnimationFrame(gameLoop)
      }
    }

    // Create power-up
    function createPowerUp() {
      if (document.getElementById("power-up")) return // Only one at a time

      const powerUp = document.createElement("div")
      powerUp.id = "power-up"
      powerUp.style.position = "absolute"
      powerUp.style.width = "25px"
      powerUp.style.height = "25px"
      powerUp.style.borderRadius = "50%"
      powerUp.style.background = "radial-gradient(circle at 30% 30%, #ff0, #f0f)"
      powerUp.style.boxShadow = "0 0 20px #f0f"

      // Random position (not too close to edges)
      const x = Math.random() * (gameWidth - 100) + 50
      const y = Math.random() * (gameHeight - 100) + 50
      powerUp.style.left = x + "px"
      powerUp.style.top = y + "px"

      // Animation
      powerUp.style.animation = "pulse 1.5s infinite"

      // Add to game
      gameContainer.appendChild(powerUp)

      // Add style for animation
      const style = document.createElement("style")
      style.textContent = `
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      `
      document.head.appendChild(style)
    }

    // Check for power-up collision
    function checkPowerUpCollision() {
      const powerUp = document.getElementById("power-up")
      if (!powerUp) return

      const powerUpRect = powerUp.getBoundingClientRect()
      const ballRect = ball.getBoundingClientRect()

      // Check if ball hits power-up
      if (
        ballRect.left < powerUpRect.right &&
        ballRect.right > powerUpRect.left &&
        ballRect.top < powerUpRect.bottom &&
        ballRect.bottom > powerUpRect.top
      ) {
        // Apply random power-up effect
        const effects = [
          () => {
            ball.style.width = "30px"
            ball.style.height = "30px"
          }, // Larger ball
          () => {
            playerPaddle.style.height = "150px"
          }, // Larger paddle
          () => {
            ballSpeedX *= 1.5
            ballSpeedY *= 1.5
          }, // Speed boost
        ]

        const randomEffect = effects[Math.floor(Math.random() * effects.length)]
        randomEffect()

        // Create particle explosion
        createParticles(powerUpRect.left, powerUpRect.top, 30)

        // Remove the power-up
        gameContainer.removeChild(powerUp)

        // Reset effects after a time
        setTimeout(() => {
          ball.style.width = "20px"
          ball.style.height = "20px"
          playerPaddle.style.height = "100px"
          // Speed isn't reset to keep game progression
        }, 8000)
      }
    }

    // Start the game
    function startGame() {
      startScreen.style.display = "none"
      gameRunning = true
      playerScore = 0
      computerScore = 0
      playerScoreElement.textContent = "0"
      computerScoreElement.textContent = "0"
      initializePositions()

      // Set up periodic power-ups
      setInterval(() => {
        if (gameRunning && Math.random() < 0.3) {
          createPowerUp()
        }
      }, 10000)

      gameLoop()
    }

    // Event listeners
    startButton.addEventListener("click", startGame)

    // Mouse movement for paddle control
    gameContainer.addEventListener("mousemove", (e) => {
      if (gameRunning) {
        updatePaddlePositions(e.clientY)
      }
    })

    // Touch movement for mobile
    gameContainer.addEventListener(
      "touchmove",
      (e) => {
        if (gameRunning) {
          e.preventDefault()
          const touch = e.touches[0]
          updatePaddlePositions(touch.clientY)
        }
      },
      { passive: false },
    )

    // Initialize the game
    initializePositions()

    // Cleanup function
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d]">
      <div id="game-container" ref={gameContainerRef} className="w-full h-full"></div>
    </div>
  )
}

