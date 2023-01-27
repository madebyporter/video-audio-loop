// https://nuxt.com/docs/guide/directory-structure/nuxt.config
export default defineNuxtConfig({
  serverMiddleware: {
    "/api/generate-looping-video":
      "~/server-middleware/generate-looping-video.js",
  },
});
