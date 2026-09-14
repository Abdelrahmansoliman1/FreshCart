import Image from "next/image";
import MainSlider from "./_Components/layout/Home/MainSlider/MainSlider";
import CategorySlider from "./_Components/layout/Home/CategorySlider/CategorySlider";
import { getAllCategories } from "@/lib/servcies/category.service";
import { ICategory } from "@/lib/interfaces/category";
import TrendingProducts from "./_Components/layout/Home/TrendingProducts/TrendingProducts";
import { IResponse } from "@/lib/interfaces/general";
import Link from "next/link";
export default async function Home() {
  const res: IResponse<ICategory> = await getAllCategories();
  const data: ICategory[] = res.data;
  return (
    <div>
      <MainSlider/>
      <Link href={"/categories"}><h1 className='font-bold text-4xl ml-3 pt-4 pl-4'>Categories</h1></Link>
      <CategorySlider data = {data}/>
       <Link href={"/products"}><h1 className='font-bold text-4xl ml-3 p-4'>Products</h1></Link>
      <TrendingProducts/>
    </div>
  );
}
