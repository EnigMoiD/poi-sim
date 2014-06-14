(function() {
	window.World = function(g, dt, canvas, ctx, framerate) {
		var w = this

		w.g = g
		w.dt = dt/1000
		w.framerate = framerate

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
		}

		w.draw = function() {
			clearCanvas(w.canvas, w.ctx)
			for (var i in w.bodies)
				w.bodies[i].draw(w.ctx, w.canvas.height, w.pixPerM)
		}

		w.mouse = new Anchor(new vec2(3, 8))
		w.addBody(w.mouse)

		w.start = function() {
			w.physTimer = setInterval(w.step, w.dt)			
			w.drawTimer = setInterval(w.draw, w.framerate)			
		}

		w.stop = function() {
			clearInterval(w.physTimer)
			clearInterval(w.drawTimer)
		}

		w.canvas.onmousemove = function(e) {
			var mousePos = new vec2(e.clientX/w.pixPerM, (w.canvas.height - e.clientY)/w.pixPerM)

			w.mouse.pos = mousePos
		}

		return w
	}
})()