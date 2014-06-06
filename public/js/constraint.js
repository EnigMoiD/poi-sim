(function() {
	window.Spring = function(K, lRest, startPos, endPos) {
		var s = this

		s.K = K
		s.lRest = lRest
		s.startPos = startPos || null
		s.endPos = endPos || null

		s.attach = function(body) {
			var addedStart = false
			if (s.startPos) {
				s.endPos = body.pos
				addedStart = false
			}
			else {
				s.startPos = body.pos
				addedStart = true
			}

			return addedStart
		}

		s.F = function(start) {
			var spring = endPos.sub(startPos)

			var x = spring.hat().mul(spring.mag() - lRest)

			return x.mul(s.K * start? 1 : -1)
		}

		return s
	}
})()