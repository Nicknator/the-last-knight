class StatusbarCoin extends DrawableObject {
    IMAGES_COIN = [
        'img/statusbar/bar_coin_0.png',
        'img/statusbar/bar_coin_1.png',
        'img/statusbar/bar_coin_2.png',
        'img/statusbar/bar_coin_3.png',
        'img/statusbar/bar_coin_4.png',
        'img/statusbar/bar_coin_5.png',
    ];
    percentage = 0;


    constructor() {
        super();
        this.x = -10;
        this.y = 70;
        this.width = 160;
        this.height = 45;
        this.loadImages(this.IMAGES_COIN);
        this.setPercentage(this.percentage);
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COIN[this.percentageImgIndex()]
        this.img = this.imageCache[path];
        
    }


    percentageImgIndex() {
        if (this.percentage == 100) { return 5; }
        else if (this.percentage >= 80) { return 4; }
        else if (this.percentage >= 60) { return 3; }
        else if (this.percentage >= 40) { return 2; }
        else if (this.percentage >= 20) { return 1; }
        else { return 0; }
        
    }

 
}