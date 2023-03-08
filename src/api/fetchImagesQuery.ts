interface Size {
  height: number;
  width: number;
}

interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Image {
  id: string;
  url: string;
  filename: string;
  description?: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
  dimensions: Size;
  resolution: Size;
  sizeInBytes: number;
  sharedWith: User[];
  favorited: boolean;
}

export const fetchImagesQuery = async (): Promise<Image[]> => {
  return fetch('https://agencyanalytics-api.vercel.app/images.json').then((res) => res.json());
};
