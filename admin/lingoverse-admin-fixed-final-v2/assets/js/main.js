const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const original = {
  users: [
    { id: 1, name: "Nguyễn Văn A", email: "nguyenvana@example.com", role: "Học viên", level: "A2", joined: "15/10/2023", status: "Hoạt động" },
    { id: 2, name: "Trần Thị B", email: "tranthib.collab@example.com", role: "Học viên", level: "A1", joined: "02/11/2023", status: "Hoạt động" },
    { id: 3, name: "Lê Văn C", email: "levanc.spam@example.com", role: "Học viên", level: "B1", joined: "20/09/2023", status: "Bị khóa" },
    { id: 4, name: "Phạm Minh M", email: "admin.pham@example.com", role: "Admin", level: "B2", joined: "01/01/2023", status: "Hoạt động" }
  ],
  dictionary: [
    { id: 1, word: "Resilience", phonetic: "/rɪˈzɪliəns/", meaning: "Sự kiên cường, khả năng phục hồi", type: "Noun", topic: "Học tập", level: "Sơ cấp", status: "Đã duyệt" },
    { id: 2, word: "Ephemeral", phonetic: "/ɪˈfemərəl/", meaning: "Ngắn ngủi, phù du", type: "Adjective", topic: "Học tập", level: "Trung cấp", status: "Đã duyệt" },
    { id: 3, word: "Ubiquitous", phonetic: "/juːˈbɪkwɪtəs/", meaning: "Có mặt ở khắp nơi", type: "Adjective", topic: "Công việc", level: "Cao cấp", status: "Đã duyệt" },
    { id: 4, word: "Reservation", phonetic: "/ˌrezərˈveɪʃn/", meaning: "Sự đặt chỗ", type: "Noun", topic: "Du lịch", level: "Sơ cấp", status: "Cần xử lý" }
  ],
  lessons: [
    { id: 1, title: "A1", topic: "Từ vựng cơ bản", level: "Trình độ", words: 1240, students: 2, status: "Đã xuất bản" },
    { id: 2, title: "A2", topic: "Du lịch", level: "Trình độ", words: 858, students: 32, status: "Đã xuất bản" },
    { id: 3, title: "Động từ bất quy tắc", topic: "Ngữ pháp", level: "Chủ đề", words: 2165, students: 7, status: "Bản nháp" },
    { id: 4, title: "Tiếng Anh Chuyên Ngành Y Khoa", topic: "Chuyên ngành", level: "Chủ đề", words: 420, students: 60, status: "Đã xuất bản" }
  ],
  tests: [
    { id: 1, title: "Test 1 - Starter Basics", type: "Reading", level: "Sơ cấp", questions: 20, duration: "30 phút", status: "Đang hoạt động" },
    { id: 2, title: "Test 2 - Listening Intro", type: "Listening", level: "Trung cấp", questions: 20, duration: "40 phút", status: "Đang hoạt động" },
    { id: 3, title: "Test 3 - Advanced Vocabulary", type: "Vocabulary", level: "Cao cấp", questions: 20, duration: "30 phút", status: "Bản nháp" }
  ],
  wordReports: [
    { id: 1, reporter: "Nguyễn Văn A", word: "Serendipity", content: "Sai nghĩa", status: "Chưa xử lý", date: "10/10/2023" },
    { id: 2, reporter: "Lê Thị B", word: "Ephemeral", content: "Lỗi âm thanh", status: "Chưa xử lý", date: "10/10/2023" },
    { id: 3, reporter: "Trần C", word: "Ubiquitous", content: "Sai ví dụ", status: "Chưa xử lý", date: "10/10/2023" }
  ],
  communityReports: [
    { id: 1, reporter: "Nguyễn Văn A", target: "Bình luận", content: "Spam", status: "Chưa xử lý", date: "10/10/2023" },
    { id: 2, reporter: "Lê Thị B", target: "Bài viết", content: "Vi phạm", status: "Chưa xử lý", date: "10/10/2023" },
    { id: 3, reporter: "Trần C", target: "Bài viết", content: "Spam", status: "Chưa xử lý", date: "10/10/2023" }
  ]
};

let data = JSON.parse(JSON.stringify(original));
let page = "dashboard";
let filters = {};
let confirmCallback = null;
let previousPageBeforeExcel = "dictionary";

const titles = {
  dashboard: ["Tổng quan hệ thống", "Theo dõi các chỉ số quan trọng của toàn bộ nền tảng"],
  users: ["Quản lý người dùng", "Theo dõi và quản lý tài khoản người dùng trên hệ thống."],
  lessons: ["Quản lý Bài học", "Tổng quan và quản lý nội dung học tập trên nền tảng."],
  dictionary: ["Quản lý Từ điển", "Theo dõi và cập nhật cơ sở dữ liệu từ vựng hệ thống."],
  tests: ["Quản lý bài thi", "Quản lý bài kiểm tra, đề thi, câu hỏi và kết quả học tập."],
  reports: ["Báo cáo", "Quản lý và phản hồi các đóng góp từ cộng đồng học tập."],
  settings: ["Cấu hình hệ thống & Cài đặt", "Quản lý cấu hình chung, bảo mật, thông báo và phân quyền hệ thống."],
  addWord: ["Thêm từ mới", "Bổ sung từ vựng mới hoặc chỉnh sửa dữ liệu từ vựng LingoVerse."],
  addLesson: ["Thêm bài học mới", "Tạo nội dung học tập hấp dẫn cho học viên."]
};

