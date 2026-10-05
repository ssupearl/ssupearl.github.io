// =========================
// 다음 투어 날짜
// =========================

const tourDate = new Date("2027-01-25T00:00:00");


// =========================
// D-day 계산
// =========================

function updateCountdown() {

  const now = new Date();

  const difference = tourDate - now;

  const countdown =
    document.getElementById("countdown");

  if (!countdown) return;


  if (difference <= 0) {

    countdown.textContent = "투어 시작!";

    return;
  }


  const days = Math.ceil(
    difference /
    (1000 * 60 * 60 * 24)
  );


  countdown.textContent = `D-${days}`;
}


updateCountdown();


// =========================
// 신청자 수 불러오기
// =========================

const API_URL =
  "https://script.google.com/macros/s/AKfycby4efl6zBxEF594QYAP7yenVjAZQQIHBZa-aKfplMNbMdtAAt96q2PLOnvHAd_ati-G/exec";


fetch(API_URL)

  .then(response => response.json())

  .then(data => {

    const currentMembers =
      Number(data.current) || 0;

    const totalMembers =
      Number(data.total) || 24;


    // =========================
    // 모집률 계산
    // =========================

    const percentage =
      Math.min(
        (currentMembers / totalMembers) * 100,
        100
      );


    // =========================
    // 화면 요소
    // =========================

    const progressBar =
      document.getElementById(
        "progressBar"
      );


    const memberCount =
      document.getElementById(
        "memberCount"
      );


    const recruitStatus =
      document.getElementById(
        "recruitStatus"
      );


    // =========================
    // 진행바
    // =========================

    if (progressBar) {

      progressBar.style.width =
        percentage + "%";

    }


    // =========================
    // 신청자 수
    // =========================

    if (memberCount) {

      memberCount.textContent =
        `${currentMembers} / ${totalMembers}명 신청`;

    }


    // =========================
    // 모집 상태
    // =========================

    if (recruitStatus) {

      if (currentMembers >= totalMembers) {

        recruitStatus.textContent =
          "🔴 모집 마감";

      } else {

        recruitStatus.textContent =
          "🟢 모집중";

      }

    }

  })


  .catch(error => {

    console.error(
      "신청자 수를 불러오지 못했습니다.",
      error
    );

  });