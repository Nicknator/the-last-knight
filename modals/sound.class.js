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


    attackSound() {
        this.attack_sound.pause();
        this.attack_sound.currentTime = 0;
        this.attack_sound.playbackRate = 1;
        this.attack_sound.play().catch(() => { });
    }

    shieldBlockSound() {
        this.shield_block_sound.play().catch(() => { });
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
