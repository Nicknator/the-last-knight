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
                let volume = soundConfig[key];
                this[key] = new Audio(this[key]);
                this[key].volume = volume;
            }
        });
    }

    deadSound() {
        if (this.isMuted || !this.deadsound) return;
        this.deadsound.play();
        this.deadsound = null;
    }

    shieldBlockSound() {
        if (this.isMuted) return;
        this.shield_block_sound.play().catch(() => { });
    }

    attackSound() {
        if (this.isMuted) return;
        this.attack_sound.pause();
        this.attack_sound.currentTime = 0;
        this.attack_sound.play().catch(() => { });
    }

    boltHitSound() {
        if (this.isMuted) return;
        this.bolt_hit_sound.pause();
        this.bolt_hit_sound.currentTime = 0;
        this.bolt_hit_sound.play().catch(() => { });
    }

    loadingCrossbowSound() {
        if (this.isMuted) return;
        this.loading_crossbow_sound.pause();
        this.loading_crossbow_sound.currentTime = 0;
        this.loading_crossbow_sound.play().catch(() => { });
    }

    jumpSound() {
        if (this.isMuted) return;
        this.jump_sound.pause();
        this.jump_sound.currentTime = 0;
        this.jump_sound.play().catch(() => { });
    }

    jumpGroundSound() {
        if (this.isMuted) return;
        this.jump_ground_sound.pause();
        this.jump_ground_sound.currentTime = 0;
        this.jump_ground_sound.play().catch(() => { });
    }

    attackFromEnemySound() {
        if (this.isMuted) return;
        this.attack_from_enemy_sound.pause();
        this.attack_from_enemy_sound.currentTime = 0;
        this.attack_from_enemy_sound.play().catch(() => { });
    }

    skeletonHurtSound() {
        if (this.isMuted) return;
        this.skeleton_hurt_sound.pause();
        this.skeleton_hurt_sound.currentTime = 0;
        this.skeleton_hurt_sound.play().catch(() => { });
    }

    dragonWingSound() {
        if (this.isMuted) return;
        this.dragon_wing_sound.pause();
        this.dragon_wing_sound.currentTime = 0;
        this.dragon_wing_sound.play().catch(() => { });
    }

    dragonFireSound() {
        if (this.isMuted) return;
        this.dragon_fire_sound.pause();
        this.dragon_fire_sound.currentTime = 0;
        this.dragon_fire_sound.play().catch(() => { });
    }

    dragonGrowlSound() {
        if (this.isMuted) return;
        this.dragon_growl_sound.pause();
        this.dragon_growl_sound.currentTime = 0;
        this.dragon_growl_sound.play().catch(() => { });
    }

    lootCoinSound() {
        if (this.isMuted) return;
        this.loot_coin_sound.pause();
        this.loot_coin_sound.currentTime = 0;
        this.loot_coin_sound.play().catch(() => { });
    }

    lootBoltSound() {
        if (this.isMuted) return;
        this.loot_bolt_sound.pause();
        this.loot_bolt_sound.currentTime = 0;
        this.loot_bolt_sound.play().catch(() => { });
    }

    glaciersBreakingSound() {
        if (this.isMuted) return;
        this.glaciers_breaking_sound.pause();
        this.glaciers_breaking_sound.currentTime = 0;
        this.glaciers_breaking_sound.play().catch(() => { });
    }

    iceWindSound() {
        if (this.isMuted) return;
        this.ice_wind_sound.loop = true;
        this.ice_wind_sound.play().catch(() => { });
        this.windClone = this.ice_wind_sound.cloneNode(true);
        this.windClone.loop = true;
        setTimeout(() => {
            if (!this.isMuted) this.windClone.play().catch(() => { });
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
