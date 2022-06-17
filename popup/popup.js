const gameList = document.querySelectorAll('.game-link');
const caret = document.getElementById('caret');
let caretLocation = 0;

window.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp') {
        if (caretLocation > 0) {
            let game = gameList[caretLocation];
            game.removeChild(caret);

            caretLocation--;
            game = gameList[caretLocation];
            game.insertBefore(caret, gameList[caretLocation].firstElementChild);
        }
    }

    else if (e.key == 'ArrowDown') {
        if (caretLocation + 1 < gameList.length) {
            let game = gameList[caretLocation];
            game.removeChild(caret);

            caretLocation++;
            game = gameList[caretLocation];
            game.insertBefore(caret, gameList[caretLocation].firstElementChild);
        }
    }

    else if (e.key == 'Enter') {
        const anchor = gameList[caretLocation].getElementsByTagName('a')[0];
        anchor.click();
    }
});