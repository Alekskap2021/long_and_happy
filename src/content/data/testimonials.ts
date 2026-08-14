import type { Testimonial } from "../schemas";

export const testimonials: Testimonial[] = [
  {
    slug: "otzyv-1",
    quote:
      "Я думала, что мне не хватает правильных слов. Оказалось, я двадцать раз задавала вопрос, на который был возможен только один ответ.",
    author: "Марина, 34",
    context: "после мини-диагностики и практикума",
    productSlug: "7-shagov-do-vazhnogo-razgovora",
  },
  {
    slug: "otzyv-2",
    quote:
      "Самое неудобное открытие курса: я ухожу из разговора не чтобы успокоиться, а чтобы наказать. Теперь я хотя бы называю паузу вслух.",
    author: "Дмитрий, 41",
    context: "базовый курс",
    productSlug: "bazovyy-kurs",
  },
];
