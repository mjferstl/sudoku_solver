
from datetime import datetime

# mittel
medium = [[0,0,0,0,6,0,5,0,0],
        [2,0,0,0,0,3,0,0,0],
        [0,0,3,9,0,4,8,0,0],
        [0,4,0,0,0,0,0,0,0],
        [0,0,0,0,2,0,0,0,0],
        [0,3,2,7,1,5,4,0,6],
        [0,7,8,5,4,1,9,0,0],
        [4,0,0,0,7,0,0,8,0],
        [0,6,1,0,9,0,3,0,0]]

# experte
expert = [[0,0,9,0,0,0,1,0,0],
          [0,6,0,0,0,0,0,8,0],
          [5,0,0,0,0,0,0,4,6],
          [0,0,0,0,0,0,0,0,0],
          [6,8,7,0,0,3,0,0,0],
          [0,0,0,0,0,5,4,0,2],
          [0,4,0,0,0,9,0,1,0],
          [0,0,6,0,0,0,3,0,0],
          [8,9,0,0,7,4,0,0,0]]


def isPossible(grid,r,c,n):
    # check row
    if n in grid[r]:
        return False
    
    # check column
    if n in [v[c] for v in grid]:
        return False

    # check box
    rf, cf = r//3, c//3 # integer division
    box = [values[cf*3:cf*3+3] for values in grid[rf*3:rf*3+3]]
    # check if value is in one of the boxes rows
    if any([n in row for row in box]):
        return False
    else:
        return True 


def printSudoku(sudokuList):
    for rowNum in range(len(sudokuList)):
        if rowNum//3 > 0 and rowNum%3 == 0:
            print('-'*15)
        row = sudokuList[rowNum]
        rowStr = [str(r) for r in row]
        print(rowStr[0] + rowStr[1] + rowStr[2] + ' | ' + rowStr[3] + rowStr[4] + rowStr[5] + ' | ' + rowStr[6] + rowStr[7] + rowStr[8])


def solve(grid):
    for row in range(9):
        for col in range(9):
            if grid[row][col] == 0:
                for num in range(1,10):
                    if isPossible(grid,row,col,num):
                        grid[row][col] = num
                        solve(grid)
                        grid[row][col] = 0
                return
    
    print('\nLösung:\n' )
    printSudoku(grid)


def solveSudoku(sudoku):
    # get the current time for speed measuring
    startTime = datetime.now()

    # print the initial sudoku
    print('\nSudoku:\n')
    printSudoku(sudoku)

    # solve the sudoku
    solve(sudoku)

    # get the current time, calculate the time since start
    # and print the time elapsed
    endTime = datetime.now()
    delta = endTime - startTime
    print('\nDauer: ' + str(delta))


if __name__ == "__main__":
    solveSudoku(expert)  