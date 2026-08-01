const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const pageMeta = {
  dashboard: ["Bảng điều khiển", "Tổng quan nhanh hệ thống quản trị LingoVerse."],
  users: ["Quản lý người dùng", "Lọc, xem chi tiết, sửa, xóa và khóa/mở khóa tài khoản."],
  vocabulary: ["Quản lý từ vựng", "Thêm, sửa, xóa, ẩn/hiện và import dữ liệu từ vựng."],
  lessons: ["Quản lý bài học", "Danh sách, thêm mới và chi tiết bài học được gộp trong cùng module."],
  tests: ["Quản lý đề thi", "Danh sách, thêm mới và chi tiết đề thi được gộp trong cùng module."],
  community: ["Quản lý cộng đồng", "Kiểm duyệt bài viết, bình luận và báo cáo vi phạm."],
  reports: ["Báo cáo", "Báo cáo tổng hợp về người dùng, học tập, đề thi và cộng đồng."],
  settings: ["Cài đặt", "Thiết lập thông tin chung và quy định vận hành hệ thống."]
};

const originalDb = {
  users: [
    { id: 1, name: "Nguyễn Minh Anh", email: "minhanh@gmail.com", role: "Học viên", level: "A2", joined: "12/07/2026", status: "Hoạt động" },
    { id: 2, name: "Trần Hải Nam", email: "hainam@gmail.com", role: "Học viên", level: "B1", joined: "02/07/2026", status: "Hoạt động" },
    { id: 3, name: "Lê Phương", email: "lephuong@gmail.com", role: "Học viên", level: "A1", joined: "28/06/2026", status: "Bị khóa" },
    { id: 4, name: "Phạm Quang Huy", email: "huypham@gmail.com", role: "Học viên", level: "B2", joined: "18/06/2026", status: "Hoạt động" },
    { id: 5, name: "Võ Hoài Linh", email: "linhvo@gmail.com", role: "Học viên", level: "A2", joined: "15/06/2026", status: "Hoạt động" },
    { id: 6, name: "Admin LingoVerse", email: "admin@lingoverse.vn", role: "Admin", level: "B2", joined: "01/06/2026", status: "Hoạt động" }
  ],
  words: [
    { id: 1, word: "hello", phonetic: "/həˈloʊ/", meaning: "xin chào", type: "interjection", topic: "Chào hỏi", level: "A1", status: "Hiển thị" },
    { id: 2, word: "goodbye", phonetic: "/ˌɡʊdˈbaɪ/", meaning: "tạm biệt", type: "interjection", topic: "Chào hỏi", level: "A1", status: "Hiển thị" },
    { id: 3, word: "reservation", phonetic: "/ˌrezərˈveɪʃn/", meaning: "sự đặt chỗ", type: "noun", topic: "Du lịch", level: "A2", status: "Hiển thị" },
    { id: 4, word: "luggage", phonetic: "/ˈlʌɡɪdʒ/", meaning: "hành lý", type: "noun", topic: "Du lịch", level: "A2", status: "Hiển thị" },
    { id: 5, word: "achievement", phonetic: "/əˈtʃiːvmənt/", meaning: "thành tựu", type: "noun", topic: "Học tập", level: "B1", status: "Hiển thị" },
    { id: 6, word: "deadline", phonetic: "/ˈdedlaɪn/", meaning: "hạn chót", type: "noun", topic: "Công việc", level: "B1", status: "Hiển thị" },
    { id: 7, word: "negotiate", phonetic: "/nɪˈɡoʊʃieɪt/", meaning: "đàm phán", type: "verb", topic: "Công việc", level: "B2", status: "Đã ẩn" },
    { id: 8, word: "recipe", phonetic: "/ˈresəpi/", meaning: "công thức nấu ăn", type: "noun", topic: "Ẩm thực", level: "A2", status: "Hiển thị" }
  ],
  lessons: [
    { id: 1, title: "A1 - Chào hỏi cơ bản", topic: "Chào hỏi", level: "A1", words: 25, practice: 3, status: "Hiển thị", desc: "Từ vựng và mẫu câu chào hỏi thông dụng." },
    { id: 2, title: "A1 - Giới thiệu bản thân", topic: "Chào hỏi", level: "A1", words: 30, practice: 4, status: "Hiển thị", desc: "Từ vựng giới thiệu tên, tuổi, quốc tịch, sở thích." },
    { id: 3, title: "A2 - Du lịch", topic: "Du lịch", level: "A2", words: 40, practice: 5, status: "Hiển thị", desc: "Từ vựng đặt phòng, mua vé, hỏi đường, sân bay." },
    { id: 4, title: "A2 - Ẩm thực", topic: "Ẩm thực", level: "A2", words: 35, practice: 4, status: "Hiển thị", desc: "Từ vựng về món ăn, đồ uống và nhà hàng." },
    { id: 5, title: "B1 - Công việc", topic: "Công việc", level: "B1", words: 60, practice: 6, status: "Bản nháp", desc: "Từ vựng văn phòng, deadline, meeting và teamwork." },
    { id: 6, title: "B2 - Thuyết trình", topic: "Công việc", level: "B2", words: 45, practice: 5, status: "Đã ẩn", desc: "Từ vựng dùng trong thuyết trình và tranh luận." },
    { id: 7, title: "B1 - Học tập", topic: "Học tập", level: "B1", words: 50, practice: 5, status: "Hiển thị", desc: "Từ vựng về mục tiêu, thành tích, kỹ năng học tập." }
  ],
  tests: [
    { id: 1, title: "Kiểm tra A1 - Chào hỏi", type: "Trắc nghiệm", level: "A1", questions: 25, duration: "20 phút", attempts: 1250, status: "Hiển thị" },
    { id: 2, title: "Kiểm tra A2 - Du lịch", type: "Trắc nghiệm", level: "A2", questions: 30, duration: "35 phút", attempts: 890, status: "Hiển thị" },
    { id: 3, title: "Nghe A2 - Nhà hàng", type: "Nghe", level: "A2", questions: 20, duration: "25 phút", attempts: 430, status: "Bản nháp" },
    { id: 4, title: "IELTS Reading - Test 1", type: "Đọc hiểu", level: "B1", questions: 40, duration: "60 phút", attempts: 520, status: "Hiển thị" },
    { id: 5, title: "B2 - Business English", type: "Tổng hợp", level: "B2", questions: 45, duration: "50 phút", attempts: 210, status: "Đã ẩn" },
    { id: 6, title: "B1 - Công việc", type: "Trắc nghiệm", level: "B1", questions: 35, duration: "40 phút", attempts: 610, status: "Hiển thị" }
  ],
  community: [
    { id: 1, content: "Làm sao để học 20 từ mỗi ngày?", type: "Bài viết", author: "Minh Anh", reason: "Không vi phạm", date: "30/07/2026", status: "Hiển thị" },
    { id: 2, content: "Chia sẻ tài liệu ôn B1 có link ngoài", type: "Báo cáo", author: "Hải Nam", reason: "Link ngoài", date: "29/07/2026", status: "Chờ xử lý" },
    { id: 3, content: "Bình luận có nội dung xúc phạm", type: "Bình luận", author: "Ẩn danh", reason: "Ngôn từ không phù hợp", date: "29/07/2026", status: "Chờ xử lý" },
    { id: 4, content: "Spam link nhóm học tiếng Anh", type: "Báo cáo", author: "Lê Phương", reason: "Spam", date: "28/07/2026", status: "Đã ẩn" },
    { id: 5, content: "Kinh nghiệm ghi nhớ từ vựng bằng flashcard", type: "Bài viết", author: "Quang Huy", reason: "Không vi phạm", date: "27/07/2026", status: "Hiển thị" },
    { id: 6, content: "Bài viết quảng cáo khóa học ngoài nền tảng", type: "Báo cáo", author: "Hoài Linh", reason: "Link ngoài", date: "26/07/2026", status: "Chờ xử lý" }
  ],
  reports: [
    { id: 1, group: "Người dùng", content: "Người dùng mới", amount: 1250, growth: "+12.5%", note: "Tăng đều trong tháng" },
    { id: 2, group: "Học tập", content: "Lượt mở bài học", amount: 5680, growth: "+18.2%", note: "A1 được học nhiều nhất" },
    { id: 3, group: "Đề thi", content: "Lượt làm bài test", amount: 2400, growth: "+8.4%", note: "A2 - Du lịch nổi bật" },
    { id: 4, group: "Cộng đồng", content: "Báo cáo vi phạm", amount: 36, growth: "-4.1%", note: "Giảm so với tuần trước" },
    { id: 5, group: "Học tập", content: "Từ lưu vào sổ tay", amount: 12480, growth: "+22.7%", note: "Flashcard được dùng nhiều" }
  ],
  activities: [
    { color: "green", text: "Admin cập nhật bài học “A1 - Chào hỏi cơ bản”.", time: "5 phút trước" },
    { color: "blue", text: "Nguyễn Minh Anh hoàn thành đề thi “A2 - Du lịch”.", time: "18 phút trước" },
    { color: "orange", text: "Hệ thống ghi nhận 1 báo cáo cộng đồng cần xử lý.", time: "35 phút trước" }
  ]
};

