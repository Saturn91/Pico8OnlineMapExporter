# Pico8 map to png export

# Pico Datastructure (card.p8) analisys:

## Dedicated Map area in file

After the tag ```__map__```  there is a data string represented as pairs of numbers representing the map from tile 0,0 to tile 127, 47

the pair of numbers actually represents the offset of the drawn Tile in the sprite map, so 10 means 1 sprites in y (starts at 0) and 0 sprites in x (starts at 0)

## Dual purpose Sprite / Map area

After the ```__gfx__``` tag there are 2 sheets of sprites which can only be used as sprites, after that there is a dual purpose section which can be used both as 
spritesheet and map area, BUT only one at a time

In our case as we want users be able to choose the total size of their map, we will also make that data available

So the first 4x16 Sprite sections are actually Sprite only purpose, so we can ignore those. 

The first Sprite which can be used as a Map-Tile is: Sprite 128 or Sprite 8,0. This Sprite represents sprite 0,32 in map Data. 

The second dual purpose section starts at sprite: Sprite 128 or Sprite 12,0. This Sprite represents sprite 0,48 in map Data. 

## Printing the map data on a canvas

To achieve our map printing Programm we have to do the following steps:
1. implement a file uploader to allow importing pico.p8 cart data.
2. extract the map and dual purpose GFX data from the given string
3. extract the different sprite map data from the single use section of the sprites
4. create single smaller canvases containing all the sprites
5. glue the sprites together in a larger canvas based on map data
6. make a file download available for the finalized pico8 map drawing

7. Add controlls to let User define how big the map data is (should the dual purpose 1 / 2 Sections be used as Map or as Sprite Data?)
8. Let the user define a backgroundcolor