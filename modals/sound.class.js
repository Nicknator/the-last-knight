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

    playSound(audioObject) {
        if (this.isMuted || !audioObject) return;
        audioObject.pause();
        audioObject.currentTime = 0;
        audioObject.play().catch(() => { });
    }

    deadSound() {
        if (this.isMuted || !this.deadsound) return;
        this.deadsound.play();
        this.deadsound = null;
    }

    shieldBlockSound() { this.playSound(this.shield_block_sound); }
    attackSound() { this.playSound(this.attack_sound); }
    boltHitSound() { this.playSound(this.bolt_hit_sound); }
    loadingCrossbowSound() { this.playSound(this.loading_crossbow_sound); }
    jumpSound() { this.playSound(this.jump_sound); }
    jumpGroundSound() { this.playSound(this.jump_ground_sound); }
    attackFromEnemySound() { this.playSound(this.attack_from_enemy_sound); }
    skeletonHurtSound() { this.playSound(this.skeleton_hurt_sound); }
    dragonWingSound() { this.playSound(this.dragon_wing_sound); }
    dragonFireSound() { this.playSound(this.dragon_fire_sound); }
    dragonGrowlSound() { this.playSound(this.dragon_growl_sound); }
    lootCoinSound() { this.playSound(this.loot_coin_sound); }
    lootBoltSound() { this.playSound(this.loot_bolt_sound); }
    glaciersBreakingSound() { this.playSound(this.glaciers_breaking_sound); }

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

    playNextStep() {
        if (this.isMuted) return;
        let sound = this.stepToggle ? this.walkL_sound : this.walkR_sound;
        sound.currentTime = 0;
        sound.play().catch(e => { });
        this.stepToggle = !this.stepToggle;
    }

    stopSteps() {
        this.walkL_sound.pause();
        this.walkR_sound.pause();
    }

    muteAll() {
        this.isMuted = true;
        Object.keys(this).forEach(key => {
            if (this[key] && this[key] instanceof Audio) {
                this[key].volume = 0;
                this[key].pause();
            }
        });
    }

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
