export type TLangs =
  | "en"
  | "ru";

export type TLocale = {
  cancel: string,
  continue: string,
  skip: string,
  back: string,

  newVersion: {
    modalText: string,
    update: string,
  },

  notFoundScreen: {
    title: string,
    goHome: string,
  },

  welcomeScreen: {
    title: string,
  },

  authScreen: {
    title: string,
    description: string
  },

  homeScreen: {
    title: string,
  },
};
