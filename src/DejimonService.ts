
interface Services {
    strength(d: Dejimon): number;
    add(d: Dejimon): void;
}

class DejimonServices implements Services {
    dejimonArray: Dejimon[];
    static dejimonID = 0;
    
    constructor() {
        this.dejimonArray = [];
    }

    strength(d: Dejimon): number {
        return (d.height + d.abilityPower + d.weight) / 3;
    }

    add(d: Dejimon): void {
        d.dejimonID = DejimonServices.dejimonID;
        DejimonServices.dejimonID++;
        this.dejimonArray.push(d);
        console.log("Added a Dejimon");
    }
}