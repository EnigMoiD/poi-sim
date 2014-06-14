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
			w.draw()
		}

		w.step = function() {
			for (var i in w.bodies)
				w.bodies[i].step(w.dt)
			w.draw()
		}

		w.draw = function() {
			clearCanvas(w.canvas, w.ctx)
			for (var i in w.bodies)
				w.bodies[i].draw(w.ctx, w.canvas.height, w.pixPerM)
		}

		w.mouse = new Anchor(new vec2(3, 8))
		w.addBody(w.mouse)

		w.start = function() {
			w.timer = setInterval(w.step, dt)			
		}

		w.stop = function() {
			clearInterval(w.timer)
		}

		w.canvas.onmousemove = function(e) {
			var mousePos = new vec2(e.clientX/w.pixPerM, (w.canvas.height - e.clientY)/w.pixPerM)

			w.mouse.pos = mousePos
		}

		return w
	}
})()