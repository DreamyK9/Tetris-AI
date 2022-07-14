#### 17.06.2022 - Refactoring - J

-   standardized file names to CamelCaps
-   renamed variables to decrease ambiguity
-   standardized naming as follows:
    -   Variables & Functions - camelCase
    -   Classes - CapitalCase
    -   Constants - SCREAMING_SNAKE_CASE

#### 18.06.2022 - Refactoring + Color - J

-   turned clearing a line into an own function (Grid class)
-   added comments to Grid class
-   replaced cell property "state" with "color" and "active"
-   added colors to pieces

#### 18.06.2022 - Rotation + fix - J

-   implemented rotation
-   fixed Piece.js line 28 working wrong way around from previous edit
-   added comments

#### 18.06.2022 - Sketch.js Clean-Up - J

-   renamed "updatePiece" to "spawnPiece", because "update-" is confusing and bad naming
-   added lots of comments
-   removed unnecessary code duplication in line 79
-   moved creating new piece from spawn function to draw()
-   modularized spawnPiece() to use own variable and return the new piece
-   fixed out of bounds rotation to the sides
-   made game over its own function

#### 19.06.2022 - clearLines rename

-   renamed checkFullLines (originally "clearLines") to clearFullLines

#### 21.06.2022 - NES Visuals

-   Implemented NES Playfield design, but playfield doesnt fill the whole area yet

#### 11.07.2022 - Fixed Bug

-   Fixed the line clearing bug

#### 12.07.2022 - Complete redesign of game visuals

-   Implemented Play/Pause button with functionality
-   Refactored frontend using flexbox container
-   implemented score, level, line counter
-   pieces fall faster when level increases, based upon tetris NES values
-   level increases when 10 lines in each level are cleared
-   score increases depending on the number of line clears with 1 "move" based upon tetris NES values

#### 13.07.2022 - Fix rotation system

-   added rotate function for clockwise and counter-clockwise rotation
-   fixed bug that game crashed on some rotations

#### 13.07.2022 - Display next piece

-   restruction
-   added next piece functionality
