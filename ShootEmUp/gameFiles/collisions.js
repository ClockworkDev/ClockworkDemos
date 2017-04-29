CLOCKWORKRT.collisions.register([
    {
        shape1: "player",
        shape2: "enemyFire",
        detector: function (player, enemyFire) {
            if (enemyFire.x >= player.x && enemyFire.y >= player.y && enemyFire.x <= player.x + player.w && enemyFire.y <= player.y + player.h) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        shape1: "enemy",
        shape2: "playerFire",
        detector: function (enemy, playerFire) {
            if (playerFire.x >= enemy.x && playerFire.y >= enemy.y && playerFire.x <= enemy.x + enemy.w && playerFire.y <= enemy.y + enemy.h) {
                return true;
            } else {
                return false;
            }
        }
    }
]);