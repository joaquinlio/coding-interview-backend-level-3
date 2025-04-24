import { Server } from "@hapi/hapi";

export const registerPingRoutes = (server: Server): void => {
  server.route({
    method: "GET",
    path: "/ping",
    handler: (request, h) => {
      return h.response({ ok: true }).code(200);
    },
  });
};