let db = JSON.parse(JSON.stringify(originalDb));
let currentLessonId = 1;
let currentTestId = 2;
let confirmCallback = null;

const config = {
  users: {
    name: "người dùng",
    label: "Người dùng",
    fields: [
      ["name", "Tên người dùng", "text"],
      ["email", "Email", "email"],
      ["role", "Vai trò", "select", ["Học viên", "Admin"]],
      ["level", "Cấp độ", "select", ["A1", "A2", "B1", "B2"]],
      ["joined", "Ngày tham gia", "text"],
      ["status", "Trạng thái", "select", ["Hoạt động", "Bị khóa"]]
    ],
    detail: [
      ["name", "Tên người dùng"],
      ["email", "Email"],
      ["role", "Vai trò"],
      ["level", "Cấp độ"],
      ["joined", "Ngày tham gia"],
      ["status", "Trạng thái"]
    ]
  },
  words: {
    name: "từ vựng",
    label: "Từ vựng",
    fields: [
      ["word", "Từ vựng", "text"],
      ["phonetic", "Phiên âm", "text"],
      ["meaning", "Nghĩa", "text"],
      ["type", "Từ loại", "text"],
      ["topic", "Chủ đề", "select", ["Chào hỏi", "Du lịch", "Công việc", "Học tập", "Ẩm thực"]],
      ["level", "Cấp độ", "select", ["A1", "A2", "B1", "B2"]],
      ["status", "Trạng thái", "select", ["Hiển thị", "Đã ẩn"]]
    ],
    detail: [
      ["word", "Từ vựng"],
      ["phonetic", "Phiên âm"],
      ["meaning", "Nghĩa"],
      ["type", "Từ loại"],
      ["topic", "Chủ đề"],
      ["level", "Cấp độ"],
      ["status", "Trạng thái"]
    ]
  },
  lessons: {
    name: "bài học",
    label: "Bài học",
    fields: [
      ["title", "Tên bài học", "text"],
      ["topic", "Chủ đề", "select", ["Chào hỏi", "Du lịch", "Công việc", "Học tập", "Ẩm thực"]],
      ["level", "Cấp độ", "select", ["A1", "A2", "B1", "B2"]],
      ["words", "Số từ vựng", "number"],
      ["practice", "Số bài luyện tập", "number"],
      ["status", "Trạng thái", "select", ["Hiển thị", "Bản nháp", "Đã ẩn"]],
      ["desc", "Mô tả", "textarea"]
    ],
    detail: [
      ["title", "Tên bài học"],
      ["topic", "Chủ đề"],
      ["level", "Cấp độ"],
      ["words", "Số từ vựng"],
      ["practice", "Số bài luyện tập"],
      ["status", "Trạng thái"],
      ["desc", "Mô tả"]
    ]
  },
  tests: {
    name: "đề thi",
    label: "Đề thi",
    fields: [
      ["title", "Tên đề thi", "text"],
      ["type", "Loại đề", "select", ["Trắc nghiệm", "Nghe", "Đọc hiểu", "Tổng hợp"]],
      ["level", "Cấp độ", "select", ["A1", "A2", "B1", "B2"]],
      ["questions", "Số câu", "number"],
      ["duration", "Thời lượng", "text"],
      ["attempts", "Lượt làm", "number"],
      ["status", "Trạng thái", "select", ["Hiển thị", "Bản nháp", "Đã ẩn"]]
    ],
    detail: [
      ["title", "Tên đề thi"],
      ["type", "Loại đề"],
      ["level", "Cấp độ"],
      ["questions", "Số câu"],
      ["duration", "Thời lượng"],
      ["attempts", "Lượt làm"],
      ["status", "Trạng thái"]
    ]
  },
  community: {
    name: "nội dung cộng đồng",
    label: "Cộng đồng",
    fields: [
      ["content", "Nội dung", "textarea"],
      ["type", "Loại", "select", ["Bài viết", "Bình luận", "Báo cáo"]],
      ["author", "Người đăng", "text"],
      ["reason", "Lý do/Báo cáo", "select", ["Không vi phạm", "Spam", "Ngôn từ không phù hợp", "Link ngoài"]],
      ["date", "Ngày", "text"],
      ["status", "Trạng thái", "select", ["Hiển thị", "Chờ xử lý", "Đã ẩn"]]
    ],
    detail: [
      ["content", "Nội dung"],
      ["type", "Loại"],
      ["author", "Người đăng"],
      ["reason", "Lý do/Báo cáo"],
      ["date", "Ngày"],
      ["status", "Trạng thái"]
    ]
  },
  reports: {
    name: "báo cáo",
    label: "Báo cáo",
    fields: [
      ["group", "Nhóm báo cáo", "select", ["Người dùng", "Học tập", "Đề thi", "Cộng đồng"]],
      ["content", "Nội dung", "text"],
      ["amount", "Số lượng", "number"],
      ["growth", "Tăng trưởng", "text"],
      ["note", "Ghi chú", "textarea"]
    ],
    detail: [
      ["group", "Nhóm báo cáo"],
      ["content", "Nội dung"],
      ["amount", "Số lượng"],
      ["growth", "Tăng trưởng"],
      ["note", "Ghi chú"]
    ]
  }
};

