import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Buildary — Digital Product Builder';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#080808',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', color: '#4a90d9', fontSize: 28, letterSpacing: 8 }}>
          BUILDARY
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 110, color: '#ffffff', lineHeight: 1 }}>
            Make it
          </div>
          <div style={{ display: 'flex', fontSize: 110, color: 'rgba(255,255,255,0.2)', lineHeight: 1 }}>
            work.
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 30, color: 'rgba(255,255,255,0.55)' }}>
          Digital product builder · Jakub Knotte
        </div>
      </div>
    ),
    { ...size }
  );
}
