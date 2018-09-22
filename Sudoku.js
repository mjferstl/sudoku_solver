// Shorthand for $( document ).ready()
$(function() {
    var SudokuEasy = [[4, 3, 0, 0, 0, 0, 0, 0, 0],
                      [1, 9, 2, 5, 7, 0, 0, 0, 4],
                      [5, 0, 0, 0, 9, 0, 7, 2, 1],
                      [0, 0, 0, 0, 0, 0, 1, 3, 0],
                      [6, 0, 0, 2, 4, 0, 0, 0, 0],
                      [7, 2, 0, 9, 5, 1, 0, 4, 0],
                      [0, 0, 6, 4, 0, 7, 0, 9, 5],
                      [0, 0, 9, 0, 2, 5, 0, 6, 7],
                      [0, 0, 5, 0, 0, 9, 0, 0, 3]];

    var SudokuMittel = [[5, 0, 0, 0, 3, 0, 2, 6, 0],
                        [6, 0, 3, 0, 0, 5, 0, 9, 0],
                        [2, 0, 8, 0, 0, 1, 0, 0, 0],
                        [9, 8, 0, 0, 0, 3, 7, 0, 0],
                        [7, 0, 4, 5, 0, 9, 8, 0, 6],
                        [0, 0, 5, 0, 0, 0, 0, 2, 0],
                        [0, 0, 0, 3, 5, 0, 9, 0, 1],
                        [0, 2, 0, 7, 0, 0, 4, 0, 5],
                        [0, 0, 0, 0, 1, 8, 6, 0, 2]];

    var SudokuSchwer = [[7, 0, 0, 4, 0, 0, 0, 0, 0],
                        [0, 2, 0, 0, 0, 0, 0, 1, 0],
                        [0, 0, 0, 0, 0, 0, 0, 8, 0],
                        [0, 0, 0, 6, 2, 0, 4, 0, 0],
                        [0, 0, 1, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 3, 0, 0],
                        [0, 5, 0, 0, 1, 8, 0, 0, 0],
                        [2, 0, 0, 0, 0, 0, 6, 0, 7],
                        [0, 0, 0, 0, 0, 9, 0, 0, 0]];

    var solved = false;
    var tmpSudoku;
    var isInRow, isInColumn, isInField;
    var fittingValue, fitting;
    var Sudoku;
    var cannotBeSolved = false;

    $("#info").hide();
    document.getElementById("solve").addEventListener("click", function() {readValues()}, false);
    document.getElementById("loadEasySudoku").addEventListener("click", function() {inputSudoku(SudokuEasy)}, false);
    document.getElementById("loadMiddleSudoku").addEventListener("click", function() {inputSudoku(SudokuMittel)}, false);
    document.getElementById("loadHardSudoku").addEventListener("click", function() {inputSudoku(SudokuSchwer)}, false);

    function inputSudoku(s) {
        $("#info").hide();
        for (i = 0; i < 9; i++) {
            for (j = 0; j < 9; j++) {
                $("#Sudoku_" + (i + 1) + "_" + (j + 1)).css("color", "black");
                $("#Sudoku_" + (i + 1) + "_" + (j + 1)).css("font-weight", "normal");
                if (s[i][j] == 0) {
                    $("#Sudoku_" + (i + 1) + "_" + (j + 1)).val("");
                } else {
                    $("#Sudoku_" + (i + 1) + "_" + (j + 1)).val(s[i][j]);
                }
            }
        }
    }

    function resetSudoku() {
        return [[0, 0, 0, 0, 0, 0, 0, 0, 0], // 1
                [0, 0, 0, 0, 0, 0, 0, 0, 0], // 2
                [0, 0, 0, 0, 0, 0, 0, 0, 0], // 3
                [0, 0, 0, 0, 0, 0, 0, 0, 0], // 4
                [0, 0, 0, 0, 0, 0, 0, 0, 0], // 5
                [0, 0, 0, 0, 0, 0, 0, 0, 0], // 6
                [0, 0, 0, 0, 0, 0, 0, 0, 0], // 7
                [0, 0, 0, 0, 0, 0, 0, 0, 0], // 8
                [0, 0, 0, 0, 0, 0, 0, 0, 0]]; // 9
    }

    // read all values from html page
    function readValues() {
        solved = false;
        cannotBeSolved = false;
        $("#info").hide();
        Sudoku = [[0, 0, 0, 0, 0, 0, 0, 0, 0], // 1
                [0, 0, 0, 0, 0, 0, 0, 0, 0], // 2
                [0, 0, 0, 0, 0, 0, 0, 0, 0], // 3
                [0, 0, 0, 0, 0, 0, 0, 0, 0], // 4
                [0, 0, 0, 0, 0, 0, 0, 0, 0], // 5
                [0, 0, 0, 0, 0, 0, 0, 0, 0], // 6
                [0, 0, 0, 0, 0, 0, 0, 0, 0], // 7
                [0, 0, 0, 0, 0, 0, 0, 0, 0], // 8
                [0, 0, 0, 0, 0, 0, 0, 0, 0]]; // 9
        var readValue;
        for (i = 0; i < 9; i++) {
            for (j = 0; j < 9; j++) {
                readValue = $("#Sudoku_" + (i + 1) + "_" + (j + 1)).val();
                if (readValue == null || readValue == "") {
                    Sudoku[i][j] = 0;
                    $("#Sudoku_" + (i + 1) + "_" + (j + 1)).css("font-weight", "normal");
                } else {
                    Sudoku[i][j] = readValue;
                    $("#Sudoku_" + (i + 1) + "_" + (j + 1)).css("font-weight", "bold");
                    $("#Sudoku_" + (i + 1) + "_" + (j + 1)).css("color", "black");
                }
            }
        }
        solveSudoku(Sudoku);
    }

    function solveSudoku(sudoku) {
        while (!solved && !cannotBeSolved) {
            cannotBeSolved = true; // is set to false, when a number can be placed somewhere
            for (i = 0; i < 9; i++) {
                for (j = 0; j < 9; j++) {
                    fitting = 0;
                    fittingValue = 0;
                    isInRow = false;
                    isInColumn = false;
                    isInField = false;
                    //
                    if (sudoku[i][j] == 0) {
                        for (num = 1; num < 10; num++) {
                            isInRow = checkRow(sudoku, i, num);
                            // check in Row
                            if (isInRow == true) {
                                continue;
                            } else {
                                isInColumn = checkColumn(sudoku, j, num);
                                // check in Column
                                if (isInColumn == true) {
                                    continue;
                                    } else {
                                        // check in field
                                        isInField = checkField(sudoku, i, j, num);
                                        if (isInField == true) {
                                            continue;
                                        } else {
                                            // values fits
                                            fitting++;
                                            fittingValue = num;
                                        }
                                }
                            }
                        }
                    }
                    // all numbers checked for this field
                    if (fitting == 1) {
                        sudoku[i][j] = fittingValue;
                        cannotBeSolved = false;
                        $("#Sudoku_" + (i + 1) + "_" + (j + 1)).val(fittingValue);
                        $("#Sudoku_" + (i + 1) + "_" + (j + 1)).css("color","green");
                        solved = checkSolved(sudoku);
                    }
                }
            }
            if (cannotBeSolved == true) {
                console.log("Sudoku kann nicht gelöst werden!");
                $("#info").show();
            }
        }
    }

    function checkRow(matrix, row, number) {
        var check = false;
        for (k = 0; k < 9; k++) {
            if (matrix[row][k] == number) {
                check = true;
                break;
            }
        }
        return check;
    }

    function checkColumn(matrix, col, number) {
        var check = false;
        for (k = 0; k < 9; k++) {
            if (matrix[k][col] == number) {
                check = true;
                break;
            }
        }
        return check;
    }

    function checkField(matrix, row, col, number) {
        var check = false;
        var rItems;
        var cItems;
        //
        if (row<3) {
            rItems = [1, 2, 3];
        } 
        else if (row<6) {
            rItems = [4, 5, 6];
        }
        else if (row<9) {
            rItems = [7, 8, 9];
        }
        else {
            console.log("Error 1");
        }
        //
        // columns
        if (col<3) {
            cItems = [1, 2, 3];
        }
        else if (col<6) {
            cItems = [4, 5, 6];
        }
        else if (col<9) {
            cItems = [7, 8, 9];
        }
        else {
            console.log("Error 2");
        }
        //
        for (r=0; r<3; r++) {
            for (c=0; c<3; c++) {
                if (matrix[rItems[r]-1][cItems[c]-1] == number) {
                    check = true;
                    break;
                }
            }
        }

        return check;
    }

    function checkSolved(matrix) {
        var matrixSolved = true;
        for (r=0; r<9; r++) {
            for (c=0; c<9; c++) {
                if (matrix[r][c] == 0) {
                    matrixSolved = false;
                    break;
                }
            }
        }
        return matrixSolved;
    }
});