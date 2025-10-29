import CategorySection from "./section/category";
import Products01 from "./section/products-01";
import Products02Section from "./section/products-02";

const Home = () => {
  return (
    <>        
        <Products01 />
        <Products02Section />
        <CategorySection />
    </>
  );
}

export default Home;