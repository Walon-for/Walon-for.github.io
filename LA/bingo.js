let bingo = [];   //빙고판 0:기본상태 1:뒤집힌상태 2:빙고완성상태
let step;
bingo.push([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]);
let bingoDone = [];  //빙고완료 [가로 세로 대각선]
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
        tiles[i].classList.remove('possibleDiamond');
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
            document.getElementById('diamond'+i+j).classList.remove('possibleDiamond');

            if(bingo[step][i][j] === 2){
                document.getElementById('diamond'+i+j).classList.add('redDiamond');
            }else if(bingo[step][i][j] === 1){
                document.getElementById('diamond'+i+j).classList.add('grayDiamond');
            }
            if(firstBingo[step][i][j] === 3){
                document.getElementById('diamond'+i+j).classList.add('possibleDiamond');
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


    if(step<2 && bingo[step][clickedX][clickedY] == 1){
        return;
    }

    step++;

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
    removeDfsClass();
    DfsBingo[step] = bingo[step].map(v => v.slice());
    DfsBingoDone[step] = bingoDone[step].slice();
    firstBingo[step] = bingo[step].map(v => v.slice());
    bingoDfs(0,0,0);
};

/* 현재단계 출력 */
const changedStepShow = function(){
    if(step < 2){
        document.getElementById('nowStep').innerText = '초기값선택 '+String(Number(step)+1);
    }else{
        if((Number(step)-1)%3 == 0){
            document.getElementById('nowStep').innerText = String((Number(step)-1)%3+3)+' bingo turn!!';
        }else{
            document.getElementById('nowStep').innerText = String((Number(step)-1)%3);
        }
    }
};

/******************* DFS ***********************/
let DfsBingo = [];
let DfsBingoDone = [];
let firstBingo = [];

/* 빙고가능한곳 계산 */
const bingoDfs = function(nowStep, x, y, firstX, firstY){
    if(step < 2){ return; }
    const stepCount = 4-((step-2)%3+1);

    if(nowStep > 0){
        DfsBingo[step+nowStep] = DfsBingo[step+nowStep-1].map(v => v.slice());
        DfsBingoDone[step+nowStep] = DfsBingoDone[step+nowStep-1].slice();

        if(firstBingo[step][firstX][firstY] == 3){
            return;
        }else{
            //x,y 놓기
            const check = DfsClickBingo(nowStep,x,y);

            if(nowStep == stepCount && check > 0){
                firstBingo[step][firstX][firstY] = 3;
                document.getElementById('diamond'+firstX+firstY).classList.add('possibleDiamond');
            }
        }

    }

    if(nowStep < stepCount){
        for(let i=0; i<5; i++){
            for(let j=0; j<5; j++){
                if(nowStep == 0)    bingoDfs(nowStep+1, i, j, i, j);
                else     bingoDfs(nowStep+1, i, j, firstX, firstY);
            }
        }
    }
};

/* dfs x,y 뒤집기 */
const DfsClickBingo = function(nowStep, x, y){
    for(let i=0; i<5; i++){
        const cx = Number(x)+Number(checkX[i]);
        const cy = Number(y)+Number(checkY[i]);

        if(cx>=0 && cy>=0 && cx<=4 && cy<=4){
            if(DfsBingo[step+nowStep][cx][cy] == 1){
                DfsBingo[step+nowStep][cx][cy] = 0;
            }else if(DfsBingo[step+nowStep][cx][cy] == 0){
                DfsBingo[step+nowStep][cx][cy] = 1;
            }
        }
    }

    //빙고찾기
    let startBingoCount = 0;
    let endBingoCount = 0;

    for(let i=0; i<12; i++){
        if(DfsBingoDone[step+nowStep][i] == 1){
            startBingoCount++;
        }
    }

    //가로체크
    for(let i=0; i<5; i++){
        if (DfsBingoDone[step+nowStep][i] == 0) {
            for(let j=0; j<5; j++) {
                if(DfsBingo[step+nowStep][i][j] < 1){
                    break;
                }
                if(j==4){
                    for(let k=0; k<5; k++){
                        DfsBingo[step+nowStep][i][k] = 2;
                    }
                    DfsBingoDone[step+nowStep][i] = 1;
                }
            }
        }
    }

    //세로체크
    for(let i=0; i<5; i++){
        if (DfsBingoDone[step+nowStep][i+5] == 0) {
            for(let j=0; j<5; j++) {
                if(DfsBingo[step+nowStep][j][i] < 1){
                    break;
                }

                if(j==4){
                    for(let k=0; k<5; k++){
                        DfsBingo[step+nowStep][k][i] = 2;
                    }
                    DfsBingoDone[step+nowStep][i+5] = 1;
                }
            }
        }
    }

    //대각선체크
    if (DfsBingoDone[step+nowStep][10] == 0) {
        for(let i=0,j=0; i<5; i++,j++){
            if(DfsBingo[step+nowStep][i][j] < 1){
                break;
            }
            if(j==4){
                for(let k=0,m=0; k<5; k++,m++){
                    DfsBingo[step+nowStep][k][m] = 2;
                }
                DfsBingoDone[step+nowStep][10] = 1;
            }
        }
    }
    if (DfsBingoDone[step+nowStep][11] == 0) {
        for(let i=4,j=0; i>=0; i--,j++){
            if(DfsBingo[step+nowStep][i][j] < 1){
                break;
            }
            if(i==0){
                for(let k=4,m=0; k>=0; k--,m++){
                    DfsBingo[step+nowStep][k][m] = 2;
                }
                DfsBingoDone[step+nowStep][11] = 1;
            }
        }
    }

    for(let i=0; i<12; i++){
        if(DfsBingoDone[step+nowStep][i] == 1){
            endBingoCount++;
        }
    }

    if(startBingoCount < endBingoCount){
        return 1;
    }else{
        return 0;
    }

}

const removeDfsClass = function(){
    const tiles = document.getElementsByClassName('diamond');

    for(let i=0; i<tiles.length; i++){
        tiles[i].classList.remove('possibleDiamond');
    }
}

/************************** 이벤트 리스너 ****************************/
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
