class Symbols {
    constructor(defaults = []) {
        this._container = defaults;
        this._iterator = -1;
    }

    prev() {
        if (this._iterator === 0) {
            this._iterator = this._container.length;
        }
        return this._container[--this._iterator % this._container.length];
    }

    next() {
        return this._container[++this._iterator % this._container.length];
    }
}

class TicTacToe {
    static get CROSS() { return 'x'; }
    static get NOUGHT() { return 'o'; }
    static get SYMBOLS() { return [TicTacToe.CROSS, TicTacToe.NOUGHT]; }
    static get STATE() { return {
        play: 'play',
        win: 'win',
        draw: 'draw'
    }; }
    static get FIELD_SIZE() { return 3; }

    constructor() {
        this._field = this._initField();
        this._symbols = new Symbols(TicTacToe.SYMBOLS);
        this._currentSymbol = this._symbols.next();
        this._state = TicTacToe.STATE.play;
    }

    getCurrentPlayerSymbol() {
        return this._currentSymbol;
    }

    nextTurn(rowIndex, columnIndex) {
        if (this._state !== TicTacToe.STATE.play
            || this._field[rowIndex][columnIndex]) {
            return;
        }
        this._field[rowIndex][columnIndex] = this._currentSymbol;
        if (this._checkWinner(this._currentSymbol, rowIndex, columnIndex)) {
            this._state = TicTacToe.STATE.win;
        } else if (this.noMoreTurns()) {
            this._state = TicTacToe.STATE.draw;
        }
        this._currentSymbol = this._symbols.next();
    }

    isFinished() {
        return this._state === TicTacToe.STATE.win
            || this._state === TicTacToe.STATE.draw;
    }

    getWinner() {
        return this._state === TicTacToe.STATE.win ? this._symbols.prev() : null;
    }

    noMoreTurns() {
        for (let i = 0; i < TicTacToe.FIELD_SIZE; i++) {
            for (let j = 0; j < TicTacToe.FIELD_SIZE; j++) {
                if (!this._field[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    isDraw() {
        return this._state === TicTacToe.STATE.draw;
    }

    getFieldValue(rowIndex, colIndex) {
        return this._field[rowIndex][colIndex];
    }

    _initField() {
        let matrix = [];
        for (let i = 0; i < TicTacToe.FIELD_SIZE; i++) {
            matrix[i] = [];
            for (let j = 0; j < TicTacToe.FIELD_SIZE; j++) {
                matrix[i][j] = null;
            }
        }
        return matrix;
    }

    _checkWinner(symbol, row, column) {
        for (let i = 0; i < TicTacToe.FIELD_SIZE
            && this._field[i][column] === symbol; i++) {
            if (i === TicTacToe.FIELD_SIZE - 1) {
                return true;
            }
        }
        for (let i = 0; i < TicTacToe.FIELD_SIZE
            && this._field[row][i] === symbol; i++) {
            if (i === TicTacToe.FIELD_SIZE - 1) {
                return true;
            }
        }
        for (let i = 0; i < TicTacToe.FIELD_SIZE
            && this._field[i][i] === symbol; i++) {
            if (i === TicTacToe.FIELD_SIZE - 1) {
                return true;
            }
        }
        for (let i = 0; i < TicTacToe.FIELD_SIZE
            && this._field[i][TicTacToe.FIELD_SIZE - 1 - i] === symbol; i++) {
            if (i === TicTacToe.FIELD_SIZE - 1) {
                return true;
            }
        }
        return false;
    }
}

module.exports = TicTacToe;
