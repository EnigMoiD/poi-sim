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

		b.addGravity = function(g) {
			b.forces.push(g.mul(b.m))
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

		b.springForces = function(bodies) {
			var sForces = []

			for (var i in b.springs) {
				var s = b.springs[i]

				var F = s.spring.F(b.pos, s.body.pos)

				sForces.push(F)
			}

			return sForces
		}

		b.attachSpring = function(spring, body) {
			b.springs.push({
				spring: spring,
				body: body
			})
		}

		return b
	}

	window.Ball = function(pos, m, diameter, color) {
		var ball = new RigidBody(pos, m)

		ball.diameter = diameter
		ball.color = color

		ball.draw = function(ctx) {
			var oldFill = ctx.fillStyle

			ctx.fillStyle = ball.color
			ctx.beginPath()
			ctx.arc(ball.pos.x, ball.pos.y, ball.diameter, 0, 2*Math.PI)
			ctx.fill()

			ctx.fillStyle = oldFill
		}

		return ball
	}

	window.Anchor = function(pos) {
		var a = new RigidBody(pos, 1)

		a.step = function() {}

		a.draw = function(ctx) {
			var oldFill = ctx.fillStyle

			ctx.strokeStyle = 'black'
			ctx.beginPath()
			ctx.arc(a.pos.x, a.pos.y, 10, 0, 2*Math.PI)
			ctx.stroke()

			ctx.fillStyle = oldFill
		}

		return a
	}

})()