import { botInstanceTest } from "./pages/api/bot";

botInstanceTest.start();

botInstanceTest.on("message", (ctx) => {
  console.log(ctx);
});
