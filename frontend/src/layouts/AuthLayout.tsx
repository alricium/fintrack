import type { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(135deg, #1f252b, #222831)',
            }}
        >
            <div style={{ width: 400 }}>{children}</div>
        </div>
    );
};

export default AuthLayout;