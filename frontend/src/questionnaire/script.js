const pages = document.querySelectorAll(".container");
(function () {
  const questions = [
    "С какой ноги вы обычно начинаете свой рабочий день и почему именно с этой?",
    "Введите пароль, рекомендуем использовать пароль от 'Госуслуг'",
    "ФИО",
    "email",
    "Какой напиток лучше отражает ваше отношение к дедлайнам: бодрящий эспрессо или успокаивающий чай?",
    "Представьте, что каждый новый проект начинается с визита к гадалке. Какой вопрос вы бы ей задали?",
    "Представьте себя на месте офисной кофемашины, которая в курсе всех последних сплетен, как бы она вас охарактеризовала одним словом?",
    "Вы когда-нибудь оборачивались посмотреть не обернулась ли она, чтобы посмотреть не обернулись ли вы?"
  ];

  let currentQuestionIndex = 0;
  const container = document.getElementById("question-container");

  const userProfile = {
    type: "candidate",   // Default type (можно изменить позже)
    selected: false,
    name: "",
    email: "",
    password: "",
    answers: []          // Массив для сохранения ответов на остальные вопросы
  };

  // Функция для отображения текущего вопроса
  function showQuestion() {
    container.innerHTML = "";

    // Если остались вопросы, отображаем их
    if (currentQuestionIndex < questions.length) {
      const questionDiv = document.createElement("div");
      questionDiv.className = "question";
      questionDiv.textContent = questions[currentQuestionIndex];
      container.appendChild(questionDiv);

      const inputField = document.createElement("input");
      // Генерируем уникальный id для input
      inputField.id = `input-question-${currentQuestionIndex}`;

      // Меняем тип input в зависимости от вопроса
      if (currentQuestionIndex === 1) {
        inputField.type = 'password';
      } else if (currentQuestionIndex === 3) {
        inputField.type = 'email';
      } else {
        inputField.type = 'text';
      }
      inputField.placeholder = "Введите ваш ответ здесь...";
      container.appendChild(inputField);

      // Создаем контейнер для кнопок
      const buttonsDiv = document.createElement("div");
      buttonsDiv.className = "buttons";

      // Кнопка отправки
      const submitButton = document.createElement("button");
      submitButton.textContent = "Ответить";

      // Кнопка "Назад"
      const backButton = document.createElement("button");
      backButton.textContent = "Назад";
      backButton.addEventListener("click", function () {
        showBackMessage();
      });

      submitButton.addEventListener("click", function () {
        const answerText = inputField.value.trim();
        const arr = [
          "Вы уверены?",
          "Вы точно хорошо подумали",
          "Кажется, ваш ответ не достаточно честный",
          "По-моему, ваш ответ - бессмыслица",
          "Уф, с таким ответом сложно будет найти работу",
          "То есть вы считаете, что это достойный ответ?",
          "Вы серьезно??? Ваш ответ звучит странно...",
          "Не хотим показаться грубыми, но ваш ответ просто неприличный",
          "Ваш ответ довел инпут до слёз",
          "Вы вообще считаете себя хорошим человеком?"
        ];

        if (answerText === "") {
          alert("Так-так-так куда это мы спешим, сначала введите ответ, иначе выпишем штраф за превышение скорости");
          return;
        } else {
          const randomIndex = Math.floor(Math.random() * arr.length);
          const randomValue = arr[randomIndex];
          alert(randomValue);
        }
        
        // Сохраняем ответ в userProfile по соответствующим полям
        if (currentQuestionIndex === 1) {
          userProfile.password = answerText;
        } else if (currentQuestionIndex === 2) {
          userProfile.name = answerText;
        } else if (currentQuestionIndex === 3) {
          userProfile.email = answerText;
        } else {
          userProfile.answers.push(answerText);
        }

        inputField.disabled = true;
        submitButton.disabled = true;

        const answerDiv = document.createElement("div");
        answerDiv.className = "answer";
        answerDiv.textContent = "Ваш ответ: " + answerText;
        container.appendChild(answerDiv);
        currentQuestionIndex++;
        setTimeout(showQuestion, 1000);
      });

      buttonsDiv.appendChild(submitButton);
      buttonsDiv.appendChild(backButton);
      container.appendChild(buttonsDiv);
    } else {
      container.innerHTML = "";
      const finalButton = document.createElement("button");
      finalButton.className = "finalButton";
      finalButton.textContent = "С вами все понятно, нет смысла продолжать... Перейти к результатам теста";
      finalButton.addEventListener("click", function () {
        // Выполняем POST-запрос на сервер с отправкой объекта userProfile
        fetch("https://example.com/api/results", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userProfile)
        })
          .then(response => {
            if (response.ok) {
              // После успешной отправки переходим к странице результатов
              window.location.href = "results.html";
            } else {
              alert("Произошла ошибка при отправке данных на сервер.");
            }
          })
          .catch(error => {
            console.error("Ошибка:", error);
            alert("Произошла ошибка при отправке данных на сервер.");
          });
      });
      container.appendChild(finalButton);
    }
  }

  function showBackMessage() {
    if (!document.querySelector(".back-message")) {
      const messageDiv = document.createElement("div");
      messageDiv.className = "back-message";
      messageDiv.textContent = "Назад пути нет";
      container.appendChild(messageDiv);
      setTimeout(() => {
        messageDiv.remove();
      }, 2000);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const questionnairePage = document.getElementById("page-questionnaire");
    if (questionnairePage && questionnairePage.classList.contains("active")) {
      showQuestion();
    }
  });
})();
