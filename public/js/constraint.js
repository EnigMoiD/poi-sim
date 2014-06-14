(function() {
	window.Spring = function(K, b, lRest) {
		var s = this

		s.b = b
		s.K = K
		s.lRest = lRest

		s.attachBodies = function(start, end) {
			start.attachSpring(s, end)
			end.attachSpring(s, start)
		}

		s.F = function(startPos, endPos) {
			var spring = endPos.sub(startPos)

			return spring.hat().mul(s.K*(spring.mag() - s.lRest))
		}

		s.damping = function(startVel, endVel) {
			var dVel = endVel.sub(startVel)

			return dVel.mul(b*5)
		}

		return s
	}

	window.Constraint = function(length) {
		var con = this

		con.length = length

		con.enforce = function(start, end) {
			var avg = end.pos.add(start.pos).div(2)
			var dir = end.pos.sub(start.pos).hat()

			start.pos = avg.sub(dir.mul(con.length/2))
			end.pos = avg.add(dir.mul(con.length/2))
		}

		return con
	}
})()