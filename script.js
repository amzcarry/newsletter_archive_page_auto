async function loadNewsletters() {
  const container = document.getElementById("newsletter-list");

  try {
    const res = await fetch("newsletterData.json?_=" + Date.now());
    if (!res.ok) throw new Error("데이터 불러오기 실패");

    const newsletters = await res.json();

    if (!Array.isArray(newsletters) || newsletters.length === 0) {
      return; // index.html 기본 "뉴스레터 준비 중" 박스 유지
    }

    container.innerHTML = ""; // 기본 박스 지우기

    newsletters.forEach(nl => {
      const card = document.createElement("div");
      card.className = "newsletter-card";
      card.style.cssText = `
        background: #fff;
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 16px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        border: 1px solid #E9ECEF;
      `;

      card.innerHTML = `
        <h3 style="margin:0 0 8px 0; font-size:20px; color:#1E3A5F;">${nl.title}</h3>
        <p style="margin:0 0 12px 0; color:#6C757D; font-size:14px;">${nl.date}</p>
        <a href="${nl.url}" target="_blank" style="color:#1E3A5F; font-weight:600; text-decoration:none;">
          자세히 보기 →
        </a>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("뉴스레터 로딩 에러:", err);
  }
}

loadNewsletters();
