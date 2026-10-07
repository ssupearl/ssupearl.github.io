// =========================
// School Of BLUE
// 홈페이지 공통 JavaScript
// =========================


// =========================
// API 주소
// =========================

const API_URL =
  "https://script.google.com/macros/s/AKfycby4efl6zBxEF594QYAP7yenVjAZQQIHBZa-aKfplMNbMdtAAt96q2PLOnvHAd_ati-G/exec";


// =========================
// 날짜 표시 함수
// =========================

function formatTourDate(dateValue) {

  if (!dateValue) {
    return "";
  }

  const date =
    new Date(dateValue);

  if (isNaN(date.getTime())) {
    return dateValue;
  }

  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      date.getDate()
    ).padStart(2, "0");

  const weekdays =
    [
      "일",
      "월",
      "화",
      "수",
      "목",
      "금",
      "토"
    ];

  const weekday =
    weekdays[
      date.getDay()
    ];

  return `${year}.${month}.${day}(${weekday})`;

}


// =========================
// 투어 날짜 범위 표시
// =========================

function formatTourDateRange(
  startDate,
  endDate
) {

  if (!startDate) {
    return "";
  }

  const start =
    new Date(startDate);

  if (isNaN(start.getTime())) {
    return startDate;
  }

  const startYear =
    start.getFullYear();

  const startMonth =
    String(
      start.getMonth() + 1
    ).padStart(2, "0");

  const startDay =
    String(
      start.getDate()
    ).padStart(2, "0");

  const weekdays =
    [
      "일",
      "월",
      "화",
      "수",
      "목",
      "금",
      "토"
    ];

  const startWeekday =
    weekdays[
      start.getDay()
    ];


  // 종료일이 없는 경우

  if (!endDate) {

    return `${startYear}.${startMonth}.${startDay}(${startWeekday})`;

  }


  const end =
    new Date(endDate);

  if (isNaN(end.getTime())) {

    return `${startYear}.${startMonth}.${startDay}(${startWeekday})`;

  }


  const endMonth =
    String(
      end.getMonth() + 1
    ).padStart(2, "0");

  const endDay =
    String(
      end.getDate()
    ).padStart(2, "0");

  const endWeekday =
    weekdays[
      end.getDay()
    ];


  return `${startYear}.${startMonth}.${startDay}(${startWeekday}) ~ ${endMonth}.${endDay}(${endWeekday})`;

}


// =========================
// D-day 계산
// =========================

function updateCountdown(
  startDate
) {

  const countdown =
    document.getElementById(
      "countdown"
    );

  if (!countdown) {
    return;
  }


  const tourDate =
    new Date(startDate);


  if (
    isNaN(
      tourDate.getTime()
    )
  ) {

    countdown.textContent =
      "D-계산불가";

    return;

  }


  const now =
    new Date();


  const difference =
    tourDate - now;


  // 투어 시작 이후

  if (difference <= 0) {

    countdown.textContent =
      "투어 시작!";

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


// =========================
// 투어 정보 가져오기
// =========================

fetch(API_URL)

  .then(response => {

    if (!response.ok) {

      throw new Error(
        "API 응답 오류"
      );

    }

    return response.json();

  })


  .then(data => {


    // =========================
    // 신청자 정보
    // =========================

    const currentMembers =
      Number(data.current) || 0;


    const totalMembers =
      Number(data.total) || 24;


    // =========================
    // 모집률
    // =========================

    const percentage =
      Math.min(
        (
          currentMembers /
          totalMembers
        ) * 100,
        100
      );


    // =========================
    // 진행바
    // =========================

    const progressBar =
      document.getElementById(
        "progressBar"
      );


    if (progressBar) {

      progressBar.style.width =
        percentage + "%";

    }


    // =========================
    // 신청자 수
    // =========================

    const memberCount =
      document.getElementById(
        "memberCount"
      );


    if (memberCount) {

      memberCount.textContent =
        `${currentMembers} / ${totalMembers}명 신청`;

    }


    // =========================
    // 모집 상태
    // =========================

    const recruitStatus =
      document.getElementById(
        "recruitStatus"
      );


    if (recruitStatus) {


      if (
        currentMembers >= totalMembers
      ) {

        recruitStatus.textContent =
          "🔴 모집 마감";

      }

      else {

        recruitStatus.textContent =
          "🟢 모집중";

      }

    }


    // =========================
    // 투어 정보
    // =========================

    const tour =
      data.tour;


    if (!tour) {

      console.warn(
        "투어 정보가 없습니다."
      );

      return;

    }


    // =========================
    // 투어명
    // =========================

    const tourName =
      document.getElementById(
        "tourName"
      );


    if (tourName) {

      tourName.textContent =
        tour.name || "";

    }


    // =========================
    // 장소
    // =========================

    const tourLocation =
      document.getElementById(
        "tourLocation"
      );


    if (tourLocation) {

      tourLocation.textContent =
        tour.location || "";

    }


    // =========================
    // 날짜
    // =========================

    const tourDate =
      document.getElementById(
        "tourDate"
      );


    if (tourDate) {

      tourDate.textContent =
        formatTourDateRange(
          tour.startDate,
          tour.endDate
        );

    }


    // =========================
    // 다이빙
    // =========================

    const tourDiving =
      document.getElementById(
        "tourDiving"
      );


    if (tourDiving) {

      tourDiving.textContent =
        tour.diving || "";

    }


    // =========================
    // D-day
    // =========================

    updateCountdown(
      tour.startDate
    );


    // =========================
    // 신청 버튼
    // =========================

    const applyButton =
      document.getElementById(
        "tourApplyButton"
      );


    if (applyButton) {


      // 모집 마감

      if (
        currentMembers >= totalMembers
      ) {

        applyButton.textContent =
          "모집 마감";

        applyButton.removeAttribute(
          "href"
        );

        applyButton.removeAttribute(
          "target"
        );

        applyButton.style.opacity =
          "0.5";

        applyButton.style.cursor =
          "not-allowed";

      }


      // 모집중

      else if (tour.formUrl) {

        applyButton.href =
          tour.formUrl;

      }

    }


  })


  .catch(error => {

    console.error(
      "투어 정보를 불러오지 못했습니다.",
      error
    );

  });



// =========================
// 갤러리 확대 기능
// =========================

function openGallery(
  imageSrc
) {

  const modal =
    document.getElementById(
      "galleryModal"
    );


  const modalImage =
    document.getElementById(
      "galleryModalImage"
    );


  if (
    !modal ||
    !modalImage
  ) {

    return;

  }


  modalImage.src =
    imageSrc;


  modal.style.display =
    "flex";

}



// =========================
// 갤러리 확대창 닫기
// =========================

function closeGallery() {

  const modal =
    document.getElementById(
      "galleryModal"
    );


  if (!modal) {

    return;

  }


  modal.style.display =
    "none";

}