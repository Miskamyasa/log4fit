export default function makeConfig({config}) {
  switch (process.env.PUBLISH) {
    case "PROD":
      break;
    default:
      config.name += " (TEST)";
      config.slug += "_test";
  }

  return config;
}
