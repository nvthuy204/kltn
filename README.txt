LINGOVERSE COMPLETE DEMO

Bộ source gồm cả trạng thái chưa đăng nhập và đã đăng nhập.

Cách chạy:
1. Giải nén file ZIP.
2. Mở index.html hoặc chạy bằng Live Server trong VS Code.
3. Đăng nhập bằng bất kỳ email hợp lệ và mật khẩu từ 6 ký tự.
4. Sau khi đăng nhập, bấm vào avatar trên header để mở hồ sơ.

Các trang sau đăng nhập:
- profile.html: Hồ sơ
- profile-edit.html: Chỉnh sửa hồ sơ
- test-do.html: Làm bài thi
- test-result.html: Kết quả thi
- flashcard.html: Luyện Flashcard
- notebook.html: Danh sách sổ tay
- notebook-detail.html: Chi tiết sổ tay
- notebook-empty.html: Sổ tay trống
- privacy.html: Chính sách
- contact.html: Liên hệ

Các chức năng demo:
- Chuyển trạng thái đăng nhập bằng localStorage
- Làm bài 10 câu, đếm giờ và chấm điểm
- Lật và chuyển Flashcard
- Sửa hồ sơ
- Tìm/xóa từ trong sổ tay
- Hiện thông báo yêu cầu đăng nhập đối với chức năng bị khóa


CẬP NHẬT TRANG CHỦ THEO ẢNH FIGMA:
- Bố cục ba cột: từ khóa/lịch sử/chủ đề, nội dung chính, chuỗi và xếp hạng.
- Ba poster SVG tự động chuyển qua lại theo thứ tự 1 → 2 → 3 → 2 → 1.
- Có nút mũi tên, chấm điều hướng và tạm dừng khi rê chuột vào poster.
- Từ khóa hot và lịch sử mở trang chi tiết từ vựng.
- Chủ đề và cấp độ mở trang chi tiết bài học.
- Mẹo học và bảng xếp hạng có thể chuyển nội dung.


CẬP NHẬT THEO DESIGN SYSTEM:
- Primary: #4A90E2
- Blue 500: #4382F6
- Blue 100: #D6E4FE
- Secondary: #FD761A
- Success: #22C55E
- Neutral: #FFFFFF, #F3F4F6, #E5E7EB, #4B5563, #1F2937, #111827
- Font: Inter/Segoe UI với thang 12, 14, 16, 20, 24, 28, 32, 40, 48 px

CÁC TRANG ĐÃ SỬA:
- dictionary.html và word.html: chi tiết tra cứu từ theo mẫu
- examples.html: danh sách ví dụ
- collocations.html: danh sách kết hợp từ
- lesson-detail.html: danh sách động từ bất quy tắc và phân trang


CẬP NHẬT LOGO, SỔ TAY, DỊCH VÀ CỘNG ĐỒNG:
- Logo trên toàn bộ trang sử dụng assets/lingoverse-logo.png, được tách trực tiếp từ ảnh người dùng cung cấp.
- notebook.html có đủ 3 trạng thái: trống, mở biểu mẫu tạo sổ tay, và hiển thị thẻ sổ tay sau khi thêm.
- translate.html có tab Văn bản/Tài liệu, hai khung dịch, đổi ngôn ngữ, đếm 800 ký tự và lịch sử dịch.
- community.html có bố cục 3 cột, bảng xếp hạng, bộ lọc bài viết, tạo bài viết và popup chi tiết/bình luận.


CẬP NHẬT HỒ SƠ VÀ KẾT QUẢ THI:
- Giữ nguyên translate.html và kiểu thanh header hiện tại.
- Avatar trên header mở dropdown Hồ sơ cá nhân / Đăng xuất.
- profile.html được dựng lại theo mẫu hồ sơ người học.
- profile-edit.html được dựng lại theo mẫu sửa hồ sơ.
- test-result.html được dựng lại theo mẫu kết quả tổng quan.
- Lịch sử dịch được lưu trong localStorage.
- Khi có lịch sử dịch, trạng thái “Bạn chưa có lịch sử dịch” sẽ tự động bị ẩn, kể cả sau khi tải lại trang.


