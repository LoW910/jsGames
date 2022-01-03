document.addEventListener('DOMContentLoaded', () => {

    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('span');
    const startBtn = document.querySelector('.start');

    const width = 10;
    let currentIndex = 0 // so first div in our grid
    let appleIndex = 0 // so first div in our grid
    let currentSnake = [2,1,0]; // 2 head, 1 body part, 0 tail
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;


    // start and restart game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        randomApple();
        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 1000;
        currentSnake = [2,1,0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime);
    }

    // function that deals with all the outcomes of the snake
    function moveOutcomes() {
        // snake hitting border or itself
        if (
            // bottom
            (currentSnake[0] + width >= (width*width) && direction === width ) ||
            // right
            (currentSnake[0] % width === width -1 && direction === 1) || 
            // left 
            (currentSnake[0] % width === 0 && direction === -1) ||
            // top
            (currentSnake[0] - width < 0 && direction === -width) ||
            // itself
            (squares[currentSnake[0] + direction].classList.contains('snake'))
        ) {
            // stops game if any above condition is met
            alert('Game Over!')
            return clearInterval(interval);
        }

        // removes last bite of the array and shows it 
        const tail = currentSnake.pop();
        // removes class snake from tail
        squares[tail].classList.remove('snake');
        // gives direction to the head
        currentSnake.unshift(currentSnake[0] + direction);

        // snake eats an apple
        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail);
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes, intervalTime);
            randomApple();
        }
        squares[currentSnake[0]].classList.add('snake');
    }

    // generate new apple once eaten
    function randomApple() {
        do{
            appleIndex = Math.floor(Math.random() * squares.length);
        } while(squares[appleIndex].classList.contains('snake'));
        squares[appleIndex].classList.add('apple');
    }


    // assign functions to keycodes
    function control(e) {
        // removing class of snake
        squares[currentIndex].classList.remove('snake') 

        // press right snake goes right
        if(e.keyCode === 39) {
            direction = 1; 
        // press up snake goes up
        } else if (e.keyCode === 38) {
            direction = -width 
        // press left snake goes left
        } else if(e.keyCode === 37) {
            direction = -1 
        // press down snake goes down
        } else if(e.keyCode === 40) {
            direction = +width; 
        }
    }
    console.log('current snake', currentSnake);
    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame);





})