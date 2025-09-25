async function loadNewsletters() {
  const container = document.getElementById("newsletter-list");

  try {
    const res = await fetch("newsletterData.json?_=" + Date.now());
    if (!res.ok) throw new Error("데이터 불러오기 실패");

    const newsletters = await res.json();

    if (!Array.isArray(newsletters) || newsletters.length === 0) {
      return; // 기본 "준비 중" 유지
    }

    container.innerHTML = ""; // 기본 박스 제거

    newsletters.forEach(nl => {
      const card = document.createElement("a");
      card.href = nl.url;
      card.target = "_blank";
      card.className = "newsletter-card";
      card.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 16px;
        background: #fff;
        border-radius: 12px;
        padding: 16px 24px;
        margin-bottom: 12px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.06);
        border: 1px solid #E9ECEF;
        text-decoration: none;
        transition: box-shadow 0.2s, transform 0.2s;
      `;

      // hover 효과
      card.onmouseover = () => {
        card.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)";
        card.style.transform = "translateY(-2px)";
      };
      card.onmouseout = () => {
        card.style.boxShadow = "0 2px 6px rgba(0,0,0,0.06)";
        card.style.transform = "translateY(0)";
      };

      card.innerHTML = `
        <div style="font-size:14px; color:#6C757D; min-width:90px;">
          ${nl.date}
        </div>
        <div style="color:#1E3A5F; font-size:16px; font-weight:600;">
          ${nl.title}
        </div>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("뉴스레터 로딩 에러:", err);
  }
}

loadNewsletters();
