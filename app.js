(() => {
  "use strict";

  function inferType(message) {
    const value = String(message || "").toLowerCase();

    if (
      value.includes("vui lòng") ||
      value.includes("không khớp") ||
      value.includes("chưa ") ||
      value.includes("cần đăng nhập") ||
      value.includes("không thể")
    ) {
      return "warning";
    }

    if (
      value.startsWith("đã ") ||
      value.includes("thành công") ||
      value.includes("đã lưu") ||
      value.includes("đã tạo") ||
      value.includes("đã thêm")
    ) {
      return "success";
    }

    return "info";
  }

  function createSystem() {
    if (window.LingoPopup && document.getElementById("lingoPopupBackdrop")) {
      return;
    }

    const backdrop = document.createElement("div");
    backdrop.id = "lingoPopupBackdrop";
    backdrop.className = "lingo-popup-backdrop";
    backdrop.hidden = true;
    backdrop.innerHTML = `
      <section class="lingo-popup-card" role="dialog" aria-modal="true" aria-labelledby="lingoPopupTitle">
        <div class="lingo-popup-icon" id="lingoPopupIcon">i</div>
        <h2 id="lingoPopupTitle">Thông báo</h2>
        <p id="lingoPopupMessage"></p>

        <label class="lingo-popup-input-wrap" id="lingoPopupInputWrap" hidden>
          <span id="lingoPopupInputLabel">Nội dung</span>
          <input id="lingoPopupInput" type="text" autocomplete="off">
        </label>

        <div class="lingo-popup-actions" id="lingoPopupActions"></div>
      </section>
    `;

    const reportBackdrop = document.createElement("div");
    reportBackdrop.id = "lingoReportBackdrop";
    reportBackdrop.className = "lingo-report-backdrop";
    reportBackdrop.hidden = true;
    reportBackdrop.innerHTML = `
      <form class="lingo-report-card" id="lingoReportForm">
        <button class="lingo-report-close" type="button" aria-label="Đóng">×</button>
        <h2>Báo cáo</h2>
        <textarea id="lingoReportText" required placeholder="Nhập vào nội dung báo cáo"></textarea>
        <div class="lingo-report-actions">
          <button type="submit">Gửi</button>
        </div>
      </form>
    `;

    document.body.append(backdrop, reportBackdrop);

    const card = backdrop.querySelector(".lingo-popup-card");
    const icon = document.getElementById("lingoPopupIcon");
    const title = document.getElementById("lingoPopupTitle");
    const message = document.getElementById("lingoPopupMessage");
    const inputWrap = document.getElementById("lingoPopupInputWrap");
    const inputLabel = document.getElementById("lingoPopupInputLabel");
    const input = document.getElementById("lingoPopupInput");
    const actions = document.getElementById("lingoPopupActions");

    let onPrimary = null;
    let onSecondary = null;
    let inputMode = false;

    function close() {
      backdrop.hidden = true;
      document.body.style.overflow = "";
      onPrimary = null;
      onSecondary = null;
      inputMode = false;
      inputWrap.hidden = true;
      input.value = "";
    }

    function show(options = {}) {
      const {
        title: popupTitle = "Thông báo",
        message: popupMessage = "",
        type = "info",
        icon: popupIcon,
        primaryText = "Đóng",
        secondaryText = "",
        primaryHref = "",
        input: inputOptions = null,
        onPrimary: primaryCallback = null,
        onSecondary: secondaryCallback = null,
      } = options;

      card.className = `lingo-popup-card ${type}`;
      icon.textContent =
        popupIcon ||
        (type === "success" ? "✓" :
         type === "warning" ? "!" :
         type === "error" ? "×" : "i");

      title.textContent = popupTitle;
      message.textContent = popupMessage;
      message.hidden = !popupMessage;

      inputMode = Boolean(inputOptions);
      inputWrap.hidden = !inputMode;

      if (inputMode) {
        inputLabel.textContent = inputOptions.label || "Nội dung";
        input.placeholder = inputOptions.placeholder || "";
        input.value = inputOptions.value || "";
        input.maxLength = inputOptions.maxLength || 100;
      }

      onPrimary = primaryCallback;
      onSecondary = secondaryCallback;

      actions.innerHTML = "";
      actions.classList.toggle("two", Boolean(secondaryText));

      if (secondaryText) {
        const secondary = document.createElement("button");
        secondary.type = "button";
        secondary.textContent = secondaryText;
        secondary.addEventListener("click", () => {
          const callback = onSecondary;
          close();
          callback?.();
        });
        actions.appendChild(secondary);
      }

      if (primaryHref) {
        const primaryLink = document.createElement("a");
        primaryLink.className = "primary";
        primaryLink.href = primaryHref;
        primaryLink.textContent = primaryText;
        actions.appendChild(primaryLink);
      } else {
        const primary = document.createElement("button");
        primary.type = "button";
        primary.className = "primary";
        primary.textContent = primaryText;
        primary.addEventListener("click", () => {
          const value = inputMode ? input.value.trim() : undefined;

          if (inputMode && !value) {
            input.focus();
            return;
          }

          const callback = onPrimary;
          close();
          callback?.(value);
        });
        actions.appendChild(primary);
      }

      backdrop.hidden = false;
      document.body.style.overflow = "hidden";

      requestAnimationFrame(() => {
        if (inputMode) {
          input.focus();
          input.select();
        } else {
          actions.querySelector(".primary")?.focus();
        }
      });
    }

    window.LingoPopup = {
      show,

      alert(popupMessage, popupTitle = "Thông báo", type) {
        show({
          title: popupTitle,
          message: popupMessage,
          type: type || inferType(popupMessage),
        });
      },

      confirm({
        title: popupTitle = "Xác nhận",
        message: popupMessage = "",
        confirmText = "Đồng ý",
        cancelText = "Hủy",
        onConfirm,
        onCancel,
      }) {
        show({
          title: popupTitle,
          message: popupMessage,
          type: "warning",
          primaryText: confirmText,
          secondaryText: cancelText,
          onPrimary: onConfirm,
          onSecondary: onCancel,
        });
      },

      prompt({
        title: popupTitle = "Nhập thông tin",
        message: popupMessage = "",
        label = "Nội dung",
        value = "",
        placeholder = "",
        confirmText = "Lưu",
        cancelText = "Hủy",
        onSubmit,
        onCancel,
      }) {
        show({
          title: popupTitle,
          message: popupMessage,
          type: "info",
          primaryText: confirmText,
          secondaryText: cancelText,
          input: { label, value, placeholder },
          onPrimary: onSubmit,
          onSecondary: onCancel,
        });
      },

      loginRequired(popupMessage = "Bạn cần đăng nhập để sử dụng chức năng này.") {
        const current =
          window.location.pathname.split("/").pop() + window.location.search;

        show({
          title: "Bạn cần đăng nhập",
          message: popupMessage,
          type: "warning",
          primaryText: "Đăng nhập ngay",
          secondaryText: "Để sau",
          primaryHref: `login.html?redirect=${encodeURIComponent(current)}`,
        });
      },

      report() {
        reportBackdrop.hidden = false;
        document.getElementById("lingoReportText").value = "";
        document.getElementById("lingoReportText").focus();
        document.body.style.overflow = "hidden";
      },
    };

    window.lingoNotify = (popupMessage) => {
      window.LingoPopup.alert(
        popupMessage,
        inferType(popupMessage) === "success" ? "Thành công" :
        inferType(popupMessage) === "warning" ? "Lưu ý" : "Thông báo",
        inferType(popupMessage)
      );
    };

    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) close();
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        actions.querySelector(".primary")?.click();
      }
    });

    reportBackdrop.addEventListener("click", (event) => {
      if (event.target === reportBackdrop) {
        reportBackdrop.hidden = true;
        document.body.style.overflow = "";
      }
    });

    reportBackdrop
      .querySelector(".lingo-report-close")
      .addEventListener("click", () => {
        reportBackdrop.hidden = true;
        document.body.style.overflow = "";
      });

    document
      .getElementById("lingoReportForm")
      .addEventListener("submit", (event) => {
        event.preventDefault();

        const content = document
          .getElementById("lingoReportText")
          .value.trim();

        if (!content) {
          window.LingoPopup.alert(
            "Vui lòng nhập nội dung cần báo cáo.",
            "Chưa có nội dung",
            "warning"
          );
          return;
        }

        reportBackdrop.hidden = true;

        show({
          title: "Gửi báo cáo thành công!",
          message:
            "Sự đóng góp của bạn giúp chúng tôi cải thiện trải nghiệm tốt hơn.",
          type: "success",
          primaryText: "Quay lại trang chủ",
          secondaryText: "Đóng",
          primaryHref: "index.html",
        });
      });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;

      if (!reportBackdrop.hidden) {
        reportBackdrop.hidden = true;
        document.body.style.overflow = "";
      } else if (!backdrop.hidden) {
        close();
      }
    });

    document.addEventListener(
      "click",
      (event) => {
        const reportTrigger = event.target.closest(
          '[data-report-trigger], [data-report-post], .dictionary-report, [data-demo-action*="Báo lỗi"], [data-demo-action*="Báo cáo"]'
        );

        if (!reportTrigger) return;

        event.preventDefault();
        event.stopImmediatePropagation();

        if (localStorage.getItem("lingoverseLoggedIn") !== "true") {
          window.LingoPopup.loginRequired(
            "Bạn cần đăng nhập để gửi báo cáo."
          );
          return;
        }

        window.LingoPopup.report();
      },
      true
    );

    document.addEventListener(
      "click",
      (event) => {
        if (localStorage.getItem("lingoverseLoggedIn") === "true") return;

        const notebookLink = event.target.closest(
          'a[href^="notebook-detail.html"]'
        );

        if (!notebookLink) return;

        event.preventDefault();
        event.stopImmediatePropagation();

        window.LingoPopup.loginRequired(
          "Đăng nhập để mở sổ tay cá nhân và xem các từ đã lưu."
        );
      },
      true
    );
  }

  createSystem();
})();

