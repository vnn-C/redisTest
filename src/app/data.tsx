//import { redis } from '@/vercel/kv'
//import { notion } from "@/notion"
//import { NotionPage } from "@/components/notion";

//database structure used for data.tsx per notion page: (Subject to change)
//page name's page id - pageName : pageId
//page contents - pageNameContents : array of block children obtained through renderTree()
//page slug - pageNameSlug : url slug for page
//page properties - pageNameProps : json of page properties from retrieving the notion page

//TODO: add another record for value:key per notion page
//pageId : pageName
//array of block children obtained from renderTree() : pageNameContents
//url slug for page : pageNameSlug
//json of page properties fro mretrieving the notion page : pageNameProps

//inserts readable page name's pageId into database
export async function setPageName(pageName: any, pageId: any){
    fetch(`${process.env.KV_REST_API_URL}/set/${pageName}Name`, {
        headers: {
            Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
          },
          body: JSON.stringify(pageId),
          method: 'POST',
    })
    .then((response) => {
        if(!response.ok){
            throw new Error(`Error with setting ${pageName} name`);
        }
        console.log(`${pageName} name set`);
       return response.json()});

}

//gets readable page name's pageId from database
export function getPageName(pageName: any){
	fetch(`${process.env.KV_REST_API_URL}/get/${pageName}Name`, {
  	headers: {
    		Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
  		},
	})
  		.then((response) => response.json())
            .then((data) => {return data});
        
}


//inserts page properties into redis database
export async function setPageProps(pageName: any, props: any){

    //get page properties of given page separately
    //const props = []; //plaeholder
    //const props = fetch(`https://api.notion.com/v1/blocks/${pageName}`); //fetch page properties

    fetch(`${process.env.KV_REST_API_URL}/set/${pageName}Props`, {
        headers: {
            Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
          },
          body: JSON.stringify(props),
          method: 'POST',
        })
          .then((response) => {
            if(!response.ok){
                throw new Error(`Error with setting ${pageName} properties`);
            }
            console.log(`${pageName} properties set`);
           return response.json()});
    
}


//gets page properties from redis database
export function getPageProps(pageName: any){
	fetch(`${process.env.KV_REST_API_URL}/get/${pageName}Props`, {
  	headers: {
    		Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
  		},
	})
  		.then((response) => response.json())
        .then((data) => console.log(data));
}

//inserts page content into redis database
//page content is the results of renderTree()
//calling GET on the key-value pair inside the vercel redis CLI reutrns {} instead of the results of renderTree.
//This problem does not appear to be  present with the other key-value pairs.
//This could just be a problem with the testing environment used to test data.tsx.
export async function setPageContent(pageName: any, pageContent: any){
  fetch(`${process.env.KV_REST_API_URL}/set/${pageName}Content`, {
      headers: {
          Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
        },
        body: pageContent,
        method: 'POST',
      })
        .then((response) => {
          if(!response.ok){
              throw new Error(`Error with setting ${pageName} content`);
          }
          console.log(`${pageName} content set`);
         return response.json()});
}

//gets page content from redis database
export function getPageContent(pageName: any){
    fetch(`${process.env.KV_REST_API_URL}/get/${pageName}Content`, {
        headers: {
              Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
            },
      })
            .then((response) => response.json())
              .then((data) => {return data});
}



//inserts page slug into database
export async function setPageSlug(pageName: any, pageSlug: any){
    fetch(`${process.env.KV_REST_API_URL}/set/${pageName}Slug`, {
        headers: {
            Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
          },
          body: JSON.stringify(pageSlug),
          method: 'POST',
    })
    .then((response) => {
        if(!response.ok){
            throw new Error(`Error with setting ${pageName} Slug`);
        }
        console.log(`${pageName} properties set`);
       return response.json()});

}

//gets readable page slug from database
export function getPageSlug(pageName: any){
	fetch(`${process.env.KV_REST_API_URL}/get/${pageName}`, {
  	headers: {
    		Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
  		},
	})
  		.then((response) => response.json())
            .then((data) => console.log(data));
        
}
    




//functions for value:key pairs

//page name key
export async function setPageNameKey(pageName: any, pageId: any){
  fetch(`${process.env.KV_REST_API_URL}/set/${pageId}`, {
    headers: {
        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
      },
      body: JSON.stringify(pageName + "Name"),
      method: 'POST',
})
.then((response) => {
    if(!response.ok){
        throw new Error(`Error with setting ${pageId} name key`);
    }
    console.log(`${pageId} name set`);
   return response.json()});
}

export function getPageNameKey(pageId: any){
  fetch(`${process.env.KV_REST_API_URL}/get/${pageId}`, {
  	headers: {
    		Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
  		},
	})
  		.then((response) => response.json())
            .then((data) => console.log(data));
}

//page props key
export async function setPagePropsKey(pageName: any, pageProps: any){
    fetch(`${process.env.KV_REST_API_URL}/set/${pageProps}`, {
      headers: {
          Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
        },
        body: JSON.stringify(pageName + "Props"),
        method: 'POST',
    })
    .then((response) => {
      if(!response.ok){
          throw new Error(`Error with setting ${pageName} name`);
      }
      console.log(`${pageName} name set`);
    return response.json()});
}

export function getPagePropsKey(pageProps: any){
  fetch(`${process.env.KV_REST_API_URL}/get/${pageProps}`, {
  	headers: {
    		Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
  		},
	})
  		.then((response) => response.json())
            .then((data) => console.log(data));
}

//page slugs key
export async function setPageSlugKey(pageName: any, pageSlug: any){
  fetch(`${process.env.KV_REST_API_URL}/set/${pageSlug}`, {
    headers: {
        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
      },
      body: JSON.stringify(pageName + "Slug"),
      method: 'POST',
})
.then((response) => {
    if(!response.ok){
        throw new Error(`Error with setting ${pageName} name`);
    }
    console.log(`${pageName} name set`);
   return response.json()});
}

export function getPageSlugKey(pageSlug: any){
  fetch(`${process.env.KV_REST_API_URL}/get/${pageSlug}`, {
  	headers: {
    		Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
  		},
	})
  		.then((response) => response.json())
            .then((data) => console.log(data));
}

//page content key
export async function setPageContentKey(pageName: any, pageContent: any){
  fetch(`${process.env.KV_REST_API_URL}/set/${pageContent}`, {
    headers: {
        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
      },
      body: JSON.stringify(pageName + "Content"),
      method: 'POST',
  })
  .then((response) => {
      if(!response.ok){
          throw new Error(`Error with setting ${pageName} name`);
      }
      console.log(`${pageName} name set`);
    return response.json()});
}

export function getPageContentKey(pageContent: any){
  fetch(`${process.env.KV_REST_API_URL}/get/${pageContent}`, {
  	headers: {
    		Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
  		},
	})
  		.then((response) => response.json())
            .then((data) => console.log(data));
}
