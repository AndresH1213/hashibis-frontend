export const tranformImageFileToDataSync = (imageFile: File, hook: any) => {
  const reader = new FileReader();
  reader.readAsDataURL(imageFile);

  reader.onload = () => {
    const imgObj = {
      name: imageFile.name,
      type: imageFile.type,
      data: reader.result,
    };
    hook((prev: any) => [...prev, imgObj]);
  };
};

export const getImageData = async (imageFile: File): Promise<string> => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);

    reader.onload = () => {
      if (!reader.result) {
        rej('Could not read the file');
      }
      res(reader.result!.toString());
    };
  });
};

export const getModifiedParams = (
  original: Record<string, any>,
  updated: Record<string, any>
) => {
  const modifiedParams: Record<string, any> = {};
  console.log({ original, updated });
  Object.keys(updated).forEach((key) => {
    if (original.hasOwnProperty(key) && original[key] !== updated[key]) {
      modifiedParams[key] = updated[key];
    }
  });
  return modifiedParams;
};

export function removeEmptyProperties(obj: Record<string, any>) {
  if (typeof obj !== 'object') {
    return {};
  }
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== '' && value !== 0)
  );
}

export const getCursor = (id?: string) => {
  return id && JSON.stringify({ id: { S: id } });
};

export const sleep = async (ms: number) => {
  await new Promise((res) => setTimeout(res, ms));
};
