# AUTO.DEV · E-Portfolio Kỹ thuật Tự động hóa (bản nội dung học phần)

Đây là **website E-Portfolio hoàn chỉnh về mặt cấu trúc**, được mở rộng từ bản **Kinetic Engineering** (robot tí hon chuyển động giữa các mục). Nội dung và các mục biên tập được đối chiếu với **hai tài liệu môn Kỹ năng viết hồ sơ và trả lời phỏng vấn xin việc** của Khoa Cơ điện – Điện tử, Trường Đại học Lạc Hồng:

1. `2. E-Portfolio (2).pdf` — phần định nghĩa, loại E-Portfolio, cấu trúc Home / About / Project / CV / Contact, kho minh chứng, cảm nhận và START.
2. `3. Hướng dẫn viết CV (1).pdf` — thông tin cá nhân, mục tiêu nghề nghiệp, học vấn, kinh nghiệm, kỹ năng, chứng chỉ, hoạt động và nguyên tắc định dạng CV.

## Khởi chạy

**Cách đơn giản:** giải nén ZIP, mở `index.html` trong Chrome hoặc Edge (hoạt động offline và không cần cài đặt).

**Cách dùng VS Code:** mở thư mục, dùng Live Server; hoặc chạy:

```bash
cd automation-portfolio-complete
python -m http.server 8080
```

Truy cập `http://localhost:8080`.

## Nội dung đã triển khai

| Mục website | Nội dung dựa theo tài liệu | Cách cá nhân hóa |
|---|---|---|
| Home | Họ tên, vị trí, lời chào, slogan, mô phỏng robot và nút CV | Hồ sơ, E-Portfolio & CV |
| About | Giới thiệu bản thân, ngành, trường, ảnh đại diện tùy chọn | Hồ sơ, E-Portfolio & CV |
| Goals | Mục tiêu cuộc đời, mục tiêu ngắn hạn, định hướng nghề nghiệp 3–5 năm | E-Portfolio & CV |
| Skills | Các nhóm kỹ năng chuyên môn, phần mềm và công nghệ | Kỹ năng |
| Education | Học vấn, khóa học, chứng chỉ, kỹ năng mềm | E-Portfolio & CV |
| Projects | Dự án chuyên ngành có công nghệ, phần cứng, vai trò, kết quả STAR/START, ảnh và liên kết minh chứng | Dự án |
| Experience | Kinh nghiệm thực tập, làm việc, nghiên cứu có chứng cứ | E-Portfolio & CV |
| Journey | Cột mốc phát triển dự án và quy trình kỹ thuật | Tự tạo từ danh sách Dự án |
| Reflections | Bối cảnh, hành động, bài học, hướng cải tiến sau dự án (Reflection) | E-Portfolio & CV |
| Activities | Hoạt động ngoại khóa, vai trò, giải thưởng, học bổng và sở thích | E-Portfolio & CV |
| Evidence | Kho tư liệu dạng liên kết: ảnh, báo cáo, video, tài liệu, sản phẩm | E-Portfolio & CV |
| CV | Bản xem trước CV, kiểm tra độ đầy đủ, In / Lưu PDF khổ A4 | Hồ sơ, Dự án, Kỹ năng, E-Portfolio & CV |
| Contact | Email, điện thoại, địa chỉ, GitHub, LinkedIn, Website, Facebook, YouTube, Zalo, TikTok, Instagram, biểu mẫu mailto | Hồ sơ |

**Quy tắc diễn giải dự án:** Hướng dẫn E-Portfolio ghi phương pháp **START**; tài liệu CV dùng **STAR**. Mẫu dự án ở đây kết hợp cả hai: **S**ituation (bối cảnh), **T**ask (nhiệm vụ), **A**ction (hành động), **R**esult (kết quả), **T**akeaways (bài học / kế hoạch cải tiến). Thông tin được trình bày dưới dạng mẫu có thể sửa; không có tuyên bố kết quả đo đạc không được xác nhận.

