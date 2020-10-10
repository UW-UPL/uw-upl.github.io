var fractals = {}

// https://en.wikipedia.org/wiki/Dragon_curve
fractals["Dragon"] = {
    bottom_left: [-3/4, -5/8],
    top_right: [3/2, 13/8],
    maps:
    [
	// See: https://en.wikipedia.org/wiki/Dragon_curve#Construction
	([x,y]) => [(x-y)/2, (x+y)/2],
	([x,y]) => [(2-x-y)/2, (2+x-y)/2]
    ]
}

// https://en.wikipedia.org/wiki/L%C3%A9vy_C_curve#IFS_construction
fractals["L\xE9vy C Curve"] = {
    bottom_left: [-1/2,-1/2],
    top_right: [1,1],
    maps:
    [
	// See: https://en.wikipedia.org/wiki/L%C3%A9vy_C_curve#IFS_construction
	([x,y]) => [(x+y)/2, (y-x)/2],
	([x,y]) => [(x-y+1)/2, (x+y)/2]
    ]
}

// https://en.wikipedia.org/wiki/Sierpi%C5%84ski_carpet
fractals["Sierpin\u0301ski Carpet"] = {
    bottom_left: [0, 0],
    top_right: [1, 1],
    maps:
    [
	([x,y]) => [x/3, y/3],
	([x,y]) => [1/3 + x/3, y/3],
	([x,y]) => [2/3 + x/3, y/3],
	([x,y]) => [x/3, 1/3 + y/3],
	([x,y]) => [2/3 + x/3, 1/3 + y/3],
	([x,y]) => [x/3, 2/3 + y/3],
	([x,y]) => [1/3 + x/3, 2/3 + y/3],
	([x,y]) => [2/3 + x/3, 2/3 + y/3]
    ]
}

// https://en.wikipedia.org/wiki/Dragon_curve#Twindragon
fractals["Twindragon"] = {
    bottom_left: [-1/2, -1/4],
    top_right: [1, 5/4],
    maps:
    [
	([x,y]) => [1/2 * (x-y+1/4), 1/2 * (x+y-1/4) + 1/4],
	([x,y]) => [1/2 * (3/4-x+y), 3/4 - 1/2 * (x+y-1/4)]
    ]
}

// https://en.wikipedia.org/wiki/Vicsek_fractal
// (cross form)
fractals["Vicsek"] = {
    bottom_left: [0, 0],
    top_right: [1, 1],
    maps:
    [
	([x,y]) => [1/3+x/3, y/3],
	([x,y]) => [x/3, 1/3+y/3],
	([x,y]) => [1/3+x/3, 1/3+y/3],
	([x,y]) => [2/3+x/3, 1/3+y/3],
	([x,y]) => [1/3+x/3, 2/3+y/3]
    ]
}
