var world = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2],
    [2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2],
    [2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2],
    [2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2],
    [2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2],
    [2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2],
    [2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
];

var pacman = {
    x: 1,
    y: 1
}

function displayWorld() {
    let stage = world;
    var output = '';
    for (var i = 0; i < stage.length; i++) {
        output += "<div class='row'>";
        for (var j = 0; j < stage[i].length; j++) {
            if (stage[i][j] == 2) {
                output += "<div class='brick'></div>";
            } else if (stage[i][j] == 1) {
                output += "<div class='coin'></div>";
            } else if (stage[i][j] == 0) {
                output += "<div class='empty'></div>";
            }
        }
        output += "</div>";
    }
    return output;
}

$(document).ready(function () {
    var socket = io();

    socket.emit('new_user');
    socket.on('new_user_msg', function (data) {
        console.log('hi new user');
    })

    function displayPacman() {
        $('#pacman').css({ 'top': pacman.y * 23 + 'px' });
        $('#pacman').css({ 'left': pacman.x * 20 + 'px' });
    }
    
    function movePacman() {
        if (world[pacman.y][pacman.x] == 1) {
            //change that spot to have no coin
            world[pacman.y][pacman.x] = 0;
            //also add point
            eatCoin();
            displayPacman();
        } else if (world[pacman.y][pacman.x] == 0) {
            //no point just move pacman
            displayPacman();
        }
    }
    function eatCoin(){
        //div with class row of nth (y+1)
        //div with class row div of nth (x+1)
        $('div.row:nth-of-type(' + (pacman.y+1) + ') div:nth-of-type(' + (pacman.x+1) + ')').addClass('empty').removeClass('coin');
    }


    $('button').click(function () {
        $('#stage').html(displayWorld());
    });

    $('#stage').html(displayPacman());

    //pacman directional movement on direction key press
    $(document).keydown(function (e) {
        console.log(e.keyCode);
        if (e.keyCode == 38) {
            pacman.y--;

            if (world[pacman.y][pacman.x] == 2) {
                pacman.y++;
                return;
            } else {
                movePacman();
            }
        } else if (e.keyCode == 39) {
            pacman.x++;

            if (world[pacman.y][pacman.x] == 2) {
                pacman.x--;
                return;
            } else {
                movePacman();
            }
        } else if (e.which == 40) {
            pacman.y++;

            if (world[pacman.y][pacman.x] == 2) {
                pacman.y--;
                return;
            } else {
                movePacman();
            }
        } else if (e.which == 37) {
            pacman.x--;

            if (world[pacman.y][pacman.x] == 2) {
                pacman.x++;
                return;
            } else {
                movePacman();
            }
        }
    })
});