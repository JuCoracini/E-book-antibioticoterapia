(function () {
  "use strict";

  function initCap7Page62() {
    const root = document.querySelector(".cap7-page62 [data-cap7-p62]");
    if (!root) return;

    const tabs = Array.from(root.querySelectorAll(".cap7-p62-chip"));
    const panels = Array.from(root.querySelectorAll(".cap7-p62-panel"));

    if (!tabs.length || !panels.length) return;

    function activate(key, moveFocus) {
      tabs.forEach(function (tab) {
        const isActive = tab.dataset.pathway === key;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", isActive ? "true" : "false");
        tab.setAttribute("tabindex", isActive ? "0" : "-1");

        if (isActive && moveFocus) {
          tab.focus();
        }
      });

      panels.forEach(function (panel) {
        panel.hidden = panel.dataset.panel !== key;
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        activate(tab.dataset.pathway, false);
      });

      tab.addEventListener("keydown", function (event) {
        const currentIndex = tabs.indexOf(tab);
        let nextIndex = null;

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          nextIndex = (currentIndex + 1) % tabs.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = tabs.length - 1;
        }

        if (nextIndex === null) return;

        event.preventDefault();
        activate(tabs[nextIndex].dataset.pathway, true);
      });
    });

    const initial = root.querySelector(".cap7-p62-chip.is-active");
    activate(initial ? initial.dataset.pathway : tabs[0].dataset.pathway, false);
  }

  function initCap7Page64() {
    const page = document.querySelector(".cap7-page64");
    if (!page) return;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initCap7Page62();
      initCap7Page64();
    });
  } else {
    initCap7Page62();
    initCap7Page64();
  }
})();

(function () {
  "use strict";

  function initCap7Page65() {
    const root = document.querySelector(".cap7-page65 [data-cap7-p65]");
    if (!root) return;

    const tabs = Array.from(root.querySelectorAll(".cap7-p65-chip"));
    const panels = Array.from(root.querySelectorAll(".cap7-p65-panel"));

    if (!tabs.length || !panels.length) return;

    function activate(key, moveFocus) {
      tabs.forEach(function (tab) {
        const isActive = tab.dataset.pathway === key;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", isActive ? "true" : "false");
        tab.setAttribute("tabindex", isActive ? "0" : "-1");

        if (isActive && moveFocus) {
          tab.focus();
        }
      });

      panels.forEach(function (panel) {
        panel.hidden = panel.dataset.panel !== key;
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        activate(tab.dataset.pathway, false);
      });

      tab.addEventListener("keydown", function (event) {
        const currentIndex = tabs.indexOf(tab);
        let nextIndex = null;

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          nextIndex = (currentIndex + 1) % tabs.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = tabs.length - 1;
        }

        if (nextIndex === null) return;

        event.preventDefault();
        activate(tabs[nextIndex].dataset.pathway, true);
      });
    });

    const initial = root.querySelector(".cap7-p65-chip.is-active");
    activate(initial ? initial.dataset.pathway : tabs[0].dataset.pathway, false);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCap7Page65);
  } else {
    initCap7Page65();
  }
})();

(function () {
  "use strict";

  function initCap7Page62() {
    const root = document.querySelector(".cap7-page62 [data-cap7-p62]");
    if (!root) return;

    const tabs = Array.from(root.querySelectorAll(".cap7-p62-chip"));
    const panels = Array.from(root.querySelectorAll(".cap7-p62-panel"));

    if (!tabs.length || !panels.length) return;

    function activate(key, moveFocus) {
      tabs.forEach(function (tab) {
        const isActive = tab.dataset.pathway === key;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", isActive ? "true" : "false");
        tab.setAttribute("tabindex", isActive ? "0" : "-1");

        if (isActive && moveFocus) {
          tab.focus();
        }
      });

      panels.forEach(function (panel) {
        panel.hidden = panel.dataset.panel !== key;
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        activate(tab.dataset.pathway, false);
      });

      tab.addEventListener("keydown", function (event) {
        const currentIndex = tabs.indexOf(tab);
        let nextIndex = null;

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          nextIndex = (currentIndex + 1) % tabs.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = tabs.length - 1;
        }

        if (nextIndex === null) return;

        event.preventDefault();
        activate(tabs[nextIndex].dataset.pathway, true);
      });
    });

    const initial = root.querySelector(".cap7-p62-chip.is-active");
    activate(initial ? initial.dataset.pathway : tabs[0].dataset.pathway, false);
  }

  function initCap7Page65() {
    const root = document.querySelector(".cap7-page65 [data-cap7-p65]");
    if (!root) return;

    const tabs = Array.from(root.querySelectorAll(".cap7-p65-chip"));
    const panels = Array.from(root.querySelectorAll(".cap7-p65-panel"));

    if (!tabs.length || !panels.length) return;

    function activate(key, moveFocus) {
      tabs.forEach(function (tab) {
        const isActive = tab.dataset.pathway === key;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", isActive ? "true" : "false");
        tab.setAttribute("tabindex", isActive ? "0" : "-1");

        if (isActive && moveFocus) {
          tab.focus();
        }
      });

      panels.forEach(function (panel) {
        panel.hidden = panel.dataset.panel !== key;
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        activate(tab.dataset.pathway, false);
      });

      tab.addEventListener("keydown", function (event) {
        const currentIndex = tabs.indexOf(tab);
        let nextIndex = null;

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          nextIndex = (currentIndex + 1) % tabs.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = tabs.length - 1;
        }

        if (nextIndex === null) return;

        event.preventDefault();
        activate(tabs[nextIndex].dataset.pathway, true);
      });
    });

    const initial = root.querySelector(".cap7-p65-chip.is-active");
    activate(initial ? initial.dataset.pathway : tabs[0].dataset.pathway, false);
  }

  function initCap7Page66() {
    const page = document.querySelector(".cap7-page66");
    if (!page) return;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initCap7Page62();
      initCap7Page65();
      initCap7Page66();
    });
  } else {
    initCap7Page62();
    initCap7Page65();
    initCap7Page66();
  }
})();

