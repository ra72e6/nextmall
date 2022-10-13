import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import ProductItems from '../components/ProductItems';
import data from '../utils/data';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gird-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {data.products.map((product) => (
          <ProductItems product={product} key={product.slug}></ProductItems>
        ))}
      </div>
    </Layout>
  );
}
