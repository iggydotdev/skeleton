import { source } from './index.js';

const testVideoSource = () => {
    const actual = source({ type: 'video', srcset: 'video.mp4', attrs: 'controls id="video-source"', cxs: 'custom-video' });
    const expected = '<source srcset="video.mp4" class="video-src custom-video" controls id="video-source"/>';
    return actual === expected? console.log(actual) || true : console.error({actual, expected}) || false;
}
console.log(testVideoSource());

const testImageSource = () => {
    const actual = source({ type: 'image', src: 'image.jpg', attrs: 'id="image-source"', cxs: 'custom-image' });
    const expected = '<source src="image.jpg" class="img-src custom-image" id="image-source"/>';
    return actual === expected? console.log(actual) || true : console.error({actual, expected}) || false;
}
console.log(testImageSource());