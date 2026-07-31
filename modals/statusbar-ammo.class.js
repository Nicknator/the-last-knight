class StatusbarAMMO extends DrawableObject {
    IMAGES_AMMO = [
        'img/statusbar/bar_ammo_0.png',
        'img/statusbar/bar_ammo_1.png',
        'img/statusbar/bar_ammo_2.png',
        'img/statusbar/bar_ammo_3.png',
        'img/statusbar/bar_ammo_4.png',
        'img/statusbar/bar_ammo_5.png',
    ];
    percentage = 100;


    constructor() {
        super();
        this.x = 0;
        this.y = 40;
        this.width = 150;
        this.height = 40;
        this.loadImages(this.IMAGES_AMMO);
        this.setPercentage(this.percentage);
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_AMMO[this.percentageImgIndex()]
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