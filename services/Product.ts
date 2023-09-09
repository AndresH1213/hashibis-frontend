import { getCursor } from '@/lib/utils';
import { ProductForm, ProductInterface } from '@/types';

const PRODUCT_URL = process.env.NEXT_PUBLIC_IS_LOCAL
  ? process.env.NEXT_PUBLIC_LOCALHOST_PRODUCT
  : process.env.NEXT_PUBLIC_API_DOMAIN_PROD;

export const uploadImages = async (
  images: File[],
  code: string
): Promise<string[]> => {
  const imagesUrls: string[] = [];
  for (let img of images) {
    const presignedResp = await fetch(
      `${PRODUCT_URL!}/products/upload-image?code=${code}&name=${
        img.name
      }&contentType=${img.type}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
        },
      }
    );
    const { url } = await presignedResp.json();
    const uploadResp = await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': img.type!,
        'Access-Control-Allow-Origin': '*',
      },
      body: img,
    });

    const imageUrl = uploadResp.url.split('?')[0];
    imagesUrls.push(imageUrl);
  }
  return imagesUrls;
};

export const createProduct = async (prod: ProductForm, token: string) => {
  return await fetch(`${PRODUCT_URL}/product`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
    },
    body: JSON.stringify(prod),
  });
};

export const updateProduct = async (prod: ProductInterface, token: string) => {
  if (!prod.id) return { status: 404 };
  return await fetch(`${PRODUCT_URL}/product/${prod.id}`, {
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
    },
    body: JSON.stringify(prod),
  });
};

type getProductProps = {
  category?: string;
  limit?: number;
  lastEvaluatedKey?: string;
};

export const getProducts = async ({
  category,
  limit,
  lastEvaluatedKey,
}: getProductProps = {}) => {
  let url = `${PRODUCT_URL}/products?`;

  if (category) url += `category=${category}`;
  if (limit) url += `limit=${limit}`;
  if (lastEvaluatedKey) {
    const cursor = getCursor(lastEvaluatedKey);
    url += `lastEvaluatedKey=${cursor}`;
  }

  const query = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  return query;
};

export const getProductById = async (id: string) => {
  return await fetch(`${PRODUCT_URL}/product/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
};
