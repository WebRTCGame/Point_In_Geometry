var Shape = function(x, y) {
    this.recompute = true;
    var _x, _y;
    Object.defineProperty(this, 'x', {
        get: function() {
            return _x;
        },
        set: function(newValue) {
            this.recompute && _x !== newValue && this.recomputeFunction();
            _x = newValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(this, 'y', {
        get: function() {
            return _y;
        },
        set: function(newValue) {
            this.recompute && _y !== newValue && this.recomputeFunction();
            _y = newValue;
        },
        enumerable: true,
        configurable: true
    });
    this.x = x || 0;
    this.y = y || 0;
};

Shape.prototype.clone = function() {};
Shape.prototype.contains = function() {};
Shape.prototype.getBounds = function() {};
Shape.prototype.recomputeFunction = function() {};

var Circle = function(x, y, radius) {
    Shape.call(this, x, y);
    var _radius;
    Object.defineProperty(this, 'radius', {
        get: function() {
            return _radius;
        },
        set: function(newValue) {
            this.recompute && _radius !== newValue && this.recomputeFunction();
            _radius = newValue;
        },
        enumerable: true,
        configurable: true
    });
    this.radius = radius || 0;
    if (!(this instanceof Circle)) {
        Array.prototype.unshift.call(arguments, undefined);
        return new(Circle.bind.apply(Circle, arguments));
    }
    return this;
};
Circle.prototype = Object.create(Shape.prototype);

Circle.prototype.clone = function() {
    return new Circle(this.x, this.y, this.radius);
};
Circle.prototype.contains = function(x, y) {
    if (this.radius <= 0) {
        return false;
    }

    var dx = (this.x - x),
        dy = (this.y - y),
        r2 = this.radius * this.radius;

    dx *= dx;
    dy *= dy;

    return (dx + dy <= r2);
};
Circle.prototype.recomputeFunction = function() {
    this.bounds = new Rectangle(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
};
Circle.prototype.getBounds = function() {
    return this.bounds; //new Rectangle(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
};

var Rectangle = function(x, y, width, height) {
    Shape.call(this, x, y);
    this.width = width || 0;
    this.height = height || 0;
    this.oppositePoint = function() {
        return {
            x: this.x + this.width,
            y: this.y + this.height
        };
    };
    if (!(this instanceof Rectangle)) {
        Array.prototype.unshift.call(arguments, undefined);
        return new(Rectangle.bind.apply(Rectangle, arguments));
    }
    return this;
};
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.clone = function() {
    return new Rectangle(this.x, this.y, this.width, this.height);
};

Rectangle.prototype.contains = function(x, y) {

    var opP = this.oppositePoint();
    return x > this.x && x < opP.x && y > this.y && y < opP.y;
};

var Square = function(x, y, width) {
    Rectangle.call(this, x, y, width, width);
    if (!(this instanceof Square)) {
        Array.prototype.unshift.call(arguments, undefined);
        return new(Square.bind.apply(Square, arguments));
    }
    return this;
};
Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.clone = function() {
    return new Square(this.x, this.y, this.width);
};


var Polygon = function(points) {
    Shape.call(this);



};
Polygon.prototype = Object.create(Shape.prototype);



var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;

function getParamNames(func) {
    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null)
        result = [];
    return result;
}

/*
    var paramNames = getParamNames(CircleSegment);

    //var vals = new Array(arguments.length);

    //this.recompute = true;
    for (var i = 0; i < paramNames.length; i++) {
        this[paramNames[i]] = arguments[i];
    }
    if (!(this instanceof CircleSegment)) {
        Array.prototype.unshift.call(arguments, undefined);
        return new(CircleSegment.bind.apply(CircleSegment, arguments));
    }
    */

var CircleSegment = function(x, y, radius, theta, direction) {
    Object.apply(this, arguments);
    
    this.x = x || 0;
    this.y = y || 0;
    this.radius = radius || 0;
    this.theta = theta || 0;
    this.direction = direction || 0;
    return this;
};
CircleSegment.prototype = Object.create(Object.prototype);

CircleSegment.prototype.clone = function() {
    return new CircleSegment(this.x, this.y, this.radius, this.theta, this.direction);
};
CircleSegment.prototype.arcFrom = function() {
    return wrap2P(this.direction - this.theta * 0.5);
};
CircleSegment.prototype.arcTo = function() {
    return wrap2P(this.direction + this.theta * 0.5);
};
CircleSegment.prototype.isNear = function(x, y) {
    return near(x, y, this.x, this.y, this.radius);
};

CircleSegment.prototype.contains = function(x, y) {


    var fromAngle = this.arcFrom(),
    toAngle = this.arcTo(),
    angleToPoint = pointAngle(this.x, this.y, x, y);

    return fromAngle >= toAngle ?
        angleToPoint >= toAngle && angleToPoint <= fromAngle ?
        false :
        this.isNear(x, y) ?
        true :
        false :
        angleToPoint >= fromAngle && angleToPoint <= toAngle && this.isNear(x, y) ?
        true :
        false;
};

CircleSegment.prototype.draw = function(ictx) {
    ictx.beginPath();
    ictx.moveTo(this.x, this.y);
    ictx.arc(this.x, this.y, this.radius, this.arcFrom(), this.arcTo());
    ictx.lineTo(this.x, this.y);
    ictx.closePath();
    ictx.fillStyle = 'rgba(0,255,0,0.25)';
    ictx.fill();
    ictx.stroke();
};