function norm(v) {
  return String(v ?? "").toLowerCase().trim();
}

function textMatch(item, keyword, fields) {
  if (!keyword) return true;
  return fields.some(f => norm(item[f]).includes(keyword));
}

function getStatusClass(status) {
  return {
    "Hoạt động": "green",
    "Hiển thị": "green",
    "Admin": "blue",
    "Học viên": "blue",
    "Bản nháp": "orange",
    "Chờ xử lý": "orange",
    "Bị khóa": "red",
    "Đã ẩn": "red"
  }[status] || "blue";
}

function badge(status) {
  return `<span class="badge ${getStatusClass(status)}">${status}</span>`;
}

function actions(type, id, status) {
  let statusText = "Ẩn";
  if (type === "users") statusText = status === "Bị khóa" ? "Mở khóa" : "Khóa";
  else statusText = status === "Đã ẩn" ? "Hiện" : "Ẩn";

  return `
    <div class="actions">
      <button data-action="detail" data-type="${type}" data-id="${id}">Chi tiết</button>
      <button data-action="edit" data-type="${type}" data-id="${id}">Sửa</button>
      <button data-action="toggle" data-type="${type}" data-id="${id}">${statusText}</button>
      <button data-action="delete" data-type="${type}" data-id="${id}">Xóa</button>
    </div>
  `;
}

function initials(name) {
  return String(name).split(" ").map(w => w[0]).slice(-2).join("").toUpperCase();
}

