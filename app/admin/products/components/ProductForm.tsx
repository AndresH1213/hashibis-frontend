'use client';

import { ImageInterface, ProductInterface, ProductFormActions } from '@/types';

import React, { ChangeEvent, useEffect, useState } from 'react';
import Notification from '@/lib/notification';
import { Button, CustomMenu, FormField } from '@/components/common';
import { categoryFilters } from '@/constants';
import { useRouter } from 'next/navigation';
import { uploadImages } from '@/services/Product';
import TagsField from '@/components/common/TagsField';
import ImageField from '@/app/admin/products/components/ImageField';
import { getModifiedParams, tranformImageFileToDataSync } from '@/lib/utils';

type action = ProductFormActions.EDIT | ProductFormActions.CREATE;
type Props = {
  type: action;
  product?: ProductInterface;
};

type Value = string | number | string[];

const getNotifications = (type: action) => {
  const ing = type === ProductFormActions.CREATE ? 'creating' : 'updating';
  const ed = type === ProductFormActions.CREATE ? 'created' : 'updated';
  const failedNotification = new Notification({
    message: `Error ${ing} product`,
    type: 'error',
  });

  const successNotification = new Notification({
    message: `Product ${ed}`,
    type: 'success',
  });
  return { successNotification, failedNotification };
};

function ProductForm({ type, product }: Props) {
  const router = useRouter();
  const { successNotification, failedNotification } = getNotifications(type);
  const [images, setImages] = useState<File[]>([]);
  const [imgData, setImgData] = useState<ImageInterface[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchImages = async () => {
      const fetchedImages: ImageInterface[] = [];
      if (product?.images) {
        for (let img of product.images) {
          const resp = await fetch(img);
          const blob = await resp.blob();

          const reader = new FileReader();
          reader.onload = () => {
            const dataURL = reader.result?.toString();
            const imageName = img.split('/').at(-1);
            fetchedImages.push({
              data: dataURL || '',
              name: imageName,
              type: blob.type,
            });
          };
          reader.readAsDataURL(blob);
        }
        setImgData(fetchedImages);
        router.refresh();
      }
    };
    fetchImages();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      if (type === ProductFormActions.CREATE) {
        const product = { ...form };
        if (images.length) {
          const imgs = await uploadImages(images, form.code);
          setImages([]);
          product['images'] = imgs;
        }
        const resp = await fetch('/api/product', {
          method: 'POST',
          body: JSON.stringify(product),
        });
        if (resp.status !== 201) {
          failedNotification.notificate();
        } else {
          successNotification.notificate();
          setForm(getInitForm());
        }
      }

      if (type === ProductFormActions.EDIT && product) {
        const modifiedParams = getModifiedParams(product, form);

        if (!Object.keys(modifiedParams).length) {
          failedNotification.notificate('Nothing has changed');
          return;
        }
        const body = { id: product.id, ...modifiedParams };
        const resp = await fetch(`/api/product`, {
          method: 'PATCH',
          body: JSON.stringify(body),
        });
        if (resp.status !== 200) {
          failedNotification.notificate();
        } else {
          successNotification.notificate();
          setForm(getInitForm());
        }
      }
    } catch (error) {
      failedNotification.notificate();
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files?.length) return;
    const imagesFiles: File[] = [];
    let i = 0;
    while (i < e.target.files.length) {
      if (e.target.files[i].type.includes('image')) {
        const imgFile = e.target.files[i];
        imagesFiles.push(imgFile);
        const updatedImagesFile = [...images, imgFile];
        setImages(updatedImagesFile);
        tranformImageFileToDataSync(imgFile, setImgData);
      }
      i++;
    }
  };

  const handleStateChange = (fieldName: string, value: Value) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  const getInitForm = () => {
    return {
      name: product?.name || '',
      code: product?.code || '',
      description: product?.description || '',
      category: product?.category || '',
      concentration: product?.concentration || 0,
      measureUnitConcentration: product?.measureUnitConcentration || '',
      tags: product?.tags || [],
      price: product?.price || '',
      images: product?.images || [],
      benefits: product?.benefits || [],
      personalDosis: product?.personalDosis || '',
      recommendation: product?.recommendation || '',
      scientificResearch: product?.scientificResearch || [],
    };
  };

  const [form, setForm] = useState(getInitForm());

  return (
    <form onSubmit={handleFormSubmit} className="flexCenter form">
      <ImageField
        images={imgData}
        handleImage={handleChangeImage}
        setImages={setImgData}
      />

      <FormField
        title="Name"
        state={form.name}
        isRequired={true}
        placeholder="Oil CBD"
        setState={(value) => handleStateChange('name', value)}
      />

      <FormField
        title="Code"
        state={form.code}
        isRequired={true}
        placeholder="OCB"
        setState={(value) => handleStateChange('code', value)}
      />

      <FormField
        title="Description"
        state={form.description}
        isRequired={true}
        placeholder="Amazing product."
        isTextArea
        setState={(value) => handleStateChange('description', value)}
      />

      <div className="flexBetween w-full">
        <CustomMenu
          title="Category"
          state={form.category}
          filters={categoryFilters}
          setState={(value) => handleStateChange('category', value)}
        />
        <FormField
          type="number"
          title="Price"
          isRequired={true}
          state={form.price.toString()}
          placeholder="100"
          setState={(value) => handleStateChange('price', value)}
        />
      </div>

      <div className="flexBetween gap-1 w-full">
        <FormField
          type="number"
          title="Concentration"
          state={form.concentration.toString()}
          placeholder="10"
          setState={(value) => handleStateChange('concentration', value)}
        />

        <FormField
          title="Measure Concentration"
          state={form.measureUnitConcentration}
          placeholder="mg/tablespoon"
          setState={(value) =>
            handleStateChange('measureUnitConcentration', value)
          }
        />
      </div>

      <div className="flexBetween gap-1 w-full mb-16">
        <TagsField
          title="Tags"
          state={form.tags}
          placeholder="energy"
          setState={(value) => handleStateChange('tags', value)}
        />

        <TagsField
          title="Benefits"
          state={form.benefits}
          placeholder="energy boost"
          setState={(value) => handleStateChange('benefits', value)}
        />
      </div>

      <FormField
        title="Personal Dosis"
        state={form.personalDosis}
        placeholder="as needed"
        setState={(value) => handleStateChange('personalDosis', value)}
      />

      <TagsField
        title="Scientific Reasearch"
        state={form.scientificResearch}
        placeholder="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6140266/"
        setState={(value) => handleStateChange('scientificResearch', value)}
      />

      <FormField
        title="Recommendation"
        state={form.recommendation}
        placeholder="consume during daytime"
        setState={(value) => handleStateChange('recommendation', value)}
      />

      <div className="flex justify-end w-full">
        <Button
          title={
            submitting
              ? `${type === 'create' ? 'Creating' : 'Editing'}`
              : `${type === 'create' ? 'Create' : 'Edit'}`
          }
          type="submit"
          leftIcon={submitting ? '' : '/eye.svg'}
          submitting={submitting}
        />
      </div>
    </form>
  );
}

export default ProductForm;
