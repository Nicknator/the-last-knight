const level1 = new Level(
    [
        new SkeletonEnemy(300),
        new SkeletonEnemy(350),
        new SkeletonEnemy(450),
    ],


    [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
    ],

    [
        new BackgroundObject('img/5_background/winter-location.png', -720), // Links vom Start
        new BackgroundObject('img/5_background/winter-location.png', 0),    // Startbildschirm
        new BackgroundObject('img/5_background/winter-location.png', 720),  // Rechts davon
        new BackgroundObject('img/5_background/winter-location2.png', 1440), // Noch weiter rechts
        new BackgroundObject('img/5_background/winter-location.png', 2160), // Beliebig erweiterbar
    ]






);
