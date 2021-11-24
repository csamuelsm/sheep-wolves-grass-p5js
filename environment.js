class Environment {

    constructor(width, height, tile_size, grow_time) {
        // checking if we can divide the screen into tiles
        if(!(width % tile_size == 0 && height % tile_size == 0)) {
            throw "dimensions and tile_size are not compatible"
        }

        this.tile_size = tile_size

        // grass_state is going to be a (width/tile_size X height/tile_size) matrix
        // if a position (i, j) is 1, then it has grass
        // if it's 0, then it has no grass
        this.grass_state = []
        this.dimensions = [width/tile_size, height/tile_size]
        
        // here we populate grass_state with the initial state of the field
        for (let i = 0; i < this.dimensions[0]; i++) {
            let line = []
            for (let j = 0; j < this.dimensions[1]; j++) {
                // the initial state of the grass field is 1 in every tile
                // i.e., there's grass in every tile of the field
                line.push(1)
            }
            this.grass_state.push(line)
        }
        
        // setting the time that the grass needs to grow
        this.growTime = grow_time
    }

    update() {
        for (let i = 0; i < this.dimensions[0]; i++) {
            for (let j = 0; j < this.dimensions[1]; j++) {
                if (this.grass_state[i][j] > 1) {
                    // decreasing the time needed to regrow grass tile (i, j)
                    this.grass_state[i][j] -= 1
                }
            }
        }
    }

    grassAvailable(x, y) {
        let i = Math.floor(x/this.tile_size)
        let j = Math.floor(y/this.tile_size)

        if (i < 0 || i >= this.dimensions[0] || j < 0 || j >= this.dimensions[1]) {
            return null
        }

        if (this.grass_state[i][j] == 1) {
            return [i, j, true]
        } else {
            return [i, j, false]
        }
    }

    tileEaten(i, j) {
        // tile has been eaten and now needs to wait growTime time steps to regrow
        this.grass_state[i][j] += this.growTime
    }

    show() {

        push()
        noStroke()

        //drawing grass tiles
        for (let i = 0; i < this.dimensions[0]; i++) {
            for (let j = 0; j < this.dimensions[1]; j++) {

                let x = i*this.tile_size // position x of tile
                let y = j*this.tile_size // position y of tile

                let tile_state = this.grass_state[i][j]

                if (tile_state == 1) {
                    // there's grass available in this tile
                    fill(0, 204, 102) // green color
                } else {
                    // there isn't grass available in this tile
                    fill(153, 153, 102) // brown color
                }

                // drawing a square of side tile_size in position (x, y)
                rect(x, y, this.tile_size, this.tile_size)

            }
        }

        pop()
        
    }

}