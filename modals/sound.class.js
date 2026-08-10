class Sound extends Movableobject {

    deadsound = 'audio/1_character/character-dead.mp3';
    walkL_sound = 'audio/1_character/1_run/character-run-left.wav';
    walkR_sound = 'audio/1_character/1_run/character-run-right.wav';
    attack_sound = 'audio/1_character/2_attack/attack-sound (mp3cut.net).wav';
    shield_block_sound = 'audio/1_character/3_block/character-block.wav';
    bolt_hit_sound  = 'audio/1_character/4_crossbow_attack/crossbow-sound.wav';
    loading_crossbow_sound = 'audio/1_character/4_crossbow_attack/loading.wav';
    jump_sound = 'audio/1_character/5_jump/jump1.wav';
    jump_ground_sound = 'audio/1_character/5_jump/jump_ground.wav';



    constructor() {
        super();
        this.deadsound = new Audio(this.deadsound);
        this.walkL_sound = new Audio(this.walkL_sound);
        this.walkR_sound = new Audio(this.walkR_sound);
        this.attack_sound = new Audio(this.attack_sound);
        this.shield_block_sound = new Audio(this.shield_block_sound);
        this.bolt_hit_sound = new Audio(this.bolt_hit_sound);
        this.loading_crossbow_sound = new Audio(this.loading_crossbow_sound);
        this.jump_sound = new Audio(this.jump_sound);
        this.jump_ground_sound = new Audio(this.jump_ground_sound);
        this.walkL_sound.volume = 0.45;
        this.walkR_sound.volume = 0.45;
        this.attack_sound.volume = 0.45;
        this.shield_block_sound.volume = 0.45;
        this.bolt_hit_sound.volume = 0.45;
        this.loading_crossbow_sound.volume = 0.45;
        this.jump_sound.volume = 0.45;
        this.jump_ground_sound.volume = 0.45;
        this.stepToggle = true;
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
        this.attack_sound.play().catch(() => {});
    }

    shieldBlockSound(){
        this.shield_block_sound.play().catch(() => {});
    }

    boltHitSound() {
        this.bolt_hit_sound.pause(); 
        this.bolt_hit_sound.currentTime = 0; 
        this.bolt_hit_sound.play().catch(() => {});
    }

    loadingCrossbowSound() {
        this.loading_crossbow_sound.pause();
        this.loading_crossbow_sound.currentTime = 0;
        this.loading_crossbow_sound.play().catch(() => {});
    }

    jumpSound() {
        this.jump_sound.pause();
        this.jump_sound.currentTime = 0;
        this.jump_sound.play().catch(() => {});
    }

    jumpGroundSound() {
        this.jump_ground_sound.pause();
        this.jump_ground_sound.currentTime = 0;
        this.jump_ground_sound.play().catch(() => {});
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
