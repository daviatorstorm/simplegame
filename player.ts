class Player {
    x: number;
    y: number;

    constructor(public color: string, startPosition: { x: number, y: number }) {
        this.x = startPosition.x;
        this.y = startPosition.y;
     }
}