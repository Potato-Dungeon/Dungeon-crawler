/*  GET TEXTURE
    Used for tileset and spritesheet reading
    x mean where in the x-axis (not pixels) the object are
    y mean where in the y-axis (not pixels) the object are
    size mean what size the sprite or tile is, must be square
*/
export function getTexture(x, y, size) {
    return `-${x * size}px -${y * size}px`;
}

// Checks if position will collide with symbol. Symbol could be W (wall), c (coin)
// return true if position equals symbol, else false
export function collidesWithSymbol(position, symbol) {
    if (position == symbol){
        return true;
    }

    return false;
}