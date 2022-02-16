const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 50;

let total_num = [];
let num = 0;

function score(total){
    var resultDesc = document.querySelector('.resultDesc');
    var resultNum = document.querySelector('.resultNum');

    total_num.push(parseInt(total));
    
    const result_num = total_num.reduce(function add(sum, currValue) {
        return sum + currValue;
    }, 0);

    // console.log(result_num); //점수

    if(result_num <= 59){
        resultDesc.innerHTML = "낙심은 금물! EQ, '하면 된다'";
    }else if(60 <= result_num && result_num <= 95){
        resultDesc.innerHTML = "자기 자신에 맞는 현실적인 목표를 설정하고, 자신의 감정을 적극적으로 표현하고, 타인을 돕듯이 자신을 돕고, 비판에 민감하게 반응하지 않도록 함으로써 잠자는 EQ를 일깨울 수 있다.";
    }else if(96 <= result_num && result_num <= 125){
        resultDesc.innerHTML = "자신의 문제를 분명히 할 수 있고, 자신의 문제를 잘 다루며, 자신의 감정을 행동으로 표현하는 능력이 있다. 그러나 때로 좋고 싫음이 너무 분명하거나 기복이 심해 친한 동료와 분명한 적(敵)을 가진 경우가 많다. 이따금 자신의 감정이 슬픈 건지 기쁜 건지, 화난 건지 두려운 건지 잘 모를 때가 있다. 그러나 이런 사람들이 자기 감정을 분명히 표현하고, 실패를 두려워하지 않고, 매사를 흑백논리로 보지 않으려 하고, 타인의 입장에 서서 생각하는 습관을 기른다면 우수한 EQ수준으로 발전할 수 있다. EQ, 자신의 노력에 따라 언제든 계발될 수 있다.";
    }else if(126 <= result_num && result_num <= 149){
        resultDesc.innerHTML = "대체로 높은 EQ수준을 가지고 있다. 다섯 가지 영역 가운데 어떤 한 영역의 점수가 20점 이하라면, 그 부분을 집중적으로 강화하면 EQ천재의 대열에 들어설 수 있다. 자기 삶에 충실하고 다른 사람을 잘 이해해 주는 사람들의 전형이라고 할 수 있다.";
    }else if(150 <= result_num && result_num <= 180){
        resultDesc.innerHTML = "자신의 감정을 잘 알고, 자기 감정을 잘 다루며, 충동적으로 행동하지 않고, 기분 나쁜 일이 있거나 스트레스를 받아도 곧 회복할 수 있다. 어떤 일을 계획할 때에도 자신의 능력을 고려하여, 타인을 배려하는 측면이 많아 대인관계도 좋다. 연구결과 사회-경제적으로 성공할 가능성이 높고, 성격이 낙천적이어서 매사를 긍정적으로 생각하여 정신적으로 매우 건강하다.  전체 인구의 10%미만에 해당한다고 한다.";
    }
    resultNum.innerHTML = `${result_num}점`;
}

function addAnswer(answerText, qIdx, total){

    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button'); //버튼을 새로 생성
    answer.classList.add('answerList'); //새로 만든 버튼에 answerList라는 클래스 이름을 부여
    a.appendChild(answer); //answerBox 안에 버튼을 넣음
    answer.innerHTML = answerText; //버튼 내용을 넣음 
    answer.classList.add('fadeIn');

    answer.addEventListener("click", function(e){  //버튼을 클릭했을 때
        // total_num.push(total);
        score(total);

        var children = document.querySelectorAll('.answerList'); //answerList라는 이름을 가진 클래스는 children라고 선언
        for(let i = 0; i < children.length; i++){ //children 숫자만큼 반복
            children[i].disabled = true; //모든 버튼들이 비활성화 되고
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(() => { //0.45초 뒤
          for(let i = 0; i < children.length; i++){ //children 숫자만큼 반복
            children[i].style.display = 'none'; // 모든 버튼이 사라짐
        }
        goNext(++qIdx);
    
        }, 450 ); 
        
        
    }, false);

}

function goNext(qIdx){ // qna 값 넣어줄 함수
    var q = document.querySelector('.qBox'); //qBox를 q로 선언

    if(qIdx == 50){
        // console.log('끝');
        qna.style.animation = "fadeOut 1s";

        setTimeout(()=>{
            qna.style.display = "none";
            result.style.animation = "fadeIn 1s";

            setTimeout(()=>{
            result.style.display = "block";
            },500);
            
        },500);
        
    }else{
        q.innerHTML = qnaList[qIdx].q; // q를 date.js파일에 qnaList오브젝트.q를 불러와서 내용 수정
        
        for(let i in qnaList[qIdx].a){ // i < qnaList[qidx].a에 숫자만큼 실행
            addAnswer(qnaList[qIdx].a[i].answer, qIdx, qnaList[qIdx].a[i].type); //a.버튼 내용들을 가지고 addAnswer함수 실행
        }
    }
    let status = document.querySelector(".statusBar");
    // if(status.style.width == 100"%")
    status.style.width = (100/endPoint) * (qIdx+1) + "%";


}

function begin(){ //시작하기 버튼을 클릭하면 실행
    document.querySelector(".dis").disabled = true;
    main.style.animation = "fadeOut 1s"; //main섹션을 1초 동안 서서히 숨기기
    setTimeout(() => { // 0.45초가 지난 뒤 실행
        qna.style.animation = "fadeIn 1s"; //qna섹션을 1초 동안 서서히 나타나기
        setTimeout(() => { //0.45초가 지난 뒤 실행
            main.style.display = "none"; // main섹션을 완전 사라지게
            qna.style.display = "block"; // main섹션이 사라지고 나타나게
        }, 450);
        let qIdx = 0;
        goNext(qIdx);
    }, 450);
    
}




