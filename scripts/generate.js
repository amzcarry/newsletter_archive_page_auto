// scripts/generate.js
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC_DIR = path.join(ROOT, "newsletters");
const OUT = path.join(ROOT, "newsletterData.json");

// 폴더가 없으면 생성
if (!fs.existsSync(SRC_DIR)) fs.mkdirSync(SRC_DIR, { recursive: true });

function readTitle(html) {
  const m1 = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (m1 && m1[1]) return m1[1].trim();
  const m2 = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  if (m2 && m2[1]) return m2[1].trim();
  return null;
}

function dateFromFilename(name) {
  // YYYY-MM-DD 로 시작하면 사용
  const m = name.match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : null;
}

function fileMTimeISO(p) {
  const st = fs.statSync(p);
  // 파일 수정일을 YYYY-MM-DD 로
  return new Date(st.mtime).toISOString().slice(0, 10);
}

function main() {
  const files = fs.readdirSync(SRC_DIR)
    .filter(f => f.toLowerCase().endsWith(".html") || f.toLowerCase().endsWith(".htm"));

  const items = files.map(file => {
    const full = path.join(SRC_DIR, file);
    const html = fs.readFileSync(full, "utf8");
    const title = readTitle(html) || file.replace(/\.(html?|HTML?)$/, "").replace(/[-_]/g, " ").trim();
    const date = dateFromFilename(file) || fileMTimeISO(full);

    return {
      title,
      date,
      file,
      url: `newsletters/${file}`
    };
  })
  // 날짜 내림차순 정렬
  .sort((a, b) => b.date.localeCompare(a.date));

  fs.writeFileSync(OUT, JSON.stringify(items, null, 2), "utf8");
  console.log(`Generated ${OUT} with ${items.length} item(s).`);
}

main();
