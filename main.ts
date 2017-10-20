const KeyBind = {
    RIGHT: 39,
    LEFT: 37,
    UP: 38,
    DOWN: 40
};

class Game {
    matrix: HTMLElement[][];
    table: HTMLTableElement;
    player: Player;
    foe: Player;
    matrixWidth = 20;
    matrixHeight = 20;

    constructor() {
        this.matrix = [];
        this.table = this.initTable();
        this.player = new Player('red', { x: 0, y: 0 });
        this.foe = new Player('blue', { x: this.random(1, this.matrixWidth - 1), y: this.random(1, this.matrixHeight - 1) });
        this.changePosition(this.player, { x: this.player.x, y: this.player.y });
        this.changePosition(this.foe, { x: this.foe.x, y: this.foe.y });
        document.addEventListener('keydown', event => this.keyPressHandler(event, this.player));
    }

    private initTable(): HTMLTableElement {
        var table = document.getElementsByTagName('table')[0];

        for (var i = 0; i < this.matrixHeight; i++) {
            var row = document.createElement('tr');
            this.matrix[i] = [];
            for (var j = 0; j < this.matrixWidth; j++) {
                var col = document.createElement('td');

                col.style.padding = '15';

                row.appendChild(col);
                this.matrix[i][j] = col;
            }

            table.appendChild(row);
        }

        table.setAttribute('border', '1');

        return table;
    }

    private changePosition(player: Player, newPosition: { x: number, y: number }) {
        if (newPosition.x < this.matrixWidth && newPosition.x > -1 && newPosition.y < this.matrixHeight && newPosition.y > -1) {
            this.matrix[player.y][player.x].style.backgroundColor = 'white';
            this.matrix[newPosition.y][newPosition.x].style.backgroundColor = player.color;
            player.x = newPosition.x;
            player.y = newPosition.y;
        }
    }

    private random(min: number, max: number): number {
        return Math.floor((Math.random() * max) + min);
    }

    private keyPressHandler(event: any, player: Player): any {
        let newPostion: PlayerPosition = { x: 0, y: 0 };

        switch (event.keyCode as number) {
            case KeyBind.DOWN:
                newPostion = { x: player.x, y: player.y + 1 };
                break;
            case KeyBind.UP:
                newPostion = { x: player.x, y: player.y - 1 };
                break;
            case KeyBind.LEFT:
                newPostion = { x: player.x - 1, y: player.y };
                break;
            case KeyBind.RIGHT:
                newPostion = { x: player.x + 1, y: player.y };
                break;
        }

        this.collide(newPostion) ? this.quit() : this.changePosition(player, newPostion);
    }

    private collide(newPosition: PlayerPosition) {
        if (this.foe.x == newPosition.x && this.foe.y == newPosition.y) {
            return true;
        }

        return false;
    }
    private quit() {
        if (confirm('You is victorius!!! Do you want to start a new game?')) {
            location.reload();
        } else {
            return;
        }
    }
}

window.onload = () => new Game;