//import { redis } from '@/vercel/kv'
//import { notion } from "@/notion"
//import { NotionPage } from "@/components/notion";



//database structure used for data.tsx per notion page: (Subject to change)
//page name's page id - pageName(string) : pageId(string)
//page contents - pageNameContents(string) : array of block children obtained through renderTree() (JSON Array)
//page slug - pageNameSlug(string) : url slug for page(string)
//page properties - pageNameProps(string) : json of page properties from retrieving the notion page (JSON Object)

//record for value:key per notion page
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

export async function getPageName(pageName: any){
  
	return fetch(`${process.env.KV_REST_API_URL}/get/${pageName}Name`, {
  	headers: {
    		Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
  		},
	})
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error with fetching ${pageName}Name data`);
    }
    return response.json();
  })
  .then(data => {
    console.log(`${pageName}Name data obtained: ` + data["result"]);
    return data["result"];
  });
        
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
          body: props,
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
export async function getPageProps(pageName: any){
  
	return fetch(`${process.env.KV_REST_API_URL}/get/${pageName}Props`, {
  	headers: {
    		Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
  		},
	})
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error with fetching ${pageName}Props data`);
    }
    return response.json();
  })
  .then(data => {
    console.log(`${pageName}Props data obtained: ` + data["result"]);
    return data["result"];
  });
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
export async function getPageContent(pageName: any) {
    return fetch(`${process.env.KV_REST_API_URL}/get/${pageName}Content`, {
        headers: {
              Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
            },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error with fetching ${pageName}Content data`);
        }
        return response.json();
      })
      .then(data => {
        console.log(`${pageName}Content data obtained: ` + data["result"]);
        return data["result"];
      });
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
export async function getPageSlug(pageName: any){
	return fetch(`${process.env.KV_REST_API_URL}/get/${pageName}Slug`, {
  	headers: {
    		Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
  		},
	})
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error with fetching ${pageName}Slug data`);
    }
    return response.json();
  })
  .then(data => {
    console.log(`${pageName}Slug data obtained: ` + data["result"]);
    return data["result"];
  });
        
}
 


//functions for value:key pairs

//page id key
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
        throw new Error(`Error with setting ${pageId} Key`);
    }
    console.log(`${pageId} name set`);
   return response.json()});
}

export async function getPageNameKey(pageId: any){
  return fetch(`${process.env.KV_REST_API_URL}/get/${pageId}`, {
  	headers: {
    		Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
  		},
	})
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error with fetching ${pageId} Key`);
    }
    return response.json();
  })
  .then(data => {
    console.log(`${pageId} Key obtained: ` + data["result"]);
    return data["result"];
  });
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
          throw new Error(`Error with setting ${pageProps} Key`);
      }
      console.log(`${pageName} name set`);
    return response.json()});
}

export async function getPagePropsKey(pageProps: any){
  return fetch(`${process.env.KV_REST_API_URL}/get/${pageProps}`, {
  	headers: {
    		Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
  		},
	})
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error with fetching ${pageProps} Key`);
    }
    return response.json();
  })
  .then(data => {
    console.log(`${pageProps} Key obtained: ` + data["result"]);
    return data["result"];
  });
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
        throw new Error(`Error with setting ${pageSlug} Key`);
    }
    console.log(`${pageName} name set`);
   return response.json()});
}

export async function getPageSlugKey(pageSlug: any){
  return fetch(`${process.env.KV_REST_API_URL}/get/${pageSlug}`, {
  	headers: {
    		Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
  		},
	})
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error with fetching ${pageSlug} Key`);
    }
    return response.json();
  })
  .then(data => {
    console.log(`${pageSlug}Key obtained: ` + data["result"]);
    return data["result"];
  });
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
          throw new Error(`Error with setting ${pageContent} Key`);
      }
      console.log(`${pageName} name set`);
    return response.json()});
}

export async function getPageContentKey(pageContent: any){
  return fetch(`${process.env.KV_REST_API_URL}/get/${pageContent}`, {
  	headers: {
    		Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
  		},
	})
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error with fetching ${pageContent} Key`);
    }
    return response.json();
  })
  .then(data => {
    console.log(`${pageContent} Key obtained: ` + data["result"]);
    return data["result"];
  });
}


