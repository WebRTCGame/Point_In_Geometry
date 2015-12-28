        var PI2 = Math.PI * 2;
        
        function ptInTriangle(p, p0, p1, p2) {
            var A = 1 / 2 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
            var sign = A < 0 ? -1 : 1;
            var s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * p.x + (p0.x - p2.x) * p.y) * sign;
            var t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * p.x + (p1.x - p0.x) * p.y) * sign;

            return s > 0 && t > 0 && (s + t) < 2 * A * sign;
        }

        function toRadians(deg) {
            return deg * Math.PI / 180;
        };


        // Converts from radians to degrees.
        function toDegrees(radians) {
            return radians * 180 / Math.PI;
        };

        function midpoint(x1, y1, x2, y2) {
            return {
                x: (x1 + x2) / 2,
                y: (y1 + y2) / 2
            };
        };

        function pointAngle(x1, y1, x2, y2) {
            //var tempX = x2 - x1;
            //var tempY = y2 - y1;

            return wrap2P(Math.atan2(y2 - y1, x2 - x1));
            
            //return theta; //theta * 180 / Math.PI;
        };

        function point(x, y) {
            return {
                x: x,
                y: y
            };
        };

        function distance(x1, y1, x2, y2) {
            return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2);
        };

        function near(x1, y1, x2, y2, length) {
            return distance(x1, y1, x2, y2) <= length;
        };

        function getPointAL(x, y, angle, length) {
            var radA = toRadians(angle);
            return {
                x: x + length * Math.cos(radA),
                y: y + length * Math.sin(radA)
            };
        };

        function wrap2P(b) {
            0 > b && (b += PI2);
            b > PI2 && (b -= PI2);
            return b;
        }