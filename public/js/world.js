(function() {
	window.World = function(g, dt, canvas, ctx) {
		var w = this

		w.g = g
		w.dt = dt/1000
		w.canvas = canvas
		w.ctx = ctx

		w.pixPerM = 100

		w.bodies = []

		w.addBody = function(body) {
			body.addGravity(w.g)
			w.bodies.push(body)
		}

		w.step = function() {
			clearCanvas(canvas, ctx)
			for (var i in w.bodies) {
				w.bodies[i].step(w.dt)
				w.bodies[i].draw(w.ctx, w.canvas.height, w.pixPerM)
			}
		}

		w.timer = setInterval(w.step, dt)

		return w
	}
})()