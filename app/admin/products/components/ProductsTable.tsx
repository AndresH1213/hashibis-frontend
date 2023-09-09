'use client';

import { ProductInterface } from '@/types';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import AdminModal from './AdminModal';

function ProductsTable() {
  const [products, setproducts] = useState<ProductInterface[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductInterface>();

  let [isOpen, setIsOpen] = useState(false);
  let [isUpdate, setIsUpdate] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const resp = await fetch('/api/product', {
        method: 'GET',
      });
      const { products } = await resp.json();

      setproducts(products);
    };
    fetchProducts();
  }, []);

  function openUpdate(product: ProductInterface) {
    setSelectedProduct(product);
    setIsUpdate(true);
    openModal();
  }

  function openCreate() {
    setIsUpdate(false);
    setSelectedProduct(undefined);
    openModal();
  }

  return (
    <div className="relative overflow-x-auto max-w-4xl my-10 m-auto">
      <button
        onClick={openCreate}
        className="relative flexCenter p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 focus:ring-4 focus:outline-none focus:ring-lime-200"
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
          Create Product
        </span>
      </button>
      <table className="w-full text-sm text-left text-gray-200">
        <thead className="text-xs text-gray-400 uppercase bg-light-white-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              Code
            </th>
            <th scope="col" className="px-6 py-3">
              Product Name
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr
              key={prod.id}
              className="bg-white border-b hover:bg-light-white-100"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap"
              >
                {prod.code}
              </th>
              <td className="px-6 py-4">{prod.name}</td>
              <td className="px-6 py-4">{prod.category}</td>
              <td className="px-6 py-4">{prod.price} US</td>
              <td className="px-6 py-4 flex">
                <Image
                  className="cursor-pointer mx-1 hover:opacity-50"
                  onClick={() => openUpdate(prod)}
                  src="/edit.svg"
                  alt="edit icon"
                  width={20}
                  height={20}
                />
                <Image
                  className="cursor-pointer mx-1 hover:opacity-50"
                  onClick={() => openUpdate(prod)}
                  src="/trash.svg"
                  alt="delete icon"
                  width={20}
                  height={20}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AdminModal
        product={selectedProduct}
        isOpen={isOpen}
        isUpdate={isUpdate}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}

export default ProductsTable;