(() => {
  "use strict";

  const storage = {
    get loggedIn() {
      return localStorage.getItem("lingoverseLoggedIn") === "true";
    },
    set loggedIn(value) {
      localStorage.setItem("lingoverseLoggedIn", String(value));
    },
    get user() {
      try {
        return JSON.parse(localStorage.getItem("lingoverseUser")) || null;
      } catch {
        return null;
      }
    },
    set user(value) {
      localStorage.setItem("lingoverseUser", JSON.stringify(value));
    }
  };

  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(message) {
    window.lingoNotify?.(message);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setError(input, errorElement, message) {
    if (!input || !errorElement) return;
    input.classList.add("invalid");
    errorElement.textContent = message;
  }

  function clearError(input, errorElement) {
    if (!input || !errorElement) return;
    input.classList.remove("invalid");
    errorElement.textContent = "";
  }

  function initCurrentNavigation() {
    const current = document.body.dataset.currentPage;
    document.querySelectorAll("[data-page]").forEach((link) => {
      link.classList.toggle("active", link.dataset.page === current);
    });
  }

  function initMobileMenu() {
    const button = document.querySelector("[data-mobile-menu]");
    const nav = document.querySelector("[data-main-nav]");
    if (!button || !nav) return;
    button.addEventListener("click", () => nav.classList.toggle("open"));
  }

  function renderAuthArea() {
    const area = document.querySelector("[data-auth-area]");
    if (!area) return;

    const forceDemoUser = document.body.dataset.forceDemoUser === "true";

    if (!storage.loggedIn && !forceDemoUser) {
      area.innerHTML = `
        <a class="header-button" href="login.html">Đăng nhập</a>
        <a class="header-button primary" href="register.html">Đăng ký</a>
      `;
      return;
    }

    const user = storage.user || { fullName: "Người học" };
    const initials = user.fullName
      .split(/\s+/)
      .filter(Boolean)
      .slice(-2)
      .map((part) => part[0]?.toUpperCase())
      .join("");

    area.innerHTML = `
      <a class="header-demo-avatar" href="profile.html" aria-label="Hồ sơ cá nhân">
        <img src="assets/avatar-main.jpg" alt="">
      </a>
    `;
  }

  function initAuthModal() {
    const modal = document.getElementById("authModal");
    const message = document.getElementById("authModalMessage");
    const loginLink = document.getElementById("modalLoginLink");

    function closeModal() {
      if (!modal) return;
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    }

    function openModal(actionText) {
      if (!modal) return;
      message.textContent = `Bạn cần đăng nhập để ${actionText.toLowerCase()} và đồng bộ dữ liệu trên tài khoản.`;
      const currentPath = window.location.pathname.split("/").pop() || "index.html";
      loginLink.href = `login.html?redirect=${encodeURIComponent(currentPath + window.location.search)}`;
      modal.classList.add("show");
      modal.setAttribute("aria-hidden", "false");
    }

    document.querySelectorAll("[data-auth-required]").forEach((element) => {
      element.addEventListener("click", (event) => {
        if (storage.loggedIn) {
          showToast(`${element.dataset.authRequired}: đã thực hiện trong bản demo.`);
          return;
        }
        event.preventDefault();
        openModal(element.dataset.authRequired || "sử dụng chức năng này");
      });
    });

    document.querySelector("[data-close-auth-modal]")?.addEventListener("click", closeModal);
    modal?.addEventListener("click", (event) => {
      if (event.target === modal) closeModal();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeModal();
    });
  }

  function initDictionarySearch() {
    document.querySelectorAll("[data-dictionary-search]").forEach((form) => {
      const input = form.querySelector('input[name="q"]');
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = input.value.trim();
        if (!query) {
          showToast("Vui lòng nhập từ cần tra cứu.");
          input.focus();
          return;
        }
        window.location.href = `dictionary.html?q=${encodeURIComponent(query)}`;
      });
    });

    const params = new URLSearchParams(window.location.search);
    const query = params.get("q");
    if (query) {
      document.querySelectorAll('[data-dictionary-search] input[name="q"]').forEach((input) => {
        input.value = query;
      });
      document.querySelectorAll("[data-query-label]").forEach((label) => {
        label.textContent = query;
      });
      document.querySelectorAll("[data-word-title]").forEach((label) => {
        label.textContent = query;
      });
    }
  }

  function initSpeech() {
    document.querySelectorAll("[data-speak]").forEach((button) => {
      button.addEventListener("click", () => {
        if (!("speechSynthesis" in window)) {
          showToast("Trình duyệt chưa hỗ trợ phát âm.");
          return;
        }
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(button.dataset.speak);
        utterance.lang = "en-US";
        utterance.rate = 0.85;
        speechSynthesis.speak(utterance);
      });
    });
  }

  function initTranslate() {
    const sourceText = document.getElementById("sourceText");
    const translatedText = document.getElementById("translatedText");
    const charCount = document.getElementById("charCount");
    const translateButton = document.getElementById("translateButton");
    const sourceLanguage = document.getElementById("sourceLanguage");
    const targetLanguage = document.getElementById("targetLanguage");

    if (!sourceText || !translatedText) return;

    const dictionary = {
      "hello": "xin chào",
      "hello world": "xin chào thế giới",
      "good morning": "chào buổi sáng",
      "thank you": "cảm ơn bạn",
      "how are you": "bạn khỏe không",
      "i am learning english": "tôi đang học tiếng Anh",
      "learning english opens new opportunities": "học tiếng Anh mở ra những cơ hội mới",
      "xin chào": "hello",
      "chào buổi sáng": "good morning",
      "cảm ơn bạn": "thank you",
      "bạn khỏe không": "how are you",
      "tôi đang học tiếng anh": "i am learning English"
    };

    sourceText.addEventListener("input", () => {
      charCount.textContent = sourceText.value.length;
    });

    translateButton.addEventListener("click", () => {
      const value = sourceText.value.trim();
      if (!value) {
        showToast("Vui lòng nhập nội dung cần dịch.");
        sourceText.focus();
        return;
      }

      const normalized = value.toLowerCase().replace(/[.!?]+$/, "");
      translatedText.value =
        dictionary[normalized] ||
        (targetLanguage.value === "vi"
          ? `[Bản dịch minh họa] ${value}`
          : `[Demo translation] ${value}`);
    });

    document.getElementById("clearTranslation")?.addEventListener("click", () => {
      sourceText.value = "";
      translatedText.value = "";
      charCount.textContent = "0";
      sourceText.focus();
    });

    document.getElementById("swapLanguage")?.addEventListener("click", () => {
      const sourceValue = sourceLanguage.value;
      sourceLanguage.value = targetLanguage.value;
      targetLanguage.value = sourceValue;

      const text = sourceText.value;
      sourceText.value = translatedText.value;
      translatedText.value = text;
      charCount.textContent = sourceText.value.length;
    });

    document.getElementById("listenTranslation")?.addEventListener("click", () => {
      if (!translatedText.value) {
        showToast("Chưa có nội dung để phát âm.");
        return;
      }
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(translatedText.value);
        utterance.lang = targetLanguage.value === "vi" ? "vi-VN" : "en-US";
        speechSynthesis.speak(utterance);
      }
    });
  }

  function initNotebookState() {
    const loggedOut = document.querySelector("[data-logged-out-notebook]");
    const loggedIn = document.querySelector("[data-logged-in-notebook]");
    if (!loggedOut || !loggedIn) return;
    loggedOut.hidden = storage.loggedIn;
    loggedIn.hidden = !storage.loggedIn;
  }

  function initPasswordToggles() {
    document.querySelectorAll("[data-password-toggle]").forEach((button) => {
      const input = document.getElementById(button.dataset.passwordToggle);
      if (!input) return;
      button.addEventListener("click", () => {
        const show = input.type === "password";
        input.type = show ? "text" : "password";
        button.textContent = show ? "🙈" : "👁";
      });
    });
  }

  function initLoginForm() {
    const form = document.getElementById("loginForm");
    if (!form) return;

    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");
    const remember = document.getElementById("rememberEmail");
    const emailError = document.getElementById("loginEmailError");
    const passwordError = document.getElementById("loginPasswordError");

    const savedEmail = localStorage.getItem("lingoverseRememberedEmail");
    if (savedEmail) {
      email.value = savedEmail;
      remember.checked = true;
    }

    email.addEventListener("input", () => clearError(email, emailError));
    password.addEventListener("input", () => clearError(password, passwordError));

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let valid = true;
      const emailValue = email.value.trim();

      clearError(email, emailError);
      clearError(password, passwordError);

      if (!isValidEmail(emailValue)) {
        setError(email, emailError, "Vui lòng nhập email hợp lệ.");
        valid = false;
      }
      if (password.value.length < 6) {
        setError(password, passwordError, "Mật khẩu phải có ít nhất 6 ký tự.");
        valid = false;
      }
      if (!valid) return;

      if (remember.checked) {
        localStorage.setItem("lingoverseRememberedEmail", emailValue);
      } else {
        localStorage.removeItem("lingoverseRememberedEmail");
      }

      const existingUser = storage.user;
      storage.user = existingUser || {
        fullName: emailValue.split("@")[0],
        email: emailValue
      };
      storage.loggedIn = true;

      const redirect = new URLSearchParams(window.location.search).get("redirect");
      window.location.href = redirect || "index.html";
    });

    document.getElementById("forgotPassword")?.addEventListener("click", (event) => {
      event.preventDefault();
      if (!isValidEmail(email.value.trim())) {
        showToast("Hãy nhập email hợp lệ trước.");
        email.focus();
        return;
      }
      showToast(`Đã gửi hướng dẫn khôi phục tới ${email.value.trim()}.`);
    });
  }

  function initRegisterForm() {
    const form = document.getElementById("registerForm");
    if (!form) return;

    const fullName = document.getElementById("fullName");
    const email = document.getElementById("registerEmail");
    const password = document.getElementById("registerPassword");
    const confirm = document.getElementById("confirmPassword");
    const fullNameError = document.getElementById("fullNameError");
    const emailError = document.getElementById("registerEmailError");
    const passwordError = document.getElementById("registerPasswordError");
    const confirmError = document.getElementById("confirmPasswordError");

    const pairs = [
      [fullName, fullNameError],
      [email, emailError],
      [password, passwordError],
      [confirm, confirmError]
    ];
    pairs.forEach(([input, error]) =>
      input.addEventListener("input", () => clearError(input, error))
    );

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let valid = true;
      pairs.forEach(([input, error]) => clearError(input, error));

      if (fullName.value.trim().length < 2) {
        setError(fullName, fullNameError, "Vui lòng nhập họ và tên.");
        valid = false;
      }
      if (!isValidEmail(email.value.trim())) {
        setError(email, emailError, "Email chưa đúng định dạng.");
        valid = false;
      }
      if (password.value.length < 6) {
        setError(password, passwordError, "Mật khẩu phải có ít nhất 6 ký tự.");
        valid = false;
      }
      if (confirm.value !== password.value) {
        setError(confirm, confirmError, "Mật khẩu xác nhận không khớp.");
        valid = false;
      }
      if (!valid) return;

      storage.user = {
        fullName: fullName.value.trim(),
        email: email.value.trim()
      };
      storage.loggedIn = false;
      window.location.href = "login.html";
    });
  }

  function initDemoSocial() {
    document.querySelectorAll("[data-demo-social]").forEach((button) => {
      button.addEventListener("click", () => {
        showToast(`Đăng nhập bằng ${button.dataset.demoSocial} đang ở chế độ minh họa.`);
      });
    });
  }

  initCurrentNavigation();
  initMobileMenu();
  renderAuthArea();
  initAuthModal();
  initDictionarySearch();
  initSpeech();
  initTranslate();
  initNotebookState();
  initPasswordToggles();
  initLoginForm();
  initRegisterForm();
  initDemoSocial();
})();

