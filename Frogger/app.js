document.addEventListener('DOMContentLoaded', () => {

    const squares = document.querySelectorAll('.grid div');
    const timeLeft = document.querySelector('#timeLeft');
    const result = document.querySelector('#result');
    const startBtn = document.querySelector('#button');
    const carLeft = document.querySelectorAll('.carLeft');
    const carRight = document.querySelectorAll('.carRight');
    const logLeft = document.querySelectorAll('.logLeft');
    const logRight = document.querySelectorAll('.logRight');
    const width = 9;
    let currentIndex = 76;
    let currentTime = 20;
    let timerId;

    // render frog on starting block
    squares[currentIndex].classList.add('frog')

    // write a function that will move the Frog
    function moveFrog(e) {
        squares[currentIndex].classList.remove('frog');
        switch(e.key) {
            case 'ArrowLeft':
                if(currentIndex % width !== 0) currentIndex -= 1;
                break;
            case 'ArrowUp':
                if(currentIndex - width >= 0) currentIndex -= width;
                break;
            case 'ArrowRight':
                if(currentIndex % width < width - 1) currentIndex += 1;
                break;
            case 'ArrowDown':
                if(currentIndex + width < width * width) currentIndex += width;
                break;
        }
        squares[currentIndex].classList.add('frog');
        lose();
        win();
    }
    
    // move cars
    function autoMoveCars() {
        console.log("autoMoveCars");
        carLeft.forEach(carLeft => moveCarLeft(carLeft));
        carRight.forEach(carRight => moveCarRight(carRight));
    }

    // car left loop
    function moveCarLeft(carLeft) {
        switch (true) {
            case carLeft.classList.contains('c1'):
                console.log('cars moving left in moveCarLeft');
                carLeft.classList.remove('c1');
                carLeft.classList.add('c2');
                break;
            case carLeft.classList.contains('c2'):
                carLeft.classList.remove('c2');
                carLeft.classList.add('c3');
                break;
            case carLeft.classList.contains('c3'):
                carLeft.classList.remove('c3');
                carLeft.classList.add('c1');
                break;
        }
    }
    
    // car right loop
    function moveCarRight(carRight) {
        switch (true) {
            case carRight.classList.contains('c3'):
                carRight.classList.remove('c3');
                carRight.classList.add('c2');
                break;
            case carRight.classList.contains('c2'):
                carRight.classList.remove('c2');
                carRight.classList.add('c1');
                break;
            case carRight.classList.contains('c1'):
                carRight.classList.remove('c1');
                carRight.classList.add('c3');
                break;
        }
    }

    // log moves
    function autoMoveLogs() {
        logLeft.forEach(logLeft => moveLogLeft(logLeft));
        logRight.forEach(logRight => moveLogRight(logRight));
    }

    // log left loop
    function moveLogLeft(logLeft) {
        switch (true) {
            case logLeft.classList.contains('l1'):
                logLeft.classList.remove('l1');
                logLeft.classList.add('l2');
                break;
            case logLeft.classList.contains('l2'):
                logLeft.classList.remove('l2');
                logLeft.classList.add('l3');
                break;
            case logLeft.classList.contains('l3'):
                logLeft.classList.remove('l3');
                logLeft.classList.add('l4');
                break;
            case logLeft.classList.contains('l4'):
                logLeft.classList.remove('l4');
                logLeft.classList.add('l5');
                break;
            case logLeft.classList.contains('l4'):
                logLeft.classList.remove('l4');
                logLeft.classList.add('l5');
                break;
            case logLeft.classList.contains('l5'):
                logLeft.classList.remove('l5');
                logLeft.classList.add('l1');
                break;
        }
    }

    // log right loop
    function moveLogRight(logRight) {
        switch (true) {
            case logRight.classList.contains('l5'):
                logRight.classList.remove('l5');
                logRight.classList.add('l4');
                break;
            case logRight.classList.contains('l4'):
                logRight.classList.remove('l4');
                logRight.classList.add('l3');
                break;
            case logRight.classList.contains('l3'):
                logRight.classList.remove('l3');
                logRight.classList.add('l2');
                break;
            case logRight.classList.contains('l2'):
                logRight.classList.remove('l2');
                logRight.classList.add('l1');
                break;
            case logRight.classList.contains('l1'):
                logRight.classList.remove('l1');
                logRight.classList.add('l5');
                break;
        }
    }

    // to win
    function win() {
        if (squares[4].classList.contains('frog')) {
            result.innerHTML = 'YOU WON!';
            squares[currentIndex].classList.remove('frog');
            clearInterval(timerId);
            document.removeEventListener('keyup', moveFrog);
        }
    }


    // to lose
    function lose() {
        if((currentTime === 0) || 
            (squares[currentIndex].classList.contains('c1')) || 
            (squares[currentIndex].classList.contains('l5')) || 
            (squares[currentIndex].classList.contains('l4'))) {
                result.innerHTML= 'YOU LOSE!';
                squares[currentIndex].classList.remove('frog');
                clearInterval(timerId);
                document.removeEventListener('keyup', moveFrog);
        }
    }

    // move frog when its on the log moving left 
    function moveWithLogLeft() {
        if (currentIndex >= 27 && currentIndex < 35) {
            squares[currentIndex].classList.remove('frog');
            currentIndex += 1;
            squares[currentIndex].classList.add('frog');
        }
    }

    // move frog when its on the log moving right
    function moveWithLogRight() {
        if (currentIndex > 18 && currentIndex <= 26) {
            squares[currentIndex].classList.remove('frog');
            currentIndex -= 1;
            squares[currentIndex].classList.add('frog'); 
        }
    }


    // all functions to move pieces
    function movePieces() {
        currentTime--;
        timeLeft.innerHTML = currentTime;
        autoMoveCars();
        console.log("cars moving - movingPieces")
        autoMoveLogs();
        console.log("logs moving - movingPieces")
        moveWithLogLeft();
        moveWithLogRight();
        lose(); 
    }

    // start and pause game
    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
        } else {
            timerId = setInterval(movePieces, 1000);
            document.addEventListener('keyup', moveFrog)
        }
    })

})