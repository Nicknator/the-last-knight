class Character extends Movableobject {
    y = 300;

    characterImges = [
        'img/2.character/walk/knight-idle-frame.png',
        'img/2.character/walk/knight-idle-frame2.png',
        'img/2.character/walk/knight-idle-frame3.png',
        'img/2.character/walk/knight-idle-frame4.png',
        'img/2.character/walk/knight-idle-frame5.png',
        'img/2.character/walk/knight-idle-frame6.png',
        'img/2.character/walk/knight-idle-frame7.png',
        'img/2.character/walk/knight-idle-frame8.png',
    ];

    currentImage = 0;



    constructor() {
        super(0).loadImage('img/2.character/walk/knight-idle-frame.png');

        this.speed = 5;
        this.characterAnimate();

    }

    characterAnimate() {
        setInterval(() => {
            let path = this.characterImges[this.currentImage];
            this.img.src=path;
            this.currentImage++;
            this.currentImage = this.currentImage % this.characterImges.length;



        }, 300);


    }


    jump() {

    }


}