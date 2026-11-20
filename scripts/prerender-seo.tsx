interface SeoProps {
  title: string;
  description: string;
  schema?: object;
}

// The browser component updates the document on navigation. During the static
// build this adapter captures the same props without requiring a browser.
let current: SeoProps | undefined;
export function takeMetadata(): SeoProps | undefined {
  const metadata = current;
  current = undefined;
  return metadata;
}

export default function PrerenderSeo(props: SeoProps) {
  current = props;
  return null;
}
