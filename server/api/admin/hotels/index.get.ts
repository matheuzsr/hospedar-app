import { defineSafeEventHandler } from "~/server";

export default defineSafeEventHandler(async (event) => {
  sendRedirect(event, '/api/hotels', 301)
})
