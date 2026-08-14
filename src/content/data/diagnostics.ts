import type { Diagnostic } from "../schemas";

export const diagnostics: Diagnostic[] = [
  {
    slug: "chto-vy-delaete-slovami",
    title: "Что вы делаете словами, когда разговор становится трудным?",
    subtitle:
      "Три жизненные ситуации, шесть вопросов. Мини-диагностика показывает, чего вы чаще хотите от трудного разговора, что при этом делаете словами и где цель расходится со способом.",
    promise: [
      "Чего вы чаще всего хотите, когда разговор становится трудным.",
      "Что вы фактически делаете словами в этот момент.",
      "Где цель и способ могут расходиться — и что с этим делать дальше.",
    ],
    disclaimer:
      "Это не тип личности, не оценка ваших отношений и не клинический тест. Результат описывает ваш ход в разговоре, а не вас.",
    privacyNote:
      "Мы не спрашиваем имя, почту и не сохраняем ответы. Результат считается на сервере и живёт только в этой вкладке.",
    durationMinutes: 4,
    illustration: "divergence",
    situations: [
      {
        id: "povtor",
        label: "Ситуация 1. Разговор по кругу",
        scene:
          "Вы обсуждаете то же самое, что и месяц назад. Вы понимаете, что сейчас снова прозвучат те же фразы, и всё равно продолжаете.",
        intentQuestion: {
          prompt: "Чего вам на самом деле хочется в этот момент?",
          options: [
            {
              id: "povtor-i1",
              label: "Чтобы человек почувствовал, как мне тяжело",
              intent: "understood",
            },
            {
              id: "povtor-i2",
              label: "Чтобы мы наконец о чём-то договорились",
              intent: "agreement",
            },
            {
              id: "povtor-i3",
              label: "Чтобы стало ближе, чтобы контакт вернулся",
              intent: "close",
            },
            {
              id: "povtor-i4",
              label: "Чтобы он признал, что был неправ",
              intent: "justice",
            },
          ],
        },
        actionQuestion: {
          prompt: "Что вы обычно делаете словами в этой сцене?",
          options: [
            {
              id: "povtor-a1",
              label: "Начинаю доказывать и приводить аргументы",
              action: "explain",
            },
            {
              id: "povtor-a2",
              label: "Напоминаю все прошлые случаи",
              action: "accuse",
            },
            {
              id: "povtor-a3",
              label: "Задаю вопрос, на который есть только один верный ответ",
              action: "probe",
            },
            {
              id: "povtor-a4",
              label: "Прямо говорю, что мне нужно",
              action: "ask",
            },
          ],
        },
      },
      {
        id: "prosba",
        label: "Ситуация 2. Нужна помощь",
        scene:
          "Вам нужна помощь, а просить трудно: кажется, что просьбу либо не услышат, либо она прозвучит как претензия.",
        intentQuestion: {
          prompt: "Чего вы хотите от этого разговора?",
          options: [
            {
              id: "prosba-i1",
              label: "Получить конкретную помощь",
              intent: "agreement",
            },
            {
              id: "prosba-i2",
              label: "Чтобы заметили, сколько я делаю",
              intent: "understood",
            },
            {
              id: "prosba-i3",
              label: "Чтобы стало справедливо",
              intent: "justice",
            },
            {
              id: "prosba-i4",
              label: "Перестать чувствовать себя одиноко",
              intent: "close",
            },
          ],
        },
        actionQuestion: {
          prompt: "Как это чаще всего звучит вслух?",
          options: [
            {
              id: "prosba-a1",
              label: "«Ты никогда мне не помогаешь»",
              action: "accuse",
            },
            {
              id: "prosba-a2",
              label: "«Сделаешь это к вечеру?» — прямая просьба",
              action: "ask",
            },
            {
              id: "prosba-a3",
              label: "Объясняю, почему это важно, долго и подробно",
              action: "explain",
            },
            {
              id: "prosba-a4",
              label: "Ничего не говорю и делаю сама",
              action: "withdraw",
            },
          ],
        },
      },
      {
        id: "napryazhenie",
        label: "Ситуация 3. Разговор накаляется",
        scene:
          "Голос стал громче, обоим уже неприятно. Вы чувствуете, что следующая фраза может сделать хуже.",
        intentQuestion: {
          prompt: "Что для вас в этот момент важнее всего?",
          options: [
            {
              id: "napryazhenie-i1",
              label: "Остановить это, стало небезопасно",
              intent: "safety",
            },
            {
              id: "napryazhenie-i2",
              label: "Всё-таки договорить до результата",
              intent: "agreement",
            },
            {
              id: "napryazhenie-i3",
              label: "Не остаться виноватым",
              intent: "justice",
            },
            {
              id: "napryazhenie-i4",
              label: "Не потерять человека",
              intent: "close",
            },
          ],
        },
        actionQuestion: {
          prompt: "Что вы делаете словами?",
          options: [
            {
              id: "napryazhenie-a1",
              label: "Настаиваю, пока не дослушают",
              action: "press",
            },
            {
              id: "napryazhenie-a2",
              label: "Замолкаю и ухожу без объяснений",
              action: "withdraw",
            },
            {
              id: "napryazhenie-a3",
              label: "Называю паузу и говорю, когда вернусь",
              action: "ask",
            },
            {
              id: "napryazhenie-a4",
              label: "Замираю, потому что боюсь его реакции",
              action: "withdraw",
              safetyFlag: true,
            },
          ],
        },
      },
    ],
  },
];
