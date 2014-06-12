(function() {
	window.Spring = function(K, lRest) {
		var s = this

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

		return s
	}
})()