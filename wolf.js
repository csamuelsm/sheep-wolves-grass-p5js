// parameters
let wolfInitialEnergy = 500
let wolfFoodEnergy = 50
let wolfLostEnergy = 4
let wolfMaxEnergy = 2000
let wolfReprodProb = 0.002
let wolfReprodNumber = 3
let wolfVisionR = 0
let wolfMaxSpeed = 10
let wolfR = 8

class Wolf extends Agent {

    constructor() {
        
        super(wolfInitialEnergy, 
            wolfFoodEnergy, 
            wolfLostEnergy, 
            wolfMaxEnergy, 
            wolfReprodProb, 
            wolfReprodNumber, 
            wolfVisionR, 
            wolfMaxSpeed, 
            wolfR)

    }

    show() {

        push() // starting a new drawing state
        translate(this.pos.x, this.pos.y) // displacing the cursor by pos.x and pos.y

        // vision field
        /*noStroke()
        fill('rgba(255, 0, 0, 0.3)')
        circle(0, 0, this.visionR)*/

        fill(56, 56, 56) // setting fill color as rgb(56, 56, 56)
        strokeWeight(1) // setting stroke weight as 1
        // displaying the triangle with:
        // vertex 1: (-radius, -radius / 2)
        // vertex 2: (-radius, radius / 2)
        // vertex 3: (radius, 0)
        // remember that this is displaced by pos.x and pos.y because of `translate()`
        rotate(this.vel.heading())
        triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0)
        pop() // restoring the previous drawing state

    }

    get poly() {

        let angle = this.vel.heading()

        let wPoly = [
            createVector(-this.r, -this.r/2).rotate(angle).add(this.pos.x, this.pos.y),
            createVector(-this.r, this.r/2).rotate(angle).add(this.pos.x, this.pos.y),
            createVector(this.r, 0).rotate(angle).add(this.pos.x, this.pos.y)
        ]

        return wPoly
    }

}