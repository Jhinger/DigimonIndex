"use strict";
var DejimonServices = /** @class */ (function () {
    function DejimonServices() {
        this.dejimonArray = [];
    }
    DejimonServices.prototype.strength = function (d) {
        return (d.height + d.abilityPower + d.weight) / 3;
    };
    DejimonServices.prototype.add = function (d) {
        d.dejimonID = DejimonServices.dejimonID;
        DejimonServices.dejimonID++;
        this.dejimonArray.push(d);
        console.log("Added a Dejimon");
    };
    DejimonServices.dejimonID = 0;
    return DejimonServices;
}());
