import {
  createLogger,
  format as _format,
  transports as _transports,
} from "winston";

export const logger = createLogger({
  level: "info",
  format: _format.combine(
    _format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    _format.errors({ stack: true }),
    _format.splat(),
    _format.json()
  ),
  transports: [
    new _transports.Console({
      format: _format.combine(
        _format.colorize(),
        _format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
      ),
    }),
    new _transports.File({ filename: "error.log", level: "error" }),
    new _transports.File({ filename: "combined.log" }),
  ],
});
