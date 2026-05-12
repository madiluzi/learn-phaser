import { AUTO, Game as PhaserGame } from "phaser";
import { Boot } from "./scenes/Boot";
import GameOver from "./scenes/GameOver";
import Game from "./scenes/Game";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";

const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 300,
    height: 600,
    parent: "game-container",
    backgroundColor: "#028af8",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 350 },
            debug: true,
        },
    },
    scene: [Game, GameOver],
};

const StartGame = (parent: string) => {
    return new PhaserGame({ ...config, parent });
};

export default StartGame;