const cfg = {
  users: {
    name: "người dùng",
    fields: [
      ["name", "Họ tên", "text"],
      ["email", "Email", "email"],
      ["role", "Vai trò", "select", ["Học viên", "Admin"]],
      ["level", "Cấp độ", "select", ["A1", "A2", "B1", "B2"]],
      ["joined", "Ngày tham gia", "text"],
      ["status", "Trạng thái", "select", ["Hoạt động", "Bị khóa"]]
    ]
  },
  dictionary: {
    name: "từ vựng",
    fields: [
      ["word", "Từ vựng", "text"],
      ["phonetic", "Phiên âm", "text"],
      ["meaning", "Nghĩa tiếng Việt", "textarea"],
      ["type", "Từ loại", "text"],
      ["topic", "Chủ đề", "select", ["Học tập", "Du lịch", "Công việc", "Giao tiếp"]],
      ["level", "Cấp độ", "select", ["Sơ cấp", "Trung cấp", "Cao cấp"]],
      ["status", "Trạng thái", "select", ["Đã duyệt", "Cần xử lý"]]
    ]
  },
  lessons: {
    name: "bài học",
    fields: [
      ["title", "Tên bài học", "text"],
      ["topic", "Chủ đề", "text"],
      ["level", "Loại", "select", ["Trình độ", "Chủ đề"]],
      ["words", "Số từ vựng", "number"],
      ["students", "Học viên", "number"],
      ["status", "Trạng thái", "select", ["Đã xuất bản", "Bản nháp"]]
    ]
  },
  tests: {
    name: "bài thi",
    fields: [
      ["title", "Tên bài thi", "text"],
      ["type", "Kỹ năng", "select", ["Reading", "Listening", "Vocabulary", "Grammar"]],
      ["level", "Trình độ", "select", ["Sơ cấp", "Trung cấp", "Cao cấp"]],
      ["questions", "Số câu", "number"],
      ["duration", "Thời gian", "text"],
      ["status", "Trạng thái", "select", ["Đang hoạt động", "Bản nháp"]]
    ]
  }
};

function fmt(num) {
  return Number(num).toLocaleString("vi-VN");
}

function norm(text) {
  return String(text || "").toLowerCase().trim();
}

function filterValue(id) {
  return filters[id] || "";
}

function setFilter(id, value) {
  filters[id] = value;
}

function clearFilterGroup(group) {
  const groups = {
    users: ["userSearch", "userRole", "userLevel", "userStatus"],
    dictionary: ["dictSearch", "dictLevel", "dictStatus"],
    lessons: ["lessonSearch", "lessonType"],
    tests: ["testSearch", "testLevel", "testStatus"]
  };
  (groups[group] || []).forEach(id => delete filters[id]);
}

function match(item, keyword, fields) {
  if (!keyword) return true;
  return fields.some(field => norm(item[field]).includes(keyword));
}

function badge(text) {
  const cls = {
    "Hoạt động": "green",
    "Đã xuất bản": "green",
    "Đã duyệt": "green",
    "Đang hoạt động": "green",
    "Bản nháp": "gray",
    "Bị khóa": "red",
    "Cần xử lý": "orange",
    "Chưa xử lý": "red",
    "Đã xử lý": "green",
    "Sai nghĩa": "red",
    "Sai ví dụ": "red",
    "Lỗi âm thanh": "blue",
    "Spam": "red",
    "Vi phạm": "orange",
    "Sơ cấp": "gray",
    "Trung cấp": "gray",
    "Cao cấp": "gray",
    "Trình độ": "green",
    "Chủ đề": "blue",
    "Học viên": "blue",
    "Admin": "blue"
  }[text] || "blue";
  return `<span class="badge ${cls}">${text}</span>`;
}

function initials(name) {
  return name.split(" ").map(word => word[0]).slice(-2).join("").toUpperCase();
}

function stat(label, value, note, icon = "📊", color = "") {
  return `
    <article class="stat">
      <div class="stat-top">
        <label>${label}</label>
        <span class="sticon ${color}">${icon}</span>
      </div>
      <h2>${value}</h2>
      <small>${note}</small>
    </article>
  `;
}

function head(key, actions = "") {
  return `
    <div class="page-head">
      <div>
        <h1>${titles[key][0]}</h1>
        <p>${titles[key][1]}</p>
      </div>
      <div class="head-actions">${actions}</div>
    </div>
  `;
}

function pagination(total) {
  return `
    <div class="pagination">
      <span>Hiển thị 1-${Math.min(10, total)} của ${fmt(total)} dữ liệu</span>
      <div class="pages">
        <button>‹</button>
        <button class="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>...</button>
        <button>›</button>
      </div>
    </div>
  `;
}

function actions(type, id, status = "") {
  return `
    <div class="actions">
      <button class="icon" title="Xem" data-action="detail" data-type="${type}" data-id="${id}">👁</button>
      <button class="icon" title="Sửa" data-action="edit" data-type="${type}" data-id="${id}">✎</button>
      <button class="icon" title="Đổi trạng thái" data-action="toggle" data-type="${type}" data-id="${id}">⛔</button>
      <button class="icon danger" title="Xóa" data-action="delete" data-type="${type}" data-id="${id}">🗑</button>
    </div>
  `;
}

function optionHTML(values, selected, placeholder) {
  return values.map(value => {
    if (value === "") return `<option value="" ${selected === "" ? "selected" : ""}>${placeholder}</option>`;
    return `<option value="${value}" ${selected === value ? "selected" : ""}>${value}</option>`;
  }).join("");
}

function bindFilters(renderFn) {
  $$("[data-filter-id]").forEach(input => {
    input.addEventListener("input", () => {
      setFilter(input.dataset.filterId, input.value);
      renderFn();
    });
    input.addEventListener("change", () => {
      setFilter(input.dataset.filterId, input.value);
      renderFn();
    });
  });
}

