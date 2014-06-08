(function() {
	console.log('Hello!')

	var canvas = document.getElementById('poi-world')

	var ctx = canvas.getContext('2d')

	window.world = new World(new vec2(0, -.0001), 10, canvas, ctx)

	var ball = new Ball(new vec2(50, 200), 1, 20, 'red')
	var blueBall = new Ball(new vec2(80, 200), 2, 30, 'blue')

	var anchor = new Anchor(new vec2(80, 300))

	world.addBody(ball)
	world.addBody(blueBall)
	world.addBody(anchor)

	var spring = new Spring(.0001, 30)

	spring.attachBodies(ball, blueBall)
	var newSpring = new Spring(.01, 100)

	newSpring.attachBodies(anchor, ball)

	window.clearCanvas = function(canvas, ctx) {
		ctx.save();

		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.restore();
	}
})()