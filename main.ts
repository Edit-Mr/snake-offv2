input.onButtonPressed(Button.A, function () {
    蛇頭.turn(Direction.Right, 90)
})
input.onButtonPressed(Button.B, function () {
    蛇頭.turn(Direction.Left, 90)
})
let i = 0
let 蛇身各節: game.LedSprite[] = []
let 蛇頭: game.LedSprite = null
蛇頭 = game.createSprite(1, 2)
let 水果 = game.createSprite(randint(0, 0), randint(0, 0))
水果.set(LedSpriteProperty.Blink, 100)
蛇頭.set(LedSpriteProperty.Direction, 90)
let 蛇X陣列 = [1]
let 蛇Y陣列 = [2]
let 蛇身長度 = 0
game.setScore(0)
basic.forever(function () {
    if (蛇頭.isTouching(水果)) {
        game.addScore(1)
        水果.set(LedSpriteProperty.X, randint(0, 0))
        水果.set(LedSpriteProperty.Y, randint(0, 0))
        if (game.score() % 2 == 0) {
            蛇X陣列.push(蛇X陣列[蛇身長度])
            蛇Y陣列.push(蛇Y陣列[蛇身長度])
            蛇身長度 += 1
            蛇身各節[蛇身長度] = game.createSprite(蛇X陣列[蛇身長度], 蛇Y陣列[蛇身長度])
        }
    }
})
basic.forever(function () {
    蛇頭.move(1)
    if (蛇X陣列[0] == 蛇頭.get(LedSpriteProperty.X) && 蛇Y陣列[0] == 蛇頭.get(LedSpriteProperty.Y)) {
        game.gameOver()
    }
    i = 蛇身長度
    for (let index = 0; index < 蛇身長度; index++) {
        if (蛇X陣列[i - 1] == 蛇頭.get(LedSpriteProperty.X) && 蛇Y陣列[i - 1] == 蛇頭.get(LedSpriteProperty.Y)) {
            game.gameOver()
        }
        蛇X陣列[i] = 蛇X陣列[i - 1]
        蛇Y陣列[i] = 蛇Y陣列[i - 1]
        蛇身各節[i].set(LedSpriteProperty.X, 蛇X陣列[i])
        蛇身各節[i].set(LedSpriteProperty.Y, 蛇Y陣列[i])
        i += -1
    }
    蛇X陣列[0] = 蛇頭.get(LedSpriteProperty.X)
    蛇Y陣列[0] = 蛇頭.get(LedSpriteProperty.Y)
    basic.pause(1000 - game.score() * 20)
})
