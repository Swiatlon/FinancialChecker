import ErrorPageHeader from './ErrorPage.style';
import { MainTitle,Text } from '@/components/Reusable/Style/ReusableElements';

export default function ErrorPage() {
  return (
    <ErrorPageHeader>
      <MainTitle>You&#39;ve found a page that doesn&#39;t exist</MainTitle>
      <Text>Breathe in, and on the out breath, go back and try again.</Text>
    </ErrorPageHeader>
  );
}
