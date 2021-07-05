class Bird{
    static birds = [];
    static id = 0;

    constructor(x, y){
        this.pos = new Vector(x, y);
        this.vel = new Vector(1, 1);
        this.vel_max = 2;
        this.max_force = 0.03;
        this.accel = new Vector(0, 0);
        this.radius = 4;
        this.color = "brown";
        // Variável que delimita a distância da borda a partir da qual os organismos começarão a fazer a curva para não bater nas bordas 
        this.d = 35;
        // variáveis usadas para o método wander()
        this.d_circle = 2;
        this.circle_radius = 1;
        this.wander_angle = Math.random() * 360;

        Bird.birds.push(this);
    }

    update(){
        this.createBorders();

        // Updates its velocity by adding the acceleration
        this.vel.add(this.accel);
        
        // Limits the velocity
        this.vel.limit(1.5);

        // Updates its position by adding the velocity
        this.pos.add(this.vel);

        // Resets acceleration to 0 each cicle so it doesn't increase forever
        this.accel.mul(0);

        // Only displays the bird 
        this.display();
    }

    // Método para criar bordas que delimitarão o espaço do organismo
    createBorders(){
        this.delimitBorders();
        this.avoidBorders();
    }

    // Método para impedir a passagem dos organismos para fora da tela
    delimitBorders(){
        if(this.pos.x + 2*this.radius > canvas.width) // borda direita
            this.vel.x = this.vel.x * -1; //inverte a velocidade x se ultrapassa a borda do canvas

        if(this.pos.x - this.radius < 0) // borda esquerda
            this.vel.x = this.vel.x * -1;

        if(this.pos.y + this.radius > canvas.height) // borda baixo
            this.vel.y = this.vel.y* -1;

        if(this.pos.y < 0) // borda cima
            this.vel.y = this.vel.y * -1;
    }


    // Método para aplicar força ao organismo que o impeça de continuar a seguir por uma trajetória para fora da tela
    avoidBorders(){
        var desired_vel = null; // Esta velocidade será o Vector que dirá para onde o organismo deve ir para não sair da borda
        this.near_border = false;
            // Borda esquerda
            if(this.pos.x - this.radius < this.d){ 
            desired_vel = new Vector(this.vel_max, this.vel.y); // Faz sua velocidade ser máxima na direção x (para a direita)
            this.near_border = true;
        } 
        // Borda direita
        else if(this.pos.x + this.radius > canvas.width - this.d){
            desired_vel = new Vector(-this.vel_max, this.vel.y); // Faz sua velocidade ser máxima na direção -x (para a esquerda)
            this.near_border = true;
        }
        // Borda de cima
        if(this.pos.y - this.radius < this.d){
            desired_vel = new Vector(this.vel.x, this.vel_max); // Faz sua velocidade ser máxima na direção y (para a baixo)
            this.near_border = true;
        }
        // Borda de baixo
        else if(this.pos.y + this.radius> canvas.height - this.d){
            desired_vel = new Vector(this.vel.x, -this.vel_max); // Faz sua velocidade ser máxima na direção -y (para a cima)
            this.near_border = true;
        }
        
        if(desired_vel != null){ // Caso qualquer uma das condições anteriores tenha sido satisfeita
            desired_vel.normalize(); // Normaliza (transforma para ter tamanho 1) o Vector desired_vel
            desired_vel.mul(this.vel_max); // Multiplica o Vector (que agora tem tamanho 1) pela velocidade máxima
            var redirection = desired_vel.sub(this.vel); // Cria um Vector de força que redirecionará o organismo
            redirection.limit(this.max_force * 10); // Limita essa força com uma folga maior ("* 1.5") para dar chances dela ser maior que as outras forças atuantes nele
            this.applyForce(redirection); // Aplica esta força no organismo e a deixa levemente mais forte para ganhar prioridade em relação a outras forças
        }
    }

    // Método para aplicar a força que fará o organismo virar na direção do alvo mais próximo de modo natural
    applyForce(forca){
        // Adiciona a força à acceleração, o que a faz aumentar
        // Podemos considerar a massa no cálculo também: A = F / M (não implementado)
        this.accel.add(forca);
    }

    // Método que fará o organismo vaguear por aí quando não está fugindo ou perseguindo
    wander(){
        // A ideia é criar uma pequena força a cada frame logo à frente do organismo, a uma d dele.
        // Desenharemos um círculo à frente do organismo, e o Vector da força de displacement partirá do centro
        // do círculo e terá o tamanho de seu radius. Assim, quanto maior o círculo, maior a força.
        // A fim de sabermos qual é a frente do organismo, utilizaremos o Vector velocidade para nos auxiliar, 
        // já que ele está sempre apontando na direção do movimento do organismo.

            // CRIANDO O CÍRCULO
            var circle_center = new Vector(0, 0); // Criamos um Vector que representará a distância do organismo ao centro do círculo
            circle_center = this.vel.copy(); // Isso é para que o círculo esteja exatamente à frente do organismo (como explicado um pouco acima)
            circle_center.normalize(); // Normalizamos o Vector, ou seja, seu tamanho agora é 1 (e não mais o tamanho do Vector velocidade, como era na linha acima)
            circle_center.mul(this.d_circle); // A variável d_circle é uma constante definida globalmente, e guarda o valor da distância do centro do círculo
            
            // CRIANDO A FORÇA DE displacement
            var displacement = new Vector(0, -1);
            displacement.mul(this.circle_radius); // A força terá o tamanho do radius do círculo
            // Mudando a direção da força randomicamente
            displacement.rotateDegs(this.wander_angle); // Rotaciona a força em wander_angle (variável definida no construtor)
            // Mudando ligeiramente o valor de wander_angle para que ele mude pouco a pouco a cada frame
            this.wander_angle += Math.random() * 30 - 15; // Muda num valor entre -15 e 15
            
            // CRIANDO A FORÇA DE VAGUEIO
            // A força de vagueio pode ser pensada como um Vector que sai da posição do organismo e vai até um ponto
            // na circunferência do círculo que criamos
            // Agora que os Vectores do centro do círculo e da força de displacement foram criados, basta somá-los
            // para criar a força de vagueio
            var wander_force = new Vector(0, 0);
            wander_force = circle_center.add(displacement);
            this.applyForce(wander_force.mul(0.1));
    }

    display(){
        // c.beginPath();
        // c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);        
        // c.fillStyle = "blue";
        // c.fill();

        c.beginPath();
        // desenhaOval(c, this.posicao.x, this.posicao.y, this.radius*2, this.radius, 'red');
        c.ellipse(this.pos.x, this.pos.y, this.radius * 0.7, this.radius * 1.1, this.vel.headingRads() - Math.PI/2, 0, Math.PI * 2);
        // console.log(this.vel.headingDegs());
        c.fillStyle = this.color;
        c.strokeStyle = this.color;
        c.fill();
       
    }
}