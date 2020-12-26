class Food {
    constructor(){
        this.lastFed = 0;

        this.image = loadImage("images/Milk.png");

    }

    updateFoodStock(food){
        foodS = food;
    }

    bedroom(){
        background(bedrimg,550,500)
    }

    garden(){
        background(gardimg,550,500)
    }

    WashRoom(){
        background(washrimg,550,500)
    }

    livingroom(){
        background(livingimg,550,500)
    }
    update(data){
        database.ref('/').update({
            gameState : data
        })
    }
    display(){

        var x = 80;
        var y = 200;

        if(foodS!== 0){
            for(var i = 0; i<foodS;i++){
                if(i % 10===0){
                    x = 80;
                    y = y + 50;
                }
                image(this.image,x,y,50,50);
                x = x+30;
           
            }
        }
    }
}
