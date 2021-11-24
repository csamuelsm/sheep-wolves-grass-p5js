let initialSheep = 15
let initialWolves = 5

let sheep = []
let wolves = []

let environment;
let tile_size = 10
let grow_time = 400

let fr = 60
let w = 500
let h = 500

let sheepPopulation = []
let wolvesPopulation = []
let time_step = 0

function setup() {
    frameRate(fr)
    createCanvas(w, h)
    // populating sheep array
    for (let i = 0; i < initialSheep; i++) {
        sheep.push(new Sheep())
    }
    
    // populating wolves array
    for (let i = 0; i < initialWolves; i++) {
        wolves.push(new Wolf())
    }

    environment = new Environment(width, height, tile_size, grow_time)

    // setup for plot
    plot = new GPlot(this)
    plot.setPos(0.5 * width, 0.6 * height)
    plot.setOuterDim(0.5 * width, 0.4 * height)
    plot.getXAxis().getAxisLabel().setText("time")
    plot.getYAxis().getAxisLabel().setText("population")
    plot.getTitle().setText("Population over time")
    plot.setPoints(sheepPopulation)
    plot.setLineColor(color(255, 255, 255))
    plot.addLayer("layer 1", wolvesPopulation)
    plot.getLayer("layer 1").setLineColor(color(102, 102, 102))

}

function draw() {

    // updating and displaying grass field
    environment.update()
    environment.show()

    // displaying sheep
    for (let i = 0; i < sheep.length; i++) {
        let s = sheep[i]
        
        // check if the sheep needs to flee
        let closestWolf = null
        for (let j = 0; j < wolves.length; j++) {
            let w = wolves[j]
            let wPoly = w.poly // getting the wolf polygon

            // checking the collision between the wolf polygon and the sheep's vision radius
            if (collideCirclePoly(s.pos.x, s.pos.y, s.visionR, wPoly)) {
                if (closestWolf == null ||
                    dist(s.pos.x, s.pos.y, w.pos.x, w.pos.y) < dist(closestWolf.pos.x, closestWolf.pos.y, s.pos.x, s.pos.y)) {
                        // calculating the closest wolf inside the vision radius  
                        closestWolf = w
                    }
            }
        }
        if (closestWolf == null) {
            // if there's no wolf inside the vision radius
            // the sheep keeps wandering
            s.wander()
        } else {
            // if there's any wolf inside the vision radius
            // the sheep will try to flee from him
            let force = s.flee(closestWolf.pos)
            s.applyForce(force)
        }

        s.update()
        s.show()
        s.edges()
        s.live()

        let grassAvailable = environment.grassAvailable(s.pos.x, s.pos.y)
        if (grassAvailable != null && grassAvailable[2]) {
            // the tile hass grass available
            s.eat() // the sheep eats
            environment.tileEaten(grassAvailable[0], grassAvailable[1]) // the grass tile is updated
        }

        // reproduction
        if (s.reproduced()) {
            for(let k = 0; k < s.reprodNumber; k++) {
                sheep.push(new Sheep())
            }
        }

        // death
        if (s.died()) {
            sheep.splice(i, 1)
        }
    }

    //displaying wolves
    for (let i = 0; i < wolves.length; i++) {
        let w = wolves[i]
        
        // check if there's a sheep to hunt
        let closestSheep = null
        for (let j = 0; j < sheep.length; j++) {
            let s = sheep[j]
            if (collideCircleCircle(s.pos.x, s.pos.y, s.r, w.pos.x, w.pos.y, w.visionR)) {
                if (closestSheep == null || 
                    dist(s.pos.x, s.pos.y, w.pos.x, w.pos.y) < dist(closestSheep.pos.x, closestSheep.pos.y, w.pos.x, w.pos.y)) {
                        closestSheep = s
                }
            }
        }
        if (closestSheep == null) {
            // there's no sheep in the vision radius
            w.wander()
        } else {
            // seek the closest sheep in the vision radius
            let force = w.seek(closestSheep.pos)
            w.applyForce(force)
        }

        w.update()
        w.show()
        w.edges()
        w.live()

        //check if some wolf caught a sheep
        let wPoly = w.poly
        for (let j = 0; j < sheep.length; j++) {
            let s = sheep[j]
            if (collideCirclePoly(s.pos.x, s.pos.y, s.r, wPoly)) {
                //the wolf killed the sheep j
                sheep.splice(j, 1)
                w.eat()
            }
        }

        // reproduction
        if (w.reproduced()) {
            for(let k = 0; k < w.reprodNumber; k++) {
                wolves.push(new Wolf())
            }
        }

        // death
        if (w.died()) {
            wolves.splice(i, 1)
        }
    }

    // adding points to the plot
    let sheepNumber = sheep.length
    let wolvesNumber = wolves.length
    sheepPopulation.push(new GPoint(time_step, sheepNumber, "(" + time_step + " , " + sheepNumber + ")"))
    wolvesPopulation.push(new GPoint(time_step, wolvesNumber, "(" + time_step + " , " + wolvesNumber + ")"))
    plot.setPoints(sheepPopulation)
    plot.getLayer("layer 1").setPoints(wolvesPopulation)


    //drawing plot
    plot.beginDraw()
    //plot.drawBox()
    plot.drawXAxis()
    plot.drawYAxis()
    plot.drawTitle()
    plot.drawGridLines(GPlot.BOTH)
	plot.drawLines()
    plot.endDraw()

    // updating time_step
    time_step += 1

}