CẬP NHẬT HEADER, TÌM KIẾM VÀ SỔ TAY:
- Header đồng bộ trên toàn bộ các trang theo mẫu mới.
- Menu đang chọn có chữ xanh và gạch chân xanh.
- Header hiển thị nút Đăng nhập/Đăng ký khi chưa đăng nhập và avatar khi đã đăng nhập.
- Khi đăng xuất, hệ thống chuyển về index.html ở trạng thái chưa đăng nhập.
- Các ô tra cứu từ vựng có dropdown gợi ý; hỗ trợ chuột và phím mũi tên.
- Trang sổ tay dùng CSS Grid tự động căn theo độ rộng màn hình.
- Danh sách sổ tay có tìm kiếm, sắp xếp, đổi tên, xóa và thống kê.
- Trang chi tiết sổ tay có danh sách thư mục, tìm/sắp xếp từ, thêm, xóa và phát âm từ.


CẬP NHẬT GIAO DIỆN THI VÀ POPUP:
- test-do.html được dựng lại theo mẫu: thanh đề thi, bộ đếm 40 phút, danh sách 10 câu, trạng thái câu và khu vực đáp án.
- Footer được đồng bộ trên toàn bộ trang nội dung.
- Header được căn lại đồng đều: logo trái, menu giữa và tài khoản bên phải.
- Khi chưa đăng nhập, người dùng không thể mở hoặc xem dữ liệu sổ tay cá nhân.
- Thêm popup nhập báo cáo và popup báo cáo thành công.
- Toàn bộ toast cũ được tự động chuyển thành popup ở giữa màn hình.
- Nộp bài thi sử dụng popup xác nhận thay cho hộp thoại trình duyệt.


BẢN SỬA FINAL3:
- Xóa toàn bộ window.prompt, window.confirm và window.alert.
- Đổi tên/xóa sổ tay, xóa từ và xác nhận nộp bài đều dùng popup HTML.
- Xóa phần tử toast khỏi toàn bộ HTML; mọi notify gọi trực tiếp popup.
- Header giảm còn 62px CSS, logo 145px và container tối đa 1240px để khớp mẫu ở browser scaling 125%.
- Thêm cache-busting cho styles.css và app.js.
- notebook.html, notebook-empty.html và notebook-detail.html kiểm tra đăng nhập ngay trong head.
- Người chưa đăng nhập được chuyển tới trang đăng nhập và không nhìn thấy dữ liệu sổ tay.


BẢN SỬA TRANG DỊCH VÀ SỔ TAY KHÁCH:
- Khung dịch dùng CSS Grid 3 hàng; textarea và thanh nút không còn position absolute.
- Bộ đếm ký tự và nút Dịch không còn chồng lên nhau.
- Hai khung nguồn/đích có cùng chiều cao và căn thẳng hàng.
- Select ngôn ngữ gốc được ẩn, dùng caret cố định để không còn ký tự gạch ngang.
- Người chưa đăng nhập vẫn mở được notebook.html.
- Trong Sổ tay khi chưa đăng nhập chỉ hiện ô trắng ở giữa với nội dung “Đăng nhập để tạo sổ tay”.
- Không hiển thị danh sách hoặc dữ liệu sổ tay cá nhân khi chưa đăng nhập.


CẬP NHẬT CỘNG ĐỒNG VÀ DỊCH TÀI LIỆU:
- Bài viết cộng đồng chỉ hiển thị tối đa 320 ký tự ở danh sách.
- Nút Xem thêm chỉ xuất hiện khi bài viết dài hơn giới hạn.
- Popup chi tiết hiển thị toàn bộ nội dung bài viết.
- Tab Tài liệu có hai cột: kéo thả tệp và duyệt tệp theo đúng mẫu.
- Hỗ trợ PDF, DOC, DOCX, TXT; tệp TXT được kiểm tra giới hạn 4000 ký tự.
- Thêm nút Xóa lịch sử dịch và popup xác nhận.
- Ngôn ngữ đang lựa chọn được tô màu xanh và có gạch chân.