## Cách nhập nội dung thật

1. Vào **Chỉnh sửa → Hồ sơ**, điền đầy đủ **họ tên, ngành/vị trí, trường, email, điện thoại, địa điểm, mạng xã hội và giới thiệu bản thân**.
2. Vào **Chỉnh sửa → E-Portfolio & CV**, điền **slogan, mục tiêu, vị trí ứng tuyển, URL portfolio công khai và ảnh đại diện**.
3. Trong chính mục này, mở từng nhóm **Học vấn, Khóa học, Chứng chỉ, Kinh nghiệm, Hoạt động, Giải thưởng, Sở thích, Reflection, Minh chứng**. Bấm **+ Thêm mục mới** hoặc **Sửa**. Với các mục chưa có thông tin thật, có thể để trống; website sẽ báo chưa cập nhật.
4. Vào **Chỉnh sửa → Dự án**, cập nhật từng đề tài. Viết STAR bằng công việc và kết quả bạn thực hiện thật sự; bổ sung **ảnh (URL), báo cáo (URL), GitHub, video** khi có.
5. Mở mục **CV** để kiểm tra các thông tin cần hoàn thiện. Bấm **In / Lưu CV dạng PDF**, chọn **Save as PDF / Lưu dưới dạng PDF**. Bản mặc định có watermark *BẢN MẪU* nếu thông tin ứng tuyển chính còn thiếu.
6. Tại **Sao lưu**, chọn **Xuất data.js**; khi đăng lên GitHub Pages/Netlify/Vercel, **thay file `data.js` trong source và triển khai lại** để mọi khách truy cập nhìn thấy cập nhật mới. JSON dùng để sao lưu/khôi phục cục bộ.

### Dữ liệu mẫu và tính xác thực

Dự án ROS 2 / Swerve, PID nâng từ, STM32 điều khiển nhiệt độ, ESP32 IoT, Modbus, Unity, Plant Simulation là **nội dung phác thảo theo trao đổi kỹ thuật**. Riêng hình học robot được cập nhật khung 700 × 700 mm và wheelbase/track 550 mm; vẫn cần kiểm tra dự án cuối cùng trước khi công khai. **Các reflection được đánh dấu ví dụ**, không phải chứng nhận thành tích.

**Không suy đoán hoặc tự khai** tên thật, số điện thoại, trường học cụ thể, GPA, bằng cấp, học bổng, công ty thực tập hay giải thưởng. Học vấn mặc định có nhãn cần điền; chứng chỉ, giải thưởng, kinh nghiệm và ngoại khóa để trống. Mọi mục cần chứng minh phải được người sở hữu hồ sơ xác nhận.

### Ghi chú về CV

Tài liệu khuyến nghị CV rõ ràng, dễ đọc, thường **1 trang với sinh viên mới tốt nghiệp** hoặc **tối đa 2 trang** nếu có nhiều kinh nghiệm; màu đơn giản, ít biểu tượng, lưu PDF, soát lỗi chính tả và chỉ khai thông tin có thật. Mẫu CV xuất từ trang này dùng nền trắng, một màu nhấn xanh dịu và 1–2 cột cho các nhóm kỹ năng. Độ dài thực tế phụ thuộc vào số dòng người dùng nhập nên cần kiểm tra hộp thoại in.

**Thông tin còn thiếu trên CV** được đánh dấu rõ là bản mẫu / cần cập nhật, không ngầm thể hiện đã sở hữu chứng chỉ hay từng thực tập.

## Hiệu ứng robot

- Rover đi bộ, Hopper nhảy và Scout bay qua các trạm mục, đường vi mạch mờ theo cuộn trang.
- Animation dùng `transform` / `opacity`, không chớp sáng, màu tối–xanh lục dịu, và có chế độ sáng.
- Nút **Robot · BẬT/TẮT**; hỗ trợ **prefers-reduced-motion** và giao diện mobile. Chuyển động tự ẩn khi in CV.

