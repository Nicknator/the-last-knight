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

    /**
     * Creates the ammunition status bar and sets the default coordinates and images.
     */
    constructor() {
        super();
        this.x = 0;
        this.y = 40;
        this.width = 150;
        this.height = 40;
        this.loadImages(this.IMAGES_AMMO);
        this.setPercentage(this.percentage);
    }

    /**
     * Updates the current percentage value and swaps the ammunition bar image.
     * @param {number} percentage - The new percentage value of remaining ammunition.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_AMMO[this.percentageImgIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Calculates the matching image index based on the current ammunition percentage.
     * @returns {number} The index for the IMAGES_AMMO array (0 to 5).
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