function renderDashboard() {
  $("#app").innerHTML = `
    <div class="page">
      ${head("dashboard", `<select><option>30 Ngày Qua</option><option>7 Ngày Qua</option></select>`)}
      <div class="stats four">
        ${stat("Tổng doanh thu", "₫ 1.2B", "+12.5% so với tháng trước", "💰", "blue")}
        ${stat("Người dùng mới", "4,892", "+8.2% so với tháng trước", "👥", "blue")}
        ${stat("Tỷ lệ hoàn thành", "68.4%", "Tiến độ chung", "📈", "green")}
        ${stat("Khóa học hoạt động", "1,245", "+12 khóa học mới", "📚", "orange")}
      </div>

      <div class="dash">
        <section class="panel pad">
          <div class="section-title">
            <div>
              <h2>Lượng truy cập nền tảng</h2>
              <p>Dữ liệu theo tháng 2024</p>
            </div>
            <button class="icon">⋮</button>
          </div>
          <div class="bar-chart">
            ${["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12"].map((month, index) => {
              const values = [42, 58, 50, 66, 55, 73, 84, 78, 74, 88, 94, 100];
              return `<span style="height:${values[index]}%"><b>${month}</b></span>`;
            }).join("")}
          </div>
        </section>

        <aside class="panel pad">
          <div class="section-title">
            <h2>Điểm thi trung bình theo cấp độ</h2>
          </div>
          <ol class="rank">
            <li><span>Sơ cấp</span><b>75 pts</b></li>
            <li><span>Trung cấp</span><b>75 pts</b></li>
            <li><span>Cao cấp</span><b>75 pts</b></li>
          </ol>
        </aside>
      </div>

      <section class="panel pad" style="margin-top:18px">
        <div class="section-title">
          <h2>Hoạt động gần đây</h2>
          <button class="btn soft">Xem tất cả →</button>
        </div>
        <div class="activity">
          <div class="act">
            <span class="circle">👥</span>
            <p><b>Người dùng mới đăng ký:</b> Nguyễn Văn A vừa gia nhập nền tảng.<small>2 phút trước</small></p>
          </div>
          <div class="act">
            <span class="circle">✅</span>
            <p><b>Bài học mới được phê duyệt:</b> “Cấu trúc Ngữ pháp N5 Cơ bản” đã được xuất bản.<small>1 giờ trước</small></p>
          </div>
          <div class="act">
            <span class="circle">⚠</span>
            <p><b>Báo cáo lỗi mới:</b> Lỗi hiển thị video bài giảng #402. Cần xử lý gấp.<small>3 giờ trước</small></p>
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderUsers() {
  const keyword = norm(filterValue("userSearch"));
  const role = filterValue("userRole");
  const level = filterValue("userLevel");
  const status = filterValue("userStatus");

  const rows = data.users.filter(user =>
    match(user, keyword, ["name", "email"]) &&
    (!role || user.role === role) &&
    (!level || user.level === level) &&
    (!status || user.status === status)
  );

  $("#app").innerHTML = `
    <div class="page">
      ${head("users", `<button class="btn primary" data-add="users">+ Thêm người dùng</button>`)}
      <div class="stats">
        ${stat("Tổng số user", "12,450", "+5.2% so với tháng trước", "👥", "blue")}
        ${stat("User hoạt động", "8,920", "Trong 30 ngày qua", "👤", "green")}
        ${stat("User mới trong ngày", "145", "+12 từ hôm qua", "👤", "orange")}
      </div>

      <section class="panel">
        <div class="filter">
          <input data-filter-id="userSearch" placeholder="Tìm kiếm tên hoặc email..." value="${filterValue("userSearch")}">
          <select data-filter-id="userRole">${optionHTML(["", "Học viên", "Admin"], role, "Tất cả vai trò")}</select>
          <select data-filter-id="userLevel">${optionHTML(["", "A1", "A2", "B1", "B2"], level, "Tất cả cấp độ")}</select>
          <select data-filter-id="userStatus">${optionHTML(["", "Hoạt động", "Bị khóa"], status, "Tất cả trạng thái")}</select>
          <button class="btn soft" data-reset-filter="users">Xóa lọc</button>
        </div>
        <p class="result-count">Hiển thị ${rows.length}/${data.users.length} người dùng</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th class="check-cell"><input type="checkbox"></th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Ngày tham gia</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map(user => `
                <tr>
                  <td class="check-cell"><input type="checkbox"></td>
                  <td class="cell-name"><span class="mini-avatar">${initials(user.name)}</span><b>${user.name}</b></td>
                  <td>${user.email}</td>
                  <td>${badge(user.role)}</td>
                  <td>${user.joined}</td>
                  <td>${badge(user.status)}</td>
                  <td>${actions("users", user.id, user.status)}</td>
                </tr>
              `).join("") || `<tr><td colspan="7" class="empty">Không có dữ liệu phù hợp.</td></tr>`}
            </tbody>
          </table>
        </div>
        ${pagination(rows.length)}
      </section>
    </div>
  `;

  bindFilters(renderUsers);
}

function renderDictionary() {
  const keyword = norm(filterValue("dictSearch"));
  const level = filterValue("dictLevel");
  const status = filterValue("dictStatus");

  const rows = data.dictionary.filter(word =>
    match(word, keyword, ["word", "phonetic", "meaning"]) &&
    (!level || word.level === level) &&
    (!status || word.status === status)
  );

  $("#app").innerHTML = `
    <div class="page">
      ${head("dictionary", `
        <button class="btn soft" id="openExcelFromDictionary">Import Excel</button>
        <button class="btn primary" data-page="addWord">+ Thêm từ mới</button>
      `)}
      <div class="stats">
        ${stat("Tổng số từ", "15,420", "+12%", "📚", "blue")}
        ${stat("Từ mới trong tháng", "342", "+84", "🧾", "green")}
        ${stat("Báo cáo lỗi chưa xử lý", "12", "Cần xử lý", "⚠", "orange")}
      </div>

      <section class="panel">
        <div class="filter three">
          <input data-filter-id="dictSearch" placeholder="Tìm kiếm từ vựng, phiên âm..." value="${filterValue("dictSearch")}">
          <select data-filter-id="dictLevel">${optionHTML(["", "Sơ cấp", "Trung cấp", "Cao cấp"], level, "Cấp độ: Tất cả")}</select>
          <select data-filter-id="dictStatus">${optionHTML(["", "Đã duyệt", "Cần xử lý"], status, "Trạng thái: Tất cả")}</select>
          <button class="btn soft" data-reset-filter="dictionary">Xóa lọc</button>
        </div>
        <p class="result-count">Hiển thị ${rows.length}/${data.dictionary.length} từ vựng</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Từ vựng</th>
                <th>Phiên âm</th>
                <th>Nghĩa tiếng Việt</th>
                <th>Cấp độ</th>
                <th>Trạng thái</th>
                <th>Chủ đề</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map(word => `
                <tr>
                  <td><b>${word.word}</b><br><small>${word.type}</small></td>
                  <td>${word.phonetic}</td>
                  <td>${word.meaning}</td>
                  <td>${badge(word.level)}</td>
                  <td>${badge(word.status)}</td>
                  <td>${word.topic}</td>
                  <td>${actions("dictionary", word.id, word.status)}</td>
                </tr>
              `).join("") || `<tr><td colspan="7" class="empty">Không có dữ liệu phù hợp.</td></tr>`}
            </tbody>
          </table>
        </div>
        ${pagination(rows.length)}
      </section>
    </div>
  `;

  bindFilters(renderDictionary);
  $("#openExcelFromDictionary").addEventListener("click", openExcel);
}

function renderLessons() {
  const keyword = norm(filterValue("lessonSearch"));
  const type = filterValue("lessonType");

  const rows = data.lessons.filter(lesson =>
    match(lesson, keyword, ["title", "topic"]) &&
    (!type || lesson.level === type)
  );

  $("#app").innerHTML = `
    <div class="page">
      ${head("lessons", `<button class="btn primary" data-page="addLesson">+ Thêm bài học</button>`)}
      <div class="stats">
        ${stat("Tổng số khóa học", "48", "+12%", "📖", "blue")}
        ${stat("Tổng số bài học", "1,240", "", "📚", "orange")}
        ${stat("Bài học mới trong tháng", "36", "", "✅", "green")}
      </div>

      <section class="panel">
        <div class="filter three">
          <input data-filter-id="lessonSearch" placeholder="Tìm kiếm bài học, từ khóa..." value="${filterValue("lessonSearch")}">
          <select data-filter-id="lessonType">${optionHTML(["", "Trình độ", "Chủ đề"], type, "Lọc theo: Tất cả cấp độ")}</select>
          <select>
            <option>Sắp xếp</option>
          </select>
          <button class="btn soft" data-reset-filter="lessons">Xóa lọc</button>
        </div>
        <p class="result-count">Hiển thị ${rows.length}/${data.lessons.length} bài học</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Tên bài học/khóa học</th>
                <th>Trình độ/Chủ đề</th>
                <th>Số từ vựng</th>
                <th>Học viên</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map((lesson, index) => `
                <tr>
                  <td class="cell-name">
                    <span class="lesson-icon ${index === 1 ? "orange" : index === 3 ? "green" : ""}">${lesson.title.slice(0,2)}</span>
                    <b>${lesson.title}</b>
                  </td>
                  <td>${badge(lesson.level)}</td>
                  <td>${lesson.words}</td>
                  <td>${lesson.students}</td>
                  <td>${badge(lesson.status)}</td>
                  <td>${actions("lessons", lesson.id, lesson.status)}</td>
                </tr>
              `).join("") || `<tr><td colspan="6" class="empty">Không có dữ liệu phù hợp.</td></tr>`}
            </tbody>
          </table>
        </div>
        ${pagination(rows.length)}
      </section>
    </div>
  `;

  bindFilters(renderLessons);
}

function renderAddWord() {
  $("#app").innerHTML = `
    <div class="page">
      ${head("addWord", `
        <button class="btn soft" data-page="dictionary">Hủy</button>
        <button class="btn outline" id="openExcelFromAddWord">Import Excel</button>
        <button class="btn primary" id="saveWordBtn">Lưu từ mới</button>
      `)}
      <div class="form-layout">
        <div class="form-main">
          <section class="form-card">
            <h2>🔤 Thông tin từ vựng</h2>
            <div class="form-grid">
              <div>
                <label>Từ vựng (Word) *</label>
                <input id="newWord" placeholder="Ví dụ: Serendipity">
              </div>
              <div>
                <label>Phiên âm (Pronunciation)</label>
                <input id="newPhonetic" placeholder="/ˌserənˈdɪpəti/">
              </div>
              <div class="full-row">
                <label>Nghĩa của từ (Meaning) *</label>
                <textarea id="newMeaning" placeholder="Sự tình cờ tìm thấy điều may mắn hoặc kết quả ngoài dự kiến..."></textarea>
              </div>
            </div>
          </section>

          <section class="form-card">
            <h2>📌 Chủ đề (Topic)</h2>
            <div class="form-grid">
              <div>
                <label>Chọn chủ đề</label>
                <select id="newTopic">
                  <option>Học tập</option>
                  <option>Du lịch</option>
                  <option>Công việc</option>
                  <option>Giao tiếp</option>
                </select>
              </div>
              <div>
                <label>Cấp độ</label>
                <select id="newLevel">
                  <option>Sơ cấp</option>
                  <option>Trung cấp</option>
                  <option>Cao cấp</option>
                </select>
              </div>
            </div>
          </section>

          <section class="form-card">
            <h2>📝 Ví dụ & Ghi chú</h2>
            <label>Ví dụ sử dụng</label>
            <input placeholder="Ví dụ: Nature is full of serendipity.">
            <label>Ghi chú bổ sung</label>
            <textarea placeholder="Ghi chú ngữ pháp, từ loại hoặc văn cảnh sử dụng..."></textarea>
          </section>
        </div>

        <aside>
          <section class="upload-card">
            <h3>🖼 Hình ảnh minh họa</h3>
            <div class="upload-drop">
              <strong>Nhấn để tải lên</strong>
              <p>PNG, JPG, tối đa 5MB</p>
            </div>
          </section>

          <section class="upload-card">
            <h3>📥 Import Excel</h3>
            <p>Thêm nhiều từ cùng lúc bằng file Excel.</p>
            <button class="btn primary full" id="openExcelSide">Import Excel</button>
          </section>

          <section class="upload-card">
            <h3>👁 Cài đặt hiển thị</h3>
            <label>Trạng thái</label>
            <select>
              <option>Hiển thị công khai</option>
              <option>Bản nháp</option>
            </select>
            <label>Độ khó</label>
            <div class="level-toggle">
              <button>A1</button>
              <button class="active">A2</button>
              <button>B1</button>
              <button>B2</button>
              <button>C1</button>
              <button>C2</button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  `;

  $("#saveWordBtn").addEventListener("click", saveWord);
  $("#openExcelFromAddWord").addEventListener("click", openExcel);
  $("#openExcelSide").addEventListener("click", openExcel);
}

function renderAddLesson() {
  $("#app").innerHTML = `
    <div class="page">
      ${head("addLesson", `
        <button class="btn outline">Lưu bản nháp</button>
        <button class="btn primary" id="saveLessonBtn">Xuất bản</button>
      `)}
      <div class="form-layout">
        <div class="form-main">
          <section class="form-card">
            <h2>Thông tin cơ bản</h2>
            <label>Tên bài học *</label>
            <input id="lessonTitle" placeholder="Nhập tên bài học...">
            <label>Mô tả ngắn</label>
            <textarea id="lessonDesc" placeholder="Tóm tắt nội dung bài học..."></textarea>
            <div class="form-grid">
              <div>
                <label>Thuộc khóa học / Chương *</label>
                <select id="lessonTopic">
                  <option>Từ vựng cơ bản</option>
                  <option>Du lịch</option>
                  <option>Ngữ pháp</option>
                  <option>Chuyên ngành</option>
                </select>
              </div>
              <div>
                <label>Cấp độ</label>
                <select id="lessonLevel">
                  <option>Sơ cấp - A1</option>
                  <option>Sơ cấp - A2</option>
                  <option>Trung cấp - B1</option>
                  <option>Cao cấp - B2</option>
                </select>
              </div>
            </div>
          </section>

          <section class="form-card">
            <h2>Nội dung bài học</h2>
            <div class="editor">
              <div class="editor-toolbar">
                <button>B</button>
                <button>I</button>
                <button>U</button>
                <button>≡</button>
                <button>🔗</button>
                <button>🖼</button>
              </div>
              <textarea id="lessonContent" placeholder="Soạn thảo nội dung bài học tại đây..."></textarea>
            </div>
          </section>
        </div>

        <aside>
          <section class="upload-card">
            <h3>Ảnh minh họa</h3>
            <div class="upload-drop">
              <strong>Nhấn để tải lên</strong>
              <p>hoặc kéo thả vào đây. PNG, JPG, tối đa 5MB</p>
            </div>
          </section>

          <section class="upload-card">
            <div class="section-title">
              <h3>Từ vựng đính kèm</h3>
              <button class="icon">＋</button>
            </div>
            <div class="upload-drop">
              <p>Chưa có từ vựng nào.</p>
              <button class="btn soft" data-page="addWord">Thêm từ mới</button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  `;

  $("#saveLessonBtn").addEventListener("click", saveLesson);
}

function renderTests() {
  const keyword = norm(filterValue("testSearch"));
  const level = filterValue("testLevel");
  const status = filterValue("testStatus");

  const rows = data.tests.filter(test =>
    match(test, keyword, ["title", "type"]) &&
    (!level || test.level === level) &&
    (!status || test.status === status)
  );

  $("#app").innerHTML = `
    <div class="page">
      ${head("tests", `
        <button class="btn soft">Import đề</button>
        <button class="btn primary" data-add="tests">+ Thêm bài thi</button>
      `)}
      <div class="stats">
        ${stat("Tổng số bài thi", "1,248", "+12% so với tháng trước", "📄", "blue")}
        ${stat("Thí sinh hôm nay", "4,821", "+8% so với hôm qua", "👥", "green")}
        ${stat("Điểm trung bình", "7.4/10", "Ổn định", "📈", "blue")}
      </div>

      <div class="dash">
        <section class="panel">
          <div class="filter three">
            <input data-filter-id="testSearch" placeholder="Tìm kiếm bài thi..." value="${filterValue("testSearch")}">
            <select data-filter-id="testLevel">${optionHTML(["", "Sơ cấp", "Trung cấp", "Cao cấp"], level, "Trình độ")}</select>
            <select data-filter-id="testStatus">${optionHTML(["", "Đang hoạt động", "Bản nháp"], status, "Trạng thái")}</select>
            <button class="btn soft" data-reset-filter="tests">Xóa lọc</button>
          </div>
          <p class="result-count">Hiển thị ${rows.length}/${data.tests.length} bài thi</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Tên bài thi</th>
                  <th>Kỹ năng</th>
                  <th>Trình độ</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                ${rows.map(test => `
                  <tr>
                    <td class="cell-name"><span class="lesson-icon">📘</span><b>${test.title}</b></td>
                    <td>${test.type}<br><small>${test.duration}</small></td>
                    <td>${badge(test.level)}</td>
                    <td>${badge(test.status)}</td>
                    <td>${actions("tests", test.id, test.status)}</td>
                  </tr>
                `).join("") || `<tr><td colspan="5" class="empty">Không có dữ liệu phù hợp.</td></tr>`}
              </tbody>
            </table>
          </div>
          ${pagination(rows.length)}
        </section>

        <aside class="panel pad">
          <div class="section-title">
            <h3>Vinh danh tuần</h3>
            <div class="actions">
              <button class="icon">⬇</button>
              <button class="icon">⟳</button>
            </div>
          </div>
          <div class="weekly">
            <div class="weekly-item"><span class="circle">1</span><div><strong>Viết Dũng</strong><small>200/200 điểm</small></div></div>
            <div class="weekly-item"><span class="circle">2</span><div><strong>Hải Dương</strong><small>200/200 điểm</small></div></div>
            <div class="weekly-item"><span class="circle">3</span><div><strong>Thanh Bình</strong><small>200/200 điểm</small></div></div>
            <div class="weekly-item"><span class="circle">4</span><div><strong>Thế Anh</strong><small>200/200 điểm</small></div></div>
          </div>
          <button class="btn soft full" style="margin-top:18px">Xem tất cả bảng xếp hạng</button>
        </aside>
      </div>
    </div>
  `;

  bindFilters(renderTests);
}

function renderReports() {
  $("#app").innerHTML = `
    <div class="page">
      ${head("reports", `<button class="btn primary">Xuất báo cáo</button>`)}
      <div class="stats">
        ${stat("Tổng báo cáo chờ duyệt", "124", "", "⚠", "orange")}
        ${stat("Tỉ lệ sai nghĩa phát hiện nhất", "45%", "", "🔎", "blue")}
        ${stat("Đã xử lý hôm nay", "38", "", "✅", "green")}
      </div>

      <div class="report-list">
        ${reportTable("wordReports", "Người báo cáo", "Từ vựng liên quan", "Nội dung báo cáo")}
        ${reportTable("communityReports", "Người báo cáo", "Vấn đề báo cáo", "Nội dung báo cáo")}
      </div>
    </div>
  `;
}

function reportTable(type, c1, c2, c3) {
  return `
    <section class="panel">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>${c1}</th>
              <th>${c2}</th>
              <th>${c3}</th>
              <th>Trạng thái</th>
              <th>Ngày gửi</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            ${data[type].map(report => `
              <tr>
                <td class="cell-name"><span class="mini-avatar">N</span><b>${report.reporter}</b></td>
                <td><b style="color:#0059C9">${report.word || report.target}</b></td>
                <td>${badge(report.content)}</td>
                <td>${badge(report.status)}</td>
                <td>${report.date}</td>
                <td>
                  <div class="actions">
                    <button class="icon" data-report-action="detail" data-report-type="${type}" data-id="${report.id}">👁</button>
                    <button class="icon" data-report-action="approve" data-report-type="${type}" data-id="${report.id}">✓</button>
                    <button class="icon danger" data-report-action="delete" data-report-type="${type}" data-id="${report.id}">🗑</button>
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
      ${pagination(data[type].length)}
    </section>
  `;
}

function renderSettings() {
  $("#app").innerHTML = `
    <div class="page">
      ${head("settings", `<button class="btn primary" id="saveSettings">💾 Lưu thay đổi</button>`)}
      <section class="panel pad">
        <section class="form-card">
          <h2>Cài đặt chung</h2>
          <div class="form-grid">
            <div>
              <label>Tên ứng dụng</label>
              <input value="LingoVerse">
            </div>
            <div>
              <label>Email liên hệ</label>
              <input value="support@lingoverse.com">
            </div>
            <div class="full-row">
              <label>Logo hệ thống</label>
              <div class="upload-drop" style="max-width:220px">
                <strong>Tải lên logo mới</strong>
                <p>PNG, SVG, tối đa 2MB</p>
              </div>
            </div>
            <div>
              <label>Ngôn ngữ mặc định</label>
              <select>
                <option>Tiếng Việt</option>
                <option>English</option>
              </select>
            </div>
          </div>
        </section>
      </section>
    </div>
  `;

  $("#saveSettings").addEventListener("click", () => toast("Đã lưu cài đặt demo."));
}

function saveWord() {
  const word = $("#newWord").value.trim();
  const meaning = $("#newMeaning").value.trim();

  if (!word || !meaning) {
    toast("Vui lòng nhập từ vựng và nghĩa.");
    return;
  }

  data.dictionary.push({
    id: nextId(data.dictionary),
    word,
    phonetic: $("#newPhonetic").value.trim() || "/.../",
    meaning,
    type: "Noun",
    topic: $("#newTopic").value,
    level: $("#newLevel").value,
    status: "Đã duyệt"
  });

  toast("Đã thêm từ mới vào từ điển.");
  openPage("dictionary");
}

function saveLesson() {
  const title = $("#lessonTitle").value.trim();

  if (!title) {
    toast("Vui lòng nhập tên bài học.");
    return;
  }

  data.lessons.push({
    id: nextId(data.lessons),
    title,
    topic: $("#lessonTopic").value,
    level: "Trình độ",
    words: 0,
    students: 0,
    status: "Đã xuất bản"
  });

  toast("Đã thêm bài học mới.");
  openPage("lessons");
}

function nextId(list) {
  return list.length ? Math.max(...list.map(item => item.id)) + 1 : 1;
}

function showDetail(type, id) {
  const item = data[type].find(row => row.id === Number(id));
  if (!item) return;

  $("#modalTitle").textContent = "Chi tiết " + cfg[type].name;
  $("#modalBody").innerHTML = `
    <div class="detail-grid">
      ${cfg[type].fields.map(([key, label]) => `
        <b>${label}</b>
        <span>${["status", "role", "level"].includes(key) ? badge(item[key]) : item[key]}</span>
      `).join("")}
    </div>
  `;
  $("#modalActions").innerHTML = `
    <button class="btn soft" data-close-modal>Đóng</button>
    <button class="btn primary" data-edit-from-detail="${type}" data-id="${id}">Sửa</button>
  `;
  $("#modal").classList.remove("hidden");
}

function fieldHTML(key, label, type, options = [], value = "") {
  if (type === "select") {
    return `
      <div>
        <label>${label}</label>
        <select name="${key}">
          ${options.map(option => `<option ${option === value ? "selected" : ""}>${option}</option>`).join("")}
        </select>
      </div>
    `;
  }

  if (type === "textarea") {
    return `
      <div class="wide-field">
        <label>${label}</label>
        <textarea name="${key}">${value || ""}</textarea>
      </div>
    `;
  }

  return `
    <div>
      <label>${label}</label>
      <input name="${key}" type="${type}" value="${value || ""}">
    </div>
  `;
}

function showEdit(type, id = null) {
  const isAdd = !id;
  const item = isAdd ? {} : data[type].find(row => row.id === Number(id));

  $("#modalTitle").textContent = (isAdd ? "Thêm " : "Sửa ") + cfg[type].name;
  $("#modalBody").innerHTML = `
    <form id="editForm" class="edit-grid">
      ${cfg[type].fields.map(([key, label, fieldType, options]) =>
        fieldHTML(key, label, fieldType, options, item[key])
      ).join("")}
    </form>
  `;
  $("#modalActions").innerHTML = `
    <button class="btn soft" data-close-modal>Hủy</button>
    <button class="btn primary" data-save-edit="${type}" data-id="${id || ""}">Lưu</button>
  `;
  $("#modal").classList.remove("hidden");
}

function saveEdit(type, id) {
  const form = new FormData($("#editForm"));
  const formData = {};

  cfg[type].fields.forEach(([key, label, fieldType]) => {
    formData[key] = fieldType === "number" ? Number(form.get(key) || 0) : form.get(key);
  });

  if (id) {
    const index = data[type].findIndex(row => row.id === Number(id));
    data[type][index] = { ...data[type][index], ...formData };
    toast("Đã lưu chỉnh sửa.");
  } else {
    data[type].push({ id: nextId(data[type]), ...formData });
    toast("Đã thêm dữ liệu mới.");
  }

  closeModal();
  render();
}

function deleteItem(type, id) {
  confirmBox("Xác nhận xóa", "Bạn có chắc muốn xóa dữ liệu này khỏi demo không?", () => {
    data[type] = data[type].filter(row => row.id !== Number(id));
    toast("Đã xóa dữ liệu.");
    render();
  });
}

function toggleItem(type, id) {
  const item = data[type].find(row => row.id === Number(id));
  if (!item) return;

  if (type === "users") {
    item.status = item.status === "Bị khóa" ? "Hoạt động" : "Bị khóa";
  } else if (type === "dictionary") {
    item.status = item.status === "Cần xử lý" ? "Đã duyệt" : "Cần xử lý";
  } else if (type === "lessons") {
    item.status = item.status === "Bản nháp" ? "Đã xuất bản" : "Bản nháp";
  } else if (type === "tests") {
    item.status = item.status === "Bản nháp" ? "Đang hoạt động" : "Bản nháp";
  }

  toast("Đã cập nhật trạng thái.");
  render();
}

function openExcel() {
  previousPageBeforeExcel = page;
  $("#excelModal").classList.remove("hidden");
  $("#excelPreview").classList.add("hidden");
  $("#fileName").textContent = "Chưa chọn file nào.";
  $("#excelInput").value = "";
}

function closeExcel() {
  $("#excelModal").classList.add("hidden");
  openPage(previousPageBeforeExcel || "dictionary");
}

function previewExcel(fileName = "vocabulary-template.xlsx") {
  const rows = [
    ["Serendipity", "/ˌserənˈdɪpəti/", "Sự tình cờ may mắn", "Cao cấp", "Học tập", "Đã duyệt"],
    ["Fluent", "/ˈfluːənt/", "Trôi chảy", "Trung cấp", "Giao tiếp", "Đã duyệt"],
    ["Journey", "/ˈdʒɜːrni/", "Hành trình", "Sơ cấp", "Du lịch", "Đã duyệt"]
  ];

  $("#fileName").textContent = "Đã chọn: " + fileName;
  $("#previewRows").innerHTML = rows.map(row => `
    <tr>
      <td><b>${row[0]}</b></td>
      <td>${row[1]}</td>
      <td>${row[2]}</td>
      <td>${badge(row[3])}</td>
      <td>${row[4]}</td>
      <td>${badge(row[5])}</td>
    </tr>
  `).join("");
  $("#excelPreview").classList.remove("hidden");
}

function importRows() {
  const base = nextId(data.dictionary);
  data.dictionary.push(
    { id: base, word: "Serendipity", phonetic: "/ˌserənˈdɪpəti/", meaning: "Sự tình cờ may mắn", type: "Noun", topic: "Học tập", level: "Cao cấp", status: "Đã duyệt" },
    { id: base + 1, word: "Fluent", phonetic: "/ˈfluːənt/", meaning: "Trôi chảy", type: "Adjective", topic: "Giao tiếp", level: "Trung cấp", status: "Đã duyệt" },
    { id: base + 2, word: "Journey", phonetic: "/ˈdʒɜːrni/", meaning: "Hành trình", type: "Noun", topic: "Du lịch", level: "Sơ cấp", status: "Đã duyệt" }
  );

  $("#excelModal").classList.add("hidden");
  toast("Đã import 3 từ vựng từ Excel.");
  openPage("dictionary");
}

function downloadTemplate() {
  const csv = "TuVung,PhienAm,NghiaTiengViet,TuLoai,ChuDe,CapDo,TrangThai\nSerendipity,/serendipity/,Sự tình cờ may mắn,Noun,Học tập,Cao cấp,Đã duyệt\n";
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "mau_import_tu_vung_lingoverse.csv";
  link.click();
  URL.revokeObjectURL(url);
  toast("Đã tải file mẫu CSV.");
}

function reportAction(action, type, id) {
  const item = data[type].find(row => row.id === Number(id));
  if (!item) return;

  if (action === "approve") {
    item.status = "Đã xử lý";
    toast("Đã xử lý báo cáo.");
    renderReports();
  }

  if (action === "delete") {
    confirmBox("Xóa báo cáo", "Bạn có chắc muốn xóa báo cáo này?", () => {
      data[type] = data[type].filter(row => row.id !== Number(id));
      toast("Đã xóa báo cáo.");
      renderReports();
    });
  }

  if (action === "detail") {
    $("#modalTitle").textContent = "Chi tiết báo cáo";
    $("#modalBody").innerHTML = `
      <div class="detail-grid">
        <b>Người báo cáo</b><span>${item.reporter}</span>
        <b>Nội dung liên quan</b><span>${item.word || item.target}</span>
        <b>Loại báo cáo</b><span>${badge(item.content)}</span>
        <b>Trạng thái</b><span>${badge(item.status)}</span>
        <b>Ngày gửi</b><span>${item.date}</span>
      </div>
    `;
    $("#modalActions").innerHTML = `<button class="btn soft" data-close-modal>Đóng</button>`;
    $("#modal").classList.remove("hidden");
  }
}

function confirmBox(title, text, callback) {
  $("#confirmTitle").textContent = title;
  $("#confirmText").textContent = text;
  confirmCallback = callback;
  $("#confirmModal").classList.remove("hidden");
}

function closeModal() {
  $("#modal").classList.add("hidden");
}

function toast(message) {
  $("#toast").textContent = message;
  $("#toast").classList.remove("hidden");
  setTimeout(() => $("#toast").classList.add("hidden"), 1800);
}

function openPage(nextPage) {
  page = nextPage;
  $$(".nav").forEach(button => button.classList.toggle("active", button.dataset.page === page));
  render();
}

function render() {
  if (page === "dashboard") renderDashboard();
  if (page === "users") renderUsers();
  if (page === "lessons") renderLessons();
  if (page === "dictionary") renderDictionary();
  if (page === "tests") renderTests();
  if (page === "reports") renderReports();
  if (page === "settings") renderSettings();
  if (page === "addWord") renderAddWord();
  if (page === "addLesson") renderAddLesson();
}

function bindEvents() {
  document.body.addEventListener("click", event => {
    const pageButton = event.target.closest("[data-page]");
    if (pageButton) {
      openPage(pageButton.dataset.page);
      return;
    }

    const addButton = event.target.closest("[data-add]");
    if (addButton) {
      showEdit(addButton.dataset.add);
      return;
    }

    const actionButton = event.target.closest("[data-action]");
    if (actionButton) {
      const { action, type, id } = actionButton.dataset;
      if (action === "detail") showDetail(type, id);
      if (action === "edit") showEdit(type, id);
      if (action === "delete") deleteItem(type, id);
      if (action === "toggle") toggleItem(type, id);
      return;
    }

    const closeButton = event.target.closest("[data-close-modal]");
    if (closeButton) {
      closeModal();
      return;
    }

    const editFromDetail = event.target.closest("[data-edit-from-detail]");
    if (editFromDetail) {
      showEdit(editFromDetail.dataset.editFromDetail, editFromDetail.dataset.id);
      return;
    }

    const saveButton = event.target.closest("[data-save-edit]");
    if (saveButton) {
      saveEdit(saveButton.dataset.saveEdit, saveButton.dataset.id);
      return;
    }

    const resetFilter = event.target.closest("[data-reset-filter]");
    if (resetFilter) {
      clearFilterGroup(resetFilter.dataset.resetFilter);
      toast("Đã xóa bộ lọc.");
      render();
      return;
    }

    const reportButton = event.target.closest("[data-report-action]");
    if (reportButton) {
      reportAction(reportButton.dataset.reportAction, reportButton.dataset.reportType, reportButton.dataset.id);
      return;
    }
  });

  $("#closeModalBtn").addEventListener("click", closeModal);

  $("#cancelConfirm").addEventListener("click", () => {
    $("#confirmModal").classList.add("hidden");
  });

  $("#okConfirm").addEventListener("click", () => {
    $("#confirmModal").classList.add("hidden");
    if (confirmCallback) confirmCallback();
    confirmCallback = null;
  });

  $("#closeExcelBtn").addEventListener("click", closeExcel);
  $("#cancelExcelBtn").addEventListener("click", closeExcel);
  $("#chooseExcelBtn").addEventListener("click", () => $("#excelInput").click());
  $("#excelInput").addEventListener("change", event => {
    const file = event.target.files[0];
    previewExcel(file ? file.name : "vocabulary-template.xlsx");
  });
  $("#importExcelBtn").addEventListener("click", importRows);
  $("#downloadTemplateBtn").addEventListener("click", downloadTemplate);

  $("#excelModal").addEventListener("click", event => {
    if (event.target.id === "excelModal") closeExcel();
  });

  $$(".modal").forEach(modal => {
    modal.addEventListener("click", event => {
      if (event.target === modal && modal.id !== "excelModal") {
        modal.classList.add("hidden");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  renderDashboard();
});