## Tính năng kỹ thuật

Trang tĩnh HTML/CSS/JavaScript, không cần backend hay tài khoản. Có chuyển Việt/Anh, tối/sáng, bộ lọc dự án, tìm kiếm, quản trị nội dung phía trình duyệt, hiển thị media theo URL, xuất/nhập JSON và xuất cấu hình JS để deploy. Liên hệ bằng `mailto:`; không tự gửi email. Không hỗ trợ upload tệp lên máy chủ, lưu chứng chỉ riêng tư hay phân quyền người dùng.

**Hai bản — một bản lưu, một bản công khai.** Trang công khai là bản **chỉ-đọc**: không có nút chỉnh sửa nào cho khách truy cập. Bản chỉnh sửa là cùng trang đó nhưng chỉ mở khóa trên trình duyệt của chủ sở hữu: truy cập một lần bằng link bí mật `https://<site>/?admin=<khóa>` (khóa đặt trong `data.js`, biến `PORTFOLIO_ADMIN_KEY` — hãy đổi thành giá trị riêng của bạn); trình duyệt sẽ ghi nhớ và các nút chỉnh sửa xuất hiện. Nút **Thoát chế độ quản trị** nằm trong hộp Chỉnh sửa. Lưu ý: khóa nằm trong mã nguồn tĩnh nên ai đọc mã cũng tìm ra được; lớp bảo vệ thực sự khi lưu nội dung lên GitHub là token của bạn.

`localStorage` lưu nội dung chỉnh sửa trên trình duyệt hiện tại. Tab **Sao lưu** trong trình chỉnh sửa có mục **Đồng bộ GitHub**: dán fine-grained token (quyền `Contents: Read and write`) rồi bấm **Lưu lên GitHub** để ghi nội dung vào tệp `data.json` trong repo — đây là **bản sao lưu duy nhất**, trang web công khai cập nhật sau ~1 phút và các thiết bị khác tự tải bản mới nhất khi mở trang (bấm **Tải bản từ GitHub** để kéo thủ công). Token chỉ lưu trong localStorage của máy bạn, không nằm trong mã nguồn. Nếu xóa dữ liệu trình duyệt trước khi đồng bộ, nội dung tùy chỉnh có thể mất; hãy xuất JSON sao lưu định kỳ. Tệp `data.js` là thông tin **công khai** khi website được triển khai; không đưa dữ liệu nhạy cảm, mật khẩu hay mã API vào đây.

## Mã nguồn

```text
automation-portfolio-complete/
├── index.html             # Tất cả khu vực và các trình chỉnh sửa
├── styles.css             # Giao diện ban đầu + bản in cơ sở
├── motion.css             # Nhân vật tí hon và animation
├── complete.css           # Giao diện thêm từ 2 tài liệu
├── data.js                # Hồ sơ, dự án, kỹ năng, nội dung START/STAR, mẫu CV
├── app.js                 # Điều hướng, dự án, chỉnh sửa, in CV, sao lưu
├── complete.js            # Nội dung E-Portfolio, CV và trình biên tập bổ sung
├── motion.js              # Robot và chuyển động qua các khu vực
├── assets/favicon.svg
└── README.md
```

## Kiểm tra

Đã kiểm tra bằng trình duyệt headless Chromium với mã HTML/CSS/JavaScript được đưa trực tiếp vào trang: không có lỗi JavaScript; tìm kiếm Modbus, chuyển EN, mở dự án STAR, thêm một chứng chỉ trong trình chỉnh sửa; 390px không tràn ngang; menu điện thoại hoạt động. Đã render bản CV mẫu ra PDF A4: **1 trang** với dữ liệu mặc định. Việc hiển thị có thể khác đôi chút giữa các trình duyệt và theo nội dung người dùng nhập.
