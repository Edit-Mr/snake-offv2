input.onPinPressed(TouchPin.P0, function () {
    SnakeHead.turn(Direction.Left, 90)
})
input.onButtonPressed(Button.A, function () {
    SnakeHead.turn(Direction.Left, 90)
})
input.onButtonPressed(Button.B, function () {
    SnakeHead.turn(Direction.Right, 90)
})
input.onPinPressed(TouchPin.P1, function () {
    SnakeHead.turn(Direction.Right, 90)
})
let i = 0
let snakeBody: game.LedSprite[] = []
let SnakeHead: game.LedSprite = null
SnakeHead = game.createSprite(1, 2)
let apple = game.createSprite(randint(0, 0), randint(0, 0))
apple.set(LedSpriteProperty.Blink, 100)
SnakeHead.set(LedSpriteProperty.Direction, 90)
let snakeX = [1]
let snakeY = [2]
let SnakeLength = 0
game.setScore(0)
basic.forever(function () {
    if (SnakeHead.isTouching(apple)) {
        game.addScore(1)
        apple.set(LedSpriteProperty.X, randint(0, 0))
        apple.set(LedSpriteProperty.Y, randint(0, 0))
        if (game.score() % 2 == 0) {
            snakeX.push(snakeX[SnakeLength])
            snakeY.push(snakeY[SnakeLength])
            SnakeLength += 1
            snakeBody[SnakeLength] = game.createSprite(snakeX[SnakeLength], snakeY[SnakeLength])
        }
    }
})
basic.forever(function () {
    SnakeHead.move(1)
    if (snakeX[0] == SnakeHead.get(LedSpriteProperty.X) && snakeY[0] == SnakeHead.get(LedSpriteProperty.Y)) {
        game.gameOver()
    }
    i = SnakeLength
    for (let index = 0; index < SnakeLength; index++) {
        if (snakeX[i - 1] == SnakeHead.get(LedSpriteProperty.X) && snakeY[i - 1] == SnakeHead.get(LedSpriteProperty.Y)) {
            game.gameOver()
        }
        snakeX[i] = snakeX[i - 1]
        snakeY[i] = snakeY[i - 1]
        snakeBody[i].set(LedSpriteProperty.X, snakeX[i])
        snakeBody[i].set(LedSpriteProperty.Y, snakeY[i])
        i += -1
    }
    snakeX[0] = SnakeHead.get(LedSpriteProperty.X)
    snakeY[0] = SnakeHead.get(LedSpriteProperty.Y)
    basic.pause(1000 - game.score() * 20)
})
