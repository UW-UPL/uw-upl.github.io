/*
 * The chaos game is a stochastic method of drawing a fractal by starting with a 
 * random point and iteratively applying one of many linear functions to it. The
 * resulting fractal is the attractor of the iterated function system.
 * This is faster than directly drawing a fractal, since the number of vertices
 * on the border can grow exponentially.
 * 
 * Adjust the following two parameters to increase quality/time spent. Since the
 * points converge very quickly to the fractal, numIterations does not need to 
 * be that high.
 */
var numPoints = 500000
var numIterations = 20

function draw(fractal, canvas) {
    start = Date.now()
    ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "#000000"
    for(i = 0; i < numPoints; i++) {
	// Initialize a random point in the square
	pt = [Math.random(), Math.random()]
	
	// Repeatedly apply random maps (the point will converge on the fractal)
	for(j = 0; j < numIterations; j++) {
	    pt = fractal.maps[Math.floor(Math.random()*fractal.maps.length)](pt)
	}
	
	// Draw resulting point (in mathematical Cartesian coordinates)
	posX = (pt[0] - fractal.bottom_left[0]) /
            (fractal.top_right[0] - fractal.bottom_left[0])
	posY = (pt[1] - fractal.bottom_left[1]) /
            (fractal.top_right[1] - fractal.bottom_left[1])
	ctx.fillRect(Math.round(posX * canvas.width),
                     Math.round((1 - posY) * canvas.height), 1, 1)
    }
    end = Date.now()
    console.log("Time taken: " + (end - start) + "ms")
}
