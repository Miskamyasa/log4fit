import {TLocale} from "../types";


const russian: TLocale = Object.freeze({
  cancel: "Отмена",
  continue: "Продолжить",
  skip: "Пропустить",
  back: "Назад",

  newVersion: {
    modalText: "Доступна новая версия",
    update: "Обновить",
  },

  notFoundScreen: {
    title: "Этот экран не существует",
    goHome: "Вернуться на домашний экран!",
  },

  welcomeScreen: {
    title: "Добро пожаловать",
  },

  authScreen: {
    title: "Вы можете здесь авторизоваться",
    description: "Для сохранения и доступа к журналу с других устройств",
  },

  homeScreen: {
    title: "Главная",
  },

});

export default russian;
