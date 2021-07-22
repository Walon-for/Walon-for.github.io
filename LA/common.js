window.addEventListener('load',function(){
    document.getElementById('nowSize').value = 25;

    //빙고판 사이즈 다운
    document.getElementById('sizeMinus').addEventListener('click',function(){
        const nowWidth = document.getElementById('nowSize').value;
        if(nowWidth > 5){
            const changedWidth = Number(nowWidth)-5;
            document.getElementById('big_diamond').style.width = changedWidth+'%';
            document.getElementById('nowSize').value = changedWidth;
        }
    },false);

    //빙고판 사이즈 업
    document.getElementById('sizePlus').addEventListener('click',function(){
        const nowWidth = document.getElementById('nowSize').value;
        if(nowWidth < 100){
            const changedWidth = Number(nowWidth)+5;
            document.getElementById('big_diamond').style.width = changedWidth+'%';
            document.getElementById('nowSize').value = changedWidth;
        }
    },false);
});

