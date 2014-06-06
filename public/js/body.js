(function() {
	window.RigidBody = function(m, pos) {
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
			b.accel = b.netForces().div(m)

			b.vel = b.vel.add((oldAccel + b.accel).mul(.5 * dt))
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
})()