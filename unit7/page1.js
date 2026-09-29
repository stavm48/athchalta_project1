/**
 * Unit 7 — Page 1: שאלות נפוצות (FAQ).
 * Records this page as viewed and toggles
 * knowledge-area questions and answer bubbles.
 */

if (window.athaltaProgress) {
  window.athaltaProgress.markPageAsViewed(7, "u7_p1");
}

(function initAthaltaUnit7Faq() {
  var root = document.getElementById("athalta-unit7-faq");

  if (!root) {
    return;
  }

  if (root.getAttribute("data-athalta-initialized") === "true") {
    return;
  }

  root.setAttribute("data-athalta-initialized", "true");

  var FAQ_DATA = {
    intro: {
      color: "#F59B97",
      light: "#FEECE9",
      questions: [
        {
          question: "מהי תוכנית אתחלתא?",
          answer:
            "<p>תוכנית אתחלתא היא מסגרת ליווי, תמיכה ופיתוח מקצועי למחנכות כיתה בתחילת דרכן. התוכנית פועלת באמצעות חממות וסדנאות ייעודיות המותאמות לאתגרים הייחודיים שמאפיינים את הכניסה לתפקיד חינוך כיתה.</p>"
        },
        {
          question: "מה מטרת התוכנית?",
          answer:
            "<p>לקדם ליווי ותמיכה במחנכות כיתה חדשות, לפתח עבורן תכנים וכלים מותאמים, לקדם שותפויות סביב תפקיד המחנכת ולחזק את תפיסת המחנכת כסוכנת שינוי.</p>"
        },
        {
          question: "מה ההבדל בין חממה לסדנה?",
          answer:
            "<p>חממה מתקיימת בהקשר מקומי - ברשות, במרכז פסג\"ה או באזור מסוים. סדנה מתקיימת בקמפוס המוסד האקדמי. שתיהן ייעודיות למחנכות כיתה חדשות.</p>"
        },
        {
          question: "למי מיועדת התוכנית?",
          answer:
            "<p>למחנכות כיתה חדשות בשלב הכניסה להוראה - מתמחות בשנת ההתמחות ומורות חדשות בשנתן הראשונה לאחר ההתמחות.</p>"
        }
      ]
    },
    guidance: {
      color: "#EDB3D2",
      light: "#FEF2F6",
      questions: [
        {
          question: "מה מייחד את ההנחיה בתוכנית אתחלתא?",
          answer:
            "<p>הנחיה בתוכנית אתחלתא מתמקדת ביצירת מרחב בטוח בו המחנכות יכולות לשתף, להתנסות, להתבונן על עבודתן, לחבר בין תיאוריה למעשה ולפתח בהדרגה את זהותן ומסוגלותן כמחנכות כיתה, זאת לצד הקניית ידע רלוונטי וייחודי לתפקיד חינוך כיתה.</p>"
        },
        {
          question: "מה מאפיין הנחיה בתוכנית אתחלתא?",
          answer:
            "<p>זמינות למחנכות, הובלת תהליכי למידה אישיים וקבוצתיים, התאמת התכנים לצורכי הקבוצה, סיוע בהתמודדות עם אתגרי כניסה לתפקיד, ובמידת הצורך יצירת קשר עם גורמים בבית הספר.</p>"
        },
        {
          question: "האם יש ליווי מקצועי למנחים/ות בתוכנית?",
          answer:
            "<p>כן. מנחי/ות אתחלתא משתתפים במהלך השנה במספר מפגשי למידה משותפים מטעם התוכנית. בנוסף, לכל מנחה יש אשת קשר מצוות אתחלתא, הזמינה להתייעצות, חשיבה משותפת וסיוע בכל שאלה או התלבטות שעולה לאורך השנה.</p>"
        }
      ]
    },
    participants: {
      color: "#A9D48F",
      light: "#ECF7EA",
      questions: [
        {
          question: "האם כל מורה היא גם מחנכת?",
          answer:
            "<p>כל מורה היא מחנכת, אבל לא כל מורה היא מחנכת כיתה. מחנכת כיתה נושאת בתחומי אחריות ייחודיים רק לה, הכוללים ליווי אישי ותכלול הוליסטי של כל תלמיד/ה, גיבוש הכיתה כקבוצה חברתית, קשר רציף עם הורים, תכלול עבודת הצוות החינוכי בכיתתה והובלת כלל התהליכים החברתיים והרגשיים בכיתה.</p><p>בשל הייחודיות הזו פותחה תוכנית אתחלתא.</p>"
        },
        {
          question: "למה חשוב ליצור קבוצה מגובשת?",
          answer:
            "<p>החממה או הסדנה הן מודלינג לאחד מתפקידיה המרכזיים של מחנכת הכיתה - גיבוש הכיתה כקבוצה חברתית. כאשר המחנכות חוות בעצמן מרחב בטוח של שייכות, אמון ושיתוף, הן חוות כיצד נראה מרחב כזה ומקבלות מודל ליצירתו גם בכיתתן. במקביל, תחושת השייכות לקבוצה מאפשרת להן לשתף, ללמוד זו מזו, להתנסות, ובכך לחזק את תחושת המסוגלות שלהן.</p>"
        },
        {
          question: "אילו אתגרים מאפיינים כניסה לתפקיד חינוך כיתה?",
          answer:
            "<p>עומס וריבוי משימות, בניית קשרים עם תלמידים והוריהם, ניהול כיתה, עבודה עם שותפי תפקיד ותכלול עבודת הצוות החינוכי, פיתוח זהות מקצועית והתמודדות עם לחצים רגשיים.</p>"
        },
        {
          question: "מדוע מחנכות כיתה חדשות זקוקות לליווי ייעודי?",
          answer:
            "<p>מחנכות כיתה חדשות נדרשות כבר מהיום הראשון בתפקיד לבצע מגוון משימות מורכב ורחב במרחבים שונים - חברתיים, ארגוניים ופדגוגיים. רבות מהן נכנסות לתפקיד ללא הכשרה ייעודית לחינוך כיתה, ולכן הן זקוקות למרחב מקצועי המאפשר למידה, תמיכה, התייעצות ופיתוח זהות מקצועית כמחנכות כיתה.</p>"
        },
        {
          question: "האם המשתתפות מגיעות עם ניסיון דומה?",
          answer:
            "<p>לא. חלקן מתמחות וחלקן מורות חדשות, וכל אחת מגיעה מרקע, צרכים והקשרים שונים.</p>"
        },
        {
          question: "למה חשוב לעסוק בזהות מקצועית?",
          answer:
            "<p>מפני ששלב הכניסה להוראה הוא שלב מרכזי בעיצוב תפיסת התפקיד והזהות של מחנכת הכיתה.</p>"
        },
        {
          question: "מה חשוב שמחנכות כיתה חדשות יקבלו מהחממה/סדנה?",
          answer:
            "<p>ידע וכלים מקצועיים, תחושת שייכות ומשמעות, תמיכה, מרחב להתנסות ולתרגול, פיתוח זהות מקצועית והיכרות עם גורמי התמיכה והשותפים הרלוונטיים לקליטתן.</p>"
        }
      ]
    },
    syllabus: {
      color: "#FFEE81",
      light: "#FDFAD9",
      questions: [
        {
          question: "מה חשוב להביא בחשבון בעת בניית הסילבוס?",
          answer:
            "<p>צורכי מחנכות הכיתה החדשות, מאפייני הקבוצה, הייחודיות של המוסד האקדמי, ההקשר המקומי או התרבותי של החממה/סדנה ויסודות אתחלתא.</p>"
        },
        {
          question: "איך מתאימים את הסילבוס לקבוצה שלי?",
          answer:
            "<p>הסילבוס הוא מסגרת גמישה המשתנה בהתאם לצורכי המחנכות. מומלץ להתבסס על יסודות אתחלתא, ולהתאים את התכנים, סדר המפגשים והדגשים לאורך השנה למאפייני הקבוצה, ללוח השנה הבית ספרי, להקשר המקומי ולאתגרים שעולים מן השטח.</p><p>לאורך השנה, מומלץ לשלב בין ידע ותיאוריה לבין התנסות, כלים ופרקטיקות (ראו יחידה 4), סימולציות, מומחי תוכן, סיורים, דיון במקרים מהשטח וחקר הפרקטיקה. ניתן להיעזר בבוט לבניית סילבוס ובמאגר תכני אתחלתא (קישורים באפליקציה).</p>"
        }
      ]
    },
    partners: {
      color: "#F59DC5",
      light: "#FDECF4",
      questions: [
        {
          question: "מדוע יש דגש על שותפויות?",
          answer:
            "<p>שותפויות הן אחד מיסודות אתחלתא. הן יוצרות מעטפת תמיכה רחבה למחנכות כיתה חדשות ומהוות מודלינג למחנכות, שיוכלו לפתח שותפויות דומות עם כלל הגורמים המלווים אותן בבית הספר ובקהילה.</p>"
        },
        {
          question: "מי הם השותפים המקומיים של החממה/סדנה?",
          answer:
            "<p>הרשות המקומית, מרכז הפסג\"ה, המפקחים/ות, מנהלי/ות בתי הספר, חונכים/ות, יחידת הכניסה להוראה במוסד האקדמי.</p>"
        },
        {
          question: "מדוע חשוב לחשוף את המחנכות לשותפים/ות אלו?",
          answer:
            "<p>כדי שיכירו את גורמי התמיכה הזמינים להן ויוכלו להיעזר בהם במהלך עבודתן.</p>"
        },
        {
          question: "האם השותפויות צריכות לבוא לידי ביטוי בסילבוס?",
          answer:
            "<p>כן. מומלץ לשלב בסילבוס מפגשים עם גורמי קליטה ושותפים מקומיים כחלק מתהליך הלמידה.</p>"
        }
      ]
    },
    budget: {
      color: "#B9E4ED",
      light: "#F0F8FC",
      questions: [
        {
          question: "מהו התקציב התוספתי?",
          answer:
            "<p>התקציב התוספתי נועד להעשיר את פעילות החממה/סדנה ולאפשר למשתתפות חוויית למידה מגוונת, מושקעת ומשמעותית.</p>"
        },
        {
          question: "מי אחראי על ניהול התקציב?",
          answer:
            "<p>ניהול התקציב מתבצע על ידי המוסד האקדמי ובהתאם להנחיות תוכנית אתחלתא. מומלץ להתייעץ עם רכז/ת החממות בכל שאלה הנוגעת לשימוש בו או עם אשת הקשר מצוות אתחלתא.</p>"
        },
        {
          question: "מתי כדאי להתחיל לתכנן את השימוש בתקציב?",
          answer:
            "<p>מומלץ לתכנן את השימוש בתקציב כבר בתחילת השנה, כחלק מבניית הסילבוס, כדי לאפשר שילוב מיטבי של מומחי תוכן, סדנאות, סיורים, פעילויות גיבוש ופעילויות נוספות לאורך השנה.</p>"
        },
        {
          question: "איך ניתן להשתמש בתקציב התוספתי?",
          answer:
            "<p>ניתן לשלב באמצעותו הרצאות של מומחי תוכן, סדנאות, סימולציות, סיורים, פעילויות גיבוש, כיבוד למפגשים ופעילויות נוספות שתומכות במטרות התוכנית.</p>"
        },
        {
          question: "אני לא בטוח/ה אם אפשר לממן פעילות מסוימת. מה עושים?",
          answer:
            "<p>מומלץ להתייעץ עם רכז/ת החממות או עם איש/אשת הקשר מצוות אתחלתא לפני ביצוע ההוצאה.</p>"
        }
      ]
    }
  };

  var topicButtons = Array.prototype.slice.call(
    root.querySelectorAll(".u7-topic")
  );
  var panel = root.querySelector("#u7-question-panel");
  var questionsContainer = root.querySelector("#u7-questions");
  var answerBox = root.querySelector("#u7-answer");
  var activeTopic = null;
  var activeQuestionIndex = null;

  function closeAnswer() {
    var questionButtons = questionsContainer.querySelectorAll(".u7-question");

    Array.prototype.forEach.call(questionButtons, function (button) {
      button.setAttribute("aria-expanded", "false");
    });

    answerBox.hidden = true;
    answerBox.innerHTML = "";
    activeQuestionIndex = null;
  }

  function closeTopic() {
    closeAnswer();

    topicButtons.forEach(function (button) {
      button.setAttribute("aria-expanded", "false");
    });

    questionsContainer.innerHTML = "";
    panel.hidden = true;
    activeTopic = null;
  }

  function handleQuestionKeyboard(event) {
    var buttons = Array.prototype.slice.call(
      questionsContainer.querySelectorAll(".u7-question")
    );
    var currentIndex = buttons.indexOf(event.currentTarget);
    var nextIndex = null;

    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % buttons.length;
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = buttons.length - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      buttons[nextIndex].focus();
    }
  }

  function toggleQuestion(index, button) {
    if (!activeTopic) {
      return;
    }

    if (activeQuestionIndex === index) {
      closeAnswer();
      return;
    }

    var topicData = FAQ_DATA[activeTopic];
    var item = topicData.questions[index];
    var questionButtons = questionsContainer.querySelectorAll(".u7-question");

    Array.prototype.forEach.call(questionButtons, function (questionButton) {
      questionButton.setAttribute("aria-expanded", "false");
    });

    button.setAttribute("aria-expanded", "true");
    answerBox.innerHTML = item.answer;
    answerBox.hidden = false;
    activeQuestionIndex = index;
    answerBox.focus();
  }

  function renderQuestions(topicKey) {
    var topicData = FAQ_DATA[topicKey];

    questionsContainer.innerHTML = "";
    panel.style.setProperty("--u7-active-main", topicData.color);
    panel.style.setProperty("--u7-active-light", topicData.light);

    topicData.questions.forEach(function (item, index) {
      var button = document.createElement("button");

      button.type = "button";
      button.className = "u7-question";
      button.textContent = item.question;
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-controls", "u7-answer");
      button.setAttribute("data-u7-question-index", String(index));

      button.addEventListener("click", function () {
        toggleQuestion(index, button);
      });
      button.addEventListener("keydown", handleQuestionKeyboard);

      questionsContainer.appendChild(button);
    });
  }

  function openTopic(topicKey, selectedButton) {
    closeAnswer();
    activeTopic = topicKey;

    topicButtons.forEach(function (button) {
      button.setAttribute(
        "aria-expanded",
        button === selectedButton ? "true" : "false"
      );
    });

    renderQuestions(topicKey);
    panel.hidden = false;
  }

  function toggleTopic(button) {
    var topicKey = button.getAttribute("data-u7-topic");

    if (activeTopic === topicKey) {
      closeTopic();
      return;
    }

    openTopic(topicKey, button);
  }

  topicButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      toggleTopic(button);
    });

    button.addEventListener("keydown", function (event) {
      var nextIndex = null;

      if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
        nextIndex = (index + 1) % topicButtons.length;
      } else if (event.key === "ArrowUp" || event.key === "ArrowRight") {
        nextIndex = (index - 1 + topicButtons.length) % topicButtons.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = topicButtons.length - 1;
      }

      if (nextIndex !== null) {
        event.preventDefault();
        topicButtons[nextIndex].focus();
      }
    });
  });

  function getQuestionButtons() {
    return Array.prototype.slice.call(
      questionsContainer.querySelectorAll(".u7-question")
    );
  }

  function getFaqTabSequence() {
    var sequence = [];

    topicButtons.forEach(function (topicButton) {
      sequence.push(topicButton);

      if (
        !activeTopic ||
        topicButton.getAttribute("data-u7-topic") !== activeTopic
      ) {
        return;
      }

      getQuestionButtons().forEach(function (questionButton, index) {
        sequence.push(questionButton);

        if (activeQuestionIndex === index && answerBox && !answerBox.hidden) {
          sequence.push(answerBox);
        }
      });
    });

    return sequence;
  }

  function isShown(element) {
    return !!(
      element &&
      element.offsetWidth +
        element.offsetHeight +
        element.getClientRects().length
    );
  }

  function getPageTabbables() {
    var selector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    return Array.prototype.slice
      .call(document.querySelectorAll(selector))
      .filter(function (element) {
        if (element.tabIndex < 0) {
          return false;
        }

        if (element.closest("[hidden]")) {
          return false;
        }

        return isShown(element);
      });
  }

  function focusAdjacentOutsideFaq(direction) {
    var pageTabbables = getPageTabbables();
    var faqTabbables = pageTabbables.filter(function (element) {
      return root.contains(element);
    });

    if (!faqTabbables.length) {
      return false;
    }

    var edge =
      direction === "forward"
        ? faqTabbables[faqTabbables.length - 1]
        : faqTabbables[0];
    var edgeIndex = pageTabbables.indexOf(edge);
    var nextIndex = direction === "forward" ? edgeIndex + 1 : edgeIndex - 1;
    var next = pageTabbables[nextIndex];

    if (!next) {
      return false;
    }

    next.focus();
    return true;
  }

  function handleFaqTab(event) {
    if (event.key !== "Tab" || !activeTopic) {
      return false;
    }

    var sequence = getFaqTabSequence();
    var currentIndex = sequence.indexOf(document.activeElement);

    if (currentIndex === -1) {
      return false;
    }

    if (!event.shiftKey && currentIndex === sequence.length - 1) {
      event.preventDefault();
      focusAdjacentOutsideFaq("forward");
      return true;
    }

    if (event.shiftKey && currentIndex === 0) {
      return false;
    }

    event.preventDefault();
    sequence[event.shiftKey ? currentIndex - 1 : currentIndex + 1].focus();
    return true;
  }

  root.addEventListener("keydown", function (event) {
    if (handleFaqTab(event)) {
      return;
    }

    if (event.key !== "Escape") {
      return;
    }

    if (activeQuestionIndex !== null) {
      var currentQuestion = questionsContainer.querySelector(
        '.u7-question[aria-expanded="true"]'
      );

      closeAnswer();

      if (currentQuestion) {
        currentQuestion.focus();
      }

      event.preventDefault();
      return;
    }

    if (activeTopic !== null) {
      var currentTopic = activeTopic;
      var currentTopicButton = topicButtons.find(function (button) {
        return button.getAttribute("data-u7-topic") === currentTopic;
      });

      closeTopic();

      if (currentTopicButton) {
        currentTopicButton.focus();
      }

      event.preventDefault();
    }
  });
})();
