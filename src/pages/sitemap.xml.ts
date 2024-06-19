
const EXTERNAL_DATA_URL = 'https://jsonplaceholder.typicode.com/posts';
import { config } from "../../config";
import axios from 'axios';
const apiUrl =  config.gateway.apiURL;
const domainUrl =  config.gateway.baseURL;


function generateSiteMap( 
  tagUrls: any, 
  blogUrls:any, 
  categoryUrls:any,
  allProducts:any, 
  allProductsTwo:any, 
  allProductsThree:any, 
  allProductsFour:any, 
  allProductsFive:any, 
  allProductsSix:any, 
  allProductsSeven:any, 
  allProductsEight:any, 
  allProductsNine:any, 
  allProductsTen:any, 
  domainUrl: string
  ) {
  const tagUrlsSitemap = tagUrls?.data?.map((tag:any) => {
    return `
      <url>
        <loc>${domainUrl}/tag?id=${tag?.slug}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
      </url>
    `;
  }).join('');

  const blogUrlsSitemap = blogUrls?.data?.map((blog:any) => {
    return `
      <url>
        <loc>${domainUrl}/blogs/${blog?.slug}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
      </url>
    `;
  }).join('');

  const categoryUrlsSitemap = categoryUrls?.data?.map((categoryData:any) => {
    return `
      <url>
        <loc>${domainUrl}/categories/${categoryData?.slug}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
      </url>
    `;
  }).join('');

  const productCategoryUrlsSitemap = allProducts?.data?.map((productData:any) => {
    return `
      <url>
        <loc>${domainUrl}/product/${productData?.slug}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
      </url>
    `;
  }).join('');

  const productCategoryTwoUrlsSitemap = allProductsTwo?.data?.map((productData:any) => {
    return `
      <url>
        <loc>${domainUrl}/product/${productData?.slug}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
      </url>
    `;
  }).join('');

  const productCategoryThreeUrlsSitemap = allProductsThree?.data?.map((productData:any) => {
    return `
      <url>
        <loc>${domainUrl}/product/${productData?.slug}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
      </url>
    `;
  }).join('');

  const productCategoryFourUrlsSitemap = allProductsFour?.data?.map((productData:any) => {
    return `
      <url>
        <loc>${domainUrl}/product/${productData?.slug}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
      </url>
    `;
  }).join('');

  const productCategoryFiveUrlsSitemap = allProductsFive?.data?.map((productData:any) => {
    return `
      <url>
        <loc>${domainUrl}/product/${productData?.slug}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
      </url>
    `;
  }).join('');

  const productCategorySixUrlsSitemap = allProductsSix?.data?.map((productData:any) => {
    return `
      <url>
        <loc>${domainUrl}/product/${productData?.slug}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
      </url>
    `;
  }).join('');

  const productCategorySevenUrlsSitemap = allProductsSeven?.data?.map((productData:any) => {
    return `
      <url>
        <loc>${domainUrl}/product/${productData?.slug}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
      </url>
    `;
  }).join('');

  const productCategoryEightUrlsSitemap = allProductsEight?.data?.map((productData:any) => {
    return `
      <url>
        <loc>${domainUrl}/product/${productData?.slug}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
      </url>
    `;
  }).join('');

  const productCategoryNineUrlsSitemap = allProductsNine?.data?.map((productData:any) => {
    return `
      <url>
        <loc>${domainUrl}/product/${productData?.slug}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
      </url>
    `;
  }).join('');

  const productCategoryTenUrlsSitemap = allProductsTen?.data?.map((productData:any) => {
    return `
      <url>
        <loc>${domainUrl}/product/${productData?.slug}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
      </url>
    `;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
    <loc>${domainUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
    </url>
    <url>
    <loc>${domainUrl}/login</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
    </url>
    <url>
    <loc>${domainUrl}/register</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
    </url>
    <url>
    <loc>${domainUrl}/offer</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
    </url>
    <url>
    <loc>${domainUrl}/page/about-us</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
    </url>
    <url>
    <loc>${domainUrl}/page/who-we-are</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
    </url>
    <url>
    <loc>${domainUrl}/page/our-values</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
    </url>
    <url>
    <loc>${domainUrl}/page/career</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
    </url>
    <url>
    <loc>${domainUrl}/page/csr</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
    </url>
    <url>
    <loc>${domainUrl}/page/our-outlets</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
    </url>
    <url>
    <loc>${domainUrl}/page/plant-consultation</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
    </url>
    <url>
    <loc>${domainUrl}/page/gift-a-plant</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
    </url>
    <url>
    <loc>${domainUrl}/page/why-plants</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
    </url>
    <url>
    <loc>${domainUrl}/page/tree-install</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
    </url>
    <url>
    <loc>${domainUrl}/page/faq</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
    </url>
    <url>
    <loc>${domainUrl}/page/privacy-policy</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
    </url>
    <url>
    <loc>${domainUrl}/page/terms-and-conditions</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
    </url>
    <url>
    <loc>${domainUrl}/page/contact-us</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
    </url>
    <url>
    <loc>${domainUrl}/blogs</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
    </url>
    ${tagUrlsSitemap}
    ${blogUrlsSitemap}
    ${categoryUrlsSitemap}
    ${categoryUrlsSitemap}
    ${productCategoryUrlsSitemap}
    ${productCategoryTwoUrlsSitemap}
    ${productCategoryThreeUrlsSitemap}
    ${productCategoryFourUrlsSitemap}
    ${productCategoryFiveUrlsSitemap}
    ${productCategorySixUrlsSitemap}
    ${productCategorySevenUrlsSitemap}
    ${productCategoryEightUrlsSitemap}
    ${productCategoryNineUrlsSitemap}
    ${productCategoryTenUrlsSitemap}
    

</urlset>
`;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

async function fetchTagData() {
  try {
    const tagResponse = await axios.get(`${apiUrl}/tag`, {
      headers: {
        'Api-Key': config.gateway.apiKey
      }
    });
    const tagUrls = tagResponse.data;
    return tagUrls;
  } catch (error) {
    return [];
  }
}
async function fetchBlogData() {
  try {
    const blogResponse = await axios.get(`${apiUrl}/blog?page=1&perPage=4`, {
      headers: {
        'Api-Key': config.gateway.apiKey
      }
    });
    const blogUrls = blogResponse.data;
    return blogUrls;
  } catch (error) {
    return [];
  }
}

async function fetchCategories() {
  try {
    const categoryResponse = await axios.get(`${apiUrl}/category`, {
      headers: {
        'Api-Key': config.gateway.apiKey
      }
    });
    const categoryUrls = categoryResponse.data;
    return categoryUrls;
  } catch (error) {
    return [];
  }
}

async function generateProductByCategories() {
  const productUrls = [];
  const categoryData = await axios.get(`${apiUrl}/category`, {
      headers: {
          'Api-Key': config.gateway.apiKey
      }
  });
  const category = categoryData.data;
  const apiUrls = category.data.map((product:any) => ({
      url: `${apiUrl}/product?categoryId=${product.slug}&allProduct=1&page=1`,
  }));
  for (const url of apiUrls) {
      try {
          const response = await axios.get(url.url, {
              headers: {
                  'Api-Key': config.gateway.apiKey,
                  'Warehouse-Id': 1
              }
          });
          const allProducts = response.data;
          return allProducts;
      } catch (err) {
          console.log(err);
      }
  }
}

async function generateProductByCategoriesTwo() {
  const productUrls = [];
  const categoryData = await axios.get(`${apiUrl}/category`, {
      headers: {
          'Api-Key': config.gateway.apiKey
      }
  });
  const category = categoryData.data;
  const apiUrls = category.data.map((product:any) => ({
      url: `${apiUrl}/product?categoryId=${product.slug}&allProduct=1&page=2`,
  }));
  for (const url of apiUrls) {
      try {
          const response = await axios.get(url.url, {
              headers: {
                  'Api-Key': config.gateway.apiKey,
                  'Warehouse-Id': 1
              }
          });
          const allProductsTwo = response.data;
          return allProductsTwo;
      } catch (err) {
          console.log(err);
      }
  }
}

async function generateProductByCategoriesThree() {
  const productUrls = [];
  const categoryData = await axios.get(`${apiUrl}/category`, {
      headers: {
          'Api-Key': config.gateway.apiKey
      }
  });
  const category = categoryData.data;
  const apiUrls = category.data.map((product:any) => ({
      url: `${apiUrl}/product?categoryId=${product.slug}&allProduct=1&page=3`,
  }));
  for (const url of apiUrls) {
      try {
          const response = await axios.get(url.url, {
              headers: {
                  'Api-Key': config.gateway.apiKey,
                  'Warehouse-Id': 1
              }
          });
          const allProductsThree = response.data;
          return allProductsThree;
      } catch (err) {
          console.log(err);
      }
  }
}

async function generateProductByCategoriesFour() {
  const productUrls = [];
  const categoryData = await axios.get(`${apiUrl}/category`, {
      headers: {
          'Api-Key': config.gateway.apiKey
      }
  });
  const category = categoryData.data;
  const apiUrls = category.data.map((product:any) => ({
      url: `${apiUrl}/product?categoryId=${product.slug}&allProduct=1&page=4`,
  }));
  for (const url of apiUrls) {
      try {
          const response = await axios.get(url.url, {
              headers: {
                  'Api-Key': config.gateway.apiKey,
                  'Warehouse-Id': 1
              }
          });
          const allProductsFour = response.data;
          return allProductsFour;
      } catch (err) {
          console.log(err);
      }
  }
}

async function generateProductByCategoriesFive() {
  const productUrls = [];
  const categoryData = await axios.get(`${apiUrl}/category`, {
      headers: {
          'Api-Key': config.gateway.apiKey
      }
  });
  const category = categoryData.data;
  const apiUrls = category.data.map((product:any) => ({
      url: `${apiUrl}/product?categoryId=${product.slug}&allProduct=1&page=5`,
  }));
  for (const url of apiUrls) {
      try {
          const response = await axios.get(url.url, {
              headers: {
                  'Api-Key': config.gateway.apiKey,
                  'Warehouse-Id': 1
              }
          });
          const allProductsFive = response.data;
          return allProductsFive;
      } catch (err) {
          console.log(err);
      }
  }
}

async function generateProductByCategoriesSix() {
  const productUrls = [];
  const categoryData = await axios.get(`${apiUrl}/category`, {
      headers: {
          'Api-Key': config.gateway.apiKey
      }
  });
  const category = categoryData.data;
  const apiUrls = category.data.map((product:any) => ({
      url: `${apiUrl}/product?categoryId=${product.slug}&allProduct=1&page=6`,
  }));
  for (const url of apiUrls) {
      try {
          const response = await axios.get(url.url, {
              headers: {
                  'Api-Key': config.gateway.apiKey,
                  'Warehouse-Id': 1
              }
          });
          const allProductsSix = response.data;
          return allProductsSix;
      } catch (err) {
          console.log(err);
      }
  }
}

async function generateProductByCategoriesSeven() {
  const productUrls = [];
  const categoryData = await axios.get(`${apiUrl}/category`, {
      headers: {
          'Api-Key': config.gateway.apiKey
      }
  });
  const category = categoryData.data;
  const apiUrls = category.data.map((product:any) => ({
      url: `${apiUrl}/product?categoryId=${product.slug}&allProduct=1&page=7`,
  }));
  for (const url of apiUrls) {
      try {
          const response = await axios.get(url.url, {
              headers: {
                  'Api-Key': config.gateway.apiKey,
                  'Warehouse-Id': 1
              }
          });
          const allProductsSeven = response.data;
          return allProductsSeven;
      } catch (err) {
          console.log(err);
      }
  }
}

async function generateProductByCategoriesEight() {
  const productUrls = [];
  const categoryData = await axios.get(`${apiUrl}/category`, {
      headers: {
          'Api-Key': config.gateway.apiKey
      }
  });
  const category = categoryData.data;
  const apiUrls = category.data.map((product:any) => ({
      url: `${apiUrl}/product?categoryId=${product.slug}&allProduct=1&page=8`,
  }));
  for (const url of apiUrls) {
      try {
          const response = await axios.get(url.url, {
              headers: {
                  'Api-Key': config.gateway.apiKey,
                  'Warehouse-Id': 1
              }
          });
          const allProductsEight = response.data;
          return allProductsEight;
      } catch (err) {
          console.log(err);
      }
  }
}

async function generateProductByCategoriesNine() {
  const productUrls = [];
  const categoryData = await axios.get(`${apiUrl}/category`, {
      headers: {
          'Api-Key': config.gateway.apiKey
      }
  });
  const category = categoryData.data;
  const apiUrls = category.data.map((product:any) => ({
      url: `${apiUrl}/product?categoryId=${product.slug}&allProduct=1&page=9`,
  }));
  for (const url of apiUrls) {
      try {
          const response = await axios.get(url.url, {
              headers: {
                  'Api-Key': config.gateway.apiKey,
                  'Warehouse-Id': 1
              }
          });
          const allProductsNine = response.data;
          return allProductsNine;
      } catch (err) {
          console.log(err);
      }
  }
}

async function generateProductByCategoriesTen() {
  const productUrls = [];
  const categoryData = await axios.get(`${apiUrl}/category`, {
      headers: {
          'Api-Key': config.gateway.apiKey
      }
  });
  const category = categoryData.data;
  const apiUrls = category.data.map((product:any) => ({
      url: `${apiUrl}/product?categoryId=${product.slug}&allProduct=1&page=10`,
  }));
  for (const url of apiUrls) {
      try {
          const response = await axios.get(url.url, {
              headers: {
                  'Api-Key': config.gateway.apiKey,
                  'Warehouse-Id': 1
              }
          });
          const allProductsTen = response.data;
          return allProductsTen;
      } catch (err) {
          console.log(err);
      }
  }
}

export async function getServerSideProps({ res }:any) {
  const tagUrls = await fetchTagData();
  const blogUrls = await fetchBlogData();
  const categoryUrls = await fetchCategories();
  const allProducts = await generateProductByCategories();
  const allProductsTwo = await generateProductByCategoriesTwo();
  const allProductsThree = await generateProductByCategoriesThree();
  const allProductsFour = await generateProductByCategoriesFour();
  const allProductsFive = await generateProductByCategoriesFive();
  const allProductsSix = await generateProductByCategoriesSix();
  const allProductsSeven = await generateProductByCategoriesSeven();
  const allProductsEight = await generateProductByCategoriesEight();
  const allProductsNine = await generateProductByCategoriesNine();
  const allProductsTen = await generateProductByCategoriesTen();
  const domainUrl: string | undefined = config.gateway.baseURL;
  if (domainUrl) {
    const sitemap = generateSiteMap(
      tagUrls, blogUrls, 
      categoryUrls, 
      allProducts, 
      allProductsTwo, 
      allProductsThree, 
      allProductsFour, 
      allProductsFive, 
      allProductsSix, 
      allProductsSeven, 
      allProductsEight, 
      allProductsNine, 
      allProductsTen, 
      domainUrl);
    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();
  }
  return {
    props: {
      tagUrls, 
      blogUrls, 
      categoryUrls, 
      allProducts, 
      allProductsTwo, 
      allProductsThree, 
      allProductsFour, 
      allProductsFive, 
      allProductsSix, 
      allProductsSeven, 
      allProductsEight, 
      allProductsNine, 
      allProductsTen,},
  };
}

export default SiteMap;