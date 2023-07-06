import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {

  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  }

  constructor(props) {
    super(props);
    this.state = {
      board: this.createBoard(),
      hasWon: false
    }
  }

  createBoard() {
    let board = [];
    // let board = [
    //   [1, 1, 0, 0, 0],
    //   [1, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0],
    // ];

    for (let i = 0; i < this.props.nrows; i++) {
      board[i] = [];
      for (let j = 0; j < this.props.ncols; j++) {
        board[i][j] = Math.round(Math.random());
      }
    }
    return board;
  }

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);


    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = Number(!board[y][x]);
      }
    }

    this.setState({board: board, hasWon: board.every(row => row.every(val => !val))});
  }

  render() {
    let tableBoard = [];
    for (let i = 0; i < this.props.nrows; i++) {
      let row = [];
      for (let j = 0; j < this.props.ncols; j++) {
        let coord = `${i}-${j}`;
        row.push(<Cell key={coord} isLit={this.state.board[i][j]} flipCellsAroundMe={() => this.flipCellsAround(coord)}/>)
      }
      tableBoard.push(<tr key={i}>{row}</tr>);
    }
    console.log(this.state.board);
    console.log(this.state.hasWon);
    return(
      <div className="board_container">
        <h1 className="title">Lights Out</h1>
        <table className={this.state.hasWon ? "hidden" : "board_table"}>
          <tbody>
            {tableBoard}
          </tbody>
        </table>
        <p className={this.state.hasWon ? "show-win" : "hidden"}>You win!</p>
      </div>
    );
  }
}


export default Board;
