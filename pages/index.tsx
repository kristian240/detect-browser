import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

declare global {
  interface Navigator {
    userAgentData?: NavigatorUAData;
  }

  interface NavigatorUAData {
    brands: { brand: string; version: string }[];
    mobile: boolean;
    platform: string;
  }
}

export default function Home() {
  const [agentInfo, setAgentInfo] = useState<any>(null);

  useEffect(() => {
    if (typeof navigator === 'undefined') {
      setAgentInfo({
        browser: 'Unknown',
        os: 'Unknown',
      });
    } else if (navigator.userAgentData) {
      setAgentInfo({
        browser: navigator.userAgentData.brands.map((brand) => brand.brand).join(', '),
        os: navigator.userAgentData.platform,
      });
    } else if (navigator.userAgent) {
      const ua = navigator.userAgent;
      let browser = '';
      let os = '';

      if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) {
        browser = 'Opera';
      } else if (ua.indexOf('Chrome') > -1) {
        browser = 'Chrome';
      } else if (ua.indexOf('Safari') > -1) {
        browser = 'Safari';
      } else if (ua.indexOf('Firefox') > -1) {
        browser = 'Firefox';
      } else if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1) {
        browser = 'Microsoft Internet Explorer';
      } else {
        browser = 'Unknown';
      }

      if (ua.indexOf('Windows') > -1) {
        os = 'Windows';
      } else if (ua.indexOf('Android') > -1) {
        os = 'Android';
      } else if (
        ua.indexOf('iPhone') > -1 ||
        ua.indexOf('iPad') > -1 ||
        ua.indexOf('iPod') > -1 ||
        ua.indexOf('iOS') > -1
      ) {
        os = 'iOS';
      } else if (ua.indexOf('Mac OS X') > -1) {
        os = 'Mac OS X';
      } else if (ua.indexOf('Linux') > -1) {
        os = 'Linux';
      } else {
        os = 'Unknown';
      }

      setAgentInfo({
        browser,
        os,
      });
    }
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-6 ${inter.className}`}
    >
      <div className='flex flex-col justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-6 backdrop-blur-2xl static w-auto rounded-xl border bg-gray-200 p-4'>
        <h1 className='mx-auto text-4xl mb-6'>What device am I using?</h1>

        {agentInfo ? (
          <>
            <p className='opacity-50'>User Agent: {navigator.userAgent}</p>
            <p>Browser: {agentInfo.browser}</p>
            <p>OS: {agentInfo.os}</p>
          </>
        ) : (
          <p className='opacity-50'>Loading...</p>
        )}
      </div>
    </main>
  );
}