function noData(cols) {
  return `<tr><td class="no-data" colspan="${cols}">Không có dữ liệu phù hợp với bộ lọc.</td></tr>`;
}

function renderDashboard() {
  $("#countUsers").textContent = db.users.length;
  $("#countWords").textContent = db.words.length;
  $("#countLessons").textContent = db.lessons.length;
  $("#countTests").textContent = db.tests.length;

  $("#activityList").innerHTML = db.activities.map(a => `
    <div class="activity-item">
      <span class="dot ${a.color}"></span>
      <p><b>${a.text}</b><small>${a.time}</small></p>
    </div>
  `).join("");
}

function renderUsers() {
  const key = norm($("#userSearch").value);
  const role = $("#userRole").value;
  const level = $("#userLevel").value;
  const status = $("#userStatus").value;

  const rows = db.users.filter(r =>
    textMatch(r, key, ["name", "email"]) &&
    (!role || r.role === role) &&
    (!level || r.level === level) &&
    (!status || r.status === status)
  );

  $("#userCount").textContent = `Hiển thị ${rows.length}/${db.users.length} người dùng.`;
  $("#userTable").innerHTML = rows.length ? rows.map(r => `
    <tr>
      <td class="user-cell"><span class="avatar-mini">${initials(r.name)}</span><b>${r.name}</b></td>
      <td>${r.email}</td>
      <td>${badge(r.role)}</td>
      <td>${r.level}</td>
      <td>${r.joined}</td>
      <td>${badge(r.status)}</td>
      <td>${actions("users", r.id, r.status)}</td>
    </tr>
  `).join("") : noData(7);
}

function renderWords() {
  const key = norm($("#wordSearch").value);
  const topic = $("#wordTopic").value;
  const level = $("#wordLevel").value;
  const status = $("#wordStatus").value;

  const rows = db.words.filter(r =>
    textMatch(r, key, ["word", "phonetic", "meaning", "type"]) &&
    (!topic || r.topic === topic) &&
    (!level || r.level === level) &&
    (!status || r.status === status)
  );

  $("#wordCount").textContent = `Hiển thị ${rows.length}/${db.words.length} từ vựng.`;
  $("#wordTable").innerHTML = rows.length ? rows.map(r => `
    <tr>
      <td><b>${r.word}</b></td>
      <td>${r.phonetic}</td>
      <td>${r.meaning}</td>
      <td>${r.type}</td>
      <td>${r.topic}</td>
      <td>${r.level}</td>
      <td>${badge(r.status)}</td>
      <td>${actions("words", r.id, r.status)}</td>
    </tr>
  `).join("") : noData(8);
}

function renderLessons() {
  const key = norm($("#lessonSearch").value);
  const topic = $("#lessonTopic").value;
  const level = $("#lessonLevel").value;
  const status = $("#lessonStatus").value;

  const rows = db.lessons.filter(r =>
    textMatch(r, key, ["title", "desc"]) &&
    (!topic || r.topic === topic) &&
    (!level || r.level === level) &&
    (!status || r.status === status)
  );

  $("#lessonCount").textContent = `Hiển thị ${rows.length}/${db.lessons.length} bài học.`;
  $("#lessonGrid").innerHTML = rows.length ? rows.map(r => `
    <article class="lesson-card">
      <div class="lesson-cover"></div>
      <div class="lesson-body">
        ${badge(r.status)}
        <h3>${r.title}</h3>
        <p>${r.desc}</p>
        <p><b>${r.words}</b> từ vựng • <b>${r.practice}</b> bài luyện tập • ${r.topic}</p>
        ${actions("lessons", r.id, r.status)}
      </div>
    </article>
  `).join("") : `<div class="panel no-data">Không có bài học phù hợp với bộ lọc.</div>`;

  if (!db.lessons.find(x => x.id === currentLessonId) && db.lessons[0]) currentLessonId = db.lessons[0].id;
  renderLessonDetail();
}

