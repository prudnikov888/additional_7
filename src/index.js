module.exports = function solveSudoku(matrix) {
    console.log('Initial');
    console.log(matrix);
    let step = 0;
    //resolve all single candidates

    let isCandidateResolved;
    do {
        isCandidateResolved = resolveOneSingleCandidate(matrix);
        if (!isCandidateResolved) {
            setCandidateExplicitly(matrix);
            isCandidateResolved = resolveOneSingleCandidate(matrix);
        }
        console.log('Intermediate result');
        console.log(matrix);
        console.log('Future Candidates');
        console.log(getCandidates(matrix));
    } while (isCandidateResolved);

    console.log('Result');
    console.log(matrix);
    return matrix;
};

function getCandidates(matrix) {
    let candidatesMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
        let candidatesRow = [];
        for (let j = 0; j < matrix[i].length; j++) {
            let candidates = [];
            if (matrix[i][j] === 0) {
                let usedDigits = [];
                usedDigits.push(...matrix[i]);
                usedDigits.push(...getColumn(matrix, j));
                usedDigits.push(...getSubgrid(matrix, i, j));
                for (let k = 1; k < 10; k++) {
                    if (!usedDigits.includes(k)) {
                        candidates.push(k);
                    }
                }
            }
            candidatesRow.push(candidates);
        }
        candidatesMatrix.push(candidatesRow);
    }
    return candidatesMatrix;
}

function setCandidateExplicitly(matrix) {
    let candidatesMatrix = getCandidates(matrix);
    let candidateSet = false;
    for (let i = 0; i < candidatesMatrix.length; i++) {
        for (let j = 0; j < candidatesMatrix[i].length; j++) {
            if (matrix[i][j] === 0 && candidatesMatrix[i][j].length > 0) {
                let candidatesPool = candidatesMatrix[i][j];
                for (let k = 0; k < candidatesPool.length; k++) {
                    matrix[i][j] = candidatesPool[k];
                    if ((hasAtLeastOneSingleCandidate(matrix)) || isSolved(matrix)) {
                        candidateSet = true;
                        break;
                    } else {
                        matrix[i][j] = 0;
                    }
                }
            }
            if (candidateSet) {
                break;
            }
        }
        if (candidateSet) {
            break;
        }
    }
}

function hasAtLeastOneSingleCandidate(matrix) {
    let candidatesMatrix = getCandidates(matrix);
    for (let i = 0; i < candidatesMatrix.length; i++) {
        for (let j = 0; j < candidatesMatrix[i].length; j++) {
            if (candidatesMatrix[i][j].length === 1) {
                return true;
            }
        }
    }
    return false;
}

function hasAtLeastOneCandidateForEachPosition(matrix) {
    let candidatesMatrix = getCandidates(matrix);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 0 && candidatesMatrix[i][j].length === 0) {
                return false;
            }
        }
    }
    return true;
}

function resolveOneSingleCandidate(matrix) {
    let candidatesMatrix = getCandidates(matrix);
    for (let i = 0; i < candidatesMatrix.length; i++) {
        for (let j = 0; j < candidatesMatrix[i].length; j++) {
            if (candidatesMatrix[i][j].length === 1) {
                matrix[i][j] = candidatesMatrix[i][j][0];
                return true;
            }
        }
    }
    return false;
}


function getColumn(anArray, columnNumber) {
    return anArray.map(function (row) {
        return row[columnNumber];
    });
}

function isSolved(anArray) {
    let result = [];
    anArray.forEach(function (row) {
        result.push(...row);
    });
    return !result.includes(0);
}

function getSubgrid(anArray, i, j) {
    const startRow = Math.floor(i / 3) * 3;
    const startColumn = Math.floor(j / 3) * 3;
    let result = [];
    for (n = startRow; n < startRow + 3; n++) {
        for (m = startColumn; m < startColumn + 3; m++) {
            result.push(anArray[n][m]);
        }
    }
    return result;
}



