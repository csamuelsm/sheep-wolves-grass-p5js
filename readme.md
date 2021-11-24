### Sheep - Wolves - Grass model in p5.js

This model takes inspiration from [NetLogo's Sheep Wolves Predation model](http://www.netlogoweb.org/launch#http://ccl.northwestern.edu/netlogo/models/models/Sample%20Models/Biology/Wolf%20Sheep%20Predation.nlogo). It was written in JavaScript using p5.js library. I also used p5.collide2D for collisions and grafica.js for plotting. I used the `vehicle.js` from Daniel Shiffman and The Coding Train, they have my acknowledgment. 

### How to run

Download the files or clone this repository. If you don't have node.js, install it. Install `http-server` with:

```
npm install -g http-server
```

Then, `cd` to the project's folder and run:

```
http-server
```

In your browser, go to `localhost:8080`.

Try to change the parameters in `sketch.js`, `wolf.js` and `sheep.js` and see different results. Try to create variations of the model, adding or removing features.