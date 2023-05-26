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
      const userAgent = navigator.userAgent;

      if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
        setAgentInfo({
          browser: 'Opera',
          os: navigator.platform,
        });
      } else if (userAgent.indexOf('Chrome') > -1) {
        setAgentInfo({
          browser: 'Chrome',
          os: navigator.platform,
        });
      } else if (userAgent.indexOf('Safari') > -1) {
        setAgentInfo({
          browser: 'Safari',
          os: navigator.platform,
        });
      } else if (userAgent.indexOf('Firefox') > -1) {
        setAgentInfo({
          browser: 'Firefox',
          os: navigator.platform,
        });
      } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1) {
        setAgentInfo({
          browser: 'Microsoft Internet Explorer',
          os: navigator.platform,
        });
      } else {
        setAgentInfo({
          browser: 'Unknown',
          os: navigator.platform,
        });
      }
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
