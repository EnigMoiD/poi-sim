(function() {
	window.RigidBody = function(pos, m) {
		var b = this

		b.m = m
		b.pos = pos
		b.vel = new vec2(0, 0)
		b.accel = new vec2(0, 0)

		b.prevPos = pos

		b.forces = []
		b.springs = []

		b.step = function(dt) {
			var prevPos = b.pos

			b.pos = b.pos.mul(2).sub(b.prevPos).add(b.accel.mul(dt*dt))

			b.accel = b.netForces().div(b.m)

			b.prevPos = prevPos
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

				sForces.push(s.spring.F(b.pos, s.body.pos))
				sForces.push(s.spring.damping(b.vel, s.body.vel))
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

	window.Anchor = function(pos) {
		var a = new RigidBody(pos, 1)

		a.step = function() {}

		a.draw = function(ctx, canvasHeight, pixPerM) {
			var oldFill = ctx.fillStyle

			ctx.strokeStyle = 'black'
			ctx.beginPath()

			ctx.arc(a.pos.x*pixPerM, canvasHeight - a.pos.y*pixPerM, 1e-1*pixPerM, 0, 2*Math.PI)
			ctx.stroke()

			ctx.fillStyle = oldFill
		}

		return a
	}
})()