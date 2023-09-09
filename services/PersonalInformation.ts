import { PersonalUserData } from '@/types';

const PERSONAL_INFORMATION_URL = process.env.NEXT_PUBLIC_IS_LOCAL
  ? process.env.NEXT_PUBLIC_LOCALHOST_PERSONAL_INFORMATION
  : process.env.NEXT_PUBLIC_API_DOMAIN_PROD;

export const putPersonalInformation = async (
  personalInformation: PersonalUserData,
  token: string
) => {
  return await fetch(`${PERSONAL_INFORMATION_URL}/personal-information`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
    },
    body: JSON.stringify(personalInformation),
  });
};

export const getPersonalInformationById = async (id: string, token: string) => {
  return await fetch(`${PERSONAL_INFORMATION_URL}/personal-information/${id}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
    },
  });
};

export const uploadProfileImage = async (image: File, token: string) => {
  const ext = image.name.split('.').at(-1);
  const queryParams = `contentType=${image.type}&ext=${ext}`;
  const presignedUrl = await fetch(
    `${PERSONAL_INFORMATION_URL}/personal-information/upload-image?${queryParams}`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
      },
    }
  );
  const { url } = await presignedUrl.json();
  const uploadResp = await fetch(url, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': image.type,
      'Access-Control-Allow-Origin': '*',
    },
    body: image,
  });

  return uploadResp.url.split('?')[0];
};
