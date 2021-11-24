class Agent extends Vehicle{

    constructor(initialEnergy, 
                foodEnergy, 
                lostEnergy, 
                maxEnergy, 
                reprodProb, 
                reprodNumber,
                visionR,
                maxSpeed,
                r) {
        
        // initial position
        let x = Math.random() * (width-1) + 1
        let y = Math.random() * (height-1) + 1
        super(x, y)

        // parameters
        this.energy = initialEnergy
        this.foodEnergy = foodEnergy
        this.lostEnergy = lostEnergy
        this.maxEnergy = maxEnergy
        this.reprodProb = reprodProb
        this.reprodNumber = reprodNumber
        this.visionR = visionR
        this.maxSpeed = maxSpeed
        this.r = r

    }

    live() {
        // loosing energy
        this.energy -= this.lostEnergy
    }

    died() {
        // if energy <= 0, the agent died
        return this.energy <= 0 ? true : false
    }

    eat() {
        // earning energy from food
        this.energy += this.foodEnergy
        // assuring the energy is not more than the max amount of energy
        if (this.energy > this.maxEnergy) {
            this.energy = this.maxEnergy
        }
    }

    reproduced() {
        let p = Math.random()
        return p <= this.reprodProb ? true : false
    }

}