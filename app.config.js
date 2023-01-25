export default function makeConfig({config}) {
  switch (process.env.PUBLISH) {
    case "PROD":
      break;
    default:
      config = {
        ...config,
        name: config.name += " (TEST)",
        slug: config.slug += "_test",
        extra: {
          eas: {
            projectId: "571b7b7a-2db1-4784-89e2-e4200b4b9af4",
          },
        },
      };
  }

  return config;
}
