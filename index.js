const canvas = document.getElementById("canvas");
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

createBirds(400);
animate();


function generateNumberBetween(min, max) {
    let delta = max - min; // for exemple: 4000 e 6000. 6000 - 4000 = 2000
    return parseFloat((Math.random() * delta + min).toFixed(4)); // Math.random() * 2000 + 4000
}

function generateBird(x, y){
    new Bird(x, y);
}

function createBirds(n){
    for(var i = 0; i < n; i++){
        var x = generateNumberBetween(0, canvas.width);
        var y = generateNumberBetween(0, canvas.height);
        generateBird(x, y);
    }
}

function animate(){

    c.clearRect(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(animate);

    Bird.birds.forEach(bird => {
        bird.update();
        bird.wander();
    })
}

