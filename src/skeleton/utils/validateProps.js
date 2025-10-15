export const validateProps = (props, required) => {
    const missing = required.filter(key => !(key in props));
    if (missing.length > 0) {
        throw new Error(`Missing required props: ${missing.join(', ')}`);
    }
};