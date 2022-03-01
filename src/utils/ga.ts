// log the pageview with their URL
export const pageview = (user_id: string, url: string) => {
  console.log('GA-PV', user_id, url);
  // @ts-ignore
  window.gtag('config', 'G-WG60LWSCWZ', {
    page_path: url,
    user_id: user_id,
  });
};

// log specific events happening.
export const event = ({ action, params }: any) => {
  // @ts-ignore
  window.gtag('event', action, params);
};

// log user properties
export const identify = ({ user_id }: any) => {
  // @ts-ignore
  window.gtag('set', 'user_properties', {
    vh_id: user_id,
  });
};
