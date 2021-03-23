// Rover object goes here:

const rover = {
    direction: "N", //["N","S";"E";"W"]
    x: 0,
    y: 0,
    travelLog: [{ x: 0, y: 0 }]
  };
  
  // ============================
  
  let goalX = 0;
  let goalY = 0;
  
  let scoreOne = 0;
  let scoreTwo = 0;
  let maxScore = 0;
  let maxScoreMulti = 0;
  let maxScoreAdven = 0;
  
  // Variables to switch between 2 players
  let playerSave = false;
  let playerMultiplayer = false;
  // Indicates that the first player has reached the objective and the game continues even if player 2 loses
  let goalMulti = false;
  
  // It is activated if there is a collision with an obstacle or if the player leaves the map.
  let collide = false;
  
  // let loopResetMap = false;
  
  let walkMode = false;
  let counter = 0;
  
  // Indicates that adventure mode is active and how the maps are to be created.
  let progressiveMode = false;
  // Variable to indicate the size of the map.
  let stage = 10;
  // It is used to increase the difficulty (number of obstacles).
  let hardness = 1;
  // Indicates the number of screens that must be passed to end the game in adventure mode.
  const hardnessStop = 12; // <==================================############################################
  
  let numberObstacles = 0;
  
  // Stores the coordinates of the obstacles and the player who is not playing.
  const coorObtacles = [];
  // Stores the position of all components to be able to display them on the screen.
  const coorPreloaded = [];
  // It is used to draw the numbers on the map.
  const coorMap = ["[0]", "[1]", "[2]", "[3]", "[4]", "[5]", "[6]", "[7]", "[8]", "[9]", "10]"];
  
  
  function gameOverPicture() {
    console.log(`----------------------------------------------------------------------------`
    );
    console.log(`
  
                    $$$$$$$$$$   $$$$$$$$$$   $$$$     $$$$$   $$$$$$$$
                   $$           $$    $$$$   $$ $$   $$ $$$   $$
                  $$   $$$$$   $$$$$$$$$$   $$  $$$$   $$$   $$$$$$
                 $$      $$   $$    $$$$   $$         $$$   $$
                $$$$$$$$$$   $$    $$$$   $$         $$$   $$$$$$$$
   
  
  
                 $$$$$$$$$$   $$      $$   $$$$$$$$   $$$$$$$$$
                $$      $$    $$    $$    $$         $$     $$
               $$      $$     $$  $$     $$$$$$     $$$$$$$$$
              $$      $$      $$$$      $$         $$   $$$
             $$$$$$$$$$       $$       $$$$$$$$   $$     $$$
  
  
    `);
    console.log(`----------------------------------------------------------------------------`
    );
  }
  
  function overPicture() {
    console.log(`----------------------------------------------------------------------------`
    );
    console.log(`
                                     ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
                                 ¶¶¶¶¶¶             ¶¶¶¶¶¶¶
                              ¶¶¶¶                       ¶¶¶¶
                             ¶¶¶                            ¶¶¶
                            ¶¶                               ¶¶
                           ¶¶                                 ¶¶
                          ¶¶                                   ¶¶
                          ¶¶ ¶¶                             ¶¶ ¶¶
                          ¶¶ ¶¶                             ¶¶ ¶¶
                          ¶¶ ¶¶                             ¶¶ ¶¶
                          ¶¶  ¶¶                           ¶¶  ¶¶
                          ¶¶  ¶¶                           ¶¶  ¶¶
                           ¶¶ ¶¶   ¶¶¶¶¶¶¶¶      ¶¶¶¶¶¶¶   ¶¶ ¶¶
                            ¶¶¶¶ ¶¶¶¶¶¶¶¶¶¶     ¶¶¶¶¶¶¶¶¶¶ ¶¶¶¶¶
                             ¶¶¶ ¶¶¶¶¶¶¶¶¶¶     ¶¶¶¶¶¶¶¶¶¶ ¶¶¶
                    ¶¶¶       ¶¶  ¶¶¶¶¶¶¶¶       ¶¶¶¶¶¶¶¶¶ ¶¶        ¶¶¶¶
                   ¶¶¶¶¶     ¶¶   ¶¶¶¶¶¶¶   ¶ ¶   ¶¶¶¶¶¶¶   ¶¶     ¶¶¶¶¶¶
                  ¶¶   ¶¶    ¶¶     ¶¶¶    ¶¶¶¶¶    ¶¶¶     ¶¶    ¶¶   ¶¶
                 ¶¶¶    ¶¶¶¶  ¶¶          ¶¶¶ ¶¶¶          ¶¶  ¶¶¶¶    ¶¶¶
                ¶¶         ¶¶¶¶¶¶¶¶       ¶¶¶ ¶¶¶       ¶¶¶¶¶¶¶¶¶        ¶¶
                ¶¶¶¶¶¶¶¶¶     ¶¶¶¶¶¶¶¶     ¶¶ ¶¶¶    ¶¶¶¶¶¶¶¶      ¶¶¶¶¶¶¶¶
                  ¶¶¶¶ ¶¶¶¶¶      ¶¶¶¶¶            ¶¶¶ ¶¶     ¶¶¶¶¶¶´¶¶¶
                          ¶¶¶¶¶¶  ¶¶¶ ¶¶           ¶¶ ¶¶¶  ¶¶¶¶¶¶
                              ¶¶¶¶¶¶ ¶  ¶¶¶¶¶¶¶¶¶¶¶ ¶¶ ¶¶¶¶¶¶
                                  ¶¶ ¶ ¶¶ ¶¶ ¶ ¶¶¶¶¶¶¶ ¶¶
                                ¶¶¶¶ ¶¶ ¶ ¶¶ ¶ ¶¶ ¶ ¶¶ ¶¶¶¶¶
                            ¶¶¶¶¶ ¶¶   ¶¶¶¶¶¶¶¶¶¶¶¶¶   ¶¶ ¶¶¶¶¶
                    ¶¶¶¶¶¶¶¶¶¶     ¶¶                 ¶¶      ¶¶¶¶¶¶¶¶¶
                   ¶¶           ¶¶¶¶¶¶¶             ¶¶¶¶¶¶¶¶          ¶¶
                    ¶¶¶     ¶¶¶¶¶     ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶     ¶¶¶¶¶     ¶¶¶
                      ¶¶   ¶¶¶          ¶¶¶¶¶¶¶¶¶           ¶¶¶   ¶¶
                      ¶¶  ¶¶                                   ¶¶  ¶¶
                       ¶¶¶¶                                      ¶¶¶                              
    `);
    console.log(`----------------------------------------------------------------------------`
    );
  }
  
  function startPicture() {
    console.log(`        
                                              *
    ###########  ########  #####   ########       ###########  #########    
       ##      ##     ##   ##    ##     ##            ##      ##      ##
      ##      ########    ##    ########             ##      ##       ##
     ##      ##   ##     ##    ##                   ##       ##      ##
    ##      ##    ##   ####   ##                   ##        #########      *
                                         *
          *                                              *
    ####    ####     ####     ########   ########        :==(^)==: 
    ## ##  ## ##    ##  ##    ##     ##  ##                _/I]_____    *
    ##  ####  ##   ########   ########   ########    *   ./___[_]_[_)__
    ##   ##   ##   ##    ##   ##   ##          ##        [_...| |I| |I=)
    ##        ##   ##    ##   ##    ##   ########          (X)-----(X)'
  
          *
                            * Welcome explorer. *
                                                                 *
  Important! The line that is displayed ----------------------------------------
  does not have to have any line break.
  Before starting, widen the window of your console 
  until the line that is displayed ---------------------------------------------
  occupies a single line.                              *
                *                                                   *
                               * Good trip!!! *
         *
  Enter 'S' to start or any key to exit:                       *
    `);
    console.log(`----------------------------------------------------------------------------`
    );
  }
  
  
  function endPicture() {
    console.log(`
                          _______________________________
                         |                               |
                         |     Trip   :==(^)==:          |
            _____________|      To      _/I]_____        |_____________
           !             |     Mars   ./___[_]_[_)__     |            /
            !            |            [_...| |I| |I=)    |           /
             !           |              (X)-----(X)'     |          !
             /           |_______________________________|           !
            /_______________)                        (________________! 
  
    
                 __^__                                      __^__
                ( ___ )------------------------------------( ___ )
                 | / |                                      | / |
                 | / |   Created by: José Luis Rodríguez    | / |
                 |___|                                      |___|
                (_____)------------------------------------(_____)  
  
  
  
                           * Thanks for playing it !!! *
  
  
  `);
    setTimeout(pawI, 4000);
    setTimeout(pawD, 4500);
    setTimeout(pawI, 5000);
    setTimeout(pawD, 5500);
    setTimeout(pawI, 6000);
    setTimeout(pawD, 6500);
    setTimeout(pawI, 7000);
    setTimeout(pawD, 7500);
    setTimeout(end, 8000);
    setTimeout(gameOver, 12000);
  }
  // Variable to display letters with the drawing.
  const thanks = "ThankssS";
  let add = 0;
  
  function end() {
    console.log(`
  
                                      _____                             *
                                    _(_____)_
                                      (0 0)                  *
               *              ---oOO-- (_) ----oOO---    
                         ╔═══════════════════════════════╗ 
                         ║       Congratulations!        ║
                         ║ You have completed the game!! ║ 
        *                ╚═══════════════════════════════╝                  *
                               -------------------
                                     |__|__| 
                                      || || 
                                     ooO Ooo 
  
  
  `); add = 0;
  }
  
  function pawI() {
    console.log(`
  
  
  *                          oooO           ${thanks[add]}
                            (....)     
                             ...(     
                              ._)                            *
                                       
                                            * 
  `);
    add++;
  }
  
  function pawD() {
    console.log(`
  
                   *                              
                                        
                                          Oooo              ${thanks[add]}
                                         (....)                          *
                                          )../
       *                                  (_/ 
  
  
  `);
    add++;
  }
  
  // Function that is responsible for displaying the map.
  function map() {
    if (playerMultiplayer || playerSave) {
      console.log(`
  ################################################################################
  #### Player 1 Score: ${scoreOne} #### Player 1 Score: ${scoreTwo} #### MaxScore: ${maxScoreMulti} ####
  ################################################################################`);
      if (playerMultiplayer) {
        console.log(`########################### GO PLAYER 1!!! ###########################`);
      } else {
        console.log(`########################### GO PLAYER 2!!! ###########################`);
      }
    } else if (progressiveMode) {
      console.log(`
  ################################################################################
  ############### Score: ${scoreTwo} ############### MaxScore: ${maxScoreAdven} ############### 
  ################################################################################`)
    } else {
      console.log(`
  ################################################################################
  ############### Score: ${scoreTwo} ############### MaxScore: ${maxScore} ############### 
  ################################################################################`)
    }
    for (let i = 0; i <= stage; i++) {
      console.log(coorPreloaded[i]);
    }
    console.log(`----------------------------------------------------------------------------`
    );
  }
  
  function createObstacles(numberObstacles) { // Create the obstacles.
    let obtacleX = 1; // Variables that collect randomly generated coordinates to generate obstacles
    let obtacleY = 1; // and that do not coincide with some preset coordinates.
    coorObtacles.splice(0, coorObtacles.length); // Delete the coordinates of the obstacles when creating a new map.
    coorPreloaded.splice(0, coorPreloaded.length); // Clear the map. 
    coorPreloaded[0] = ["[#]"]; // Paint the 0 coordinate on the map.
  
    for (let a = 1; a <= stage; a++) {   // Automatically creates a two-dimensional array of a selected size.
      if (progressiveMode || playerMultiplayer) {
        coorPreloaded[0][a] = "[#]";
        coorPreloaded[a] = ["[#]"];
      } else {
        coorPreloaded[0][a] = coorMap[a];  // Paint on the left and upper edges the numbers from 1 to the selected size. 
        coorPreloaded[a] = [coorMap[a]];
      }
      for (let b = 1; b <= stage; b++) { // Fill the rest of the map with the coins _*_
        coorPreloaded[a][b] = "_*_";
      }
    }
  
    coorPreloaded[1][1] = " P "; // Paint a P to indicate where the player begins.
    if (playerMultiplayer) {
      // The objective is created randomly without matching where the players start.
      goalX = Math.floor(Math.random() * (stage - 1 - 2)) + 2;
      goalY = Math.floor(Math.random() * (stage - 1 - 2)) + 2;
    } else {
      // In single player mode it is used so that the objective is created a bit far from the player
      goalX = Math.floor(Math.random() * (stage - 1)) + 1; // and especially so that it is a bit complicated in adventure mode.
      goalY = Math.floor(Math.random() * (stage - 3)) + 3;
    }
    coorPreloaded[goalY][goalX] = "[O]"; // Paint the target on the map.
    if (playerMultiplayer) {
      coorPreloaded[1][1] = "P-1"; // Paint P-1 where player 1 starts in multiplayer mode.
      coorPreloaded[stage][stage] = "[P]"; // Paint player 2 as an obstacle in the lower corner of the map
    }
    for (let i = 1; i <= numberObstacles; i++) { // Create the obstacles.
      obtacleX = 1; // They are reset to 1 to enter the loop.
      obtacleY = 1;
      while ( // It is used so that the objective can always be reached and so that they do not coincide with players or objective.
        (obtacleX === 1 && obtacleY === 1) ||
        (obtacleX === goalX && obtacleY === goalY) ||
        (obtacleX === stage && obtacleY === stage) ||
        (obtacleX <= 3 && obtacleY === 1) ||
        (obtacleX >= 7 && obtacleY === 1) ||
        (obtacleX >= 3 && obtacleY === 2) ||
        (obtacleX <= 7 && obtacleY === 2) ||
        (obtacleX === stage + 1 && obtacleY <= 3) ||
        (obtacleX === stage + 1 && obtacleY >= 7) ||
        (obtacleX === stage && obtacleY >= 3) ||
        (obtacleX === stage && obtacleY <= 7) ||
        (obtacleX >= 5 && obtacleY === stage) ||
        (obtacleX <= 5 && obtacleY === stage - 1) ||
        (obtacleX === goalX && obtacleY >= goalY)
      ) {
        obtacleX = Math.floor(Math.random() * ((stage + 1) - 1) + 1); // Generate the random coordinates.
        obtacleY = Math.floor(Math.random() * (stage) + 1);  // Se podría hacer que no coincidan con las ya creadas. <========#######
      }
      coorPreloaded[obtacleY][obtacleX] = "[X]"; // Paint the obstacle on the map.
      coorObtacles.push({ x: obtacleX, y: obtacleY }); // Save the coordinate of the item.
    }
    console.log(`The obstacles created are at the following coordinates:`);
    map(); // Shows the generated map and scores.
    console.log(`The map was completed correctly!`);
    console.log(`Established communication. Rover ready !!!!!`);
  }
  
  
  // function resetMap() {
  //   let loopResetMap = false;
  //   let resetMap = prompt(`Do you want to reset the map?.
  // Press "y" or "n":`);
  //   if (
  //     resetMap === "y" ||
  //     resetMap === "Y" ||
  //     resetMap === "n" ||
  //     resetMap === "N"
  //   ) {
  //     if (resetMap === "y" || resetMap === "Y") {
  //       createObstacles(numberObstacles);
  //     }
  //   } else {
  //     setTimeout(resetMap, 300);
  //   }
  // }
  
  
  function checkObstacles(obtacles) { // Check one by one the coordinates of the obstacles, 
    for (i = 0; i < obtacles.length; i++) { // is called every time the rover moves forward or backward
      if (obtacles[i].x === rover.x && obtacles[i].y === rover.y) {
        collide = true; // Indicates that the rover has crashed or has left the map.
        console.log(`Has collided with an obstacle!!`);
        overPicture();
        break;
      }
    }
  }
  
  
  function turnLeft(vehicle) { // Save the direction the rover is pointing 
    switch (vehicle.direction) {  // from the direction it was in.
      case "N":
        vehicle.direction = "W";
        break;
      case "W":
        vehicle.direction = "S";
        break;
      case "S":
        vehicle.direction = "E";
        break;
      case "E":
        vehicle.direction = "N";
        break;
    }
    console.log(`TurnLeft was called! now look: ${rover.direction}`);
  }
  
  
  function turnRight(vehicle) {
    switch (rover.direction) {
      case "N":
        vehicle.direction = "E";
        break;
      case "E":
        vehicle.direction = "S";
        break;
      case "S":
        vehicle.direction = "W";
        break;
      case "W":
        vehicle.direction = "N";
        break;
    }
    console.log(`TurnRight was called! now look: ${rover.direction}`);
  }
  
  
  function clearCollectedCoin(vehicle) { // If the vehicle is on the map
    if (                  // clears the player's last position and collected coins.
      vehicle.x > 0 &&
      vehicle.x <= stage &&
      vehicle.y > 0 &&
      vehicle.y <= stage
    ) {
      coorPreloaded[vehicle.y][vehicle.x] = "   ";
    }
  }
  
  
  function moveForward(vehicle) {
    clearCollectedCoin(vehicle);
    switch (vehicle.direction) {  // Check in which direction the rover is pointing and move it one position.
      case "N":
        vehicle.y--;
        break;
      case "E":
        vehicle.x++;
        break;
      case "S":
        vehicle.y++;
        break;
      case "W":
        vehicle.x--;
        break;
    }
    updatePosition(vehicle);
  }
  
  
  function moveBackward(vehicle) {
    clearCollectedCoin(vehicle);
    switch (vehicle.direction) { // Check in which direction the rover is pointing and move it one position.
      case "N":
        vehicle.y++;
        break;
      case "E":
        vehicle.x--;
        break;
      case "S":
        vehicle.y--;
        break;
      case "W":
        vehicle.x++;
        break;
    }
    updatePosition(vehicle);
  }
  
  function updatePosition(vehicle) {
    rover.travelLog.push({ x: vehicle.x, y: vehicle.y }); // Save the position of the rover.
    console.log(
      `moveForward was called!! Now you are in the position: x = ${vehicle.x} - y = ${vehicle.y}`
    );
    if (
      vehicle.x > 0 &&
      vehicle.x <= stage &&
      vehicle.y > 0 &&
      vehicle.y <= stage
    ) {
      if (playerMultiplayer) {
        if (coorPreloaded[vehicle.y][vehicle.x] === "_*_") { // If there is a coin in the coordinate where the rover is located
          scoreOne += 10;  // Add 10 points to player 1 in multiplayer mode.
        }
      } else {
        if (coorPreloaded[vehicle.y][vehicle.x] === "_*_") {
          scoreTwo += 10; // Get 10 points to the player in ADVENTURE and NORMAL modes and to the second multiplayer player!
        }
      }
      coorPreloaded[goalY][goalX] = "[O]"; // Repaints the target in case the player has passed over and erased it.
      coorPreloaded[vehicle.y][vehicle.x] = " P "; // Paint the player in the new position
      map(); // Show the map in every move
      checkObstacles(coorObtacles);
    } else { // If the new position of the rover is outside the map, it launches a message and triggers a collision (collide);
      console.log(`You can't place player outside of the board!`);
      overPicture();
      collide = true;
    }
  }
  
  
  function commands(comand) { // Receive the commands entered by the player and move the rover.
    console.log(`The following orders have been sent to the Rover: ${comand}
  Good luck! Rover in motion !!!`);               // Read each letter sent and launch the chosen order
    for (let i = 0; i < comand.length; i++) {     // until there is a collision or the sequence ends
      if (!collide) {
        switch (comand[i]) {
          case "L":
            turnLeft(rover);
            break;
          case "R":
            turnRight(rover);
            break;
          case "F":
            moveForward(rover);
            break;
          case "B":
            moveBackward(rover);
            break;
        }
      }
    }
    if (collide) { // If there is a collision; 
      if (playerMultiplayer && !walkMode) { // if you are playing the first player in multiplayer mode, 
        setTimeout(multiplayer, 800); // launches multiplayer that is responsible for activating and adjusting for player 2 to start
      } else if (goalMulti) { // goalMulti saves if the first multiplayer player has reached the goal so that the game does not end
        goalReset(); // Launch a new game if either of the two players has reached the objective in multiplayer mode
      } else {
        setTimeout(gameOver, 800);
      }
    } else {
      checkEnd(); // 
    }
  }
  
  
  function checkEnd() { // Check if the rover has reached the target or not.
    if (goalX === rover.x && goalY === rover.y) {
      if (playerMultiplayer) { // If it is in the objective it adds 250 points.
        scoreOne += 250; // in multiplayer mode
      } else {
        scoreTwo += 250; // in multiplayer mode to player2 and in normal and adventure mode to player 1.
      }
      console.log(` Congratulations! 
  You have reached the goal !!!`);
      if (!progressiveMode) {
  
        if (playerMultiplayer && !walkMode) { // if true it means that it is the first multiplayer player 
          displayMultiScore()  //  reset and cast to start the second player.
          resetRover();
          coorPreloaded[goalY][goalX] = "[O]";
          if (!walkMode) {
            goalMulti = true;
          }
          setTimeout(multiplayer, 800);
        } else if (walkMode) {//  if it is in walk mode.
          setTimeout(gameOver, 800);
        }
        else {           // to start over on a new map if the objective is reached in any mode
          if (playerSave) { // If a player has been saved, it means that he is in multiplayer mode so reset
            displayMultiScore() // and launch a new game.
            playerMultiplayer = true;
            playerSave = false;
            goalMulti = false;
          }
          resetRover(); // Initialize the position of the rover.
          leve(numberObstacles); // create a new map according to the established data   
          setTimeout(playerComand, 800);
        }
  
      } else {      // If you are in adventure mode:
        console.log(`Your score is: ${scoreTwo}`);
        if (stage < 10) {// It has a limit so that the map does not exceed 10 rows and columns
          stage++; 
        }
        resetRover();
        if (hardness > hardnessStop) { // Makes adventure mode have an ending.
          setTimeout(endPicture(), 800); // Throw "the credits" of the game.
        } else {
          setTimeout(go, 800); // A new, bigger and "harder" map begins.
        }
      }
    } else { // If the player is on the map, but not on the objective.
      console.log(`You have not reached the goal`);
      if (playerMultiplayer || walkMode) {
        if (counter === 0) {// If you are the first multiplayer player:
          displayMultiScore();
          setTimeout(multiplayer, 800);
        } else if (walkMode) {
          if (playerMultiplayer) {
            playerMultiplayer = false;
          } else {
            playerMultiplayer = true;
          }
          walkMod();
        }
      } else if (goalMulti) { // It is to start over on a new map if player 1 has reached the objective in multiplayer.
        goalReset(); // if player 1 has reached the objective in multiplayer.
      } else {
        setTimeout(gameOver, 800); // If not, the game is over.
      }
    }
  }
  
  
  function goalReset() {
    displayMultiScore(); // Show scores.
    playerMultiplayer = true; // Indicates that we start multiplayer mode.
    goalMulti = false; // Reset that player 1 has reached the goal.
    resetRover();
    leve(numberObstacles);
    setTimeout(playerComand, 800);
  }
  
  
  function displayMultiScore() { // Show scores.
    console.log(`Player 1's score is: ${scoreOne}`);
    console.log(`Player 2's score is: ${scoreTwo}`);
  }
  
  
  function resetRover() { // Reset the position of the rover if it has left the map 
    coorPreloaded[1][1] = "P 1"; // or if it has reached the objective to free player 2.
    rover.x = 1;
    rover.y = 1;
    rover.direction = "N";
  }
  
  
  function leve(level) { // Launch the obstacle creation according to the chosen mode.
    if (!progressiveMode) {
      switch (level) {
        case "1":
          createObstacles(10);
          console.log("Easy Mode Selected. Come On Player!!!");
          break;
        case "2":
          createObstacles(25);
          console.log("Normal Mode Selected. Come On Player!!!");
          break;
        case "3":
          createObstacles(50);
          console.log("Hard Mode Selected. Come On Player!!!");
          break;
        case "4":
          createObstacles(60);
          console.log("Hell Mode Selected. Come On Player!!!");
          break;
      }
    } else {
      if (level <= 2) {
        createObstacles(0);
      } else if (level == 3) {
        createObstacles(1);
      } else {
        if (hardness <= hardnessStop) { // Increase the difficulty (no. Of obstacles) until the end of the game is reached.
          hardness++;
        }
        createObstacles((level * level) / 2 + hardness);
      }
    }
  }
  
  
  function playerComand() { // Check the commands entered by the player.
    let comandOk = false;
    collide = false;
    let playerComand = prompt(`Enter the commands:
  f => forward,
  r => right or 
  l => left
  to move the rover:`);
    if (playerComand == null) { // Prevents an error from being output if no command is entered.
      console.log(`Please enter (f) => forward, (r) => right or (l) => left.
  The game has been canceled.`);
      if (playerMultiplayer) { // If there are two players, it passes the turn to player 2, if not, throw the game over.
        console.log(`Your score is: ${scoreTwo}`);
        multiplayer();
      } else {
        setTimeout(gameOver, 100);
      }
    } else { // Capitalize all the commands entered by the player and check that they are valid.
      playerComand = playerComand.toUpperCase();
      for (let i = 0; i < playerComand.length; i++) {
        if (
          playerComand[i] === "L" ||
          playerComand[i] === "R" ||
          playerComand[i] === "F" ||
          playerComand[i] === "B"
        ) {
          comandOk = true;
        } else {
          comandOk = false;
          break;
        }
      }
      if (comandOk) {
        commands(playerComand); // launches commands by sending the commands entered by the player as an argument.
      } else {
        console.log(`One of the commands is wrong. You are a loser.
  Please enter (f) => forward, (r) => right or (l) => left.`);
        overPicture();
        if (playerMultiplayer) {
          console.log(`Your score is: ${scoreTwo}`);
          setTimeout(multiplayer, 800);
        } else {
          setTimeout(gameOver, 800);
        }
      }
    }
  }
  
  
  function go() { // If not in adventure mode, ask player for difficulty level.
    if (!progressiveMode) { // Forces the player to start the game
      let interruptor = false;
      while (interruptor === false) {
        numberObstacles = prompt(`Enter the level you want:
  - Enter '1' for Easy mode,
  - Enter '2' for Normal mode,
  - Enter '3' for Hard mode,
  - Enter '4' for Hell mode:`);
  
        if (
          numberObstacles === "1" ||
          numberObstacles === "2" ||
          numberObstacles === "3" ||
          numberObstacles === "4"
        ) {
          leve(numberObstacles);
          console.log(`Go player One!!!`);
          setTimeout(playerComand, 500);
          interruptor = true;
        }
      }
    } else {
      leve(stage);
      console.log(`Go Player!!!`);
      setTimeout(playerComand, 500);
    }
  }
  
  
  function walkMod() {
    obstaclePlayer();
    coorPreloaded[coorObtacles[coorObtacles.length - 1].x][[coorObtacles.length - 1].y] = " P ";
    rover.x = coorObtacles[coorObtacles.length - 2].x;
    rover.y = coorObtacles[coorObtacles.length - 2].y;
    rover.direction = coorObtacles[coorObtacles.length - 2].direction;
    coorObtacles.splice(coorObtacles.length - 2, 1);
    console.log(`Go player!!!`);
    map();
    setTimeout(playerComand, 100);
  }
  
  
  
  function obstaclePlayer() {
    if (rover.x > 0 && rover.x <= stage && rover.y > 0 && rover.y <= stage) { // If the player is inside the map,
      coorObtacles.push({ x: rover.x, y: rover.y, direction: rover.direction }); // Save its coordinates as one more obstacle.
      coorPreloaded[rover.y][rover.x] = "[P]"; // Paint the obstacle on the map.
    } else { // If it is off the map, it marks it in its starting position.
      coorObtacles.push({ x: 1, y: 1 });
      coorPreloaded[1][1] = "[P]";
    }
  }
  
  
  
  function multiplayer() {
    if (walkMode) {
      counter++;
    }
    obstaclePlayer();
    coorPreloaded[stage][stage] = "P 2"; // Paint and 
    rover.x = stage; // place the second player in the lower right corner of the map and facing north.
    rover.y = stage;
    rover.direction = "N";
    playerSave = true; // Indicates that multiplayer is active when the second player plays.
    console.log(`Go player Two!!!`);
    playerMultiplayer = false; // It is like player one of multiplayer mode, it is not used in single player mode.
    map();
    setTimeout(playerComand, 100);
  }
  
  
  function gameOver() {
    counter = 0;
    hardness = 1; // Restart the difficulty.
    if (playerSave || walkMode && !progressiveMode) { // If it is in multiplayer it shows how the game was.
      displayMultiScore();
      if (scoreOne == scoreTwo) {
        console.log(`Tied Game`);
        gameOverPicture();
      } else if (scoreOne > scoreTwo) {
        console.log(`Player 1 is the winner !!!`);
        gameOverPicture();
      } else {
        console.log(`Player 2 is the winner !!!`);
        gameOverPicture();
      }
      if (scoreOne > maxScoreMulti && scoreOne > scoreTwo) {
        console.log(` 
                              * New Record * 
  `);
  
        maxScoreMulti = scoreOne;
      }
      if (scoreTwo > maxScoreMulti) {
        console.log(` 
                              * New Record * 
  `);
  
        maxScoreMulti = scoreTwo;
      }
      setTimeout(kickOff, 2000);
    } else { // If you are not in multiplayer mode...
      console.log(`Your score is: ${scoreTwo}`);
      if (!progressiveMode) {
        if (scoreTwo > maxScore) {
          console.log(` 
                              * New Record * 
  `);
          maxScore = scoreTwo;
        }
      } else { // If you are in adventure mode...
        if (scoreTwo > maxScoreAdven) {
          console.log(` 
                              * New Record * 
  `);
          maxScoreAdven = scoreTwo;
        }
      } 
      if (!playerSave){ 
        if (!walkMode) {
        let yes = prompt(`Do you want to see the coordinates where you have passed? 
      Press "Y" to display them on the screen.`);
        if (yes === "y" || yes === "Y") {
          for (let i = 0; i < rover.travelLog.length; i++) {
            console.log(`   ${i + 1} move:`);
            console.log(`X : ${rover.travelLog[i].x} || Y : ${rover.travelLog[i].y}`);
          }
        }
      }
      }
      gameOverPicture();
      setTimeout(kickOff, 2000);
    }
  }
  
  
  function start() {
    stage = 10;
    rover.travelLog = [{ x: 1, y: 1 }];
    scoreOne = 0; // Reset scores.
    scoreTwo = 0;
    playerSave = false; // Remove multiplayer mode.
    progressiveMode = false; // Remove adventure mode.
    rover.x = 1; // Reset the rover position to the upper right corner and looking north.
    rover.y = 1;
    rover.direction = "N";
    let yes = prompt(`  - Welcome to Trip to Mars. 
  
    - If you have played before press "S" !!!!
  
    - Here you can steer a rover and check your spatial vision, testing your ability to reach objectives and avoid obstacles by using coordinates.
  
  You will find different random maps with different stages of difficulty. In all maps you will have to dodge obstacles marked like this [X] until you reach the coordinates where the objective marked like this [O] is located.
  
  Of course! You have to collect coins  _*_  !!!
  
  Watch out! Rovers are always born facing north.
  
    - Important! The line that is displayed ------- does not have to have any line break.
  Before starting, widen the window of your console until the line that is displayed ------- occupies a single line.
  
  Good luck!
  
  Enter 'S' to start or any key to exit:`);
    if (yes === "s" || yes === "S") {
      let numberPlayers = prompt(`Enter '1' for single player
  or
  Enter '2' for two players:`);
      if (numberPlayers === "1") {
        let progressive = prompt(
          `Enter '1' for normal mode 
  or 
  Enter '2' for Adventure Mode:
  
  - Normal Mode: Try to collect as many coins as possible, if you reach the objective a new map will be generated.
  
  - Adventure Mode: The stages and the difficulty will increase each time you reach the objective. Will you be able to hold out until the end?.
  
                  * Good luck explorer!!! *
  `);
        if (progressive === "1") {
          console.log("You have selected Normal Mode.");
          stage = 10;
          setTimeout(go, 100); // Time so that you can print the messages on the console.
        } else if (progressive === "2") {
          console.log("You have selected Adventure Mode.");
          stage = 2;
          progressiveMode = true;
          setTimeout(go, 100);
        } else {
          console.log("Enter '1' for Normal Mode or '2' for Adventure Mode.");
          start();
        }
      } else if (numberPlayers === "2") {
        playerMultiplayer = true; // Activate player 1 in multiplayer mode.
        let walk = prompt(`In this mode, each player has an attempt to reach the objective and score points, if either player is successful, when the players finish, a new map will be reset. The player with the most points will win.
  
  They can also try the Walk Mode. In this mode you can walk around the map collecting coins, as long as you do not go out or collide with anything, when one of the two players reaches the objective, the game will end.
  
  To activate Walk Mode enter "Y",
  or any command to continue in Normal Mode:`);
        if (walk === "y" || walk === "Y") {
          walkMode = true;
        }
        go();
      } else {
        console.log("Enter '1' for single player or Enter '2' for two players.");
        start(); // Reset this screen if you have not entered the data correctly.
      }
    } else { // If no "s" is given, the program closes.
      console.log("Byeeeeeeeeeeeee!!!!!!");
    }
  }
  
  
  function kickOff() {
    startPicture();
    setTimeout(start, 100); // Used to print the start-up image.
  }
  
  
  kickOff();
  
  
  