(function() {

	window.vec2 = function(x, y) {
		var v = this

		v.x = x
		v.y = y

		// properties
		v.phase = function() {
			return Math.atan2(v.y, v.x)
		}

		v.mag = function() {
			return Math.sqrt(v.x * v.x, v.y * v.y)
		}

		v.hat = function() {
			var mag = v.mag()
			return new vec2(v.x / mag, v.y / mag)
		}

		// vector operations
		v.add = function(w) {
			return new vec2(v.x + w.x, v.y + w.y)
		}

		v.sub = function(w) {
			return new vec2(v.x - w.x, v.y - w.y)
		}

		v.dot = function(w) {
			return new vec2(v.x * w.x, v.y * w.y)
		}

		v.cross = function(w) {
			return (v.x * w.y) - (v.y * w.x)
		}

		// scalar operations
		v.mul = function(a) {
			return new vec2(v.x * a, v.y * a)
		}

		v.div = function(a) {
			return new vec2(v.x / a, v.y / a)
		}

		v.print = function() {
			console.log(v.x + ', ' + v.y)
		}

		return v
	}

})()