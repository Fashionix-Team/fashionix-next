import AboutUsContent from '@/components/about-us/about-us-page';

export const metadata = {
  title: 'About Us',
  description: 'Learn more about our store, mission, and vision.',
};

export default async function Page() {
  return (
    <AboutUsContent />
  );
}
