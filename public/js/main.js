(function() {
	console.log('Hello!')

	var canvas = document.getElementById('poi-world')

	var ctx = canvas.getContext('2d')

	window.world = new World(new vec2(0, -.1), 1, canvas, ctx)

	var ball = new Ball(new vec2(50, 200), 1, 20, 'red')

	world.addBody(ball)

	window.clearCanvas = function(canvas, ctx) {
		ctx.save();

		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		ctx.restore();
	}
})()