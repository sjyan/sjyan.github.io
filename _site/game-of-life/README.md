# Stephen's Game of Life
This is an implementation of John Conway's cellular automaton "Game of Life" with added features

### How to play:
It's a zero-player game, but you can determine the rules! The game is a continuous view of new generations of cells, whose lives are represented by colored cells on the grid. A white cell is dead and has never been alive. A fully colored cell is a living one. A faded cell is dead, but it has been alive before. Here's how you control the rules:

1. **Width/Height**: Enter numbers between 20 and 200 to control the dimensions of the grid
2. **Radius**: Enter a number between 1 and 10 to control how far a cell's neighbors extend. "1" indicates that a cell should only consider its immediate (8) neighbors. "2" indicates that a cell will consider the next shell (total 16), and so on.
3. **LThresh**: This is the loneliness threshold that determines the number of neighbors below which a cell will die as if by underpopulation. This number should be greater than 0 and no more than the overpopulation threshold.
4. **OThresh**: This is the overpopulation threshold that determines the number of neighbors above which a cell will die. This number should be at least the loneliness threshold and no greater than one less than the total number of neighbors for any given cell.
5. **GenMin**: This is the minimum number of neighbors above which a dead cell will generate. This number should be greater than 0 and no more than GenMax.
6. **GenMax**: This is the maximum number of neighbors below which a dead cell will generate. This number should be at least GenMin and no greater than one less the total number of neighbors for any given cell.
7. You can toggle grid lines with **Toggle Grid Lines**. The default setting for an initialized game is to have grid lines.
8. **Edge Neighbor Behavior**: This determines how cells behave at the edges of the world.
  * A cell will consider off-grid neighbors to be alive if "**All Alive**" is selected.
  * A cell will consider off-grid neighbors to be dead if "**All Dead**" is selected.
  * A cell will wrap to the corresponding opposite side if "**Toroidal**" is selected.
9. Click **Generate** to create an empty grid with all the rules above applied. You can manually determine cell states by clicking on them to flip state.
  * CLICK : Flip a cell's state.
  * SHIFT-CLICK : Force a cell to generate.
  * ALT-CLICK : Force a cell to die.
10. Click **Random Generate** to create a grid with randomly filled cells. Keep in mind that the automaton will be more sustainable if the radius is smaller and the grid is more populated. If the radius is smaller and the grid is sparse, you should expect the automaton to die within a few generations unless you adjust the radius.
11. Click **Play/Pause** to see what happens! Toggle this button to pause the automaton at any generation. Click **Step** to see what happens generation by generation. Click **Reset** to empty the automaton and reset the generation counter back to 0. You can adjust the speed of generation with the **Animation Speed** slider.

[Play](../gol)