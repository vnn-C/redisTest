//import { redis } from '@/vercel/kv'
//import { notion } from "@/notion"
//import { NotionPage } from "@/components/notion";
//import renderTree() function for retrieving block children



//inserts readable page name into database
export async function setPageName(pageId: any, pageName: any){
    fetch(`${process.env.KV_REST_API_URL}/set/${pageId}Name`, {
        headers: {
            Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
          },
          body: JSON.stringify(pageName),
          method: 'POST',
    })
    .then((response) => {
        if(!response.ok){
            throw new Error(`Error with setting ${pageId} name`);
        }
        console.log(`${pageId} properties set`);
       return response.json()});

}

//gets readable page name from database
export async function getPageName(pageId: any){
	fetch(`${process.env.KV_REST_API_URL}/get/${pageId}Name`, {
  	headers: {
    		Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
  		},
	})
  		.then((response) => response.json())
            .then((data) => console.log(data));
        
}

//gets page properties from redis database
export async function getPageProps(pageId: any){
	fetch(`${process.env.KV_REST_API_URL}/get/${pageId}Props`, {
  	headers: {
    		Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
  		},
	})
  		.then((response) => response.json())
        .then((data) => console.log(data));
}

//inserts page properties into redis database
export async function setPageProps(pageId: any, props: any){

    //get page properties of given page separately
    //const props = []; //plaeholder
    //const props = fetch(`https://api.notion.com/v1/blocks/${pageId}`); //fetch page properties

    fetch(`${process.env.KV_REST_API_URL}/set/${pageId}Props`, {
        headers: {
            Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
          },
          body: JSON.stringify(props),
          method: 'POST',
        })
          .then((response) => {
            if(!response.ok){
                throw new Error(`Error with setting ${pageId} properties`);
            }
            console.log(`${pageId} properties set`);
           return response.json()});
    
}

//gets page content from redis database
export async function getPageContent(pageId: any){
    fetch(`${process.env.KV_REST_API_URL}/get/${pageId}Content`, {
        headers: {
              Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
            },
      })
            .then((response) => response.json())
              .then((data) => {return data});
}

//inserts page content into redis database
export async function setPageContent(pageId: any, pageContent: any){

    //get page content from pageId first
    //const pageContent = []; //placeholder
    //pageContent = renderTree(pageId); 
    fetch(`${process.env.KV_REST_API_URL}/set/${pageId}Content`, {
        headers: {
            Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
          },
          body: JSON.stringify(pageContent),
          method: 'POST',
        })
          .then((response) => {
            if(!response.ok){
                throw new Error(`Error with setting ${pageId} content`);
            }
            console.log(`${pageId} content set`);
           return response.json()});
}

//inserts page slug into database
export async function setPageSlug(pageId: any, pageSlug: any){
    fetch(`${process.env.KV_REST_API_URL}/set/${pageId}Slug`, {
        headers: {
            Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
          },
          body: JSON.stringify(pageSlug),
          method: 'POST',
    })
    .then((response) => {
        if(!response.ok){
            throw new Error(`Error with setting ${pageId} name`);
        }
        console.log(`${pageId} properties set`);
       return response.json()});

}

//gets readable page slug from database
export async function getPageSlug(pageId: any){
	fetch(`${process.env.KV_REST_API_URL}/get/${pageId}Slug`, {
  	headers: {
    		Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
  		},
	})
  		.then((response) => response.json())
            .then((data) => console.log(data));
        
}
    



