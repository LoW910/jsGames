document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    let width = 15;
    let currentShooterIndex = 202;
    let currentInvaderIndex = 0;
    let aliensRemoved = [];
    let result = 0;
    let direction = 1;
    let invaderId;
    let goingRight = true;
    
    
    for (let i = 0; i < 225; i++) {
        const square = document.createElement('div');
        grid.appendChild(square);      
    }

    const squares = document.querySelectorAll('.grid div');

    // define the alien invaders
    const alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39
    ]


    // draw the alien invaders
    function draw() {
        for (let i = 0; i < alienInvaders.length; i++) {
            if(!aliensRemoved.includes(i)) {
                squares[alienInvaders[i]].classList.add('invader');
            }
        }
    }
    draw();

    // remove aliens
    function remove() {
        for (let i = 0; i < alienInvaders.length; i++) {
            squares[alienInvaders[i]].classList.remove('invader');
            
        }
    }

    // draw the shooter
    squares[currentShooterIndex].classList.add('shooter');

    function moveShooter(e) {
        console.log(e.key, 'Key pushed');
        console.log(e.keyCode, 'Key Code')
        squares[currentShooterIndex].classList.remove('shooter');
        switch(e.key) {
            case 'ArrowLeft':
                if(currentShooterIndex % width !== 0) currentShooterIndex -=1;
                break;
            case 'ArrowRight':
                if(currentShooterIndex % width < width - 1) currentShooterIndex +=1;
                break;
        }
        squares[currentShooterIndex].classList.add('shooter');
    }

    // move alien invaders
    function moveInvaders() {
        const leftEdge = alienInvaders[0] % width === 0;
        const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
        remove();

        if (rightEdge && goingRight) {
            for (let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] += width + 1;
                direction = -1;
                goingRight = false;
            }
        }

        if (leftEdge && !goingRight) {
            for (let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] += width - 1;
                direction = 1;
                goingRight = true;
            }
        }

        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += direction;
        }

        draw();


        // if((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
        //     direction = width;
        // } else if (direction === width) {
        //     if (leftEdge) direction = 1;
        //     else direction = -1;
        // }
        // for (let i = 0; i <= alienInvaders.length -1 ; i++) {
        //     squares[alienInvaders[i]].classList.remove('invader');
        // }
        // for (let i = 0; i <= alienInvaders.length - 1; i++) {
        //     alienInvaders[i] += direction;
        // }
        // for (let i = 0; i <= alienInvaders.length -1 ; i++) {
        //     if (!aliensRemoved.includes(i)){
        //         squares[alienInvaders[i]].classList.add('invader')
        //     }
        //     squares[alienInvaders[i]].classList.add('invader');
        // }

        // decide a game over
        if(squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
            resultDisplay.innerHTML = 'GAME OVER';
            squares[currentShooterIndex].classList.add('boom');
            clearInterval(invaderId);
        }
        for(let i = 0; i <= alienInvaders.length - 1; i++){
            if(alienInvaders[i] > (squares.length - ( width - 1 ))) {
                resultDisplay.textContent = 'GAME OVER';
                clearInterval(invaderId);
            }
        }
        

        // decide a win
        if (aliensRemoved.length === alienInvaders.length) {
            resultDisplay.textContent = 'YOU WIN!';
            clearInterval(invaderId);
        }
    }
    
    
    invaderId = setInterval(moveInvaders, 500)


    // shoot aliens
    function shoot(e) {
        let laserId;
        let currentLaserIndex = currentShooterIndex;
        
        //move laser from shooter to alien
        function moveLaser() {
            squares[currentLaserIndex].classList.remove('laser');
            currentLaserIndex -= width;
            squares[currentLaserIndex].classList.add('laser');

            if( squares[currentLaserIndex].classList.contains('invader') ) {
                squares[currentLaserIndex].classList.remove('invader');
                squares[currentLaserIndex].classList.remove('laser');
                squares[currentLaserIndex].classList.add('boom');

                setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250);
                clearInterval(laserId);

                const alienTakenDown = alienInvaders.indexOf(currentLaserIndex);
                aliensRemoved.push(alienTakenDown);
                result++;
                resultDisplay.textContent = result;
            }

            if(currentLaserIndex < width) {
                setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 100)
                clearInterval(laserId);
            }
        }
        switch (e.keyCode) {
            case 32:
                laserId = setInterval(moveLaser, 100);
                break;
        
            default:
                break;
        }
        // document.addEventListener('keyup', e => {
        //     if(e.keyCode === 32) {
        //         laserId = setInterval(moveLaser, 100);
        //         console.log('shoot!');
        //     }
        // })

    }
    
    
    
    
    
    

    document.addEventListener('keyup', shoot)
    document.addEventListener('keydown', moveShooter);


})