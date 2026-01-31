import { Header } from '@/components/marketing/Header';
import { Footer } from '@/components/marketing/Footer';
import { ExitIntentPopup } from '@/components/marketing/ExitIntentPopup';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[1000] focus:px-4 focus:py-3 focus:bg-panel focus:border focus:border-border focus:text-text-main focus:font-mono focus:text-xs focus:tracking-wider focus:transition-transform focus:shadow-[0_0_0_3px_rgba(56,189,248,0.15)]"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <ExitIntentPopup />

      {/* Intercom Integration */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.intercomSettings = {
              api_base: "https://api-iam.intercom.io",
              app_id: "a92l2ygb"
            };
            (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/a92l2ygb';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
          `,
        }}
      />
    </>
  );
}
