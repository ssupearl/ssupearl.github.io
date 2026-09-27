const tourDate = new Date("2026-10-16");

const today = new Date();

const diff = tourDate - today;

const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

const countdown = document.getElementById("countdown");

if(days>0){

countdown.innerText=`⏳ D-${days}`;

}else if(days===0){

countdown.innerText="🎉 오늘 출발";

}else{

countdown.innerText="투어 종료";

}

// 모집 인원

const current=8;

const total=12;

const percent=(current/total)*100;

document.getElementById("progressBar").style.width=percent+"%";

document.getElementById("memberCount").innerText=`${current} / ${total}명 신청`;