// parameters
let sheepInitialEnergy = 200
let sheepFoodEnergy = 12
let sheepLostEnergy = 2
let sheepMaxEnergy = 1400
let sheepReprodProb = 0.004
let sheepReprodNumber = 2
let sheepVisionR = 0
let sheepMaxSpeed = 8
let sheepR = 7

class Sheep extends Agent {

    constructor() {

        super(sheepInitialEnergy, 
            sheepFoodEnergy, 
            sheepLostEnergy, 
            sheepMaxEnergy, 
            sheepReprodProb, 
            sheepReprodNumber, 
            sheepVisionR, 
            sheepMaxSpeed, 
            sheepR)

    }

    show() {

        push() // starting a new drawing state
        translate(this.pos.x, this.pos.y) // displacing the cursor by pos.x and pos.y

        // vision field
        /*noStroke()
        fill('rgba(0, 0, 255, 0.3)')
        circle(0, 0, this.visionR)*/

        fill(255, 255, 255) // setting fill color as rgb(255, 255, 255)
        strokeWeight(1)
        circle(0, 0, this.r)	// drawing a circle in the position (0, 0) with a the specified radius
	    // note that the circle position is (0, 0) but we have translated the cursor by pos.x and pos.y before
	    // thus the circle will be displayed in position (0 + pos.x, 0 + pos.y) = (pos.x, pos.y)
	    pop() // restoring the previous drawing state
        
    }

}