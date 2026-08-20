class StatusbarHealth extends DrawableObject {
    IMAGES_HEALTH = [
        'img/statusbar/bar_health_0.png',
        'img/statusbar/bar_health_20.png',
        'img/statusbar/bar_health_40.png',
        'img/statusbar/bar_health_60.png',
        'img/statusbar/bar_health_80.png',
        'img/statusbar/bar_health_100.png',
    ];
    percentage = 100;

    /**
     * Creates the health status bar and sets the default coordinates and images.
     */
    constructor() {
        super();
        this.x = 0;
        this.y = 10;
        this.width = 150;
        this.height = 40;
        this.loadImages(this.IMAGES_HEALTH);
        this.setPercentage(this.percentage);
    }

    /**
     * Updates the current percentage value and swaps the status bar image.
     * @param {number} percentage - The new health value of the character.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.percentageImgIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Calculates the matching image index based on the current health percentage.
     * @returns {number} The index for the IMAGES_HEALTH array (0 to 5).
     */
    percentageImgIndex() {
        if (this.percentage == 100) { return 5; }
        else if (this.percentage >= 80) { return 4; }
        else if (this.percentage >= 60) { return 3; }
        else if (this.percentage >= 40) { return 2; }
        else if (this.percentage >= 20) { return 1; }
        else { return 0; }
    }
}
