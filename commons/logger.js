import pino from "pino";

export const getLogger = (source) => {
  const logger = pino({
    level: "debug",
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss dd-mm-yyyy",
        ignore: "pid,hostname",
      },
    },
  });

  return logger.child({ source });
};
