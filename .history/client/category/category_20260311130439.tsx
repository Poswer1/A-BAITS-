import { 
  ChevronDown, Fish, Zap, Activity, Settings, Link2, Layers, Snowflake, ArrowRightCircle, Feather, Gift, Monitor, Box 
} from "lucide-react";

export const categoriesWithIcons = [
  {
    name: "Приманки",
    icon: <Fish />,
    subcategories: [
      {
        name: "Воблеры",
        subcategories: [
          { name: "Минноу" },
          { name: "Шэд" },
          { name: "Фэт" },
          { name: "Кренк" },
          { name: "Раттлины" },
          { name: "Джеркбейты" },
          { name: "Свимбейты" },
          { name: "Попперы" },
          { name: "Волкеры и стикбейты" },
          { name: "Кроулеры" },
          { name: "Хендмейд UA" }
        ]
      },
      { name: "Наборы приманок", subcategories: [] },
      { name: "Силиконовые приманки", subcategories: [] },
      { name: "Блёсны", subcategories: [] },
      { name: "Цикады", subcategories: [] },
      { name: "Копии приманок", subcategories: [] }
    ]
  },
  { name: "Леска, плетеные шнуры", icon: <Zap />, subcategories: [] },
  { name: "Удилища", icon: <Activity />, subcategories: [
      { name: "Кастинговые удилища", subcategories: [] },
      { name: "Спиннинговые удилища", subcategories: [] },
      { name: "Фидерные/Карповые удилища", subcategories: [] },
      { name: "Прочие", subcategories: [] }
  ] },
  { name: "Рыболовные катушки", icon: <Settings />, subcategories: [
      { name: "Безынерционные катушки", subcategories: [] },
      { name: "Мультипликаторные катушки", subcategories: [] },
      { name: "Запчасти для катушек и смазки", subcategories: [] }
  ] },
  { name: "Крючки", icon: <Link2 />, subcategories: [
      { name: "Джиг-головки, чебурашки, груза", subcategories: [] },
      { name: "Крючки, двойники, тройники", subcategories: [] }
  ] },
  { name: "Карабины, поводки", icon: <Link2 />, subcategories: [] },
  { name: "Аксессуары", icon: <Layers />, subcategories: [
      { name: "Инструменты / Ножи", subcategories: [] },
      { name: "Подсачеки, багорики, Lip Grip", subcategories: [] },
      { name: "Рыболовные сумки/тубусы/чехлы/ящики и коробки", subcategories: [] }
  ] },
  { name: "Карпово-фидерные снасти", icon: <Layers />, subcategories: [] },
  { name: "Для зимней рыбалки", icon: <Snowflake />, subcategories: [] },
  { name: "Лодки и моторы", icon: <ArrowRightCircle />, subcategories: [] },
  { name: "Нахлыст", icon: <Feather />, subcategories: [] },
  { name: "Рыболовные сувениры", icon: <Gift />, subcategories: [] },
  { name: "Рыбацкая электроника", icon: <Monitor />, subcategories: [] },
  { name: "Экипировка", icon: <Activity />, subcategories: [
      { name: "Бейсболки и кепки", subcategories: [] },
      { name: "Вейдерсы и забродные костюмы", subcategories: [] },
      { name: "Куртки, плащи, дождевики", subcategories: [] },
      { name: "Обувь", subcategories: [] },
      { name: "Перчатки", subcategories: [] },
      { name: "Поляризационные очки", subcategories: [] },
      { name: "Футболки", subcategories: [] }
  ] },
  { name: "Прочее", icon: <Box />, subcategories: [] }
];
