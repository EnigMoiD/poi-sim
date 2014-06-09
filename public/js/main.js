(function() {
	console.log('Hello!')

	var canvas = document.getElementById('poi-world')

	var ctx = canvas.getContext('2d')

	window.world = new World(new vec2(0, -9.8), 1000/60, canvas, ctx)

	var ball = new Ball(new vec2(4, 4), 1, 5e-1, 'red')
	var blueBall = new Ball(new vec2(4, 3), 2, 5e-1, 'blue')

	var anchor = new Anchor(new vec2(4, 9))

	world.addBody(ball)
	world.addBody(blueBall)
	world.addBody(anchor)

	var spring = new Spring(100, 1)
	spring.attachBodies(ball, blueBall)

	var newSpring = new Spring(10, 1)
	newSpring.attachBodies(anchor, ball)

	window.clearCanvas = function(canvas, ctx) {
		ctx.save();

		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.restore();
	}
})()