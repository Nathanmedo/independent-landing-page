export interface ProductCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  media:{
    mainMedia:{
        image:{
            url: string;
        };
    };
  };
  description: string;
}
