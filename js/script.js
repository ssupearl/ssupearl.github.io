/* ===================================
   다음 투어 D-Day
=================================== */

const tourDate = new Date("2026-10-16T00:00:00");

function updateCountdown() {

  const now = new Date();

  const difference = tourDate - now;

  const countdown =
    document.getElementById("countdown");


  if (difference <= 0) {

    countdown.textContent = "투어 시작!";

    return;

  }


  const days =
    Math.ceil(
      difference /
      (1000 * 60 * 60 * 24)
    );


  countdown.textContent =
    `D-${days}`;

}


updateCountdown();


/* ===================================
   모집 인원
=================================== */

const currentMembers = 8;

const totalMembers = 12;


const percentage =
  (currentMembers / totalMembers) * 100;


const progressBar =
  document.getElementById("progressBar");


const memberCount =
  document.getElementById("memberCount");


if (progressBar) {

  progressBar.style.width =
    percentage + "%";

}


if (memberCount) {

  memberCount.textContent =
    `${currentMembers} / ${totalMembers}명 신청`;

}