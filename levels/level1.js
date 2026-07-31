const level1 = new Level(

    [
        new SkeletonEnemy(300),
        new SkeletonEnemy(350),
        new SkeletonEnemy(450),
        new Endboss(),

    ],

    [
        new LootBolt(300),
        new LootBolt(500),
        new LootBolt(700),
    ],

    [
        new Coin(1500),
        new Coin(1900),
        new Coin(3000),
    ],

    
    [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
    ],

   

    [
        new BackgroundObject('img/5_background/winter-location.png', -720),
        new BackgroundObject('img/5_background/winter-location.png', 0),
        new BackgroundObject('img/5_background/winter-location2.png', 720),
        new BackgroundObject('img/5_background/winter-location.png', 1440),
        new BackgroundObject('img/5_background/winter-location.png', 2160),
    ],


    






);
