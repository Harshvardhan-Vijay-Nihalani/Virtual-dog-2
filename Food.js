class Food{
    constructor(){
        this.image = loadImage("images/Milk.png");
        this.foodStock = 0;
        this.lastfed = null;
    }

    getFoodStock(){
        return(this.foodStock);
    }

    updateFood(updateValue){
        this.foodStock = updateValue;
    }

    deductFood(){
        if(this.foodStock>=1){
            this.foodS-=1;
        }
    }

    display(){
        var x=80, y=100;

        imageMode(CENTER);
        
        if(this.foodStock!=0){
            for(var i=0; i<this.foodStock; i++){
                if(i%10===0){
                    x=80;
                    y+=50;
                }
                image(this.image, x, y, 50, 50);
                x+=30;
            }
        }
    }
}