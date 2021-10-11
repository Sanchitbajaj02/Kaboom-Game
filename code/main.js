import kaboom from "kaboom";

// initialize context
kaboom();

gravity(2400);

// load assets
loadSprite("bean", "sprites/bean.png");

// add a character to screen
const player = add([
	// list of components
	sprite("bean"),
	pos(80, 40),
	area(),
    body()
]);

const scoreText = add([
    text(0),
]);

add([
    rect(width(), 48),
    pos(0, height()),
    origin("botleft"),
    area(),
    solid(),
    color(127, 200, 255)
]);

function jump() {
    if (player.grounded()) {
        player.jump(800);
        scoreText.text = scoreText.text + 1;
    }
};

mouseClick(jump);
GamepadButton(jump);

function spawnTree() {
    add([
        rect(48, rand(32, 96)),
        area(),
        pos(width(), height() - 48),
        origin("botleft"),
        move(LEFT, 480),
        "tree",
    ])
    wait(rand(0.5, 1.5), spawnTree)
};

spawnTree();

player.collides("tree", () => {
    scoreText.text = 0
    addKaboom(player.pos);

});