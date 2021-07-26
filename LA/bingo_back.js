let bingo = new Array();   //빙고판 0:기본상태 1:뒤집힌상태 2:빙고완성상태
let step;
bingo.push([0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]);
let bingoDone = [0,0,0,0,0,0,0,0,0,0,0,0];  //빙고완료 [가로 세로 대각선]

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

//십자뒤집기
const checkX = [0,0,0,-1,1];
const checkY = [0,-1,1,0,0];


/****************************** 함수정의 **********************************/

/*  빙고 초기화  */
const init = function(){
    for(let i=0; i<5; i++){
        for(let j=0; j<5; j++){
            bingo[i][j] = 0;
        }
    }
    step = 0;
    bingoDone = [0,0,0,0,0,0,0,0,0,0,0,0];
    changedStepShow();

    const tiles = document.getElementsByClassName('diamond');

    for(let i=0; i<tiles.length; i++){
        tiles[i].classList.remove('grayDiamond');
        tiles[i].classList.remove('redDiamond');
    }
}

/*  빙고상황 출력  */
const printBingo = function(){
    console.log('now step = '+step);
    for(let i=0; i<5; i++){
        console.log(bingo[i]);
    }
}

/* 빙고 체크 */
const checkBingo = function(){
    let bingoCount=0;
    for(let i=0; i<12; i++){
        if(bingoDone[i] == 1){
            bingoCount++;
        }
    }

    //가로체크
    for(let i=0; i<5; i++){
        if (bingoDone[i] == 0) {
            for(let j=0; j<5; j++) {
                if(bingo[i][j] < 1){
                    break;
                }
                if(j==4){
                   for(let k=0; k<5; k++){
                       bingo[i][k] = 2;
                       document.getElementById('diamond'+i+k).classList.remove('grayDiamond');
                       document.getElementById('diamond'+i+k).classList.add('redDiamond');
                   }
                   bingoDone[i] = 1;
                }
            }
        }
    }

    //세로체크
    for(let i=0; i<5; i++){
        if (bingoDone[i+5] == 0) {
            for(let j=0; j<5; j++) {
                if(bingo[j][i] < 1){
                    break;
                }

                if(j==4){
                    for(let k=0; k<5; k++){
                        bingo[k][i] = 2;
                        document.getElementById('diamond'+k+i).classList.remove('grayDiamond');
                        document.getElementById('diamond'+k+i).classList.add('redDiamond');
                    }
                    bingoDone[i+5] = 1;
                }
            }
        }
    }

    //대각선체크
    if (bingoDone[10] == 0) {
        for(let i=0,j=0; i<5; i++,j++){
            if(bingo[i][j] < 1){
                break;
            }
            if(j==4){
                for(let k=0,m=0; k<5; k++,m++){
                    bingo[k][m] = 2;
                    document.getElementById('diamond'+k+m).classList.remove('grayDiamond');
                    document.getElementById('diamond'+k+m).classList.add('redDiamond');
                }
                bingoDone[10] = 1;
            }
        }
    }
    if (bingoDone[11] == 0) {
        for(let i=4,j=0; i>=0; i--,j++){
            if(bingo[i][j] < 1){
                break;
            }
            if(i==0){
                for(let k=4,m=0; k>=0; k--,m++){
                    bingo[k][m] = 2;
                    document.getElementById('diamond'+k+m).classList.remove('grayDiamond');
                    document.getElementById('diamond'+k+m).classList.add('redDiamond');
                }
                bingoDone[11] = 1;
            }
        }
    }
}

/*  빙고 클릭시 주변 뒤집기  */
const clickBingo = function(){
    let clickedId = this.getAttribute('id');
    clickedId = clickedId.replace('diamond', '').trim();
    let clickedX = clickedId.substr(0,1);
    let clickedY = clickedId.substr(1,1);

    console.log(clickedX+' '+clickedY);

    for(let i=0; i<5; i++){
        const x = Number(clickedX)+Number(checkX[i]);
        const y = Number(clickedY)+Number(checkY[i]);

        if(x>=0 && y>=0 && x<=4 && y<=4){
            if(bingo[x][y] == 1){
                bingo[x][y] = 0;
                document.getElementById('diamond'+x+y).classList.remove('grayDiamond');
            }else if(bingo[x][y] == 0){
                bingo[x][y] = 1;
                document.getElementById('diamond'+x+y).classList.add('grayDiamond');
            }
        }
    }

    checkBingo();
    step++;
    changedStepShow();
};

const changedStepShow = function(){
    document.getElementById('nowStep').innerText = step;
};

/* 이벤트 리스너 */
window.addEventListener('load',function(){

    init();
    printBingo();
    changedStepShow();

    let tiles = document.getElementsByClassName('diamond');

    for(let i=0; i<tiles.length; i++){
        tiles[i].addEventListener('click', clickBingo, false);
    }

    document.getElementById('btnInit').addEventListener('click', init, false);
});
