import logger from "pino";
import dayjs from "dayjs";
import pretty from "pino-pretty";

const stream = pretty({
  colorize: true,
  translateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  levelFirst: true,
});

const log = logger(stream);

// const log = logger({
//   transport: {
//     target: "pino-pretty",
//     options: {
//       colorize: true,
//     },
//   },
//   timestamp: () => "time:" + dayjs().format("YYYY-MM-DD HH:mm:ss"),
// });

export default log;
