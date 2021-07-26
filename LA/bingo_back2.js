let bingo = new Array();   //빙고판 0:기본상태 1:뒤집힌상태 2:빙고완성상태
let step;
bingo.push([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]);
let bingoDone = new Array();  //빙고완료 [가로 세로 대각선]
bingoDone.push([[0,0,0,0,0,0,0,0,0,0,0,0]]);

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
    bingo = [[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]];
    step = 0;
    bingoDone = [[0,0,0,0,0,0,0,0,0,0,0,0]];
    changedStepShow();

    const tiles = document.getElementsByClassName('diamond');

    for(let i=0; i<tiles.length; i++){
        tiles[i].classList.remove('grayDiamond');
        tiles[i].classList.remove('redDiamond');
    }
};

/* 빙고취소 */
const cancel = function(){
    step--;
    changedStepShow();

    for(let i=0; i<5; i++){
        for(let j=0; j<5; j++){
            document.getElementById('diamond'+i+j).classList.remove('grayDiamond');
            document.getElementById('diamond'+i+j).classList.remove('redDiamond');

            if(bingo[step][i][j] == 2){
                document.getElementById('diamond'+i+j).classList.add('redDiamond');
            }else if(bingo[step][i][j] == 1){
                document.getElementById('diamond'+i+j).classList.add('grayDiamond');
            }
        }
    }
};

/*  빙고상황 출력  */
const printBingo = function(){
    console.log('now step = '+step);
    for(let i=0; i<5; i++){
        console.log(bingo[step][i]);
    }
};

/* 빙고 체크 */
const checkBingo = function(){
    let bingoCount=0;
    bingoDone[step] = bingoDone[step-1].slice();


    for(let i=0; i<12; i++){
        if(bingoDone[step][i] == 1){
            bingoCount++;
        }
    }

    //가로체크
    for(let i=0; i<5; i++){
        if (bingoDone[step][i] == 0) {
            for(let j=0; j<5; j++) {
                if(bingo[step][i][j] < 1){
                    break;
                }
                if(j==4){
                   for(let k=0; k<5; k++){
                       bingo[step][i][k] = 2;
                       document.getElementById('diamond'+i+k).classList.remove('grayDiamond');
                       document.getElementById('diamond'+i+k).classList.add('redDiamond');
                   }
                   bingoDone[step][i] = 1;
                }
            }
        }
    }

    //세로체크
    for(let i=0; i<5; i++){
        if (bingoDone[step][i+5] == 0) {
            for(let j=0; j<5; j++) {
                if(bingo[step][j][i] < 1){
                    break;
                }

                if(j==4){
                    for(let k=0; k<5; k++){
                        bingo[step][k][i] = 2;
                        document.getElementById('diamond'+k+i).classList.remove('grayDiamond');
                        document.getElementById('diamond'+k+i).classList.add('redDiamond');
                    }
                    bingoDone[step][i+5] = 1;
                }
            }
        }
    }

    //대각선체크
    if (bingoDone[step][10] == 0) {
        for(let i=0,j=0; i<5; i++,j++){
            if(bingo[step][i][j] < 1){
                break;
            }
            if(j==4){
                for(let k=0,m=0; k<5; k++,m++){
                    bingo[step][k][m] = 2;
                    document.getElementById('diamond'+k+m).classList.remove('grayDiamond');
                    document.getElementById('diamond'+k+m).classList.add('redDiamond');
                }
                bingoDone[step][10] = 1;
            }
        }
    }
    if (bingoDone[step][11] == 0) {
        for(let i=4,j=0; i>=0; i--,j++){
            if(bingo[step][i][j] < 1){
                break;
            }
            if(i==0){
                for(let k=4,m=0; k>=0; k--,m++){
                    bingo[step][k][m] = 2;
                    document.getElementById('diamond'+k+m).classList.remove('grayDiamond');
                    document.getElementById('diamond'+k+m).classList.add('redDiamond');
                }
                bingoDone[step][11] = 1;
            }
        }
    }
};

/*  빙고 클릭시 주변 뒤집기  */
const clickBingo = function(){
    let clickedId = this.getAttribute('id');
    clickedId = clickedId.replace('diamond', '').trim();
    let clickedX = clickedId.substr(0,1);
    let clickedY = clickedId.substr(1,1);
    step++;

    //console.log(clickedX+' '+clickedY);

    bingo[step] = bingo[step-1].map(v => v.slice());

    if(step < 3){
        bingo[step][clickedX][clickedY] = 1;
        document.getElementById('diamond'+clickedX+clickedY).classList.add('grayDiamond');
    }else{
        for(let i=0; i<5; i++){
            const x = Number(clickedX)+Number(checkX[i]);
            const y = Number(clickedY)+Number(checkY[i]);

            if(x>=0 && y>=0 && x<=4 && y<=4){
                if(bingo[step][x][y] == 1){
                    bingo[step][x][y] = 0;
                    document.getElementById('diamond'+x+y).classList.remove('grayDiamond');
                }else if(bingo[step][x][y] == 0){
                    bingo[step][x][y] = 1;
                    document.getElementById('diamond'+x+y).classList.add('grayDiamond');
                }
            }
        }
    }

    checkBingo();
    changedStepShow();
};

/* 현재단계 출력 */
const changedStepShow = function(){
    console.log(Number(step)%3);
    if(step < 2){
        document.getElementById('nowStep').innerText = '초기값선택 '+String(Number(step)+1);
    }else{
        if(Number(step)%3 == 0){
            document.getElementById('nowStep').innerText = String(Number(step)-1)+' bingo!!!';
        }else{
            document.getElementById('nowStep').innerText = String(Number(step)-1);
        }

    }
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
    document.getElementById('btnCancel').addEventListener('click', cancel, false);

});
