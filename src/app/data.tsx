//import { redis } from '@/vercel/kv'
//import { notion } from "@/notion"
//import { NotionPage } from "@/components/notion";
//import renderTree() function for retrieving block children

//database structure: (Subject to change)
//page name's page id - pageName : pageId
//page contents - pageNameContents : array of block children obtained through renderTree()
//page slug - pageNameSlug : url slug for page
//page properties - pageNameProps : json of page properties from retrieving notion page

//inserts readable page name's pageId into database

const renderTree = (blockId: string) => {
  fetch(`https://api.notion.com/v1/blocks/${blockId}/children`, {
      headers: {
          'Authorization': 'Bearer secret_vdJTeZt1yTHBG4Uio4eJTfKuqAfOEj8SjbyzlwPmPRn',
          'Notion-Version': '2022-06-28'
      }
  })
  .then(response => {
      if(!response.ok) {
          throw new Error('Network response not ok');
      }
      return response.json();
  })
  .then(data => {
      data.results.forEach((block: any) => {
          //console.log(block);
          if(block.has_children) {
              if(block.child_page){
                  console.log(block.child_page.title);
              }
              renderTree(block.id);
          }
      });
  })
  .catch(error => {
      console.error("Issue with fetch operation", error);
  });
}

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
        console.log(`${pageName} properties set`);
       return response.json()});

}

//gets readable page name's pageId from database
export async function getPageName(pageName: any){
	fetch(`${process.env.KV_REST_API_URL}/get/${pageName}Name`, {
  	headers: {
    		Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
  		},
	})
  		.then((response) => response.json())
            .then((data) => console.log(data));
        
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
export async function getPageProps(pageName: any){
	fetch(`${process.env.KV_REST_API_URL}/get/${pageName}Props`, {
  	headers: {
    		Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
  		},
	})
  		.then((response) => response.json())
        .then((data) => console.log(data));
}

//inserts page content into redis database
export async function setPageContent(pageName: any, pageContent: any){

  //get page content from pageName first
  //const pageContent = []; //placeholder
  //pageContent = renderTree(pageName); 
  fetch(`${process.env.KV_REST_API_URL}/set/${pageName}Content`, {
      headers: {
          Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
        },
        body: JSON.stringify(renderTree("52505493f6fb488abe790d1a379d8275")),
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
export async function getPageContent(pageName: any){
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
export async function getPageSlug(pageName: any){
	fetch(`${process.env.KV_REST_API_URL}/get/${pageName}Slug`, {
  	headers: {
    		Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
  		},
	})
  		.then((response) => response.json())
            .then((data) => console.log(data));
        
}
    



