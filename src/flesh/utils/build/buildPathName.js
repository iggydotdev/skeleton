export const buildPathname = (pattern, data) => {
    let pathname = pattern;
    Object.entries(data).forEach(([key, value]) => {
        pathname = pathname.replace(`:${key}`, value);
    });
    return pathname;
}