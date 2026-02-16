const TOKEN_KEY = 'fintrack_token';

export const login = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export const isLoggedIn = (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
};