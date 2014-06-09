(function() {
	console.log('Hello!')

	var canvas = document.getElementById('poi-world')

	var ctx = canvas.getContext('2d')

	window.world = new World(new vec2(0, -9.8), 1000/60, canvas, ctx)

	var anchor = new Anchor(new vec2(4, 9))

	world.addBody(anchor)

	var link = new Ball(new vec2(4, 8), 1, 5e-1, 'green')
	var chain = new Chain(link, 50, 70e-3, 4)

	world.addBody(chain)
	var hanger = new Spring(50, 1)
	hanger.attachBodies(anchor, link)

	window.clearCanvas = function(canvas, ctx) {
		ctx.save();

		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.restore();
	}
})()