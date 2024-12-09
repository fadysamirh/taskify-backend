import { Logger } from "@nestjs/common";
import { LoggerErrorType, LoggerInfoType, TARGET_AUDIENCE } from "../types/logger.type";

export class LoggerHandler {
  private static getMethodName(): { serviceName: string; methodName: string } {
    const stack = new Error().stack?.split("\n")?.[3].trim();
    const stackLine = stack?.match(/at ([^ ]+)/)?.[1].split(".");
    return {
      serviceName: stackLine?.[0] ?? "unknown",
      methodName: stackLine?.[1] ?? "unknown"
    };
  }

  public static info(data: LoggerInfoType | string): void {
    const { serviceName, methodName } = this.getMethodName();
    const logger = new Logger(serviceName);
    let message = "";
    if (typeof data === "string") {
      message += `| TargetAudience:${TARGET_AUDIENCE.all} | Method:${methodName} | Message:${data} |`;
    } else {
      message += `| TargetAudience:${data.audience ?? TARGET_AUDIENCE.all} | Method:${methodName} | Message:${
        data.message
      } |`;
      if (data.data) {
        message += ` Data:${JSON.stringify(data.data)} |`;
      }
    }
    logger.log(message);
  }

  public static error(data: LoggerErrorType): void {
    const { serviceName, methodName } = this.getMethodName();
    const logger = new Logger(serviceName);
    let message = `[${data.identifier ?? "unknown"}] TargetAudience:${
      data.audience ?? TARGET_AUDIENCE.all
    } | Method:${methodName} |`;
    if (data.message) {
      message += ` Message:${data.message} |`;
    }
    message += ` Exception:${JSON.stringify(data.exception?.message || data.exception || "unknown exception")} |`;
    if (data.data) {
      message += ` Data:${JSON.stringify(data.data)} |`;
    }
    logger.error(message);
  }
}
