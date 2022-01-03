document.addEventListener('DOMContentLoaded', () => {
    
    const grid = document.querySelector('.grid');
    const displaySquares = document.querySelectorAll('.previousGrid div');
    const scoreDisplay = document.querySelector('.scoreDisplay');
    const linesDisplay = document.querySelector('.linesDisplay');
    let score = 0;
    let lines = 0;
    let currentIndex = 0;
    let squares = Array.from(grid.querySelectorAll('div'));
    const startBtn = document.querySelector('.start');
    const width = 10;
    const height = 20;
    let currentPosition = 4;
    let timerId;

    // assign keys to movement functions
    function control(e) {
        if (e.key === 'ArrowRight') {
            console.log('keypress')
            moveRight();
        } else if (e.key === 'ArrowLeft') {
            moveLeft();
        } else if (e.key === 'ArrowDown') {
            moveDown();
        } else if (e.key === 'ArrowUp') {
            rotate();
        }
    }

    document.addEventListener('keyup', control);

    // the tetrominoes
    
    // L
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]

    // Z
    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ]

    // T
    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1] 
    ]

    // O
    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]

    // I
    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]

    // all tetrominos
    const theTetrominos = [lTetromino, zTetromino, tTetromino, iTetromino, oTetromino];

    // randomly select tetromino
    let random = Math.floor(Math.random()*theTetrominos.length);
    let currentRotation = 0;
    let current = theTetrominos[random][currentRotation];


    // draw shape
    function draw() {
        current.forEach( index => (
            squares[currentPosition + index].classList.add('block')
        ))
    }

    // remove undraw
    function undraw() {
        current.forEach( index => (
            squares[currentPosition + index].classList.remove('block')
        ))
    }

    // move tetromino down
    function moveDown() {
        undraw();
        currentPosition = currentPosition += width;
        draw();
        freeze();
    }

    // move right and prevent collisions with shapes moving right
    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);
        if(!isAtRightEdge) currentPosition += 1;
        if (current.some(index => squares[currentPosition + index].classList.contains('block2'))){
            currentPosition -= 1;
        }
        draw();
    }
    
    // move left and prevent collisions with shapes moving left
    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
        if(!isAtLeftEdge) currentPosition -= 1;
        if(current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
            currentPosition += 1;
        }
        draw();
    }

    // rotate tetromino
    function rotate() {
        undraw();
        currentRotation ++;
        if (currentRotation === current.length) {
            currentRotation = 0;
        }
        current = theTetrominos[random][currentRotation];
        draw();
    }

    // show previous tetromino in displaySquares
    const displayWidth = 4;
    const displayIndex = 0;
    let nextRandom = 0;

    const smallTetrominos = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], // lTetromino
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // zTetromino
        [1, displayWidth, displayWidth + 1, displayWidth + 2], // tTetromino
        [0, 1, displayWidth, displayWidth + 1], // oTetromino
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] // iTetromino
    ]

    function displayShape() {
        displaySquares.forEach( square => {
            square.classList.remove('block');
        })
        smallTetrominos[nextRandom].forEach( index => {
            displaySquares[displayIndex + index].classList.add('block');
        });
    }


    // freeze the shape
    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('block3') ||
        squares[currentPosition + index + width].classList.contains('block2'))) {
            current.forEach(index => squares[index + currentPosition].classList.add('block2'))

            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominos.length);
            current = theTetrominos[random][currentRotation];
            currentPosition = 4;
            draw();
            displayShape();
            gameOver();
            addScore();
        }
    }

    startBtn.addEventListener('click', () => {
        if(timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            draw();
            timerId = setInterval(moveDown, 750)
            nextRandom = Math.floor(Math.random() * theTetrominos.length);
            displayShape();
        }
    })

    // displayShape();
    // draw();

    // game over
    function gameOver() {
        if(current.some(
            index => squares[currentPosition + index].classList.contains('block2'))) {
                scoreDisplay.innerHTML = 'end';
                clearInterval(timerId);
            }
    }


    // add score
    function addScore() {
        for (currentIndex = 0; currentIndex < 199; currentIndex += width) {
            const row = [
                currentIndex,
                currentIndex + 1,
                currentIndex + 2,
                currentIndex + 3,
                currentIndex + 4,
                currentIndex + 5,
                currentIndex + 6,
                currentIndex + 7,
                currentIndex + 8,
                currentIndex + 9
            ]

            if(row.every(index => squares[index].classList.contains('block2'))) {
                score += 10;
                lines += 1;
                scoreDisplay.innerHTML = score;
                linesDisplay.innerHTML = lines;
                row.forEach(index => {
                    squares[index].classList.remove('block2') ||
                    squares[index].classList.remove('block')
                })
                // splice Array
                const squaresRemoved = squares.splice(currentIndex, width);
                squares = squaresRemoved.concat(squares);
                squares.forEach(cell => grid.appendChild(cell));
            }
        }
    }







})