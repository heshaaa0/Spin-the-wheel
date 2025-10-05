# Spin-the-Wheel

Wheel Setup:
- A doughnut chart (`spinWheel`) shows the spin wheel using Chart.js.
- All segments are equal-sized, with no animation, no legend, and centered labels.

Game State:
- Tracks: 
  - Total players (`totalPlayers`)
  - Total spins (`totalSpins`)
  - Current wins (`currentWins`)
  - Max wins allowed (`maxWins = 5`)
- `gameOver` flag signals game end (e.g., landing on OUT or reaching max wins).
- Gift segments (🎁) are limited to 2 (`specialStopLimit`) and only available from 6 PM to 9 PM.

Spin Logic:
- Clicking the spin button (`spinBtn`) starts a spin and disables the button to prevent multiple spins.
- A random degree is chosen (`generateRandomDegree`):
  - If no wins are left, it forces an OUT result.
  - Gifts (🎁) are only allowed in the time window, under the limit, and if wins remain.
- The wheel spins to the random degree.

Outcome:
- Based on the stopping angle, `generateValue` shows:
  - Gift (🎁): Shows "GIFT," displays a gift, adds to `currentWins`, and pauses the spin button.
  - OUT: Shows "OUT - Game Over!," stops the game (`gameOver = true`), and disables the spin button.
  - Spin Again (🔄): Shows "SPIN AGAIN" and allows another spin.
- The game resets after 15 seconds by reloading the page.

Reset and Start:
- The start button (`startBtn`) reloads the page to reset the game.
- The `reset` function clears text, hides the gift, and re-enables the spin button (unless game over).

Debugging:
- `logCurrentState` logs special stops, time window status, and game-over status.
