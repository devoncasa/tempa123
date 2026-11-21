// Preview and branch hosts must stay out of the production property.
export function startAnalytics() {
  if (!['www.tempa123.com','tempa123.com'].includes(location.hostname)) return;
  const w = window as Window & {dataLayer?: IArguments[]; gtag?: (...args: unknown[]) => void};
  w.dataLayer ??= [];
  w.gtag = function(){w.dataLayer!.push(arguments);};
  w.gtag('js',new Date()); w.gtag('config','G-314ZYC429H');
  const script = document.createElement('script');
  script.async = true; script.src = 'https://www.googletagmanager.com/gtag/js?id=G-314ZYC429H';
  document.head.appendChild(script);
}
