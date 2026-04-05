import type { CSSProperties, FC, ReactNode } from 'react';

export interface CardProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

export const Card: FC<CardProps> = (props) => {
  const { title, subtitle, children, style } = props;

  return (
    <section
      style={{
        border: '1px solid #d1d5db',
        borderRadius: 12,
        padding: '1rem',
        maxWidth: 560,
        background: '#fff',
        ...style,
      }}
    >
      <h2 style={{ margin: 0, fontSize: '1.25rem' }}>{title}</h2>
      {subtitle ? <p style={{ margin: '0.5rem 0 0', color: '#4b5563' }}>{subtitle}</p> : null}
      {children ? <div style={{ marginTop: '1rem' }}>{children}</div> : null}
    </section>
  );
};
