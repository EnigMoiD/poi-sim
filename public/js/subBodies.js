(function() {
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

	window.Chain = function(link, numLinks, dist) {
		var c = this

		c.link = link
		c.numLinks = numLinks
		c.dist = dist
		c.constraint = new Constraint(dist)

		c.firstLink = link

		c.lastLink = link

		c.links = []

		c.init = function() {
			c.links.push(c.link)
			var link

			for (var i = 1; i < numLinks; i++) {
				link = new Ball(new vec2(c.link.pos.x, c.link.pos.y-i*c.dist), c.link.m, c.dist/2, 'green')
				c.links.push(link)
			}

			c.lastLink = c.links[numLinks-1]
		}

		c.addGravity = function(g) {
			for (var i in c.links)
				c.links[i].addGravity(g)
		}

		c.step = function(dt) {
			c.enforceConstraints()
			for (var i in c.links)
				c.links[i].step(dt)
		}

		c.enforceConstraints = function() {
			for (var i = 1; i < numLinks; i++)
				c.constraint.enforce(c.links[i-1], c.links[i])
		}

		c.draw = function(ctx, canvasHeight, pixPerM) {
			for (var i in c.links)
				c.links[i].draw(ctx, canvasHeight, pixPerM)
		}

		c.init()

		return c
	}

	window.Poi = function(ball, chain) {
		var p = this

		p.ball = ball
		p.chain = chain

		p.link = p.chain.constraint

		p.addGravity = function(g) {
			p.chain.addGravity(g)
			p.ball.addGravity(g)
		}

		p.step = function(dt) {
			p.ball.step(dt)
			p.chain.step(dt)

			p.link.enforce(p.ball, p.chain.lastLink)
		}

		p.draw = function(ctx, canvasHeight, pixPerM) {
			p.ball.draw(ctx, canvasHeight, pixPerM)
			p.chain.draw(ctx, canvasHeight, pixPerM)
		}

		return p
	}
})()