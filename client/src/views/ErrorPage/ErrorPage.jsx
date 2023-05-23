import ErrorPageHeader from './ErrorPage.style';
import { LargeTitle, Text } from '@/components/Reusable/Style/ReusableElements.style';

export default function ErrorPage() {
  return (
    <ErrorPageHeader>
      <LargeTitle>You&#39;ve found a page that doesn&#39;t exist</LargeTitle>
      <Text>Breathe in, and on the out breath, go back and try again.</Text>
    </ErrorPageHeader>
  );
}
