// class for vector creation and manipulation
class Vector{                         
    constructor(x, y){
      this.x = x;                               
      this.y = y;
    }
    
    // reseta os valores x e y do Vector para os valores especificados
    set(x,y) {
        this.x = x;                            
        this.y = y;
    };
    
    // retorna o tamanho do Vector ao quadrado
    magSq() {               
        var x = this.x, y = this.y;
        return x * x + y * y;
    };

    // retorna o tamanho do Vector
    mag(){                   
        return Math.sqrt(this.magSq());
    };

    // soma o Vector atual com um novo especificado e retorna o próprio Vector (atualizado), e não um novo
    add(v) {               
        this.x += v.x;
        this.y += v.y;
        return this;
    };

    // subtrai um Vector especificado do atual e retorna o próprio Vector (atualizado), e não um novo
    sub(v) {                
        this.x -= v.x;
        this.y -= v.y;
        return this;
    };

    // subtrai um Vector especificado do atual e retorna um novo
    subNew(v) {                
      var x = this.x - v.x;
      var y = this.y - v.y;
      return new Vector(x, y);
    };

    // retorna este Vector após dividí-lo por um valor especificado
    // serve para diminuir o tamanho de um Vector. Assim, se n for dois, o Vector terá a metade do tamanho
    div(n) {                 
        this.x /= n;                           
        this.y /= n;
        return this;
    };

    // retorna este Vector após multiplicá-lo por um valor especificado
    // serve para aumentar o tamanho de um Vector. Assim, se n for dois, o Vector terá o dobro do tamanho
    mul(n) {               
        this.x *= n;                      
        this.y *= n;
        return this;
    };

    // muda o tamanho de um Vector pra 1 (isso se chama normalizar um Vector)
    normalize() {             
        // divide o próprio Vector pelo Vector retornado em mag(), ou seja, divide ele mesmo pelo seu tamanho,
        // resultando em 1 
        return this.div(this.mag());        
    };

    // muda o tamanho do Vector para um valor especificado
    setMag(n) {                
        // normaliza (muda o tamanho para 1) e então multiplica por n
        return this.normalize().mul(n);      
    };

    // retorna a distância entre dois pontos (definidos por x e y de um Vector v)
    dist(v) {                 
        var d = v.copy().sub(this);          
        return d.mag();
    };

    // limita o tamanho do Vector para um valor limite (usamos esse método para limitar a velocidade, por exemplo)
    limit(l) {               
        var mSq = this.magSq();                 
        if(mSq > l*l) {                       
            this.div(Math.sqrt(mSq));
            this.mul(l);
        }
        return this;
    };

    // retorna a direção pra qual o Vector está apondando (em radianos)
    headingRads() {           
        var h = Math.atan2(this.y, this.x);
        return h;
    };

    // retorna a direção pra qual o Vector está apondando (em graus)
    headingDegs() {          
        var r = Math.atan2(this.y, this.x);
        var h = (r * 180.0) / Math.PI;
        return h;
    };

    // rotaciona o Vector em 'a' radianos
    // podemos usar isso para que o desenho do bichinho rotacione pra estar sempre alinhado a seu movimento
    rotateRads(a) {          
        var newHead = this.headingRads() + a;   
        var mag = this.mag();
        this.x = Math.cos(newHead) * mag;
        this.y = Math.sin(newHead) * mag;
        return this;
    };

    // rotaciona o Vector em 'a' graus
    rotateDegs(a) {     
        a = (a * Math.PI)/180.0;           
        var newHead = this.headingRads() + a;   
        var mag = this.mag();
        this.x = Math.cos(newHead) * mag;
        this.y = Math.sin(newHead) * mag;
        return this;
    };

    // retorna o ângulo entre dois Vectores (em radianos)  -->  /\
    angleBetweenDegs(x,y) {  
        var r = this.angleBetweenRads(x,y);
        var d = (r * 180)/Math.PI;
        return d;
    }

    // checa se dois Vectores são idênticos e retorna um booleano
    equals(x, y) {          
        var a, b;                    
        if (x instanceof Vector) {       
            a = x.x || 0;
            b = x.y || 0;
        } else {
            a = x || 0;
            b = y || 0;
        }

        return this.x === a && this.y === b;
    };

    // retorna uma cópia deste Vector
    copy(){
        return new Vector(this.x,this.y);   
    }                                        

}