(() => {
  "use strict";

  const toast = document.getElementById("toast");
  let localToastTimer;

  function notify(message) {
    window.lingoNotify?.(message);
  }

  function getStoredUser() {
    try {
      return JSON.parse(localStorage.getItem("lingoverseUser")) || {};
    } catch {
      return {};
    }
  }

  function fillProfileData() {
    const user = getStoredUser();
    document.querySelectorAll("[data-profile-name]").forEach((el) => {
      el.textContent = user.fullName || "Dung Tran";
    });
    document.querySelectorAll("[data-profile-email]").forEach((el) => {
      el.textContent = user.email || "dung@example.com";
    });

    const fullNameInput = document.getElementById("editFullName");
    const emailInput = document.getElementById("editEmail");
    if (fullNameInput && user.fullName) fullNameInput.value = user.fullName;
    if (emailInput && user.email) emailInput.value = user.email;
  }

  function initProfileEdit() {
    const form = document.getElementById("profileEditForm");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const user = {
        ...getStoredUser(),
        fullName: document.getElementById("editFullName").value.trim() || "Dung Tran",
        email: document.getElementById("editEmail").value.trim() || "dung@example.com"
      };
      localStorage.setItem("lingoverseUser", JSON.stringify(user));
      notify("Đã cập nhật hồ sơ.");
      setTimeout(() => window.location.href = "profile.html", 650);
    });

    document.getElementById("changeAvatar")?.addEventListener("click", () => {
      notify("Chức năng chọn ảnh đại diện đang ở chế độ minh họa.");
    });
  }

  const questions = [
    {
      text: 'Choose the correct answer: “She ___ English every day.”',
      answers: ["study", "studies", "studying", "studied"],
      correct: 1
    },
    {
      text: 'I have lived in Hanoi ___ five years.',
      answers: ["since", "for", "during", "from"],
      correct: 1
    },
    {
      text: 'By the time we arrived, the train ___.',
      answers: ["left", "has left", "had left", "was leaving"],
      correct: 2
    },
    {
      text: 'They are interested ___ learning languages.',
      answers: ["on", "at", "in", "with"],
      correct: 2
    },
    {
      text: '___ it was raining, we continued the trip.',
      answers: ["Because", "Although", "So", "Unless"],
      correct: 1
    },
    {
      text: 'This book is ___ than the one I read last week.',
      answers: ["interesting", "more interesting", "most interesting", "interest"],
      correct: 1
    },
    {
      text: 'If I ___ more time, I would learn another language.',
      answers: ["have", "had", "will have", "am having"],
      correct: 1
    },
    {
      text: 'The report ___ by the manager yesterday.',
      answers: ["approved", "was approved", "is approving", "has approve"],
      correct: 1
    },
    {
      text: 'Could you tell me where the station ___?',
      answers: ["is", "was", "be", "being"],
      correct: 0
    },
    {
      text: 'She suggested ___ a short break.',
      answers: ["take", "to take", "taking", "took"],
      correct: 2
    }
  ];

  function initTestTaking() {
    const navigation = document.getElementById("questionNavigation");
    const answerList = document.getElementById("answerList");
    if (!navigation || !answerList) return;

    let current = 0;
    let remainingSeconds = 40 * 60;
    const answers = Array(questions.length).fill(null);
    const flagged = new Set();

    const timer = document.getElementById("testTimer");
    const currentNumber = document.getElementById("currentQuestionNumber");
    const questionText = document.getElementById("questionText");
    const answeredCount = document.getElementById("answeredCount");

    function renderNavigation() {
      navigation.innerHTML = "";
      questions.forEach((_, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "question-number";
        button.textContent = index + 1;
        if (index === current) button.classList.add("current");
        if (answers[index] !== null) button.classList.add("done");
        if (flagged.has(index)) button.classList.add("flagged");
        button.addEventListener("click", () => {
          current = index;
          render();
        });
        navigation.appendChild(button);
      });
    }

    function renderQuestion() {
      const question = questions[current];
      currentNumber.textContent = current + 1;
      questionText.textContent = question.text;
      answerList.innerHTML = "";

      question.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "answer-option";
        if (answers[current] === index) button.classList.add("selected");
        button.innerHTML = `<b>${String.fromCharCode(65 + index)}</b><span>${answer}</span>`;
        button.addEventListener("click", () => {
          answers[current] = index;
          answeredCount.textContent = answers.filter((value) => value !== null).length;
          render();
        });
        answerList.appendChild(button);
      });

      document.getElementById("previousQuestion").disabled = current === 0;
      document.getElementById("nextQuestion").textContent =
        current === questions.length - 1 ? "Kiểm tra lại" : "Câu tiếp →";
    }

    function render() {
      renderNavigation();
      renderQuestion();
    }

    document.getElementById("previousQuestion")?.addEventListener("click", () => {
      if (current > 0) {
        current -= 1;
        render();
      }
    });

    document.getElementById("nextQuestion")?.addEventListener("click", () => {
      if (current < questions.length - 1) {
        current += 1;
        render();
      } else {
        notify("Bạn đang ở câu cuối cùng.");
      }
    });

    document.getElementById("flagQuestion")?.addEventListener("click", () => {
      if (flagged.has(current)) flagged.delete(current);
      else flagged.add(current);
      renderNavigation();
      notify(flagged.has(current) ? "Đã đánh dấu câu hỏi." : "Đã bỏ đánh dấu.");
    });

    function submitTest() {
      const correct = answers.reduce((total, value, index) => {
        return total + (value === questions[index].correct ? 1 : 0);
      }, 0);

      localStorage.setItem("lingoverseTestResult", JSON.stringify({
        correct,
        total: questions.length,
        secondsUsed: 60 * 60 - remainingSeconds
      }));
      window.location.href = "test-result.html";
    }

    document.getElementById("submitTest")?.addEventListener("click", () => {
      const unanswered = answers.filter((value) => value === null).length;
      const message = unanswered
        ? `Bạn còn ${unanswered} câu chưa trả lời. Vẫn nộp bài?`
        : "Bạn chắc chắn muốn nộp bài?";
      if (window.LingoPopup) {
        window.LingoPopup.confirm({
          title: "Nộp bài thi",
          message,
          confirmText: "Nộp bài",
          cancelText: "Kiểm tra lại",
          onConfirm: submitTest
        });
      } else {
        submitTest();
      }
    });

    const interval = setInterval(() => {
      remainingSeconds -= 1;
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = remainingSeconds % 60;
      timer.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
      if (remainingSeconds <= 0) {
        clearInterval(interval);
        submitTest();
      }
    }, 1000);

    render();
  }

  function initTestResult() {
    const score = document.getElementById("resultScore");
    if (!score) return;

    try {
      const result = JSON.parse(localStorage.getItem("lingoverseTestResult"));
      if (result) {
        const calculatedScore = (result.correct / result.total * 10).toFixed(1);
        score.textContent = calculatedScore;
        document.getElementById("correctAnswers").textContent = result.correct;
        document.getElementById("wrongAnswers").textContent = result.total - result.correct;
        const minutes = Math.floor(result.secondsUsed / 60);
        const seconds = result.secondsUsed % 60;
        document.getElementById("resultTime").textContent =
          `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
      }
    } catch {}

    document.getElementById("reviewAnswers")?.addEventListener("click", () => {
      const review = document.getElementById("answerReview");
      review.hidden = !review.hidden;
    });
  }

  const cards = [
    {word: "hello", phonetic: "/həˈləʊ/", meaning: "xin chào", example: "Hello, nice to meet you!"},
    {word: "family", phonetic: "/ˈfæməli/", meaning: "gia đình", example: "My family lives in Hanoi."},
    {word: "beautiful", phonetic: "/ˈbjuːtɪfl/", meaning: "xinh đẹp", example: "It is a beautiful day."},
    {word: "opportunity", phonetic: "/ˌɒpəˈtjuːnəti/", meaning: "cơ hội", example: "This is a great opportunity."},
    {word: "confidence", phonetic: "/ˈkɒnfɪdəns/", meaning: "sự tự tin", example: "Practice builds confidence."},
    {word: "challenge", phonetic: "/ˈtʃælɪndʒ/", meaning: "thử thách", example: "Learning a language is a challenge."},
    {word: "improve", phonetic: "/ɪmˈpruːv/", meaning: "cải thiện", example: "I want to improve my English."},
    {word: "achieve", phonetic: "/əˈtʃiːv/", meaning: "đạt được", example: "You can achieve your goals."}
  ];

  function initFlashcard() {
    const card = document.getElementById("flashcard");
    if (!card) return;

    let index = 0;
    const word = document.getElementById("flashcardWord");
    const meaning = document.getElementById("flashcardMeaning");
    const example = document.getElementById("flashcardExample");
    const counter = document.getElementById("flashcardIndex");
    const frontSmall = card.querySelector(".flashcard-front small");

    function render() {
      const item = cards[index];
      card.classList.remove("flipped");
      word.textContent = item.word;
      frontSmall.textContent = item.phonetic;
      meaning.textContent = item.meaning;
      example.textContent = item.example;
      counter.textContent = index + 1;
    }

    card.addEventListener("click", () => card.classList.toggle("flipped"));
    document.getElementById("previousCard")?.addEventListener("click", () => {
      index = (index - 1 + cards.length) % cards.length;
      render();
    });
    document.getElementById("nextCard")?.addEventListener("click", () => {
      index = (index + 1) % cards.length;
      render();
    });
    document.querySelectorAll("[data-card-rate]").forEach((button) => {
      button.addEventListener("click", () => {
        notify(button.dataset.cardRate === "easy" ? "Đã đánh dấu là đã nhớ." : "Từ sẽ được ưu tiên ôn lại.");
        index = (index + 1) % cards.length;
        render();
      });
    });
    document.getElementById("speakCard")?.addEventListener("click", () => {
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(cards[index].word);
        utterance.lang = "en-US";
        speechSynthesis.speak(utterance);
      }
    });
    render();
  }

  function initNotebookDetail() {
    if (localStorage.getItem("lingoverseLoggedIn") !== "true") return;
    const search = document.getElementById("notebookSearch");
    if (!search) return;

    search.addEventListener("input", () => {
      const value = search.value.trim().toLowerCase();
      document.querySelectorAll(".saved-word").forEach((item) => {
        item.hidden = !item.dataset.word.includes(value);
      });
    });

    document.querySelectorAll(".remove-word").forEach((button) => {
      button.addEventListener("click", () => {
        button.closest(".saved-word")?.remove();
        notify("Đã xóa từ khỏi sổ tay.");
      });
    });

    document.getElementById("addNotebookWord")?.addEventListener("click", () => {
      notify("Đã mở biểu mẫu thêm từ trong bản demo.");
    });

    document.getElementById("createFolder")?.addEventListener("click", () => {
      notify("Đã tạo thư mục mới trong bản demo.");
    });
  }

  function initNotebookCreation() {
    ["newNotebookButton", "createNotebookFolder", "createFirstNotebook", "createFirstNotebookButton"].forEach((id) => {
      document.getElementById(id)?.addEventListener("click", () => {
        window.LingoPopup.prompt({
          title: "Tạo sổ tay",
          label: "Tên sổ tay",
          value: "Từ mới",
          placeholder: "Nhập tên sổ tay",
          confirmText: "Tạo",
          onSubmit: () => {}
        });
      });
    });
  }

  function initContactForm() {
    document.getElementById("contactForm")?.addEventListener("submit", (event) => {
      event.preventDefault();
      notify("Yêu cầu hỗ trợ đã được gửi.");
      event.currentTarget.reset();
    });
  }

  fillProfileData();
  initProfileEdit();
  initTestTaking();
  initTestResult();
  initFlashcard();
  initNotebookDetail();
  initNotebookCreation();
  initContactForm();
})();

(() => {
  "use strict";

  function initHomePosterSlider() {
    const track = document.querySelector("[data-poster-track]");
    if (!track) return;

    const slides = Array.from(track.children);
    const dots = Array.from(document.querySelectorAll("[data-poster-dot]"));
    const previousButton = document.querySelector("[data-poster-prev]");
    const nextButton = document.querySelector("[data-poster-next]");
    const slider = track.closest(".home-poster-slider");

    let current = 0;
    let direction = 1;
    let timer;

    function updateSlider(index, manual = false) {
      current = Math.max(0, Math.min(index, slides.length - 1));
      track.style.transform = `translateX(-${current * 100}%)`;

      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === current);
      });

      if (manual) {
        if (current === 0) direction = 1;
        if (current === slides.length - 1) direction = -1;
      }
    }

    function pingPongStep() {
      if (current === slides.length - 1) direction = -1;
      if (current === 0) direction = 1;
      updateSlider(current + direction);
    }

    function startAutoPlay() {
      clearInterval(timer);
      timer = setInterval(pingPongStep, 4200);
    }

    previousButton?.addEventListener("click", () => {
      const nextIndex = current === 0 ? slides.length - 1 : current - 1;
      updateSlider(nextIndex, true);
      startAutoPlay();
    });

    nextButton?.addEventListener("click", () => {
      const nextIndex = current === slides.length - 1 ? 0 : current + 1;
      updateSlider(nextIndex, true);
      startAutoPlay();
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        updateSlider(Number(dot.dataset.posterDot), true);
        startAutoPlay();
      });
    });

    slider?.addEventListener("mouseenter", () => clearInterval(timer));
    slider?.addEventListener("mouseleave", startAutoPlay);
    slider?.addEventListener("focusin", () => clearInterval(timer));
    slider?.addEventListener("focusout", startAutoPlay);

    updateSlider(0);
    startAutoPlay();
  }

  function initHomeSearchModes() {
    const form = document.querySelector(".home-large-search");
    const input = form?.querySelector('input[name="q"]');
    const tabs = document.querySelectorAll("[data-search-mode]");
    if (!form || !input || !tabs.length) return;

    const modes = {
      word: {
        placeholder: "Nhập từ tiếng Anh cần tra cứu...",
        destination: "dictionary.html"
      },
      example: {
        placeholder: "Nhập từ hoặc câu để tìm ví dụ...",
        destination: "dictionary.html"
      },
      phrase: {
        placeholder: "Nhập từ để tìm các kết hợp từ...",
        destination: "dictionary.html"
      }
    };

    let currentMode = "word";

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        currentMode = tab.dataset.searchMode;
        tabs.forEach((item) => item.classList.toggle("active", item === tab));
        input.placeholder = modes[currentMode].placeholder;
        input.focus();
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = input.value.trim();

      if (!query) {
        input.focus();
        return;
      }

      window.location.href =
        `${modes[currentMode].destination}?q=${encodeURIComponent(query)}&mode=${encodeURIComponent(currentMode)}`;
    });
  }

  function initHomeTips() {
    const tipText = document.querySelector(".home-daily-tip p");
    const metaTitle = document.querySelector(".daily-tip-meta strong");
    const metaTopic = document.querySelector(".daily-tip-meta span");
    if (!tipText || !metaTitle || !metaTopic) return;

    const tips = [
      {
        topic: "Thói quen",
        text: "Gắn việc học tiếng Anh với một hoạt động hằng ngày, chẳng hạn nghe podcast khi đi xe hoặc ôn từ trước khi ngủ."
      },
      {
        topic: "Từ vựng",
        text: "Đừng chỉ học nghĩa của từ. Hãy đặt một câu liên quan đến trải nghiệm của chính bạn để ghi nhớ lâu hơn."
      },
      {
        topic: "Phát âm",
        text: "Nghe một câu ngắn, tạm dừng rồi bắt chước cả nhịp điệu và trọng âm thay vì chỉ đọc từng từ riêng lẻ."
      },
      {
        topic: "Ôn tập",
        text: "Ôn lại từ sau 1 ngày, 3 ngày và 7 ngày. Việc lặp lại ngắt quãng giúp giảm tốc độ quên đáng kể."
      },
      {
        topic: "Giao tiếp",
        text: "Chuẩn bị trước một vài câu mở đầu quen thuộc để bạn tự tin hơn khi bắt đầu cuộc trò chuyện."
      }
    ];

    let index = 0;

    function render() {
      metaTitle.textContent = `Mẹo (${index + 1}/${tips.length})`;
      metaTopic.textContent = `Chủ đề: ${tips[index].topic}`;
      tipText.textContent = tips[index].text;
    }

    document.querySelector("[data-tip-prev]")?.addEventListener("click", () => {
      index = (index - 1 + tips.length) % tips.length;
      render();
    });

    document.querySelector("[data-tip-next]")?.addEventListener("click", () => {
      index = (index + 1) % tips.length;
      render();
    });

    render();
  }

  function initHomeRankingTabs() {
    const tabs = document.querySelectorAll("[data-rank-tab]");
    const list = document.querySelector("[data-ranking-list]");
    if (!tabs.length || !list) return;

    const data = {
      week: [
        ["Việt Dũng", "7", "VD"],
        ["Hải Dương", "7", "HD"],
        ["Thanh Bình", "7", "TB"],
        ["Thế Anh", "7", "TA"],
        ["Hải Đăng", "7", "HĐ"]
      ],
      month: [
        ["Thu Hà", "28", "TH"],
        ["Ngọc Anh", "26", "NA"],
        ["Minh Quân", "24", "MQ"],
        ["Hải Dương", "22", "HD"],
        ["Mai Linh", "21", "ML"]
      ],
      year: [
        ["Minh Anh", "215", "MA"],
        ["Quang Huy", "204", "QH"],
        ["Thu Hà", "198", "TH"],
        ["Gia Bảo", "190", "GB"],
        ["Hải Đăng", "186", "HĐ"]
      ]
    };

    function render(mode) {
      list.innerHTML = data[mode].map((item, index) => `
        <div class="home-rank-item">
          <span class="rank-medal ${index === 0 ? "rank-1" : index === 1 ? "rank-2" : index === 2 ? "rank-3" : ""}">${index + 1}</span>
          <strong>${item[0]}</strong>
          <span>Chuỗi: ${item[1]}</span>
          <span class="tiny-avatar">${item[2]}</span>
        </div>
      `).join("");
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((item) => item.classList.toggle("active", item === tab));
        render(tab.dataset.rankTab);
      });
    });
  }

  initHomePosterSlider();
  initHomeSearchModes();
  initHomeTips();
  initHomeRankingTabs();
})();

(() => {
  "use strict";

  const pageToast = document.getElementById("toast");
  let pageToastTimer;

  function pageNotify(message) {
    window.lingoNotify?.(message);
  }

  function initReferenceSearchPages() {
    const resultPage = document.querySelector("[data-result-page]");
    const form = document.querySelector("[data-search-page-form]");
    if (!resultPage || !form) return;

    const mode = resultPage.dataset.resultPage;
    const input = form.querySelector('input[name="q"]');
    const destinations = {
      word: "dictionary.html",
      example: "examples.html",
      collocation: "collocations.html"
    };

    const params = new URLSearchParams(window.location.search);
    const query = params.get("q") || "fortune";
    input.value = query;

    document.querySelectorAll("[data-result-tab]").forEach((tab) => {
      const tabMode = tab.dataset.resultTab;
      tab.classList.toggle("active", tabMode === mode);
      tab.href = `${destinations[tabMode]}?q=${encodeURIComponent(query)}`;
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = input.value.trim();
      if (!value) {
        pageNotify("Vui lòng nhập từ cần tra cứu.");
        input.focus();
        return;
      }
      window.location.href = `${destinations[mode]}?q=${encodeURIComponent(value)}`;
    });
  }

  function initDemoActions() {
    document.querySelectorAll("[data-demo-action]").forEach((button) => {
      button.addEventListener("click", () => {
        pageNotify(`${button.dataset.demoAction}: đã ghi nhận trong bản demo.`);
      });
    });
  }

  function initIrregularPagination() {
    const buttons = document.querySelectorAll("[data-irregular-page]");
    const list = document.querySelector(".lesson-reference-list");
    if (!buttons.length || !list) return;

    const rows = Array.from(list.querySelectorAll(".lesson-reference-word"));

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((item) => item.classList.toggle("active", item === button));

        const page = button.dataset.irregularPage;
        if (page === "5") {
          pageNotify("Các trang ở giữa được rút gọn trong bản demo.");
          return;
        }

        rows.forEach((row, index) => {
          row.animate(
            [
              { opacity: 0.35, transform: "translateY(5px)" },
              { opacity: 1, transform: "translateY(0)" }
            ],
            { duration: 260, delay: index * 18 }
          );
        });

        pageNotify(`Đã chuyển sang trang ${page}.`);
        window.scrollTo({
          top: document.querySelector(".lesson-reference-list").offsetTop - 75,
          behavior: "smooth"
        });
      });
    });
  }

  initReferenceSearchPages();
  initDemoActions();
  initIrregularPagination();
})();


(() => {
  "use strict";

  const toastElement = document.getElementById("toast");
  let matchedToastTimer;

  function matchedNotify(message) {
    window.lingoNotify?.(message);
  }

  function readJson(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value ?? fallback;
    } catch {
      return fallback;
    }
  }

  /* Notebook ------------------------------------------------ */

  function initMatchedNotebook() {
    const emptyState = document.getElementById("notebookEmptyState");
    const grid = document.getElementById("notebookFolderGrid");
    const creator = document.getElementById("notebookCreatePanel");
    const form = document.getElementById("notebookCreateForm");
    const input = document.getElementById("notebookNameInput");

    if (!emptyState || !grid || !creator || !form || !input) return;

    let notebooks = readJson("lingoverseMatchedNotebooks", []);

    function render() {
      grid.innerHTML = "";

      if (!notebooks.length) {
        emptyState.hidden = false;
        grid.hidden = true;
        return;
      }

      emptyState.hidden = true;
      grid.hidden = false;

      notebooks.forEach((notebook, index) => {
        const card = document.createElement("a");
        card.className = "notebook-folder-card";
        card.href = "notebook-detail.html";
        card.innerHTML = `
          <strong>${notebook.name}</strong>
          <span>${notebook.count ? notebook.count + " từ" : "chưa có dữ liệu"}</span>
        `;
        card.addEventListener("contextmenu", (event) => {
          event.preventDefault();
          window.LingoPopup.confirm({
            title: "Xóa sổ tay",
            message: `Bạn chắc chắn muốn xóa sổ tay “${notebook.name}”?`,
            confirmText: "Xóa",
            cancelText: "Hủy",
            onConfirm: () => {
              notebooks.splice(index, 1);
              localStorage.setItem("lingoverseMatchedNotebooks", JSON.stringify(notebooks));
              render();
            }
          });
        });
        grid.appendChild(card);
      });
    }

    function openCreator() {
      creator.hidden = false;
      input.focus();
    }

    function closeCreator() {
      creator.hidden = true;
      input.value = "";
    }

    document.getElementById("openNotebookCreator")?.addEventListener("click", openCreator);
    document.getElementById("cancelNotebookCreate")?.addEventListener("click", closeCreator);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = input.value.trim();

      if (!name) {
        matchedNotify("Vui lòng nhập tên sổ tay.");
        input.focus();
        return;
      }

      notebooks.push({ name, count: 0 });
      localStorage.setItem("lingoverseMatchedNotebooks", JSON.stringify(notebooks));
      closeCreator();
      render();
    });

    render();
  }

  /* Translate ------------------------------------------------ */

  function initMatchedTranslate() {
    const textTab = document.getElementById("textTranslateTab");
    const documentTab = document.getElementById("documentTranslateTab");
    const textPanel = document.getElementById("textTranslatePanel");
    const documentPanel = document.getElementById("documentTranslatePanel");
    const sourceLanguage = document.getElementById("sourceLanguage");
    const targetLanguage = document.getElementById("targetLanguage");
    const sourceText = document.getElementById("sourceText");
    const translatedText = document.getElementById("translatedText");
    const historyEmpty = document.getElementById("translateHistoryEmpty");
    const historyList = document.getElementById("translateHistoryList");
    const clearHistoryButton = document.getElementById("clearTranslationHistory");

    if (!textTab || !documentTab || !textPanel || !documentPanel) return;

    function setMode(mode) {
      const isText = mode === "text";
      textTab.classList.toggle("active", isText);
      documentTab.classList.toggle("active", !isText);
      textPanel.hidden = !isText;
      documentPanel.hidden = isText;
    }

    textTab.addEventListener("click", () => setMode("text"));
    documentTab.addEventListener("click", () => setMode("document"));

    function renderLanguageButtons(side, value) {
      document.querySelectorAll(`[data-language-side="${side}"]`).forEach((button) => {
        button.classList.toggle("active", button.dataset.language === value);
      });
    }

    document.querySelectorAll("[data-language-side]").forEach((button) => {
      button.addEventListener("click", () => {
        const select = button.dataset.languageSide === "source" ? sourceLanguage : targetLanguage;
        select.value = button.dataset.language;
        renderLanguageButtons(button.dataset.languageSide, select.value);
      });
    });

    renderLanguageButtons("source", sourceLanguage?.value || "en");
    renderLanguageButtons("target", targetLanguage?.value || "vi");

    document.getElementById("swapLanguage")?.addEventListener("click", () => {
      requestAnimationFrame(() => {
        renderLanguageButtons("source", sourceLanguage.value);
        renderLanguageButtons("target", targetLanguage.value);
      });
    });

    let translationHistory = readJson("lingoverseTranslationHistory", []);

    function renderTranslationHistory() {
      if (!historyList || !historyEmpty) return;

      historyList.innerHTML = "";

      translationHistory.forEach((historyItem) => {
        const item = document.createElement("article");
        item.className = "translate-history-item";

        const sourceParagraph = document.createElement("p");
        sourceParagraph.textContent = historyItem.source;

        const arrow = document.createElement("span");
        arrow.textContent = "⇆";

        const targetParagraph = document.createElement("p");
        targetParagraph.textContent = historyItem.target;

        item.append(sourceParagraph, arrow, targetParagraph);
        historyList.appendChild(item);
      });

      const hasHistory = translationHistory.length > 0;
      historyList.hidden = !hasHistory;
      historyEmpty.hidden = hasHistory;

      if (clearHistoryButton) {
        clearHistoryButton.hidden = !hasHistory;
      }
    }

    clearHistoryButton?.addEventListener("click", () => {
      const clearHistory = () => {
        translationHistory = [];
        localStorage.removeItem("lingoverseTranslationHistory");
        renderTranslationHistory();
        matchedNotify("Đã xóa lịch sử dịch.");
      };

      if (window.LingoPopup) {
        window.LingoPopup.confirm({
          title: "Xóa lịch sử dịch",
          message: "Bạn chắc chắn muốn xóa toàn bộ lịch sử dịch?",
          confirmText: "Xóa lịch sử",
          cancelText: "Hủy",
          onConfirm: clearHistory
        });
      } else {
        clearHistory();
      }
    });

    renderTranslationHistory();

    document.getElementById("translateButton")?.addEventListener("click", () => {
      setTimeout(() => {
        const sourceValue = sourceText?.value.trim();
        const targetValue = translatedText?.value.trim();

        if (!sourceValue || !targetValue) return;

        translationHistory.unshift({
          source: sourceValue,
          target: targetValue,
          createdAt: Date.now()
        });

        translationHistory = translationHistory.slice(0, 20);
        localStorage.setItem(
          "lingoverseTranslationHistory",
          JSON.stringify(translationHistory)
        );

        renderTranslationHistory();
      }, 0);
    });

    document.getElementById("voiceInputButton")?.addEventListener("click", () => {
      matchedNotify("Nhập bằng giọng nói đang ở chế độ minh họa.");
    });

    const documentInput = document.getElementById("translationDocumentInput");
    const selectedName = document.getElementById("selectedDocumentName");

    documentInput?.addEventListener("change", () => {
      const file = documentInput.files?.[0];
      selectedName.textContent = file
        ? `Đã chọn: ${file.name}`
        : "";
    });
  }

  /* Community ------------------------------------------------ */

  function initMatchedCommunity() {
    const postList = document.getElementById("communityPostList");
    const createOverlay = document.getElementById("createPostOverlay");
    const detailOverlay = document.getElementById("postDetailOverlay");
    const createForm = document.getElementById("createPostForm");
    const search = document.getElementById("communitySearch");

    if (!postList || !createOverlay || !detailOverlay) return;

    const postData = {
      duy: {
        author: "Duy",
        content: "according to = as said by; accurate = exact; based on = the results come from; data = information; human rights = the basic rights that all people should have.",
        likes: 10
      },
      dang: {
        author: "Đăng",
        content: "Mùa xuân – Spring – Haru; Mùa hạ – Summer – Natsu; Mùa thu – Autumn – Aki; Mùa đông – Winter – Fuyu.",
        likes: 50
      }
    };

    function openOverlay(overlay) {
      overlay.hidden = false;
      document.body.style.overflow = "hidden";
    }

    function closeOverlays() {
      createOverlay.hidden = true;
      detailOverlay.hidden = true;
      document.body.style.overflow = "";
    }

    document.getElementById("openCreatePost")?.addEventListener("click", () => {
      openOverlay(createOverlay);
      document.getElementById("newPostTitle")?.focus();
    });

    document.querySelectorAll("[data-close-community-modal]").forEach((button) => {
      button.addEventListener("click", closeOverlays);
    });

    [createOverlay, detailOverlay].forEach((overlay) => {
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) closeOverlays();
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeOverlays();
    });

    createForm?.addEventListener("submit", (event) => {
      event.preventDefault();

      const title = document.getElementById("newPostTitle").value.trim();
      const content = document.getElementById("newPostContent").value.trim();

      if (!title || !content) {
        matchedNotify("Vui lòng nhập đầy đủ tiêu đề và nội dung.");
        return;
      }

      const id = `post-${Date.now()}`;
      postData[id] = { author: "Việt Dũng", content: `${title}\n${content}`, likes: 0 };

      const post = document.createElement("article");
      post.className = "community-reference-post";
      post.dataset.postId = id;
      post.dataset.favorite = "false";
      post.dataset.following = "true";
      post.innerHTML = `
        <div class="community-post-author">
          <img src="assets/avatar-main.jpg" alt="">
          <div><strong>Việt Dũng</strong><span>Vừa xong</span></div>
        </div>
        <div class="community-post-copy">
          <p><strong>${title}</strong><br>${content}</p>
          <button class="community-more" type="button" data-expand-post="${id}">Xem thêm</button>
        </div>
        <div class="community-post-actions">
          <button type="button" data-like-post="${id}">♡ <span>0</span></button>
          <button type="button" data-open-post="${id}">▢ <span>0</span></button>
          <button type="button" data-report-post="${id}">▲</button>
        </div>
      `;
      postList.prepend(post);
      bindPostButtons(post);
      createForm.reset();
      closeOverlays();
      matchedNotify("Đã đăng bài viết.");
    });

    function showPost(id) {
      const data = postData[id];
      if (!data) return;

      document.getElementById("detailAuthor").textContent = data.author;
      document.getElementById("detailPostContent").textContent = data.content;
      document.getElementById("detailLikeCount").textContent = data.likes;
      openOverlay(detailOverlay);
    }

    function bindPostButtons(root = document) {
      root.querySelectorAll("[data-open-post]").forEach((button) => {
        if (button.dataset.bound) return;
        button.dataset.bound = "true";
        button.addEventListener("click", () => showPost(button.dataset.openPost));
      });

      root.querySelectorAll("[data-like-post]").forEach((button) => {
        if (button.dataset.bound) return;
        button.dataset.bound = "true";
        button.addEventListener("click", () => {
          const id = button.dataset.likePost;
          const count = button.querySelector("span");
          const isLiked = button.classList.toggle("liked");
          const difference = isLiked ? 1 : -1;
          const next = Math.max(0, Number(count.textContent) + difference);
          count.textContent = next;
          if (postData[id]) postData[id].likes = next;
          button.firstChild.textContent = isLiked ? "♥ " : "♡ ";
        });
      });

      root.querySelectorAll("[data-report-post]").forEach((button) => {
        if (button.dataset.bound) return;
        button.dataset.bound = "true";
        button.addEventListener("click", () => matchedNotify("Đã ghi nhận báo cáo bài viết."));
      });
    }

    bindPostButtons();

    document.querySelectorAll("[data-community-tab]").forEach((tab) => {
      tab.addEventListener("click", () => {
        document.querySelectorAll("[data-community-tab]").forEach((item) => {
          item.classList.toggle("active", item === tab);
        });

        const mode = tab.dataset.communityTab;
        postList.querySelectorAll(".community-reference-post").forEach((post) => {
          post.hidden =
            mode === "favorite" ? post.dataset.favorite !== "true" :
            mode === "following" ? post.dataset.following !== "true" :
            false;
        });
      });
    });

    search?.addEventListener("input", () => {
      const value = search.value.trim().toLowerCase();
      postList.querySelectorAll(".community-reference-post").forEach((post) => {
        post.hidden = !post.textContent.toLowerCase().includes(value);
      });
    });

    document.getElementById("communityCommentForm")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = document.getElementById("communityCommentInput");
      const value = input.value.trim();
      if (!value) return;
      matchedNotify("Đã thêm bình luận.");
      input.value = "";
    });
  }

  initMatchedNotebook();
  initMatchedTranslate();
  initMatchedCommunity();
})();


(() => {
  "use strict";

  const toast = document.getElementById("toast");
  let timer;

  function notify(message) {
    window.lingoNotify?.(message);
  }

  function readUser() {
    try {
      return JSON.parse(localStorage.getItem("lingoverseUser")) || null;
    } catch {
      return null;
    }
  }

  function normalizedUser() {
    const stored = readUser();

    return {
      fullName: stored?.fullName || "Việt Dũng",
      email: stored?.email || "2A21001D0078@students.hou.edu.vn",
      phone: stored?.phone || "1245657890"
    };
  }

  function initHeaderProfileDropdown() {
    const area = document.querySelector("[data-auth-area]");
    const existingAvatar = area?.querySelector(".header-demo-avatar");

    if (!area || !existingAvatar) return;

    area.innerHTML = `
      <div class="header-profile-control">
        <button class="header-profile-toggle" type="button" aria-expanded="false" aria-label="Mở menu tài khoản">
          <img src="assets/avatar-main.jpg" alt="">
        </button>

        <div class="header-profile-dropdown" hidden>
          <a href="profile.html">Hồ sơ cá nhân</a>
          <button type="button" data-header-logout>Đăng xuất</button>
        </div>
      </div>
    `;

    const toggle = area.querySelector(".header-profile-toggle");
    const dropdown = area.querySelector(".header-profile-dropdown");

    function closeMenu() {
      dropdown.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      dropdown.hidden = !dropdown.hidden;
      toggle.setAttribute("aria-expanded", String(!dropdown.hidden));
    });

    document.addEventListener("click", (event) => {
      if (!area.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    area.querySelector("[data-header-logout]")?.addEventListener("click", () => {
      localStorage.setItem("lingoverseLoggedIn", "false");
      window.location.href = "index.html";
    });
  }

  function fillReferenceProfile() {
    const user = normalizedUser();

    document.querySelectorAll("[data-profile-name]").forEach((element) => {
      element.textContent = user.fullName;
    });

    document.querySelectorAll("[data-profile-email]").forEach((element) => {
      element.textContent = user.email;
    });

    const nameInput = document.getElementById("editFullName");
    const emailInput = document.getElementById("editEmail");
    const phoneInput = document.getElementById("editPhone");

    if (nameInput) nameInput.value = user.fullName;
    if (emailInput) emailInput.value = user.email;
    if (phoneInput) phoneInput.value = user.phone;
  }

  function initReferenceProfileEdit() {
    const form = document.getElementById("profileSettingsForm");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("editFullName").value.trim();
      const email = document.getElementById("editEmail").value.trim();
      const phone = document.getElementById("editPhone").value.trim();
      const newPassword = document.getElementById("newProfilePassword").value;
      const confirmPassword = document.getElementById("confirmProfilePassword").value;

      if (!name || !email || !phone) {
        notify("Vui lòng nhập đầy đủ thông tin bắt buộc.");
        return;
      }

      if (newPassword && newPassword !== confirmPassword) {
        notify("Mật khẩu xác nhận không khớp.");
        return;
      }

      const previous = readUser() || {};
      localStorage.setItem(
        "lingoverseUser",
        JSON.stringify({
          ...previous,
          fullName: name,
          email,
          phone
        })
      );

      notify("Đã lưu hồ sơ.");
      setTimeout(() => {
        window.location.href = "profile.html";
      }, 650);
    });
  }

  initHeaderProfileDropdown();
  fillReferenceProfile();
  initReferenceProfileEdit();
})();


(() => {
  "use strict";

  const toastElement = document.getElementById("toast");
  let uiToastTimer;

  function notify(message) {
    window.lingoNotify?.(message);
  }

  function readJson(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value ?? fallback;
    } catch {
      return fallback;
    }
  }

  /* ---------------------------------------------------------
     Dropdown tìm kiếm từ vựng
     --------------------------------------------------------- */

  const vocabularyData = [
    { word: "fortune", phonetic: "/ˈfɔːtʃuːn/", meaning: "vận may, tài sản" },
    { word: "fortunate", phonetic: "/ˈfɔːtʃənət/", meaning: "may mắn" },
    { word: "fortunately", phonetic: "/ˈfɔːtʃənətli/", meaning: "may thay" },
    { word: "learn", phonetic: "/lɜːn/", meaning: "học, học hỏi" },
    { word: "learner", phonetic: "/ˈlɜːnə(r)/", meaning: "người học" },
    { word: "learning", phonetic: "/ˈlɜːnɪŋ/", meaning: "việc học" },
    { word: "hello", phonetic: "/həˈləʊ/", meaning: "xin chào" },
    { word: "beautiful", phonetic: "/ˈbjuːtɪfl/", meaning: "xinh đẹp" },
    { word: "confidence", phonetic: "/ˈkɒnfɪdəns/", meaning: "sự tự tin" },
    { word: "opportunity", phonetic: "/ˌɒpəˈtjuːnəti/", meaning: "cơ hội" },
    { word: "challenge", phonetic: "/ˈtʃælɪndʒ/", meaning: "thử thách" },
    { word: "environment", phonetic: "/ɪnˈvaɪrənmənt/", meaning: "môi trường" },
    { word: "communication", phonetic: "/kəˌmjuːnɪˈkeɪʃn/", meaning: "giao tiếp" },
    { word: "achieve", phonetic: "/əˈtʃiːv/", meaning: "đạt được" },
    { word: "improve", phonetic: "/ɪmˈpruːv/", meaning: "cải thiện" }
  ];

  function initVocabularyAutocomplete() {
    const selectors = [
      '.home-large-search input[name="q"]',
      '.global-search input[name="q"]',
      '.reference-search-form input[name="q"]',
      '[data-dictionary-search] input[name="q"]',
      '[data-search-page-form] input[name="q"]'
    ];

    const inputs = Array.from(document.querySelectorAll(selectors.join(",")))
      .filter((input, index, array) => array.indexOf(input) === index);

    inputs.forEach((input) => {
      const form = input.closest("form");
      if (!form || form.querySelector(".vocabulary-autocomplete")) return;

      form.classList.add("vocabulary-autocomplete-anchor");

      const dropdown = document.createElement("div");
      dropdown.className = "vocabulary-autocomplete";
      dropdown.hidden = true;
      form.appendChild(dropdown);

      let activeIndex = -1;
      let currentResults = [];

      function render() {
        const query = input.value.trim().toLowerCase();

        currentResults = vocabularyData
          .filter((item) => {
            if (!query) return true;
            return (
              item.word.toLowerCase().includes(query) ||
              item.meaning.toLowerCase().includes(query)
            );
          })
          .slice(0, 7);

        dropdown.innerHTML = "";
        activeIndex = -1;

        if (!currentResults.length) {
          dropdown.innerHTML = `
            <div class="vocabulary-autocomplete-title">Không tìm thấy từ phù hợp</div>
          `;
          dropdown.hidden = false;
          return;
        }

        const title = document.createElement("div");
        title.className = "vocabulary-autocomplete-title";
        title.textContent = query ? "Từ gợi ý" : "Từ được tìm nhiều";
        dropdown.appendChild(title);

        currentResults.forEach((item, index) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "vocabulary-suggestion";
          button.innerHTML = `
            <div class="vocabulary-suggestion-word">
              <strong>${item.word}</strong>
              <small>${item.phonetic}</small>
            </div>
            <div class="vocabulary-suggestion-meaning">${item.meaning}</div>
            <span>→</span>
          `;
          button.addEventListener("mousedown", (event) => {
            event.preventDefault();
            window.location.href = `word.html?q=${encodeURIComponent(item.word)}`;
          });
          dropdown.appendChild(button);
        });

        dropdown.hidden = false;
      }

      function close() {
        dropdown.hidden = true;
        activeIndex = -1;
      }

      input.addEventListener("focus", render);
      input.addEventListener("input", render);

      input.addEventListener("keydown", (event) => {
        const buttons = Array.from(dropdown.querySelectorAll(".vocabulary-suggestion"));
        if (!buttons.length || dropdown.hidden) return;

        if (event.key === "ArrowDown") {
          event.preventDefault();
          activeIndex = (activeIndex + 1) % buttons.length;
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          activeIndex = (activeIndex - 1 + buttons.length) % buttons.length;
        } else if (event.key === "Enter" && activeIndex >= 0) {
          event.preventDefault();
          buttons[activeIndex].dispatchEvent(new MouseEvent("mousedown"));
          return;
        } else if (event.key === "Escape") {
          close();
          return;
        } else {
          return;
        }

        buttons.forEach((button, index) => {
          button.classList.toggle("active", index === activeIndex);
        });
      });

      document.addEventListener("mousedown", (event) => {
        if (!form.contains(event.target)) close();
      });
    });
  }

  /* ---------------------------------------------------------
     Danh sách sổ tay
     --------------------------------------------------------- */

  function initNotebookList() {
    if (localStorage.getItem("lingoverseLoggedIn") !== "true") return;

    const list = document.getElementById("notebookList");
    const emptyState = document.getElementById("notebookEmptyState");
    const searchInput = document.getElementById("notebookSearchInput");
    const sortSelect = document.getElementById("notebookSortSelect");
    const modal = document.getElementById("notebookNameModal");
    const modalForm = document.getElementById("notebookNameModalForm");
    const modalTitle = document.getElementById("notebookNameModalTitle");
    const modalInput = document.getElementById("notebookModalName");
    const modalSubmit = document.getElementById("submitNotebookNameModal");

    if (
      !list ||
      !emptyState ||
      !searchInput ||
      !sortSelect ||
      !modal ||
      !modalForm ||
      !modalTitle ||
      !modalInput ||
      !modalSubmit
    ) {
      return;
    }

    let notebooks = readJson("lingoverseSmartNotebooks", []);
    let editingNotebookId = null;

    function save() {
      localStorage.setItem("lingoverseSmartNotebooks", JSON.stringify(notebooks));
    }

    function formatDate(timestamp) {
      return new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }).format(new Date(timestamp));
    }

    function renderStats() {
      const notebookCount = document.getElementById("notebookCount");
      const wordCount = document.getElementById("savedWordCount");
      const latestUpdate = document.getElementById("lastNotebookUpdate");

      if (notebookCount) notebookCount.textContent = notebooks.length;
      if (wordCount) {
        wordCount.textContent =
          notebooks.reduce((total, item) => total + item.words.length, 0);
      }

      const latest = notebooks
        .map((item) => item.updatedAt)
        .sort((a, b) => b - a)[0];

      if (latestUpdate) {
        latestUpdate.textContent = latest ? formatDate(latest) : "—";
      }
    }

    function visibleNotebooks() {
      const query = searchInput.value.trim().toLowerCase();
      const result = notebooks.filter((item) =>
        item.name.toLowerCase().includes(query)
      );

      if (sortSelect.value === "name") {
        result.sort((a, b) => a.name.localeCompare(b.name, "vi"));
      } else if (sortSelect.value === "count") {
        result.sort((a, b) => b.words.length - a.words.length);
      } else {
        result.sort((a, b) => b.updatedAt - a.updatedAt);
      }

      return result;
    }

    function closeNameModal() {
      modal.hidden = true;
      editingNotebookId = null;
      modalForm.reset();
      document.body.style.overflow = "";
    }

    function openNameModal(notebook = null) {
      editingNotebookId = notebook?.id || null;
      modalTitle.textContent = notebook ? "Đổi tên sổ tay" : "Tạo sổ tay";
      modalSubmit.textContent = notebook ? "Lưu" : "Thêm";
      modalInput.value = notebook?.name || "";
      modal.hidden = false;
      document.body.style.overflow = "hidden";

      requestAnimationFrame(() => {
        modalInput.focus();
        modalInput.select();
      });
    }

    function render() {
      renderStats();
      list.innerHTML = "";

      const visible = visibleNotebooks();
      const hasNotebooks = notebooks.length > 0;

      emptyState.hidden = hasNotebooks;
      list.hidden = !hasNotebooks;

      visible.forEach((item) => {
        const card = document.createElement("article");
        card.className = "notebook-folder-card-smart";
        card.style.setProperty("--folder-color", "#4A90E2");

        card.innerHTML = `
          <header>
            <span class="folder-icon">📘</span>
            <div class="folder-buttons">
              <button type="button" data-rename="${item.id}" title="Đổi tên">✎</button>
              <button type="button" data-delete="${item.id}" title="Xóa">×</button>
            </div>
          </header>

          <div>
            <h2>${item.name}</h2>
            <p>${item.words.length} từ đã lưu</p>
          </div>

          <footer>
            <a href="notebook-detail.html?id=${encodeURIComponent(item.id)}">Mở sổ tay →</a>
            <span>${formatDate(item.updatedAt)}</span>
          </footer>
        `;

        card.querySelector("[data-rename]")?.addEventListener("click", () => {
          openNameModal(item);
        });

        card.querySelector("[data-delete]")?.addEventListener("click", () => {
          window.LingoPopup.confirm({
            title: "Xóa sổ tay",
            message: `Bạn chắc chắn muốn xóa sổ tay “${item.name}”?`,
            confirmText: "Xóa",
            cancelText: "Hủy",
            onConfirm: () => {
              notebooks = notebooks.filter((notebook) => notebook.id !== item.id);
              save();
              render();
            }
          });
        });

        list.appendChild(card);
      });
    }

    document.getElementById("openNotebookForm")?.addEventListener("click", () => {
      openNameModal();
    });

    document.getElementById("emptyCreateNotebook")?.addEventListener("click", () => {
      openNameModal();
    });

    document.getElementById("closeNotebookNameModal")?.addEventListener(
      "click",
      closeNameModal
    );

    document.getElementById("cancelNotebookNameModal")?.addEventListener(
      "click",
      closeNameModal
    );

    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeNameModal();
    });

    modalForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = modalInput.value.trim();
      if (!name) {
        modalInput.focus();
        return;
      }

      if (editingNotebookId) {
        const notebook = notebooks.find((item) => item.id === editingNotebookId);
        if (notebook) {
          notebook.name = name;
          notebook.updatedAt = Date.now();
        }
      } else {
        notebooks.push({
          id: `notebook-${Date.now()}`,
          name,
          color: "#4A90E2",
          words: [],
          updatedAt: Date.now()
        });
      }

      save();
      closeNameModal();
      render();
    });

    searchInput.addEventListener("input", render);
    sortSelect.addEventListener("change", render);

    render();
  }

  /* ---------------------------------------------------------
     Danh sách từ trong sổ tay
     --------------------------------------------------------- */

  function initNotebookDetail() {
    if (localStorage.getItem("lingoverseLoggedIn") !== "true") return;

    const wordList = document.getElementById("notebookWordList");
    const emptyState = document.getElementById("notebookWordEmpty");
    const pagination = document.getElementById("notebookWordPagination");
    const addModal = document.getElementById("notebookAddWordModal");
    const addForm = document.getElementById("notebookAddWordForm");
    const lookupInput = document.getElementById("notebookLookupInput");
    const wordInput = document.getElementById("newWord");
    const meaningInput = document.getElementById("newMeaning");
    const phoneticInput = document.getElementById("newPhonetic");
    const phoneticPreview = document.getElementById("notebookPhoneticPreview");
    const noteInput = document.getElementById("newWordNote");
    const suggestions = document.getElementById("notebookWordSuggestions");

    const renameModal = document.getElementById("notebookDetailRenameModal");
    const renameForm = document.getElementById("notebookDetailRenameForm");
    const renameInput = document.getElementById("notebookDetailRenameInput");

    if (
      !wordList ||
      !emptyState ||
      !pagination ||
      !addModal ||
      !addForm ||
      !lookupInput ||
      !wordInput ||
      !meaningInput ||
      !phoneticInput ||
      !phoneticPreview ||
      !noteInput ||
      !suggestions
    ) {
      return;
    }

    let notebooks = readJson("lingoverseSmartNotebooks", []);
    const params = new URLSearchParams(window.location.search);
    let selectedId = params.get("id") || notebooks[0]?.id;
    let currentPage = 1;
    const pageSize = 10;

    if (!notebooks.length) {
      window.location.href = "notebook.html";
      return;
    }

    if (!notebooks.some((item) => item.id === selectedId)) {
      selectedId = notebooks[0].id;
    }

    function selectedNotebook() {
      return notebooks.find((item) => item.id === selectedId);
    }

    function save() {
      localStorage.setItem(
        "lingoverseSmartNotebooks",
        JSON.stringify(notebooks)
      );
    }

    function speak(word) {
      if (!("speechSynthesis" in window)) return;

      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      speechSynthesis.speak(utterance);
    }

    function closeSuggestions() {
      suggestions.hidden = true;
    }

    function resetAddForm() {
      addForm.reset();
      phoneticInput.value = "";
      phoneticPreview.textContent = "Chưa có dữ liệu";
      closeSuggestions();
    }

    function openAddModal() {
      resetAddForm();
      addModal.hidden = false;
      document.body.style.overflow = "hidden";

      requestAnimationFrame(() => {
        lookupInput.focus();
      });
    }

    function closeAddModal() {
      addModal.hidden = true;
      document.body.style.overflow = "";
      resetAddForm();
    }

    function selectSuggestion(item) {
      lookupInput.value = item.word;
      wordInput.value = item.word;
      meaningInput.value = item.meaning;
      phoneticInput.value = item.phonetic || "";
      phoneticPreview.textContent =
        item.phonetic || "Chưa có dữ liệu";
      closeSuggestions();
      noteInput.focus();
    }

    function renderSuggestions() {
      const query = lookupInput.value.trim().toLowerCase();

      const results = vocabularyData
        .filter((item) => {
          if (!query) return true;

          return (
            item.word.toLowerCase().includes(query) ||
            item.meaning.toLowerCase().includes(query)
          );
        })
        .slice(0, 7);

      suggestions.innerHTML = "";

      if (!results.length) {
        const message = document.createElement("p");
        message.className = "notebook-modal-suggestion-empty";
        message.textContent =
          "Không tìm thấy từ phù hợp. Bạn có thể nhập thủ công.";
        suggestions.appendChild(message);
        suggestions.hidden = false;
        return;
      }

      results.forEach((item) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "notebook-modal-suggestion";
        button.innerHTML = `
          <div>
            <strong>${item.word}</strong>
            <small>${item.phonetic || ""}</small>
          </div>
          <span>${item.meaning}</span>
        `;

        button.addEventListener("mousedown", (event) => {
          event.preventDefault();
          selectSuggestion(item);
        });

        suggestions.appendChild(button);
      });

      suggestions.hidden = false;
    }

    function renderPagination(totalPages) {
      pagination.innerHTML = "";

      if (totalPages <= 1) {
        pagination.hidden = true;
        return;
      }

      pagination.hidden = false;

      for (let page = 1; page <= totalPages; page += 1) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = page;
        button.classList.toggle("active", page === currentPage);

        button.addEventListener("click", () => {
          currentPage = page;
          render();
        });

        pagination.appendChild(button);
      }
    }

    function createWordRow(item) {
      const row = document.createElement("article");
      row.className = "notebook-reference-word-row";

      const thumbnail = document.createElement("div");
      thumbnail.className = "notebook-reference-word-thumb";
      thumbnail.textContent =
        String(item.word || "?").trim().charAt(0).toUpperCase() || "?";

      const information = document.createElement("div");
      information.className = "notebook-reference-word-info";

      const heading = document.createElement("h2");
      heading.textContent = item.word;

      const phonetic = document.createElement("span");
      phonetic.textContent =
        item.phonetic || "Chưa có phiên âm";

      const meaning = document.createElement("p");
      meaning.textContent = item.meaning;

      information.append(heading, phonetic, meaning);

      if (item.note) {
        const note = document.createElement("small");
        note.textContent = `Ghi chú: ${item.note}`;
        information.appendChild(note);
      }

      const actions = document.createElement("div");
      actions.className = "notebook-reference-word-actions";

      const speakButton = document.createElement("button");
      speakButton.type = "button";
      speakButton.title = "Phát âm";
      speakButton.textContent = "🔊";
      speakButton.addEventListener("click", () => speak(item.word));

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.title = "Xóa từ";
      deleteButton.className = "danger";
      deleteButton.textContent = "×";

      deleteButton.addEventListener("click", () => {
        window.LingoPopup.confirm({
          title: "Xóa từ vựng",
          message: `Bạn chắc chắn muốn xóa từ “${item.word}”?`,
          confirmText: "Xóa",
          cancelText: "Hủy",
          onConfirm: () => {
            const notebook = selectedNotebook();
            notebook.words = notebook.words.filter(
              (word) => word !== item
            );
            notebook.updatedAt = Date.now();

            const totalPages = Math.max(
              1,
              Math.ceil(notebook.words.length / pageSize)
            );
            currentPage = Math.min(currentPage, totalPages);

            save();
            render();
          }
        });
      });

      actions.append(speakButton, deleteButton);
      row.append(thumbnail, information, actions);

      return row;
    }

    function render() {
      const notebook = selectedNotebook();
      if (!notebook) return;

      document.getElementById("notebookDetailTitle").textContent =
        notebook.name;
      document.getElementById("notebookDetailWordCount").textContent =
        notebook.words.length;

      const words = [...notebook.words].sort((a, b) =>
        String(a.word).localeCompare(String(b.word), "en")
      );

      const totalPages = Math.max(
        1,
        Math.ceil(words.length / pageSize)
      );
      currentPage = Math.min(currentPage, totalPages);

      const start = (currentPage - 1) * pageSize;
      const visibleWords = words.slice(start, start + pageSize);

      wordList.innerHTML = "";

      visibleWords.forEach((item) => {
        wordList.appendChild(createWordRow(item));
      });

      const hasWords = words.length > 0;
      wordList.hidden = !hasWords;
      emptyState.hidden = hasWords;

      renderPagination(hasWords ? totalPages : 0);
    }

    document.getElementById("openAddWordForm")?.addEventListener(
      "click",
      openAddModal
    );

    document.getElementById("closeAddWordModal")?.addEventListener(
      "click",
      closeAddModal
    );

    addModal.addEventListener("click", (event) => {
      if (event.target === addModal) closeAddModal();
    });

    lookupInput.addEventListener("focus", renderSuggestions);
    lookupInput.addEventListener("input", renderSuggestions);

    wordInput.addEventListener("input", () => {
      const exact = vocabularyData.find(
        (item) =>
          item.word.toLowerCase() ===
          wordInput.value.trim().toLowerCase()
      );

      if (!exact) {
        phoneticInput.value = "";
        phoneticPreview.textContent = "Chưa có dữ liệu";
        return;
      }

      meaningInput.value = meaningInput.value || exact.meaning;
      phoneticInput.value = exact.phonetic || "";
      phoneticPreview.textContent =
        exact.phonetic || "Chưa có dữ liệu";
    });

    document.addEventListener("mousedown", (event) => {
      if (!event.target.closest(".notebook-modal-search-wrap")) {
        closeSuggestions();
      }
    });

    addForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const notebook = selectedNotebook();
      const word = wordInput.value.trim();
      const exact = vocabularyData.find(
        (item) =>
          item.word.toLowerCase() === word.toLowerCase()
      );

      const meaning =
        meaningInput.value.trim() || exact?.meaning || "";
      const phonetic =
        phoneticInput.value.trim() || exact?.phonetic || "";
      const note = noteInput.value.trim();

      if (!word || !meaning) {
        window.LingoPopup.alert(
          "Vui lòng nhập từ vựng và nghĩa.",
          "Lưu ý",
          "warning"
        );
        return;
      }

      const duplicated = notebook.words.some(
        (item) =>
          String(item.word).toLowerCase() === word.toLowerCase()
      );

      if (duplicated) {
        window.LingoPopup.alert(
          `Từ “${word}” đã có trong sổ tay.`,
          "Lưu ý",
          "warning"
        );
        return;
      }

      notebook.words.push({
        word,
        meaning,
        phonetic,
        note,
        createdAt: Date.now()
      });

      notebook.updatedAt = Date.now();
      currentPage = Math.ceil(notebook.words.length / pageSize);

      save();
      closeAddModal();
      render();
    });

    function openRenameModal() {
      const notebook = selectedNotebook();
      if (!notebook || !renameModal || !renameInput) return;

      renameInput.value = notebook.name;
      renameModal.hidden = false;
      document.body.style.overflow = "hidden";

      requestAnimationFrame(() => {
        renameInput.focus();
        renameInput.select();
      });
    }

    function closeRenameModal() {
      if (!renameModal || !renameForm) return;

      renameModal.hidden = true;
      renameForm.reset();
      document.body.style.overflow = "";
    }

    document.getElementById("renameCurrentNotebook")?.addEventListener(
      "click",
      openRenameModal
    );

    document.getElementById("closeNotebookDetailRename")?.addEventListener(
      "click",
      closeRenameModal
    );

    document.getElementById("cancelNotebookDetailRename")?.addEventListener(
      "click",
      closeRenameModal
    );

    renameModal?.addEventListener("click", (event) => {
      if (event.target === renameModal) closeRenameModal();
    });

    renameForm?.addEventListener("submit", (event) => {
      event.preventDefault();

      const notebook = selectedNotebook();
      const newName = renameInput.value.trim();

      if (!notebook || !newName) {
        renameInput.focus();
        return;
      }

      notebook.name = newName;
      notebook.updatedAt = Date.now();

      save();
      closeRenameModal();
      render();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;

      if (!addModal.hidden) {
        closeAddModal();
      } else if (renameModal && !renameModal.hidden) {
        closeRenameModal();
      }
    });

    render();
  }

  initVocabularyAutocomplete();
  initNotebookList();
  initNotebookDetail();
})();


(() => {
  "use strict";

  const loggedIn = () =>
    localStorage.getItem("lingoverseLoggedIn") === "true";

  function createPopupSystem() {
    if (document.getElementById("lingoPopupBackdrop")) return;

    const popupBackdrop = document.createElement("div");
    popupBackdrop.id = "lingoPopupBackdrop";
    popupBackdrop.className = "lingo-popup-backdrop";
    popupBackdrop.hidden = true;
    popupBackdrop.innerHTML = `
      <section class="lingo-popup-card" role="dialog" aria-modal="true" aria-labelledby="lingoPopupTitle">
        <div class="lingo-popup-icon" id="lingoPopupIcon">✓</div>
        <h2 id="lingoPopupTitle">Thông báo</h2>
        <p id="lingoPopupMessage"></p>
        <div class="lingo-popup-actions" id="lingoPopupActions"></div>
      </section>
    `;

    const reportBackdrop = document.createElement("div");
    reportBackdrop.id = "lingoReportBackdrop";
    reportBackdrop.className = "lingo-report-backdrop";
    reportBackdrop.hidden = true;
    reportBackdrop.innerHTML = `
      <form class="lingo-report-card" id="lingoReportForm">
        <button class="lingo-report-close" type="button" aria-label="Đóng">×</button>
        <h2>Báo cáo</h2>
        <textarea id="lingoReportText" required placeholder="Nhập vào nội dung báo cáo"></textarea>
        <div class="lingo-report-actions">
          <button type="submit">Gửi</button>
        </div>
      </form>
    `;

    document.body.append(popupBackdrop, reportBackdrop);

    const popupCard = popupBackdrop.querySelector(".lingo-popup-card");
    const popupIcon = document.getElementById("lingoPopupIcon");
    const popupTitle = document.getElementById("lingoPopupTitle");
    const popupMessage = document.getElementById("lingoPopupMessage");
    const popupActions = document.getElementById("lingoPopupActions");

    let primaryCallback = null;
    let secondaryCallback = null;

    function closePopup() {
      popupBackdrop.hidden = true;
      document.body.style.overflow = "";
      primaryCallback = null;
      secondaryCallback = null;
    }

    function showPopup(options = {}) {
      const {
        title = "Thông báo",
        message = "",
        type = "info",
        icon,
        primaryText = "Đóng",
        secondaryText = "",
        primaryHref = "",
        onPrimary = null,
        onSecondary = null,
      } = options;

      popupCard.className = `lingo-popup-card ${type}`;
      popupIcon.textContent =
        icon || (type === "success" ? "✓" : type === "warning" ? "!" : type === "error" ? "×" : "i");
      popupTitle.textContent = title;
      popupMessage.textContent = message;
      popupActions.innerHTML = "";
      popupActions.classList.toggle("two", Boolean(secondaryText));

      primaryCallback = onPrimary;
      secondaryCallback = onSecondary;

      if (secondaryText) {
        const secondaryButton = document.createElement("button");
        secondaryButton.type = "button";
        secondaryButton.textContent = secondaryText;
        secondaryButton.addEventListener("click", () => {
          const callback = secondaryCallback;
          closePopup();
          callback?.();
        });
        popupActions.appendChild(secondaryButton);
      }

      if (primaryHref) {
        const primaryLink = document.createElement("a");
        primaryLink.className = "primary";
        primaryLink.href = primaryHref;
        primaryLink.textContent = primaryText;
        popupActions.appendChild(primaryLink);
      } else {
        const primaryButton = document.createElement("button");
        primaryButton.type = "button";
        primaryButton.className = "primary";
        primaryButton.textContent = primaryText;
        primaryButton.addEventListener("click", () => {
          const callback = primaryCallback;
          closePopup();
          callback?.();
        });
        popupActions.appendChild(primaryButton);
      }

      popupBackdrop.hidden = false;
      document.body.style.overflow = "hidden";
    }

    window.LingoPopup = {
      show: showPopup,

      alert(message, title = "Thông báo", type = "info") {
        showPopup({ title, message, type });
      },

      confirm({
        title = "Xác nhận",
        message = "",
        confirmText = "Đồng ý",
        cancelText = "Hủy",
        onConfirm,
        onCancel,
      }) {
        showPopup({
          title,
          message,
          type: "warning",
          primaryText: confirmText,
          secondaryText: cancelText,
          onPrimary: onConfirm,
          onSecondary: onCancel,
        });
      },

      loginRequired(message = "Bạn cần đăng nhập để sử dụng chức năng này.") {
        showPopup({
          title: "Bạn cần đăng nhập",
          message,
          type: "warning",
          primaryText: "Đăng nhập ngay",
          secondaryText: "Để sau",
          primaryHref: `login.html?redirect=${encodeURIComponent(
            window.location.pathname.split("/").pop() + window.location.search
          )}`,
        });
      },

      report() {
        reportBackdrop.hidden = false;
        document.getElementById("lingoReportText").value = "";
        document.getElementById("lingoReportText").focus();
        document.body.style.overflow = "hidden";
      },
    };

    popupBackdrop.addEventListener("click", (event) => {
      if (event.target === popupBackdrop) closePopup();
    });

    reportBackdrop.addEventListener("click", (event) => {
      if (event.target === reportBackdrop) {
        reportBackdrop.hidden = true;
        document.body.style.overflow = "";
      }
    });

    reportBackdrop.querySelector(".lingo-report-close").addEventListener("click", () => {
      reportBackdrop.hidden = true;
      document.body.style.overflow = "";
    });

    document.getElementById("lingoReportForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const content = document.getElementById("lingoReportText").value.trim();

      if (!content) {
        showPopup({
          title: "Chưa có nội dung",
          message: "Vui lòng nhập nội dung cần báo cáo.",
          type: "warning",
        });
        return;
      }

      reportBackdrop.hidden = true;
      showPopup({
        title: "Gửi báo cáo thành công!",
        message: "Sự đóng góp của bạn giúp chúng tôi cải thiện mượt mà hơn.",
        type: "success",
        primaryText: "Quay lại trang chủ",
        secondaryText: "Đóng",
        primaryHref: "index.html",
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;

      if (!reportBackdrop.hidden) {
        reportBackdrop.hidden = true;
        document.body.style.overflow = "";
      } else if (!popupBackdrop.hidden) {
        closePopup();
      }
    });

    /* Convert every existing toast call into a real popup. */
    const toast = document.getElementById("toast");
    if (toast) {
      const observer = new MutationObserver(() => {
        if (!toast.classList.contains("show")) return;

        const message = toast.textContent.trim();
        toast.classList.remove("show");

        if (!message) return;

        const lower = message.toLowerCase();
        const isWarning =
          lower.includes("vui lòng") ||
          lower.includes("chưa") ||
          lower.includes("không") ||
          lower.includes("cần đăng nhập");
        const isSuccess =
          lower.includes("thành công") ||
          lower.startsWith("đã ") ||
          lower.includes("đã lưu") ||
          lower.includes("đã tạo") ||
          lower.includes("đã thêm");

        showPopup({
          title: isWarning ? "Lưu ý" : isSuccess ? "Thành công" : "Thông báo",
          message,
          type: isWarning ? "warning" : isSuccess ? "success" : "info",
        });
      });

      observer.observe(toast, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
      });
    }

    /* Report buttons use the report form instead of toast messages. */
    document.addEventListener(
      "click",
      (event) => {
        const trigger = event.target.closest(
          '[data-report-trigger], [data-report-post], .dictionary-report, [data-demo-action*="Báo lỗi"], [data-demo-action*="Báo cáo"]'
        );

        if (!trigger) return;

        event.preventDefault();
        event.stopImmediatePropagation();

        if (!loggedIn()) {
          window.LingoPopup.loginRequired("Bạn cần đăng nhập để gửi báo cáo.");
          return;
        }

        window.LingoPopup.report();
      },
      true
    );
  }

  function enforceNotebookAuthentication() {
    const currentPage = document.body.dataset.currentPage;
    if (currentPage !== "notebook" || loggedIn()) return;

    const main = document.querySelector("main");
    if (!main) return;

    const current =
      window.location.pathname.split("/").pop() + window.location.search;

    main.className = "notebook-guest-page";
    main.innerHTML = `
      <div class="container notebook-guest-container">
        <section class="notebook-guest-panel">
          <img src="assets/notebook-empty.png" alt="LingoVerse">
          <p>
            <a href="login.html?redirect=${encodeURIComponent(current)}">Đăng nhập</a>
            <span> để tạo sổ tay</span>
          </p>
        </section>
      </div>
    `;
  }

  function guardNotebookLinks() {
    document.addEventListener(
      "click",
      (event) => {
        if (loggedIn()) return;

        const link = event.target.closest(
          'a[href^="notebook-detail.html"]'
        );
        if (!link) return;

        event.preventDefault();
        event.stopImmediatePropagation();
        window.LingoPopup.loginRequired(
          "Đăng nhập để mở sổ tay cá nhân và xem các từ đã lưu."
        );
      },
      true
    );
  }

  createPopupSystem();
  enforceNotebookAuthentication();
  guardNotebookLinks();
})();


(() => {
  "use strict";

  const COMMUNITY_PREVIEW_LIMIT = 320;

  function normalizeCommunityText(value) {
    return String(value || "")
      .replace(/\u00a0/g, " ")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function ensureMoreButton(post, shouldShow) {
    const copy = post.querySelector(".community-post-copy");
    if (!copy) return;

    let button = copy.querySelector(".community-more");

    if (shouldShow && !button) {
      button = document.createElement("button");
      button.className = "community-more";
      button.type = "button";
      button.dataset.expandPost = post.dataset.postId || "";
      button.textContent = "Xem thêm";
      copy.appendChild(button);
    }

    if (button) {
      button.hidden = !shouldShow;
    }
  }

  function applyCommunityPreview(post) {
    const paragraph = post.querySelector(".community-post-copy p");
    if (!paragraph) return;

    const fullContent = normalizeCommunityText(
      post.dataset.fullContent || paragraph.innerText || paragraph.textContent
    );

    post.dataset.fullContent = fullContent;
    post.dataset.expanded = "false";

    const shouldTruncate = fullContent.length > COMMUNITY_PREVIEW_LIMIT;
    paragraph.textContent = shouldTruncate
      ? `${fullContent.slice(0, COMMUNITY_PREVIEW_LIMIT).trimEnd()}…`
      : fullContent;

    ensureMoreButton(post, shouldTruncate);
  }

  function openFullCommunityPost(post) {
    const overlay = document.getElementById("postDetailOverlay");
    if (!overlay || !post) return;

    const author =
      post.querySelector(".community-post-author strong")?.textContent?.trim() ||
      "Người dùng";

    const fullContent =
      post.dataset.fullContent ||
      normalizeCommunityText(
        post.querySelector(".community-post-copy p")?.innerText
      );

    const likeCount =
      post.querySelector("[data-like-post] span")?.textContent?.trim() || "0";

    document.getElementById("detailAuthor").textContent = author;
    document.getElementById("detailPostContent").textContent = fullContent;
    document.getElementById("detailLikeCount").textContent = likeCount;

    overlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function initCommunityPreviewLimit() {
    const list = document.getElementById("communityPostList");
    if (!list) return;

    list.querySelectorAll(".community-reference-post").forEach(applyCommunityPreview);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;

          if (node.matches(".community-reference-post")) {
            applyCommunityPreview(node);
          }

          node.querySelectorAll?.(".community-reference-post")
            .forEach(applyCommunityPreview);
        });
      });
    });

    observer.observe(list, { childList: true, subtree: true });

    document.addEventListener(
      "click",
      (event) => {
        const trigger = event.target.closest("[data-expand-post]");
        if (!trigger) return;

        const post = trigger.closest(".community-reference-post");
        const paragraph = post?.querySelector(".community-post-copy p");
        if (!post || !paragraph) return;

        event.preventDefault();
        event.stopImmediatePropagation();

        const fullContent =
          post.dataset.fullContent ||
          normalizeCommunityText(paragraph.innerText || paragraph.textContent);

        const isExpanded = post.dataset.expanded === "true";

        if (isExpanded) {
          paragraph.textContent =
            `${fullContent.slice(0, COMMUNITY_PREVIEW_LIMIT).trimEnd()}…`;
          post.dataset.expanded = "false";
          trigger.textContent = "Xem thêm";
        } else {
          paragraph.textContent = fullContent;
          post.dataset.expanded = "true";
          trigger.textContent = "Thu gọn";
        }
      },
      true
    );
  }

  function initDocumentTranslation() {
    const input = document.getElementById("translationDocumentInput");
    const dropZone = document.getElementById("documentDropZone");
    const browseButton = document.getElementById("selectDocumentButton");
    const info = document.getElementById("selectedDocumentInfo");
    const name = document.getElementById("selectedDocumentName");
    const meta = document.getElementById("selectedDocumentMeta");
    const removeButton = document.getElementById("removeSelectedDocument");

    if (!input || !dropZone || !browseButton || !info || !name || !meta) return;

    const allowedExtensions = ["pdf", "doc", "docx", "txt"];

    function notify(message, type = "info") {
      if (window.LingoPopup) {
        window.LingoPopup.alert(
          message,
          type === "warning" ? "Lưu ý" : "Thông báo",
          type
        );
      }
    }

    function formatFileSize(bytes) {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }

    function clearDocument() {
      input.value = "";
      info.hidden = true;
      name.textContent = "";
      meta.textContent = "";
      dropZone.classList.remove("has-file", "drag-active");
    }

    function showDocument(file) {
      if (!file) return;

      const extension = file.name.split(".").pop()?.toLowerCase() || "";

      if (!allowedExtensions.includes(extension)) {
        notify("Tệp không được hỗ trợ. Hãy chọn PDF, DOC, DOCX hoặc TXT.", "warning");
        clearDocument();
        return;
      }

      name.textContent = file.name;
      meta.textContent = `${extension.toUpperCase()} · ${formatFileSize(file.size)}`;
      info.hidden = false;
      dropZone.classList.add("has-file");
      dropZone.classList.remove("drag-active");

      if (extension === "txt") {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
          const characterCount = String(reader.result || "").length;

          if (characterCount > 4000) {
            notify(
              `Tệp có ${characterCount} ký tự, vượt quá giới hạn 4000 ký tự.`,
              "warning"
            );
            clearDocument();
            return;
          }

          meta.textContent =
            `TXT · ${formatFileSize(file.size)} · ${characterCount} ký tự`;
        });

        reader.readAsText(file);
      }
    }

    browseButton.addEventListener("click", () => input.click());

    input.addEventListener("change", () => {
      showDocument(input.files?.[0]);
    });

    removeButton?.addEventListener("click", clearDocument);

    ["dragenter", "dragover"].forEach((eventName) => {
      dropZone.addEventListener(eventName, (event) => {
        event.preventDefault();
        dropZone.classList.add("drag-active");
      });
    });

    ["dragleave", "dragend"].forEach((eventName) => {
      dropZone.addEventListener(eventName, () => {
        dropZone.classList.remove("drag-active");
      });
    });

    dropZone.addEventListener("drop", (event) => {
      event.preventDefault();
      showDocument(event.dataTransfer?.files?.[0]);
    });
  }

  initCommunityPreviewLimit();
  initDocumentTranslation();
})();
