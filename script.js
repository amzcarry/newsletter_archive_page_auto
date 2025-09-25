async function loadNewsletters() {
  const listEl = document.getElementById("newsletter-list");
  try {
    // 캐시 무효화를 위해 쿼리스트링 추가
    const res = await fetch("./newsletterData.json?_=" + Date.now());
    if (!res.ok) throw new Error("JSON 응답 오류");
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      listEl.textContent = "아직 등록된 뉴스레터가 없습니다.";
      return;
    }

    listEl.innerHTML = "";
    data.forEach(item => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <h3 class="card-title">${escapeHtml(item.title)}</h3>
        <p class="card-meta">${escapeHtml(item.date)}</p>
        <a href="${encodeURI(item.url)}" target="_blank" rel="noopener">열어보기</a>
      `;
      listEl.appendChild(card);
    });
  } catch (e) {
    console.error(e);
    listEl.textContent = "목록을 불러오지 못했습니다.";
  }
}

// 간단한 XSS 방지용
function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

loadNewsletters();
