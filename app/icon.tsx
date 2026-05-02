import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            color: '#E50914',
            fontSize: 26,
            fontWeight: 900,
            fontFamily: 'Arial Black, Impact, sans-serif',
            lineHeight: 1,
            letterSpacing: '-1px',
          }}
        >
          N
        </div>
      </div>
    ),
    { ...size },
  );
}