function renderLessonDetail() {
  const lesson = db.lessons.find(x => x.id === currentLessonId) || db.lessons[0];

  if (!lesson) {
    $("#lessonDetailContent").innerHTML = `<div class="no-data">Không còn bài học nào để hiển thị.</div>`;
    return;
  }

  currentLessonId = lesson.id;
  $("#lessonDetailDesc").textContent = `Quản lý nội dung chi tiết của bài “${lesson.title}”.`;
  $("#lessonDetailContent").innerHTML = `
    <aside class="detail-side">
      <h3>${lesson.title}</h3>
      <p class="muted">Chủ đề: ${lesson.topic}</p>
      <p class="muted">Cấp độ: ${lesson.level}</p>
      <p class="muted">Số từ: ${lesson.words} từ</p>
      <p class="muted">Luyện tập: ${lesson.practice} bài</p>
      <p class="muted">Trạng thái: ${lesson.status}</p>
      <div class="progress">
        <span>Hoàn thiện nội dung</span>
        <b>80%</b>
        <i style="width:80%"></i>
      </div>
      <button class="btn secondary full" data-action="detail" data-type="lessons" data-id="${lesson.id}">Xem chi tiết</button>
    </aside>

    <div class="detail-main">
      <div class="mini-section">
        <div class="mini-head">
          <h3>Từ vựng trong bài</h3>
          <button class="btn secondary" data-add="words">+ Thêm từ</button>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Từ vựng</th>
                <th>Phiên âm</th>
                <th>Nghĩa</th>
                <th>Ví dụ</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>hello</b></td>
                <td>/həˈloʊ/</td>
                <td>xin chào</td>
                <td>Hello, how are you?</td>
                <td class="actions"><button data-action="edit" data-type="words" data-id="1">Sửa</button><button data-action="delete" data-type="words" data-id="1">Xóa</button></td>
              </tr>
              <tr>
                <td><b>goodbye</b></td>
                <td>/ˌɡʊdˈbaɪ/</td>
                <td>tạm biệt</td>
                <td>Goodbye, see you later.</td>
                <td class="actions"><button data-action="edit" data-type="words" data-id="2">Sửa</button><button data-action="delete" data-type="words" data-id="2">Xóa</button></td>
              </tr>
              <tr>
                <td><b>reservation</b></td>
                <td>/ˌrezərˈveɪʃn/</td>
                <td>sự đặt chỗ</td>
                <td>I have a hotel reservation.</td>
                <td class="actions"><button data-action="edit" data-type="words" data-id="3">Sửa</button><button data-action="delete" data-type="words" data-id="3">Xóa</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="mini-section">
        <h3>Bài luyện tập nhanh</h3>
        <div class="practice-grid">
          <article><b>Trắc nghiệm nghĩa từ</b><span>10 câu hỏi</span></article>
          <article><b>Điền từ còn thiếu</b><span>5 câu hỏi</span></article>
          <article><b>Nghe và chọn đáp án</b><span>5 câu hỏi</span></article>
        </div>
      </div>
    </div>
  `;
}

function renderTests() {
  const key = norm($("#testSearch").value);
  const type = $("#testType").value;
  const level = $("#testLevel").value;
  const status = $("#testStatus").value;

  const rows = db.tests.filter(r =>
    textMatch(r, key, ["title"]) &&
    (!type || r.type === type) &&
    (!level || r.level === level) &&
    (!status || r.status === status)
  );

  $("#testCount").textContent = `Hiển thị ${rows.length}/${db.tests.length} đề thi.`;
  $("#testTable").innerHTML = rows.length ? rows.map(r => `
    <tr>
      <td><b>${r.title}</b></td>
      <td>${r.type}</td>
      <td>${r.level}</td>
      <td>${r.questions}</td>
      <td>${r.duration}</td>
      <td>${r.attempts}</td>
      <td>${badge(r.status)}</td>
      <td>${actions("tests", r.id, r.status)}</td>
    </tr>
  `).join("") : noData(8);

  if (!db.tests.find(x => x.id === currentTestId) && db.tests[0]) currentTestId = db.tests[0].id;
  renderTestDetail();
}

function renderTestDetail() {
  const test = db.tests.find(x => x.id === currentTestId) || db.tests[0];

  if (!test) {
    $("#testDetailContent").innerHTML = `<div class="no-data">Không còn đề thi nào để hiển thị.</div>`;
    return;
  }

  currentTestId = test.id;
  $("#testDetailDesc").textContent = `Quản lý câu hỏi và đáp án của đề “${test.title}”.`;
  $("#testDetailContent").innerHTML = `
    <aside class="detail-side">
      <h3>${test.title}</h3>
      <p class="muted">Loại: ${test.type}</p>
      <p class="muted">Cấp độ: ${test.level}</p>
      <p class="muted">Số câu: ${test.questions} câu</p>
      <p class="muted">Thời lượng: ${test.duration}</p>
      <p class="muted">Trạng thái: ${test.status}</p>
      <button class="btn secondary full" data-action="detail" data-type="tests" data-id="${test.id}">Xem chi tiết</button>
    </aside>

    <div class="detail-main">
      <article class="question-card">
        <div class="mini-head">
          <h3>Câu 1</h3>
          <span class="badge green">Đáp án: B</span>
        </div>
        <p>Choose the correct meaning of “reservation”.</p>
        <div class="answer-grid">
          <span>A. Cửa hàng</span>
          <span class="correct">B. Sự đặt chỗ</span>
          <span>C. Hành lý</span>
          <span>D. Vé tàu</span>
        </div>
      </article>

      <article class="question-card">
        <div class="mini-head">
          <h3>Câu 2</h3>
          <span class="badge green">Đáp án: C</span>
        </div>
        <p>Fill in the blank: I would like to ____ a room.</p>
        <div class="answer-grid">
          <span>A. eat</span>
          <span>B. travel</span>
          <span class="correct">C. book</span>
          <span>D. speak</span>
        </div>
      </article>

      <article class="question-card">
        <div class="mini-head">
          <h3>Câu 3</h3>
          <span class="badge orange">Bản nháp</span>
        </div>
        <p>Listen and choose the correct picture.</p>
        <div class="answer-grid">
          <span>A. Airport</span>
          <span>B. Restaurant</span>
          <span>C. Hotel</span>
          <span>D. Station</span>
        </div>
      </article>
    </div>
  `;
}