CẬP NHẬT XEM THÊM VÀ MÀU LỊCH SỬ:
- Nút Xem thêm trên bài viết cộng đồng mở rộng nội dung ngay trong thẻ bài viết.
- Khi đã mở rộng, nút đổi thành Thu gọn.
- Không mở popup chi tiết khi bấm Xem thêm.
- Nút Xóa lịch sử dịch đổi sang màu #FF9B42.


CẬP NHẬT DANH SÁCH TỪ SỔ TAY:
- Danh sách từ trong chi tiết sổ tay chuyển sang dạng hàng ngang giống chi tiết bài học.
- Mỗi hàng gồm ảnh chữ cái, từ vựng, phiên âm, nghĩa, phát âm và xóa từ.
- Bỏ toàn bộ breadcrumb dạng Trang chủ / ... và các đường dẫn phân cấp tương tự khỏi màn hình.


CẬP NHẬT SỔ TAY VÀ HEADER:
- Trang Sổ tay giữ bố cục theo mẫu: thanh tiêu đề, nút Tạo sổ tay và khung nội dung trắng.
- Form tạo sổ tay được căn giữa, không chồng lên ảnh trạng thái trống.
- Trạng thái trống dùng ảnh LingoVerse và dòng Bạn chưa có sổ tay nào.
- Khi có dữ liệu, danh sách sổ tay tự căn theo số cột phù hợp với chiều rộng màn hình.
- Header dùng menu định vị tuyệt đối tại tâm trang nên mục Dịch và toàn bộ menu không bị lệch do nút đăng nhập hoặc avatar.


CẬP NHẬT FORM SỔ TAY VÀ POPUP:
- Bỏ hoàn toàn trường chọn màu khi tạo sổ tay; sổ tay mới dùng màu xanh thương hiệu #4A90E2.
- Đăng nhập, đăng ký và đăng xuất chuyển trang ngay, không hiện popup thành công.
- Tạo, đổi tên, xóa sổ tay và thêm/xóa từ không hiện popup thành công dư thừa.
- Vẫn giữ popup xác nhận xóa, popup báo cáo và các cảnh báo nhập liệu cần thiết.


CẬP NHẬT SỔ TAY, DROPDOWN VÀ HEADER:
- Tạo và đổi tên sổ tay dùng chung một popup riêng, cùng kiểu giao diện.
- Dropdown tra cứu hiển thị từ/phiên âm bên trái và nghĩa bên phải theo hàng ngang.
- Khi thêm từ vào sổ tay, người dùng chọn từ gợi ý để tự động điền nghĩa và phiên âm.
- Ô phiên âm chuyển sang readonly, không yêu cầu người dùng tự gõ ký hiệu IPA.
- Nếu từ chưa có trong dữ liệu gợi ý, người dùng vẫn nhập nghĩa thủ công và có thể lưu không kèm phiên âm.
- Sáu mục menu header có độ rộng bằng nhau; mục Dịch được căn chính giữa cân bằng với các mục dài hơn.


CẬP NHẬT CHI TIẾT SỔ TAY:
- Trạng thái chưa có từ và đã có từ được dựng lại theo mẫu mới.
- Phần trên gồm tiêu đề Sổ tay của tôi, nút Thêm từ, nút Trở về và tên sổ tay có thể đổi tên.
- Khu vực bên trái có nút Flashcard; danh sách từ hiển thị theo dạng danh sách bài học.
- Danh sách tự phân trang 10 từ mỗi trang.
- Nút Thêm từ mở popup thay vì mở form ngang trong trang.
- Popup có ô Tra cứu, tự động điền từ, nghĩa và phiên âm, đồng thời có trường Ghi chú.
- Người dùng vẫn có thể nhập từ và nghĩa thủ công nếu không có trong dữ liệu gợi ý.
