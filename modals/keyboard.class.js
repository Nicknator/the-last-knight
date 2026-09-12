/**
 * Manages the boolean state tracking for active user keyboard and touch controller inputs.
 */
class Keyboard {
    /** @type {boolean} Triggers character movement to the left. */
    left = false;
    /** @type {boolean} Triggers character movement to the right. */
    right = false;
    /** @type {boolean} Triggers character upward jump sequencing. */
    up = false;
    /** @type {boolean} Triggers character downward shield blocking stance. */
    down = false;
    /** @type {boolean} Secondary execution trigger path for jumping. */
    space = false;
    /** @type {boolean} Executes the standard physical sword attack. */
    attack = false;
    /** @type {boolean} Fires a loaded bolt projectile from the crossbow. */
    shoot_crossbow = false;  
}