(function () {
  "use strict";

  function initCap7Page67() {
    const page = document.querySelector(".cap7-page67");
    if (!page) return;

    // Página 67 não possui interação ativa
    // Apenas garante inicialização segura sem erros
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCap7Page67);
  } else {
    initCap7Page67();
  }
})();

(function () {
  "use strict";

  function initCap7Page68() {
    const root = document.querySelector("[data-cap7-p68]");
    if (!root) return;

    const statusValue = root.querySelector(".cap7-p68Status__value");
    const questions = Array.from(root.querySelectorAll(".cap7-p68Question"));
    const completion = root.querySelector("[data-p68-completion]");

    function parseFeedbackMap(article) {
      const template = article.querySelector(".cap7-p68FeedbackMap");
      if (!template) return {};
      try {
        return JSON.parse(template.textContent.trim());
      } catch (error) {
        console.error("Erro ao ler feedback do quiz da página 68:", error);
        return {};
      }
    }

    function updateStatus() {
      const confirmedCount = questions.filter(function (question) {
        return question.getAttribute("data-question-state") === "confirmed";
      }).length;

      if (statusValue) {
        statusValue.textContent = confirmedCount + " de " + questions.length + " situações confirmadas";
      }

      if (completion) {
        completion.hidden = confirmedCount !== questions.length;
      }
    }

    function clearFeedback(feedback) {
      feedback.className = "cap7-p68Feedback";
      feedback.innerHTML = "";
    }

    questions.forEach(function (article) {
      const options = Array.from(article.querySelectorAll(".cap7-p68Options button"));
      const confirmButton = article.querySelector('[data-p68-action="confirm"]');
      const resetButton = article.querySelector('[data-p68-action="reset"]');
      const feedback = article.querySelector(".cap7-p68Feedback");
      const feedbackMap = parseFeedbackMap(article);

      let selectedAnswer = null;

      function resetQuestion() {
        selectedAnswer = null;
        article.setAttribute("data-question-state", "pending");

        options.forEach(function (button) {
          button.disabled = false;
          button.classList.remove("is-selected", "is-correct", "is-error");
        });

        if (confirmButton) {
          confirmButton.disabled = true;
        }

        if (resetButton) {
          resetButton.hidden = true;
        }

        if (feedback) {
          clearFeedback(feedback);
        }

        updateStatus();
      }

      options.forEach(function (button) {
        button.addEventListener("click", function () {
          if (article.getAttribute("data-question-state") === "confirmed") return;

          selectedAnswer = button.getAttribute("data-answer");

          options.forEach(function (option) {
            option.classList.remove("is-selected");
          });

          button.classList.add("is-selected");

          if (confirmButton) {
            confirmButton.disabled = false;
          }
        });
      });

      if (confirmButton) {
        confirmButton.addEventListener("click", function () {
          if (!selectedAnswer) return;

          const selectedButton = options.find(function (button) {
            return button.getAttribute("data-answer") === selectedAnswer;
          });

          const entry = feedbackMap[selectedAnswer];
          if (!selectedButton || !entry || !feedback) return;

          article.setAttribute("data-question-state", "confirmed");

          options.forEach(function (button) {
            button.disabled = true;
            button.classList.remove("is-selected");
          });

          selectedButton.classList.add(entry.type === "correct" ? "is-correct" : "is-error");

          feedback.classList.add("is-visible", entry.type === "correct" ? "is-correct" : "is-error");
          feedback.innerHTML =
            '<p class="cap7-p68Feedback__title">' + entry.title + '</p>' +
            '<p class="cap7-p68Feedback__text">' + entry.text + '</p>';

          confirmButton.disabled = true;

          if (resetButton) {
            resetButton.hidden = false;
          }

          updateStatus();
        });
      }

      if (resetButton) {
        resetButton.addEventListener("click", resetQuestion);
      }

      resetQuestion();
    });

    updateStatus();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCap7Page68);
  } else {
    initCap7Page68();
  }
})();