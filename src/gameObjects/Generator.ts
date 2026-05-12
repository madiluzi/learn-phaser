import * as Phaser from "phaser";

export default class Generator {
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.scene.time.delayedCall(2000, () => this.init(), null, this);
        this.pinos = 0;
    }
    init() {
        this.generateObstacle();
        this.generateCoin();
    }
    generateObstacle() {
        this.scene.obstacles.add(
            new Obstacle(
                this.scene,
                800,
                this.scene.height - Phaser.Math.Between(32, 128),
            ),
        );
        this.scene.time.delayedCall(
            Phaser.Math.Between(1500, 2500),
            () => this.generateObstacle(),
            null,
            this,
        );
    }
    generateCoin() {
        this.scene.coins.add(
            new Coin(
                this.scene,
                800,
                this.scene.height - Phaser.Math.Between(32, 128),
            ),
        );
        this.scene.time.delayedCall(
            Phaser.Math.Between(500, 1500),
            () => this.generateCoin(),
            null,
            this,
        );
    }
}

class Obstacle extends Phaser.GameObjects.Rectangle {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 32, 32, 0xff0000);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.init();
    }
    init() {
        this.scene.tweens.add({
            targets: this,
            x: { from: 820, to: -100 },
            duration: 2000,
            onComplete: () => {
                this.destroy();
            },
        });
    }
}

class Coin extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "coin");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.init();
    }
    init() {
        this.scene.tweens.add({
            targets: this,
            x: { from: 820, to: -100 },
            duration: 2000,
            onComplete: () => {
                this.destroy();
            },
        });
        this.scene.anims.create({
            key: "coin",
            frames: this.scene.anims.generateFrameNumbers("coin", {
                start: 0,
                end: 7,
            }),
            frameRate: 8,
        });
        this.play({ key: "coin", repeat: -1 });
    }
}
