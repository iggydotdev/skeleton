import { video } from "./index.js";

export const demo = () => {
    return video({ attrs: 'controls', cxs: 'custom-video', slot: '<source srcset="video.mp4" class="video-src custom-video" controls id="video-source"/>' });
};