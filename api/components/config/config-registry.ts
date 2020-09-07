import Config from "./";

export default function configRegistry(container) {
  try {
    container.register("IConfig", {
      useClass: Config,
    });
  } catch (error) {
    console.error("invalid container or class provided", error);
  }
}
