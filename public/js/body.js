(function() {
	window.RigidBody = function(pos, m) {
		var b = this

		b.m = m
		b.pos = pos
		b.vel = new vec2(0, 0)
		b.accel = new vec2(0, 0)

		b.forces = []
		b.springs = []

		b.step = function(dt) {
			b.pos = b.pos.add(b.vel.mul(dt)).add(b.accel.mul(.5 * dt*dt))

			var oldAccel = b.accel
			b.accel = b.netForces().div(b.m)

			b.vel = b.vel.add((oldAccel.add(b.accel)).mul(.5 * dt))
		}

		b.addForce = function(F) {
			b.forces.push(F)
		}

		b.netForces = function() {
			var F = new vec2(0, 0)

			for (var i in b.forces)
				F = F.add(b.forces[i])

			var springForces = b.springForces()
			for (var i in springForces)
				F = F.add(springForces[i])

			return F
		}

		b.springForces = function() {
			var sForces = []

			for (var i in b.springs) {
				var s = b.springs[i]

				sForces.push(s.spring.F(s.start))
			}

			return sForces
		}

		b.attachSpring = function(spring) {
			b.springs.push({
				spring: spring,
				start: spring.attach(b)
			})
		}

		return b
	}

	window.Ball = function(pos, m, diameter, color) {
		var ball = new RigidBody(pos, m)

		ball.diameter = diameter
		ball.color = color

		ball.draw = function(ctx) {
			ctx.fillStyle = ball.color
			ctx.strokeStyle = ball.color
			ctx.beginPath()
			ctx.arc(ball.pos.x, ball.pos.y, ball.diameter, 0, 2*Math.PI)
			ctx.stroke()
		}

		return ball
	}
})()