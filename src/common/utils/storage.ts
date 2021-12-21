const initExpires = 1000 * 60 * 60 * 24;
const localStorage: Storage = window.localStorage;

const Storage = {
    get(key: string) {
        try {
            const { expires, value } = JSON.parse(localStorage.getItem(this.getKey(key)) as string) || {};
            if (expires && Date.now() > Number(expires)) {
                this.remove(key);
                console.error(`该${key}的storage已经过期!`);
            }
            return value;
        } catch (error) {
            return error;
        }
    },
    set(key: string, value: string | object | any[] | number, opts?: { expires: number }) {
        let expires: number = 0;

        if (opts?.expires) expires = Date.now() + opts?.expires * initExpires;
        const data = { expires, value };
        localStorage.setItem(this.getKey(key), JSON.stringify(data));
    },
    remove(key: string) {
        localStorage.removeItem(this.getKey(key));
    },
    getKey(key: string): string {
        return encodeURIComponent(`${location.hostname}_${location.pathname}_${key}`);
    }
};

export default Storage;