function renderCommunity() {
  const key = norm($("#communitySearch").value);
  const type = $("#communityType").value;
  const reason = $("#communityReason").value;
  const status = $("#communityStatus").value;

  const rows = db.community.filter(r =>
    textMatch(r, key, ["content", "author"]) &&
    (!type || r.type === type) &&
    (!reason || r.reason === reason) &&
    (!status || r.status === status)
  );

  $("#communityCount").textContent = `Hiển thị ${rows.length}/${db.community.length} nội dung cộng đồng.`;
  $("#communityTable").innerHTML = rows.length ? rows.map(r => `
    <tr>
      <td><b>${r.content}</b></td>
      <td>${r.type}</td>
      <td>${r.author}</td>
      <td>${r.reason}</td>
      <td>${r.date}</td>
      <td>${badge(r.status)}</td>
      <td>${actions("community", r.id, r.status)}</td>
    </tr>
  `).join("") : noData(7);
}

function reportMultiplier() {
  const map = { week: 1, month: 3, quarter: 8 };
  return map[$("#reportPeriod").value] || 1;
}

function renderReports() {
  const mult = reportMultiplier();
  const type = $("#reportType").value;

  const rows = db.reports.filter(r => !type || r.group === type);
  const lookup = db.reports.reduce((sum, r) => sum + Number(r.amount || 0), 0) * mult;
  const lessons = (db.lessons.length * 820) * mult;
  const tests = (db.tests.reduce((sum, r) => sum + Number(r.attempts || 0), 0)) * mult;
  const community = db.community.filter(x => x.status === "Chờ xử lý").length * mult;

  $("#reportSearchCount").textContent = lookup.toLocaleString("vi-VN");
  $("#reportLessonCount").textContent = lessons.toLocaleString("vi-VN");
  $("#reportTestCount").textContent = tests.toLocaleString("vi-VN");
  $("#reportCommunityCount").textContent = community.toLocaleString("vi-VN");

  const chartValues = [40, 65, 52, 78, 70, 92, 84].map(v => Math.min(100, Math.round(v * (mult === 1 ? 1 : mult === 3 ? 0.85 : 0.7))));
  const labels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  $("#reportChart").innerHTML = chartValues.map((v, i) => `<span style="height:${v}%"><b>${labels[i]}</b></span>`).join("");

  $("#reportRank").innerHTML = [
    ["A1 - Chào hỏi cơ bản", "5.680 lượt"],
    ["Từ khóa achievement", "1.250 lượt"],
    ["Kiểm tra A2 - Du lịch", "890 lượt"],
    ["Bài cộng đồng Flashcard", "320 lượt"]
  ].map(item => `<li><span>${item[0]}</span><b>${item[1]}</b></li>`).join("");

  $("#reportTable").innerHTML = rows.length ? rows.map(r => `
    <tr>
      <td>${r.group}</td>
      <td><b>${r.content}</b></td>
      <td>${(Number(r.amount) * mult).toLocaleString("vi-VN")}</td>
      <td>${r.growth}</td>
      <td>${r.note}</td>
      <td>${actions("reports", r.id, "Hiển thị")}</td>
    </tr>
  `).join("") : noData(6);
}

function renderAll() {
  renderDashboard();
  renderUsers();
  renderWords();
  renderLessons();
  renderTests();
  renderCommunity();
  renderReports();
}

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  setTimeout(() => t.classList.add("hidden"), 1700);
}

