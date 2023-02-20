"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomFlower = void 0;
const getRandomFlower = () => {
    const flowers = ['🌺', '🌻', '🌹', '🥀', '🌷', '🌼', '🌸', '💐', '🍄'];
    const randomIndex = Math.floor(Math.random() * flowers.length);
    return flowers[randomIndex];
};
exports.getRandomFlower = getRandomFlower;
//# sourceMappingURL=getRandomFlower.js.map