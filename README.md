# **ETCH-A-SKETCH**

### **DESCRIPTION**

Submission for the penultimate task of the Foundations track of 'The Odin Project'.

### **TOOLS**
* HTML
* CSS
* JavaScript

### **FEATURES**
* A grid that can hold upt to 10000 cells;
* A toolbar with three tips (CRAYON, BRUSH, WAND), two erasers (HARD, SOFT) and three palette collections (CUSTOM, 8-bit, 16-bit);
* A manager with PROPERTIES and INFORMATION buttons;
* An ALERTS box;
* Neumorphic design.

### **FUNCTIONALITY**

Responsive page elements are stored in variables.

At the core of this project lies the option to color the cells of a custom-generated grid, thus color mode objects are stored in an array called 'colorModes'.

When the page loads, several elements are set to 'display: none', whilst others are given an initial background color. All functionality is initiated on window load.

An object initialized called 'btns' stores two arrays, the first holding variables equivalent to button names, whilst the other containing the image file addresses.

The object is used by the 'mkBtns' function to populate each button with the appropriate icon.

The 'defaultTool' function sets the CRAYON as the default tool.

An array 'toolBtns' stores button parents by category: active or alternative.

The 'toolSelect' function handles active tools selection. Whenever a button from the toolbar is clicked, it is highlighed and marked as active, whilst its neighbors are marked inactive. The same behavior applies whilst selecting an alternative tip, eraser or palette, and the icon of the active button is swapped.

On narrower devices, the 'initModal' function populates the properties modal with the properties box, otherwise found in the properties container.

The PROPERTIES CONTAINER's visibility is toggled by the 'toggleProps' function. Similar functionality is employed to toggle the visibility of the properties and information modals.

For convenience, the ACTIVE COLOR button in the toolbar displays the COLOR PICKER tool, otherwise found in the properties box.

The HUE GRADIENT is initialized by two functions: 'initHueGrd' and 'initHueGrdH'.

Colors are then converted to HEXCODE.

The SHADE GRADIENT is initialized through the 'initShadeGrid' function.

The SHADE PICKER's position is set through the 'setShadePicker' function, and the active color is represented in two DOM elements: the CURRENT COLOR element within the properties box, and the ACTIVE COLOR element from the toolbar, respectively.

The HUE SLIDER's position is set by the 'setSldPos' and 'setSldPosH' functions.

An annonymous function is stored within a variable 'drag'. It establishes the behavior when the shade picker is dragged around by the user through it's invocation within the 'dragShade' function.

A similar mechanism is used to slide the hue slider.

Both color-picking mechanisms can also be triggered by clicking on a the hue and shade canvases.

Grid cells are generated through the 'genGrid' function, which employs the user's input from the CELL COUNTER form (exclusively a whole number from 1 tot 100) in the 'mkCells' function.

The CLEAR and REST buttons have event listeners attached to allow the users to either remove cell coloring or remove the cells from the grid.

SWATCHES can be either CUSTOM or LEGACY, and can be accesed through the PALETTES buttons in the toolbar.

CUSTOM SWATCHES are generated through the 'mkSwatches' function, wich populates and empty array 'swatches'.

LEGACY SWATCHES are generated through three functions: 'mkContainers' creates the containers, 'mkPlt' populates them, and 'mkLegSwatches' colors the swatches from the objects held in the 'swatchProps' array.

Coloring mode changes are handled by the 'switchTools' function.

The grid cell coloration itself is made possible through the 'colorCell' functions, which conditionally applies color based on the active color mode: SOLID, WATERCOLOR or MULTICOLOR. Erasing color from the cells is handled by the same function, which provides a HARD eraser and a SOFT eraser.

When MULTICOLOR mode is active, the user can choose to color linearly or randomly.

Finally, the descriptions within the INFORMATION modal are toggled through the 'toggleDesc' function.
