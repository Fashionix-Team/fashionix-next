import { getCollectionMenus } from '@/lib/bagisto';
import CategoryCarousel from './category-carousel';

interface CategoryItem {
  id: string;
  name: string;
  logoUrl?: string;
  logoPath?: string;
  slug: string;
}

const CategorySection = async () => {
  let categories: CategoryItem[] = [];

  try {
    categories = await getCollectionMenus({
      inputs: [
        { key: 'parent_id', value: '1' },
        { key: 'status', value: '1' },
        { key: 'locale', value: 'en' }
      ],
      getCategoryTree: true,
      tag: 'home-categories-section'
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold">Belanja berdasarkan kategori</h2>
        </div>

        <CategoryCarousel categories={categories} />
      </div>
    </section>
  );
};

export default CategorySection;
