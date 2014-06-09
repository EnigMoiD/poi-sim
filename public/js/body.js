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

		ball.draw = function(ctx, canvasHeight, pixPerM) {
			var oldFill = ctx.fillStyle

			ctx.fillStyle = ball.color
			ctx.beginPath()
			ctx.arc(ball.pos.x*pixPerM, canvasHeight - ball.pos.y*pixPerM, ball.diameter*pixPerM, 0, 2*Math.PI)
			ctx.fill()

			ctx.fillStyle = oldFill
		}

		return ball
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

	window.Chain = function(link, springK, springLRest, numLinks) {
		var c = this

		c.link = link
		c.springK = springK
		c.springLRest = springLRest
		c.numLinks = numLinks

		c.links = []
		c.springs = []

		c.init = function() {
			c.links.push(c.link)
			var link, spring

			for (var i = 1; i < numLinks; i++) {
				link = new Ball(new vec2(c.link.pos.x, c.link.pos.y+i*c.springLRest), c.link.m, 5e-1, 'green')
				c.links.push(link)

				spring = new Spring(c.springK, c.springLRest)
				spring.attachBodies(link, c.links[i-1])
				c.springs.push(spring)
			}
		}

		c.addGravity = function(g) {
			for (var i in c.links)
				c.links[i].addGravity(g)
		}

		c.step = function(dt) {
			for (var i in c.links)
				c.links[i].step(dt)
		}

		c.draw = function(ctx, canvasHeight, pixPerM) {
			for (var i in c.links)
				c.links[i].draw(ctx, canvasHeight, pixPerM)
		}

		c.init()

		return c
	}

})()