namespace SpriteKind {
    export const Boss = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (player2, laser) {
    game.over(false, effects.slash)
})
// Shooting
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    laser = sprites.createProjectileFromSprite(img`
        . . . . . . 2 . . . . . . . . . 
        . . . . . . 2 . . . . . . . . . 
        . . . . . . 2 . . . . . . . . . 
        . . . . . . 2 . . . . . . . . . 
        `, spaceship, 0, -100)
    // Adjust the starting Y position of the laser
    laser.y += -10
    music.pewPew.play()
})
// Boss collisions
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Boss, function (laser, boss) {
    laser.destroy()
    bossHealth += 0 - 1
    boss.startEffect(effects.fire, 200)
    music.thump.play()
    if (bossHealth <= 0) {
        boss.destroy(effects.disintegrate)
    }
})
sprites.onDestroyed(SpriteKind.Boss, function (sprite) {
    bossActive = false
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (player2, boss) {
    game.over(false, effects.slash)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (player2, alien) {
    game.over(false, effects.slash)
})
// Collisions
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (laser, alien) {
    laser.destroy()
    alien.destroy(effects.disintegrate)
    info.changeScoreBy(10)
    music.baDing.play()
})
let alien: Sprite = null
let bossLaser: Sprite = null
let boss: Sprite = null
let bossActive = false
let bossHealth = 0
let laser: Sprite = null
let spaceship: Sprite = null
let laser2 = null
effects.starField.startScreenEffect()
// Create the player's spaceship and set its position
spaceship = sprites.create(img`
    . . . . . . . . . . . . . . . . . 
    . 2 . . . . . . . . . . . . . 2 . 
    . 2 . . . . . . . . . . . . . 2 . 
    . 2 . . . . . . c . . . . . . 2 . 
    . . . . . . . . c . . . . . . . . 
    . c . . . . . c 6 c . . . . . c . 
    . c . . . . c 6 9 9 c . . . . c . 
    . c . . . . c 6 9 9 c . . . . c . 
    . c . . . . c 6 9 9 c . . . . c . 
    c e c . . c b 9 9 9 b c . . c e c 
    c e c . . c e b 9 b e c . . c e c 
    c e e c c f e e b e e f c c e e c 
    . c e e e e f e e e f e e e e c . 
    . c e e e f e e e e e f e e e c . 
    . . c c c c e e e e e c c c c . . 
    . . 4 . . . c e e e c . . . 4 . . 
    . . 2 . . . . c c c . . . . 2 . . 
    `, SpriteKind.Player)
spaceship.setPosition(80, 100)
spaceship.setStayInScreen(true)
controller.moveSprite(spaceship, 100, 100)
// Boss every 100 points
game.onUpdate(function () {
    if (info.score() % 100 == 0 && info.score() > 0 && !(bossActive)) {
        bossActive = true
        boss = sprites.create(img`
            ...........................777777777777777777777777777777.......................
            ........................7777777777777777777777777777777777......................
            .......................77..77...77777777777777777777............................
            ........................447777777777777777777777777777..........................
            ........................444477777777777777777777777744..........................
            ........................444444777777777777777777444444..........................
            ...................4444444444444477777777777744444444444444.....................
            ...................4444444444444444444444444444444444444444.....................
            ...................4444444444444444444444444444444444444444.....................
            ..............44444444444444444444444444444444444444444444444444................
            ..............44444444442222224444444444444444442222224444444444................
            ..............44444444442222222444444444444444422222224444444444................
            ..............44444444442222222244444444444444222222224444444444................
            ..............44444444442222222224444444444442222222224444444444................
            ..............44444444442222222222444444444422222222224444444444................
            ..............44444444444444444444444444444444444444444444444444................
            ..............44444444444444444444444444444444444444444444444444................
            ..............44444444444444444444444444444444444444444444444444................
            ..............44444444444444444444444444444444444444444444444444................
            ..............4444444444f4444444444444444444444444444f4444444444................
            ..............4444444444fff44444444444444444444444ffff4444444444................
            ..............4444444444fffff44444444444444444444fffff4444444444................
            ..............4444444444ffffff44444444444444444fffffff4444444444................
            ..............4444444444ffffffffffffffffffffffffffffff4444444444................
            ..............4444444444fffffffffffffffffffffffffffff44444444444................
            ..............44444444444ffffffffffffffffffffffffffff44444444444................
            ..............44444444444ffffffffffffffffffffffffffff44444444444................
            ..............444444444444fffffffffffffffffffffffffff44444444444................
            ..............444444444444ffffffffffffffffffffffffff444444444444................
            ..............4444444444444ffffffffffffffffffffffff4444444444444................
            ..............444444444444444fffffffffffffffffffff44444444444444................
            ..............44444444444444444ffffffffffffffffff444444444444444................
            ..............444444444444444444444ffffffffff4444444444444444444................
            ..............44444444444444444444444444444444444444444444444444................
            ..............44444444444444444444444444444444444444444444444444................
            ...................4444444444444444444444444444444444444444.....................
            ...................4444444444444444444444444444444444444444.....................
            ...................4444444444444444444444444444444444444444.....................
            ........................444444444444444444444444444444..........................
            ........................444444444444444444444444444444..........................
            ........................444444444444444444444444444444..........................
            ................................................................................
            ................................................................................
            ................................................................................
            ................................................................................
            ................................................................................
            ................................................................................
            ................................................................................
            ................................................................................
            ................................................................................
            `, SpriteKind.Boss)
        boss.setPosition(80, 30)
        boss.setVelocity(50, 0)
        boss.setBounceOnWall(true)
        bossHealth = 10
    }
})
// Boss shooting
game.onUpdateInterval(2000, function () {
    if (bossActive) {
        bossLaser = sprites.createProjectileFromSprite(img`
            . . . . . . 3 . . . . . . . . . 
            . . . . . . 3 . . . . . . . . . 
            . . . . . . 3 . . . . . . . . . 
            . . . . . . 3 . . . . . . . . . 
            `, boss, 0, 100)
        music.pewPew.play()
    }
})
// Aliens
game.onUpdateInterval(1000, function () {
    if (bossActive) {
        return
    }
    alien = sprites.create(img`
        . . . . 7 7 7 7 7 . . . . . . . 
        . . . . 7 4 7 7 4 4 4 . . . . . 
        . . . . 4 4 4 4 4 4 4 4 . . . . 
        . . . 4 4 4 f 4 4 f 4 4 4 . . . 
        . . . 4 4 f f 4 4 f f 4 4 . . . 
        . . . 4 4 4 4 4 4 4 4 4 4 . . . 
        . . . 4 4 f 4 4 4 4 f 4 4 . . . 
        . . . 4 f f f f f f f f 4 . . . 
        . . . 4 4 f f f f f f 4 4 . . . 
        . . . 4 4 4 f f f f 4 4 4 . . . 
        . . . 4 4 4 4 4 4 4 4 4 4 . . . 
        . . . . 4 4 4 4 4 4 4 4 . . . . 
        . . . . . 4 4 4 4 4 4 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    alien.setPosition(Math.randomRange(10, 150), 0)
    alien.setVelocity(0, 50)
})
