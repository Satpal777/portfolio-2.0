import { ImageResponse } from 'next/og';

export const alt = 'Satpalsinh Rana — Software Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '72px',
            height: '8px',
            backgroundColor: '#14b8a6',
            marginBottom: '40px',
          }}
        />
        <div
          style={{
            display: 'flex',
            fontSize: '84px',
            fontWeight: 700,
            color: '#fafafa',
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
          }}
        >
          Satpalsinh Rana
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: '40px',
            color: '#14b8a6',
            marginTop: '20px',
          }}
        >
          Software Engineer
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: '28px',
            color: '#71717a',
            marginTop: '28px',
          }}
        >
          Angular · React · Next.js · Node.js · Electron.js
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: '26px',
            color: '#a1a1aa',
            marginTop: '56px',
          }}
        >
          www.satpal.cloud
        </div>
      </div>
    ),
    { ...size }
  );
}
