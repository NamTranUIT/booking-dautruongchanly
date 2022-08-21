import { SPLAT } from "triple-beam";
import { createLogger, format, transports } from "winston";
import environment from "../../utils/environment";

const { printf } = format;

const customFormat = printf((log: any) => {
  const { level, message, label, timestamp, ms, meta } = log;
  const key = SPLAT as unknown as string;
  const splat = JSON.stringify(log[key]) || "";
  if (log instanceof Error) {
    return `${timestamp} [${label}] [${ms}] ${level}: ${message} : ${log.stack} ${splat}`;
  }
  if (meta && meta instanceof Error) {
    return `${timestamp} [${label}] [${ms}] ${level}: ${message} : ${meta.stack} ${splat}`;
  }
  return `${timestamp} [${label}] [${ms}] ${level}: ${message} ${splat}`;
});

export const logger = createLogger({
  format: format.combine(
    format.label({ label: "dautruongchanly" }),
    format.timestamp(),
    format.ms(),
    customFormat
  ),
  level: environment.LOG_LEVEL || "warn",
  transports: [new transports.Console(), new transports.File({dirname: "./logFile", filename: `log`})],
});
