class Bird{
    static birds = [];
    static id = 0;

    constructor(x, y){
        this.pos = new Vector(x, y);
        this.vel = new Vector(1, 1);
        this.vel_max
        this.acel = new Vector(0, 0);
    }

    update(){
        // Updates its velocity by adding the acceleration
        this.vel.add(this.acel);
        
        // Limits the velocity
        this.vel.limit(1.5);

        // Updates its position by adding the velocity
        this.pos.add(this.vel);

        // Resets acceleration to 0 each cicle so it doesn't increase forever
        this.acel.mul(0);

        // Only displays the bird 
        this.display();
    }

    display(){
        c.beginPath();
        c.arc(this.posicao.x, this.posicao.y, this.raio, 0, Math.PI * 2);        
        c.fillStyle = "blue";
        c.fill();
       
    }
}