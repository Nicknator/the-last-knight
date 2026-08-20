class Sound extends Movableobject {
    deadsound = 'audio/1_character/character-dead.mp3';
    walkL_sound = 'audio/1_character/1_run/character-run-left.wav';
    walkR_sound = 'audio/1_character/1_run/character-run-right.wav';
    attack_sound = 'audio/1_character/2_attack/attack-sound (mp3cut.net).wav';
    shield_block_sound = 'audio/1_character/3_block/character-block.wav';
    bolt_hit_sound = 'audio/1_character/4_crossbow_attack/crossbow-sound.wav';
    loading_crossbow_sound = 'audio/1_character/4_crossbow_attack/loading.wav';
    jump_sound = 'audio/1_character/5_jump/jump1.wav';
    jump_ground_sound = 'audio/1_character/5_jump/jump_ground.wav';
    attack_from_enemy_sound = 'audio/2_skeleton/attack-skeleton.mp3';
    skeleton_hit_sound = 'audio/2_skeleton/attack-skeleton.mp3';
    skeleton_hurt_sound = 'audio/2_skeleton/hit/skeleton-hurt.mp3';
    dragon_wing_sound = 'audio/3_dragon/wing/npc_dragon_wingflap_01.wav';
    dragon_fire_sound = 'audio/3_dragon/fire/dragon-fire5s.mp3';
    dragon_growl_sound = 'audio/3_dragon/growl/npc_dragon_injuredflight_01.wav';
    ice_wind_sound = 'audio/4_backgroundsound/ice-wind-sound_sound.mp3';
    glaciers_breaking_sound = 'audio/4_backgroundsound/glaciers_breaking_sound.mp3';
    loot_coin_sound = 'audio/5_loot_sound/loot_coin_sound.mp3';
    loot_bolt_sound = 'audio/5_loot_sound/bolt_pickup_sound .wav';
    
    isMuted = false; 
    windClone = null; 

    /**
     * Initializes the sound management module, loading audio tracks and establishing custom volumes.
     */
    constructor() {
        super();
        const soundConfig = {
            'deadsound': 0.45, 'walkL_sound': 0.45, 'walkR_sound': 0.45, 'attack_sound': 0.45,
            'shield_block_sound': 0.45, 'bolt_hit_sound': 0.45, 'loading_crossbow_sound': 0.45,
            'jump_sound': 0.45, 'jump_ground_sound': 0.45, 'attack_from_enemy_sound': 0.45,
            'skeleton_hurt_sound': 0.45, 'dragon_wing_sound': 0.45, 'dragon_fire_sound': 1,
            'dragon_growl_sound': 0.65, 'ice_wind_sound': 0.65, 'glaciers_breaking_sound': 0.65,
            'loot_coin_sound': 0.45, 'loot_bolt_sound': 0.45,
        };
        Object.keys(soundConfig).forEach(key => {
            if (this[key]) {
                this[key] = new Audio(this[key]);
                this[key].volume = soundConfig[key];
            }
        });
    }

    /**
     * Resets timelines and starts playback for the specified audio object if not muted.
     * @param {HTMLAudioElement} audioObject - The specific audio asset wrapper to handle.
     */
    playSound(audioObject) {
        if (this.isMuted || !audioObject) return;
        audioObject.pause();
        audioObject.currentTime = 0;
        audioObject.play().catch(() => { });
    }

    /**
     * Plays the specific character defeat sound tracking array triggers and expires data references.
     */
    deadSound() {
        if (this.isMuted || !this.deadsound) return;
        this.deadsound.play();
        this.deadsound = null;
    }

    /** Plays the shield block barrier collision bounce effect tracking coordinates. */
    shieldBlockSound() { this.playSound(this.shield_block_sound); }

    /** Triggers character blade swing acceleration sweep sounds. */
    attackSound() { this.playSound(this.attack_sound); }

    /** Executes ballistic bolt contact break impact collision clips. */
    boltHitSound() { this.playSound(this.bolt_hit_sound); }

    /** Plays crossbow tension mechanical lock charge sound clips. */
    loadingCrossbowSound() { this.playSound(this.loading_crossbow_sound); }

    /** Plays vertical ground acceleration escape jump launch audios. */
    jumpSound() { this.playSound(this.jump_sound); }

    /** Triggers baseline platform landing force impact deceleration sounds. */
    jumpGroundSound() { this.playSound(this.jump_ground_sound); }

    /** Fires melee skeleton weapon swing contact collision alert clips. */
    attackFromEnemySound() { this.playSound(this.attack_from_enemy_sound); }

    /** Plays damaged skeleton structural break crack audio elements. */
    skeletonHurtSound() { this.playSound(this.skeleton_hurt_sound); }

    /** Executes boss dragon aerial wingflap draft atmosphere sound nodes. */
    dragonWingSound() { this.playSound(this.dragon_wing_sound); }

    /** Spawns boss column fire breath exhaust combustion loops. */
    dragonFireSound() { this.playSound(this.dragon_fire_sound); }

    /** Triggers generic boss warning vocalization sound streams. */
    dragonGrowlSound() { this.playSound(this.dragon_growl_sound); }

    /** Plays status bar treasure pickup validation reward chime indicators. */
    lootCoinSound() { this.playSound(this.loot_coin_sound); }

    /** Plays armbrust reload supply cluster collect click sequences. */
    lootBoltSound() { this.playSound(this.loot_bolt_sound); }

    /** Executes ambient glacier cracking interval weather breakdown tracks. */
    glaciersBreakingSound() { this.playSound(this.glaciers_breaking_sound); }

    /**
     * Starts background environment wind loops and schedules seamless layer cloning offsets.
     */
    iceWindSound() {
        if (this.isMuted) return;
        this.ice_wind_sound.loop = true;
        this.ice_wind_sound.play().catch(() => { });
        this.windClone = this.ice_wind_sound.cloneNode(true);
        this.windClone.loop = true;
        setTimeout(() => {
            if (!this.isMuted && this.windClone) this.windClone.play().catch(() => { });
        }, (this.ice_wind_sound.duration * 1000) / 2 || 2000);
    }

    /**
     * Alternates left and right character locomotive mechanical step audio pieces.
     */
    playNextStep() {
        if (this.isMuted) return;
        let sound = this.stepToggle ? this.walkL_sound : this.walkR_sound;
        sound.currentTime = 0;
        sound.play().catch(e => { });
        this.stepToggle = !this.stepToggle;
    }

    /**
     * Freezes actively playing footstep layers immediately upon motion stops.
     */
    stopSteps() {
        this.walkL_sound.pause();
        this.walkR_sound.pause();
    }

    /**
     * Mutes all active audio properties dynamically cycling class references.
     */
    muteAll() {
        this.isMuted = true;
        Object.keys(this).forEach(key => {
            if (this[key] && this[key] instanceof Audio) {
                this[key].volume = 0;
                this[key].pause();
            }
        });
    }

    /**
     * Restores normalized balancing weights to sound assets managing specific map exceptions.
     */
    unmuteAll() {
        this.isMuted = false;
        Object.keys(this).forEach(key => {
            if (this[key] && this[key] instanceof Audio) this[key].volume = 0.45;
        });
        if (this.ice_wind_sound) this.ice_wind_sound.volume = 0.65;
        if (this.dragon_growl_sound) this.dragon_growl_sound.volume = 0.65;
        if (this.dragon_fire_sound) this.dragon_fire_sound.volume = 1.0;
        this.iceWindSound();
    }
}
