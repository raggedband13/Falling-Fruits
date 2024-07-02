const cart = document.querySelector('.cart');
let thisImg = null;   
let life = 2;
let gameIntervalId;
const objects = [
    'img/fruit-1.svg',
    'img/fruit-2.svg',
    'img/fruit-3.svg',
    'img/fruit-4.svg',
    'img/fruit-5.svg',
    'img/bomb.svg',
    'img/dynamite.svg',
    'img/heart.svg',
];

let speed = 20;

function createObject() {


    const object = document.querySelector('.objects');

    const img = document.createElement('img');

    const randomIndexObject = Math.floor(Math.random() * objects.length);
    img.setAttribute('src', objects[randomIndexObject]);

    const randomLeft = Math.floor(Math.random() * (1000 - 90));
    img.style.left = randomLeft + 'px';
    img.style.animationDuration = speed + 's';

    object.append(img);


        


    function imgHover(event) {
        event.target.setAttribute('src', 'img/explosion.gif');
        setTimeout (() => {
            event.target.remove();
        }, 1000);
        life = setLife(life);

        event.target.removeEventListener('mouseover', imgHover);
    }

    if(img.getAttribute('src') == objects[5] || img.getAttribute('src') == objects[6]) {
        img.draggable = false;
        img.addEventListener('mouseover', imgHover);
    }


    img.addEventListener('animationend', () => {
        img.remove();
        
        if(img.getAttribute('src') != objects[5]  && img.getAttribute('src') != objects[6] && img.getAttribute('src') != objects[7]) {
            life = setLife(life);
        }

    });

    img.addEventListener('dragstart', () => {
        setTimeout(() => {
            img.style.visibility = 'hidden';
            img.style.animationPlayState = 'paused';
        });

        thisImg = img;
    });

    img.addEventListener('dragend', () => {
        setTimeout(() => {
            img.style.visibility = '';
            img.style.animationPlayState = '';
        });
    });


}

const buttonStart = document.querySelector('.button_start');
const countdown = document.querySelectorAll('.countdown');
const start = document.querySelector('.start');
let minus1 = 3;

buttonStart.addEventListener('click', () => {
    buttonStart.style.display = 'none';
    countdown[0].style.display = 'block';
    const Interval1 = setInterval(() => {
        minus1--;
        countdown[0].innerText = minus1;
        
        if(minus1 == 0) {
            clearInterval(Interval1);
            start.style.display = 'none';
            gameIntervalId = setInterval(() => {
                createObject(objects);
            }, 2000);
        }
    }, 1000);
});


cart.addEventListener('dragenter', () => {
    cart.style.transform = 'scale(1.05) translateY(-5px)'
});

cart.addEventListener('dragleave', () => {
    cart.style.transform = '';
});

cart.addEventListener('dragover', (e) => {
    e.preventDefault();
});

const number = document.querySelector('.number');
let count = 0;

cart.addEventListener('drop', () => {

    if(thisImg.getAttribute('src') == objects[7]) {
        life = setLife(life, false);
    };

    cart.style.transform = '';
    thisImg.remove();
    count++;
    number.textContent = count;

    if(number.textContent = count) {
        speed = speed - 0.25;
        thisImg.style.animationDuration = speed + 's';
    }
});

function setLife(countLife, operation = true) {
    const lifeImg = document.querySelectorAll('.life_img');
    if(operation) {
        lifeImg[countLife].src = 'img/heart-line.svg';
        countLife--;
    } else {
        countLife++;
        lifeImg[countLife].src = 'img/heart.svg';
    }

    if(countLife < 0) {
        const buttonEnd = document.querySelector('.button_end');
        const numberEnd = document.querySelector('.number_end');
        const end = document.querySelector('.end');
        const endContainer = document.querySelector('.end_container');
        let minus2 = 3;
        end.style.display = 'flex';
        numberEnd.textContent = count;
        
        
        buttonEnd.addEventListener('click', () => {
            buttonEnd.style.display = 'none';
            countdown[1].style.display = 'block';
            endContainer.style.display = 'none';
            clearInterval(gameIntervalId);
            const Interval2 = setInterval(() => {
                minus2--;
                countdown[1].innerText = minus2;
                
                if(minus2 == 0) {
                    clearInterval(Interval2);
                    end.style.display = 'none';
                    
                }
            }, 1000);

            while(life < 2) {
                setLife(life, false);
                life++;
            }

            
    
            gameIntervalId = setInterval(createObject, 2000);
        });
    }

    return countLife;
}



