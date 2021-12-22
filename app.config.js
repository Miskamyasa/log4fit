/* eslint-disable */

const extraConfig = Object.freeze({
    VERSION_CHECK_TIMEOUT: 1000,
    APPLICATION_NAME: "Log4Fit",
});

export default function({config}) {
    switch (process.env.PUBLISH) {
        case "PROD":
            config.name = "Log4Fit";
            config.slug = "log4fit";
            break;
        default:
            config.name = "(TEST) Log4Fit";
            config.slug = "test_log4fit";
    }

    config.extra = extraConfig;

    return config;
}
