import { Logger } from "@lib/utils/logger";
import ENV from "#env";

export const logger = Logger(ENV.LOG_LEVEL);
