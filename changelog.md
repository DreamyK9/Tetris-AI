#### 17.06.2022 - Refactoring - J
- standardized file names to CamelCaps
- renamed variables to decrease ambiguity
- standardized naming as follows:
  - Variables & Functions - camelCase
  - Classes - CapitalCase
  - Constants - SCREAMING_SNAKE_CASE

### 18.06.2022 - Refactoring + Color - J
- turned clearing a line into an own function (Grid class)
- added comments to Grid class
- replaced cell property "state" with "color" and "active"
- added colors to pieces

## 18.06.2022 - Rotation + fix
- implemented rotation
- fixed Piece.js line 28 working wrong way around from previous edit
- added comments

## 18.06.2022 - Sketch.js Clean-Up
- renamed "updatePiece" to "spawnPiece", because "update-" is confusing and bad naming
- added lots of comments
- removed unnecessary code duplication in line 79
- moved creating new piece from spawn function to draw()
- modularized spawnPiece() to use own variable and return the new piece