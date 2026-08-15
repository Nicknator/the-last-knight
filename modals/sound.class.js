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


    constructor() {
        super();
        const soundConfig = {
            'deadsound': 0.45,
            'walkL_sound': 0.45,
            'walkR_sound': 0.45,
            'attack_sound': 0.45,
            'shield_block_sound': 0.45,
            'bolt_hit_sound': 0.45,
            'loading_crossbow_sound': 0.45,
            'jump_sound': 0.45,
            'jump_ground_sound': 0.45,
            'attack_from_enemy_sound': 0.45,
            'skeleton_hurt_sound': 0.45,
            'dragon_wing_sound': 0.45,
            'dragon_fire_sound': 1,
            'dragon_growl_sound': 0.65,
            'ice_wind_sound': 0.65,
            'glaciers_breaking_sound': 0.65,
            'loot_coin_sound': 0.45,
            'loot_bolt_sound': 0.45,
        }
        const keys = Object.keys(soundConfig);

        keys.forEach(key => {

            if (this[key]) {
                let volume = soundConfig[key];
                this[key] = new Audio(this[key]);
                this[key].volume = volume;
            }
        });
    }


    deadSound() {
        if (!this.deadsound) return;
        this.deadsound.play();
        this.deadsound = null;
    }

    shieldBlockSound() {
        this.shield_block_sound.play().catch(() => { });
    }


    attackSound() {
        this.attack_sound.pause();
        this.attack_sound.currentTime = 0;
        this.attack_sound.play().catch(() => { });
    }


    boltHitSound() {
        this.bolt_hit_sound.pause();
        this.bolt_hit_sound.currentTime = 0;
        this.bolt_hit_sound.play().catch(() => { });
    }

    loadingCrossbowSound() {
        this.loading_crossbow_sound.pause();
        this.loading_crossbow_sound.currentTime = 0;
        this.loading_crossbow_sound.play().catch(() => { });
    }

    jumpSound() {
        this.jump_sound.pause();
        this.jump_sound.currentTime = 0;
        this.jump_sound.play().catch(() => { });
    }

    jumpGroundSound() {
        this.jump_ground_sound.pause();
        this.jump_ground_sound.currentTime = 0;
        this.jump_ground_sound.play().catch(() => { });
    }

    attackFromEnemySound() {
        this.attack_from_enemy_sound.pause();
        this.attack_from_enemy_sound.currentTime = 0;
        this.attack_from_enemy_sound.play().catch(() => { });
    }

    skeletonHurtSound() {
        this.skeleton_hurt_sound.pause();
        this.skeleton_hurt_sound.currentTime = 0;
        this.skeleton_hurt_sound.play().catch(() => { });

    }
    dragonWingSound() {
        this.dragon_wing_sound.pause();
        this.dragon_wing_sound.currentTime = 0;
        this.dragon_wing_sound.play().catch(() => { });
    }

    dragonFireSound() {
        this.dragon_fire_sound.pause();
        this.dragon_fire_sound.currentTime = 0;
        this.dragon_fire_sound.play().catch(() => { });
    }

    dragonGrowlSound() {
        this.dragon_growl_sound.pause();
        this.dragon_growl_sound.currentTime = 0;
        this.dragon_growl_sound.play().catch(() => { });
    }

    lootCoinSound() {
        this.loot_coin_sound.pause();
        this.loot_coin_sound.currentTime = 0;
        this.loot_coin_sound.play().catch(() => { });
    }

    lootBoltSound() {
        this.loot_bolt_sound.pause();
        this.loot_bolt_sound.currentTime = 0;
        this.loot_bolt_sound.play().catch(() => { });
    }



    glaciersBreakingSound() {
        this.glaciers_breaking_sound.pause();
        this.glaciers_breaking_sound.currentTime = 0;
        this.glaciers_breaking_sound.play().catch(() => { });
    }

    iceWindSound() {
        this.ice_wind_sound.loop = true;
        this.ice_wind_sound.play().catch(() => { });
        let clone = this.ice_wind_sound.cloneNode(true);
        clone.loop = true;
        setTimeout(() => clone.play().catch(() => { }), (this.ice_wind_sound.duration * 1000) / 2 || 2000);
    }



    playNextStep() {
        if (this.stepToggle) {
            this.walkL_sound.currentTime = 0;
            this.walkL_sound.play().catch(e => { });
        } else {
            this.walkR_sound.currentTime = 0;
            this.walkR_sound.play().catch(e => { });
        }

        this.stepToggle = !this.stepToggle;
    }

    stopSteps() {
        this.walkL_sound.pause();
        this.walkR_sound.pause();
    }
}
