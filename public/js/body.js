(function() {
	window.RigidBody = function(m, pos) {
		var b = this

		b.m = m
		b.pos = pos
		b.vel = new vec2(0, 0)
		b.accel = new vec2(0, 0)

		b.forces = []

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

			for (var i in b.netForces)
				F = F.add(b.netForces[i])

			return F
		}

		return b
	}
})()