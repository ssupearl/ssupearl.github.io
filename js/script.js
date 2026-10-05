const tourDate = new Date("2026-10-16T00:00:00");

// =========================
// D-day 계산
// =========================

function updateCountdown() {
  const now = new Date();
  const difference = tourDate - now;

  const countdown = document.getElementById("countdown");

  if (!countdown) return;

  if (difference <= 0) {
    countdown.textContent = "투어 시작!";
    return;
  }

  const days = Math.ceil(
    difference / (1000 * 60 * 60 * 24)
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

    const currentMembers = data.current;
    const totalMembers = data.total;

    const percentage =
      (currentMembers / totalMembers) * 100;

    const progressBar =
      document.getElementById("progressBar");

    const memberCount =
      document.getElementById("memberCount");

    if (progressBar) {
      progressBar.style.width = percentage + "%";
    }

    if (memberCount) {
      memberCount.textContent =
        `${currentMembers} / ${totalMembers}명 신청`;
    }

  })
  .catch(error => {
    console.error(
      "신청자 수를 불러오지 못했습니다.",
      error
    );
  });


// =========================
// 갤러리 확대 기능
// =========================

function openGallery(imageSrc) {

  const modal =
    document.getElementById("galleryModal");

  const modalImage =
    document.getElementById("galleryModalImage");

  if (!modal || !modalImage) return;

  modalImage.src = imageSrc;

  modal.style.display = "flex";
}


function closeGallery() {

  const modal =
    document.getElementById("galleryModal");

  if (!modal) return;

  modal.style.display = "none";
}