function changePage(page) {
  $$(".page").forEach(p => p.classList.toggle("active", p.id === page));
  $$(".nav-item").forEach(i => i.classList.toggle("active", i.dataset.page === page));
  $("#pageTitle").textContent = pageMeta[page][0];
  $("#pageSubtitle").textContent = pageMeta[page][1];
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function changeSubview(group, view) {
  const pageId = group === "lesson" ? "lessons" : "tests";
  const attr = group === "lesson" ? "data-lesson-view" : "data-test-view";
  const selector = group === "lesson" ? "[data-lesson-view]" : "[data-test-view]";

  $(`#${pageId}`).querySelectorAll(".subview").forEach(v => v.classList.toggle("active", v.id === view));
  $$(selector).forEach(btn => btn.classList.toggle("active", btn.getAttribute(attr) === view));
}

function getItem(type, id) {
  return db[type].find(item => item.id === Number(id));
}

function showDetail(type, id) {
  const item = getItem(type, id);
  if (!item) return toast("Dữ liệu không còn tồn tại");

  $("#crudTitle").textContent = `Chi tiết ${config[type].name}`;
  $("#crudBody").innerHTML = `
    <div class="detail-grid">
      ${config[type].detail.map(([key, label]) => `
        <b>${label}</b>
        <span>${key === "status" || key === "role" ? badge(item[key]) : item[key]}</span>
      `).join("")}
    </div>
  `;
  $("#crudActions").innerHTML = `
    <button class="btn secondary" data-close-crud>Đóng</button>
    <button class="btn primary" data-open-edit="${type}" data-id="${id}">Sửa</button>
  `;
  openCrud();
}

function inputField(key, label, type, options, value = "") {
  if (type === "select") {
    return `
      <label>${label}</label>
      <select name="${key}">
        ${options.map(opt => `<option value="${opt}" ${opt == value ? "selected" : ""}>${opt}</option>`).join("")}
      </select>
    `;
  }

  if (type === "textarea") {
    return `
      <label class="wide">${label}</label>
      <textarea class="wide" name="${key}">${value ?? ""}</textarea>
    `;
  }

  return `
    <label>${label}</label>
    <input name="${key}" type="${type}" value="${value ?? ""}" />
  `;
}

function showEdit(type, id = null) {
  const isAdd = id === null || id === undefined;
  const item = isAdd ? {} : getItem(type, id);
  if (!isAdd && !item) return toast("Dữ liệu không còn tồn tại");

  $("#crudTitle").textContent = isAdd ? `Thêm ${config[type].name}` : `Sửa ${config[type].name}`;
  $("#crudBody").innerHTML = `
    <form id="crudEditForm" class="edit-form-grid">
      ${config[type].fields.map(([key, label, fieldType, options]) =>
        inputField(key, label, fieldType, options, item[key])
      ).join("")}
    </form>
  `;
  $("#crudActions").innerHTML = `
    <button class="btn secondary" data-close-crud>Hủy</button>
    <button class="btn primary" data-save-crud data-type="${type}" data-id="${isAdd ? "" : id}">Lưu</button>
  `;
  openCrud();
}

function saveEdit(type, id) {
  const form = $("#crudEditForm");
  const dataForm = new FormData(form);
  const newItem = {};

  config[type].fields.forEach(([key, label, fieldType]) => {
    const value = dataForm.get(key);
    newItem[key] = fieldType === "number" ? Number(value || 0) : value;
  });

  if (id) {
    const index = db[type].findIndex(item => item.id === Number(id));
    if (index >= 0) {
      db[type][index] = { ...db[type][index], ...newItem };
      toast("Đã lưu chỉnh sửa");
    }
  } else {
    const newId = db[type].length ? Math.max(...db[type].map(item => item.id)) + 1 : 1;
    db[type].push({ id: newId, ...newItem });
    toast("Đã thêm dữ liệu mới");
  }

  closeCrud();
  renderAll();
}

function confirmAction(title, text, callback) {
  $("#confirmTitle").textContent = title;
  $("#confirmText").textContent = text;
  confirmCallback = callback;
  $("#confirmModal").classList.remove("hidden");
}

function deleteItem(type, id) {
  const item = getItem(type, id);
  if (!item) return;
  confirmAction(
    "Xác nhận xóa",
    `Bạn có chắc muốn xóa ${config[type].name} này không? Dữ liệu sẽ bị xóa khỏi demo.`,
    () => {
      db[type] = db[type].filter(x => x.id !== Number(id));
      if (type === "lessons" && currentLessonId === Number(id) && db.lessons[0]) currentLessonId = db.lessons[0].id;
      if (type === "tests" && currentTestId === Number(id) && db.tests[0]) currentTestId = db.tests[0].id;
      renderAll();
      toast("Đã xóa dữ liệu");
    }
  );
}

function toggleItem(type, id) {
  const item = getItem(type, id);
  if (!item) return;

  if (type === "users") {
    item.status = item.status === "Bị khóa" ? "Hoạt động" : "Bị khóa";
    toast(item.status === "Bị khóa" ? "Đã khóa tài khoản" : "Đã mở khóa tài khoản");
  } else if (type === "community") {
    item.status = item.status === "Đã ẩn" ? "Hiển thị" : "Đã ẩn";
    toast(item.status === "Đã ẩn" ? "Đã ẩn nội dung" : "Đã hiển thị nội dung");
  } else if (type === "reports") {
    toast("Báo cáo không có trạng thái khóa/ẩn");
  } else {
    item.status = item.status === "Đã ẩn" ? "Hiển thị" : "Đã ẩn";
    toast(item.status === "Đã ẩn" ? "Đã ẩn dữ liệu" : "Đã hiển thị dữ liệu");
  }

  renderAll();
}

function openCrud() {
  $("#crudModal").classList.remove("hidden");
}

function closeCrud() {
  $("#crudModal").classList.add("hidden");
}

function resetFilters(block) {
  const map = {
    users: ["#userSearch", "#userRole", "#userLevel", "#userStatus"],
    words: ["#wordSearch", "#wordTopic", "#wordLevel", "#wordStatus"],
    lessons: ["#lessonSearch", "#lessonTopic", "#lessonLevel", "#lessonStatus"],
    tests: ["#testSearch", "#testType", "#testLevel", "#testStatus"],
    community: ["#communitySearch", "#communityType", "#communityReason", "#communityStatus"]
  };

  map[block].forEach(id => $(id).value = "");
  renderAll();
  toast("Đã xóa bộ lọc");
}

function initEvents() {
  $("#loginForm").addEventListener("submit", e => {
    e.preventDefault();
    $("#loginPage").classList.add("hidden");
    $("#adminApp").classList.remove("hidden");
    toast("Đăng nhập thành công");
  });

  $("#logoutBtn").addEventListener("click", () => {
    $("#adminApp").classList.add("hidden");
    $("#loginPage").classList.remove("hidden");
  });

  $$(".nav-item").forEach(btn => btn.addEventListener("click", () => changePage(btn.dataset.page)));

  $$(".quick-card").forEach(btn => btn.addEventListener("click", () => {
    changePage(btn.dataset.shortcut);
    if (btn.dataset.lessonViewShortcut) changeSubview("lesson", btn.dataset.lessonViewShortcut);
    if (btn.dataset.testViewShortcut) changeSubview("test", btn.dataset.testViewShortcut);
  }));

  $$(".subtab[data-lesson-view], [data-lesson-view-btn]").forEach(btn => {
    btn.addEventListener("click", () => changeSubview("lesson", btn.dataset.lessonView || btn.dataset.lessonViewBtn));
  });

  $$(".subtab[data-test-view], [data-test-view-btn]").forEach(btn => {
    btn.addEventListener("click", () => changeSubview("test", btn.dataset.testView || btn.dataset.testViewBtn));
  });

  document.body.addEventListener("click", e => {
    const actionButton = e.target.closest("[data-action]");
    if (actionButton) {
      const { action, type, id } = actionButton.dataset;

      if (action === "detail") {
        if (type === "lessons") {
          currentLessonId = Number(id);
          changePage("lessons");
          changeSubview("lesson", "lessonDetail");
          renderLessonDetail();
        } else if (type === "tests") {
          currentTestId = Number(id);
          changePage("tests");
          changeSubview("test", "testDetail");
          renderTestDetail();
        } else {
          showDetail(type, id);
        }
      }

      if (action === "edit") showEdit(type, id);
      if (action === "delete") deleteItem(type, id);
      if (action === "toggle") toggleItem(type, id);
    }

    const addButton = e.target.closest("[data-add]");
    if (addButton) showEdit(addButton.dataset.add);

    const closeButton = e.target.closest("[data-close-crud]");
    if (closeButton) closeCrud();

    const editButton = e.target.closest("[data-open-edit]");
    if (editButton) showEdit(editButton.dataset.openEdit, editButton.dataset.id);

    const saveButton = e.target.closest("[data-save-crud]");
    if (saveButton) saveEdit(saveButton.dataset.type, saveButton.dataset.id);
  });

  [
    "#userSearch", "#userRole", "#userLevel", "#userStatus",
    "#wordSearch", "#wordTopic", "#wordLevel", "#wordStatus",
    "#lessonSearch", "#lessonTopic", "#lessonLevel", "#lessonStatus",
    "#testSearch", "#testType", "#testLevel", "#testStatus",
    "#communitySearch", "#communityType", "#communityReason", "#communityStatus"
  ].forEach(id => {
    $(id).addEventListener("input", renderAll);
    $(id).addEventListener("change", renderAll);
  });

  $("[data-edit-current-lesson]").addEventListener("click", () => showEdit("lessons", currentLessonId));
  $("[data-edit-current-test]").addEventListener("click", () => showEdit("tests", currentTestId));

  $$("#lessonForm, #testForm").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const f = new FormData(e.target);

      if (e.target.id === "lessonForm") {
        const newId = db.lessons.length ? Math.max(...db.lessons.map(x => x.id)) + 1 : 1;
        db.lessons.push({
          id: newId,
          title: f.get("title"),
          topic: f.get("topic"),
          level: f.get("level"),
          words: Number(f.get("words") || 0),
          practice: Number(f.get("practice") || 0),
          status: f.get("status"),
          desc: f.get("desc") || "Bài học mới được tạo từ form demo."
        });
        currentLessonId = newId;
        changeSubview("lesson", "lessonList");
        toast("Đã thêm bài học");
      }

      if (e.target.id === "testForm") {
        const newId = db.tests.length ? Math.max(...db.tests.map(x => x.id)) + 1 : 1;
        db.tests.push({
          id: newId,
          title: f.get("title"),
          type: f.get("type"),
          level: f.get("level"),
          questions: Number(f.get("questions") || 0),
          duration: f.get("duration") || "30 phút",
          attempts: Number(f.get("attempts") || 0),
          status: f.get("status")
        });
        currentTestId = newId;
        changeSubview("test", "testList");
        toast("Đã thêm đề thi");
      }

      e.target.reset();
      renderAll();
    });
  });

  $$("[data-reset]").forEach(btn => btn.addEventListener("click", () => resetFilters(btn.dataset.reset)));

  $("#settingsForm").addEventListener("submit", e => {
    e.preventDefault();
    toast("Đã lưu cài đặt demo");
  });

  $("#resetDemoBtn").addEventListener("click", () => {
    db = JSON.parse(JSON.stringify(originalDb));
    currentLessonId = 1;
    currentTestId = 2;
    renderAll();
    toast("Đã khôi phục dữ liệu demo");
  });

  $("#openImportBtn").addEventListener("click", () => $("#importModal").classList.remove("hidden"));
  $("#closeImportBtn").addEventListener("click", () => $("#importModal").classList.add("hidden"));

  $("#closeCrudBtn").addEventListener("click", closeCrud);

  $("#cancelConfirmBtn").addEventListener("click", () => $("#confirmModal").classList.add("hidden"));
  $("#okConfirmBtn").addEventListener("click", () => {
    $("#confirmModal").classList.add("hidden");
    if (confirmCallback) confirmCallback();
    confirmCallback = null;
  });

  $$(".modal").forEach(modal => {
    modal.addEventListener("click", e => {
      if (e.target === modal) modal.classList.add("hidden");
    });
  });

  $("#applyReportBtn").addEventListener("click", () => {
    renderReports();
    toast("Đã áp dụng bộ lọc báo cáo");
  });
  $("#reportPeriod").addEventListener("change", renderReports);
  $("#reportType").addEventListener("change", renderReports);
  $("#exportReportBtn").addEventListener("click", () => toast("Đã xuất báo cáo demo"));
}

document.addEventListener("DOMContentLoaded", () => {
  renderAll();
  initEvents();
});
