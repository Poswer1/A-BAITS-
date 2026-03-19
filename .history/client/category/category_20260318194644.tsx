import { 
  ChevronDown, Fish, Zap, Activity, Settings, Link2, Layers, Snowflake, ArrowRightCircle, Feather, Gift, Monitor, Box 
} from "lucide-react";

export const categoriesWithIcons = [
  {
    name: "primanki",
    uk: "Приманки",
    ru: "Приманки",
    icon: <Fish />,
    subcategories: [
      {
        name: "voblery",voblery
        uk: "Воблери",
        ru: "Воблеры",
        subcategories: [
          { name: "minnow", uk: "Мінноу", ru: "Минноу" },
          { name: "shad", uk: "Шед", ru: "Шэд" },
          { name: "fat", uk: "Фет", ru: "Фэт" },
          { name: "crank", uk: "Кренк", ru: "Кренк" },
          { name: "rattliny", uk: "Раттліни", ru: "Раттлины" },
          { name: "jerkbeyty", uk: "Джеркбейти", ru: "Джеркбейты" },
          { name: "swimbeyty", uk: "Свімбейти", ru: "Свимбейты" },
          { name: "poppere", uk: "Поппери", ru: "Попперы" },
          { name: "walkery-stickbeyty", uk: "Волкери і стікбейти", ru: "Волкеры и стикбейты" },
          { name: "crawler", uk: "Кроулери", ru: "Кроулеры" },
          { name: "hendmeyd-ua", uk: "Хендмейд UA", ru: "Хендмейд UA" }
        ]
      },
      { name: "nabory-primanok", uk: "Набори приманок", ru: "Наборы приманок", subcategories: [] },
      { name: "silikonovye-primanki", uk: "Силіконові приманки", ru: "Силиконовые приманки", subcategories: [] },
      { name: "blesny", uk: "Блешні", ru: "Блёсны", subcategories: [] },
      { name: "cikady", uk: "Цикади", ru: "Цикады", subcategories: [] },
      { name: "kopii-primanok", uk: "Копії приманок", ru: "Копии приманок", subcategories: [] }
    ]
  },
  {
    name: "leska-i-shnury",
    uk: "Ліска, плетені шнури",
    ru: "Леска, плетеные шнуры",
    icon: <Zap />,
    subcategories: []
  },
  {
    name: "udilisha",
    uk: "Вудилища",
    ru: "Удилища",
    icon: <Activity />,
    subcategories: [
      { name: "casting-udilisha", uk: "Кастингові вудилища", ru: "Кастинговые удилища", subcategories: [] },
      { name: "spinning-udilisha", uk: "Спінінгові вудилища", ru: "Спиннинговые удилища", subcategories: [] },
      { name: "feeder-carp-udilisha", uk: "Фідерні / коропові вудилища", ru: "Фидерные / карповые удилища", subcategories: [] },
      { name: "prochie", uk: "Інші", ru: "Прочие", subcategories: [] }
    ]
  },
  {
    name: "katushki",
    uk: "Риболовні котушки",
    ru: "Рыболовные катушки",
    icon: <Settings />,
    subcategories: [
      { name: "bezynercionnye", uk: "Безінерційні котушки", ru: "Безынерционные катушки", subcategories: [] },
      { name: "multiplikatornye", uk: "Мультиплікаторні котушки", ru: "Мультипликаторные катушки", subcategories: [] },
      { name: "zapchasti-katushek", uk: "Запчастини та мастила", ru: "Запчасти и смазки", subcategories: [] }
    ]
  },
  {
    name: "kryuchki",
    uk: "Гачки",
    ru: "Крючки",
    icon: <Link2 />,
    subcategories: [
      { name: "jig-golovki", uk: "Джиг-головки, чебурашки, грузила", ru: "Джиг-головки, чебурашки, груза", subcategories: [] },
      { name: "kryuchki-dvoiniki-troiniki", uk: "Гачки, двійники, трійники", ru: "Крючки, двойники, тройники", subcategories: [] }
    ]
  },
  {
    name: "karabiny-i-povodki",
    uk: "Карабіни, повідці",
    ru: "Карабины, поводки",
    icon: <Link2 />,
    subcategories: []
  },
  {
    name: "aksessuary",
    uk: "Аксесуари",
    ru: "Аксессуары",
    icon: <Layers />,
    subcategories: [
      { name: "instrumenty-nozhi", uk: "Інструменти / ножі", ru: "Инструменты / ножи", subcategories: [] },
      { name: "podsacheki-bagoriki", uk: "Підсаки, багорики, Lip Grip", ru: "Подсачеки, багорики, Lip Grip", subcategories: [] },
      { name: "sumki-i-yashiki", uk: "Сумки, тубуси, коробки", ru: "Сумки, тубусы, коробки", subcategories: [] }
    ]
  },
  {
    name: "karpovye-snasti",
    uk: "Коропово-фідерні снасті",
    ru: "Карпово-фидерные снасти",
    icon: <Layers />,
    subcategories: []
  },
  {
    name: "zimnyaya-rybalka",
    uk: "Для зимової риболовлі",
    ru: "Для зимней рыбалки",
    icon: <Snowflake />,
    subcategories: []
  },
  {
    name: "lodki-i-motory",
    uk: "Човни та мотори",
    ru: "Лодки и моторы",
    icon: <ArrowRightCircle />,
    subcategories: []
  },
  {
    name: "nahlyst",
    uk: "Нахлист",
    ru: "Нахлыст",
    icon: <Feather />,
    subcategories: []
  },
  {
    name: "suveniry",
    uk: "Рибальські сувеніри",
    ru: "Рыболовные сувениры",
    icon: <Gift />,
    subcategories: []
  },
  {
    name: "elektronika",
    uk: "Рибальська електроніка",
    ru: "Рыбацкая электроника",
    icon: <Monitor />,
    subcategories: []
  },
  {
    name: "ekipirovka",
    uk: "Екіпірування",
    ru: "Экипировка",
    icon: <Activity />,
    subcategories: [
      { name: "beysbolki", uk: "Бейсболки та кепки", ru: "Бейсболки и кепки", subcategories: [] },
      { name: "veydersy", uk: "Вейдерси та забродні костюми", ru: "Вейдерсы", subcategories: [] },
      { name: "kurtki-i-dozhdeviki", uk: "Куртки, плащі, дощовики", ru: "Куртки и дождевики", subcategories: [] },
      { name: "obuv", uk: "Взуття", ru: "Обувь", subcategories: [] },
      { name: "perchatki", uk: "Рукавички", ru: "Перчатки", subcategories: [] },
      { name: "polyaryzacionnye-ochki", uk: "Поляризаційні окуляри", ru: "Поляризационные очки", subcategories: [] },
      { name: "futbolki", uk: "Футболки", ru: "Футболки", subcategories: [] }
    ]
  },
  {
    name: "prochee",
    uk: "Інше",
    ru: "Прочее",
    icon: <Box />,
    subcategories: []
  }
];