let bingo = new Array();
bingo.push([0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]);
/*
               0.0
            1.0   0.1
         2.0   1.1   0.2
      3.0   2.1   1.2   0.3
   4.0   3.1   2.2   1.3   0.4
      4.1   3.2   2.3   1.4
         4.2   3.3   2.4
            4.3   3.4
               4.4
*/




const init = function(){
    for(let i=0; i<5; i++){
        for(let j=0; j<5; j++){
            bingo[i][j] = 0;
        }
    }
}

const printBingo = function(){
    for(let i=0; i<5; i++){
        console.log(bingo[i]);
    }
}

init();
printBingo();

const clickBingo = function(){
    console.log()
};

/* 이벤트 리스너 */
window.addEventListener('load',function(){
    let tiles = document.getElementsByClassName('diamond');

    for(let i=0; i<tiles.length; i++){
        tiles[i].addEventListener('click', clickBingo, false);
    }
});
