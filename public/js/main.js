(function() {
	window.clearCanvas = function(canvas, ctx) {
		ctx.save();

		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.restore();
	}

	console.log('Hello!')

	var canvas = document.getElementById('poi-world')

	var ctx = canvas.getContext('2d')

	window.world = new World(new vec2(0, -9.8), 1000/250, canvas, ctx)

	var linkLength = .1

	var link = new Ball(world.mouse.pos.sub(new vec2(0, linkLength)), .1, linkLength/2, 'green')
	var chainSpring = new Spring(1000, .01, linkLength)
	var chain = new Chain(link, 20, .1)

	world.addBody(chain)
	chainSpring.attachBodies(world.mouse, link)

	world.start()
})()