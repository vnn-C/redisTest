import Image from "next/image";
import styles from "./page.module.css";
import * as data from "./data";
import { stringify } from "querystring";
import { renderToString } from "react-dom/server";
export default async function Home() {
  var arr: any[] = [];

  const testProps = {
    "object": "page",
    "id": "59833787-2cf9-4fdf-8782-e53db20768a5",
    "created_time": "2022-03-01T19:05:00.000Z",
    "last_edited_time": "2022-07-06T19:16:00.000Z",
    "created_by": {
      "object": "user",
      "id": "ee5f0f84-409a-440f-983a-a5315961c6e4"
    },
    "last_edited_by": {
      "object": "user",
      "id": "ee5f0f84-409a-440f-983a-a5315961c6e4"
    },
    "cover": {
      "type": "external",
      "external": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/6/62/Tuscankale.jpg"
      }
    },
    "icon": {
      "type": "emoji",
      "emoji": "🥬"
    },
    "parent": {
      "type": "database_id",
      "database_id": "d9824bdc-8445-4327-be8b-5b47500af6ce"
    },
    "archived": false,
    "properties": {
      "Store availability": {
        "id": "%3AUPp"
      },
      "Food group": {
        "id": "A%40Hk"
      },
      "Price": {
        "id": "BJXS"
      },
      "Responsible Person": {
        "id": "Iowm"
      },
      "Last ordered": {
        "id": "Jsfb"
      },
      "Cost of next trip": {
        "id": "WOd%3B"
      },
      "Recipes": {
        "id": "YfIu"
      },
      "Description": {
        "id": "_Tc_"
      },
      "In stock": {
        "id": "%60%5Bq%3F"
      },
      "Number of meals": {
        "id": "zag~"
      },
      "Photo": {
        "id": "%7DF_L"
      },
      "Name": {
        "id": "title"
      }
    },
    "url": "https://www.notion.so/Tuscan-Kale-598337872cf94fdf8782e53db20768a5"
  };


  const testArr = {
    "object": "list",
    "results": [
      {
        "object": "block",
        "id": "c02fc1d3-db8b-45c5-a222-27595b15aea7",
        "parent": {
          "type": "page_id",
          "page_id": "59833787-2cf9-4fdf-8782-e53db20768a5"
        },
        "created_time": "2022-03-01T19:05:00.000Z",
        "last_edited_time": "2022-03-01T19:05:00.000Z",
        "created_by": {
          "object": "user",
          "id": "ee5f0f84-409a-440f-983a-a5315961c6e4"
        },
        "last_edited_by": {
          "object": "user",
          "id": "ee5f0f84-409a-440f-983a-a5315961c6e4"
        },
        "has_children": false,
        "archived": false,
        "type": "heading_2",
        "heading_2": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "Lacinato kale",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Lacinato kale",
              "href": null
            }
          ],
          "color": "default",
          "is_toggleable": false
        }
      },
      {
        "object": "block",
        "id": "acc7eb06-05cd-4603-a384-5e1e4f1f4e72",
        "parent": {
          "type": "page_id",
          "page_id": "59833787-2cf9-4fdf-8782-e53db20768a5"
        },
        "created_time": "2022-03-01T19:05:00.000Z",
        "last_edited_time": "2022-03-01T19:05:00.000Z",
        "created_by": {
          "object": "user",
          "id": "ee5f0f84-409a-440f-983a-a5315961c6e4"
        },
        "last_edited_by": {
          "object": "user",
          "id": "ee5f0f84-409a-440f-983a-a5315961c6e4"
        },
        "has_children": false,
        "archived": false,
        "type": "paragraph",
        "paragraph": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
                "link": {
                  "url": "https://en.wikipedia.org/wiki/Lacinato_kale"
                }
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
              "href": "https://en.wikipedia.org/wiki/Lacinato_kale"
            }
          ],
          "color": "default"
        }
      }
    ],
    "next_cursor": null,
    "has_more": false,
    "type": "block",
    "block": {}
  };






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
          
            console.log(block);
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

  console.log("Starting");
  const test = data.setPageProps("SetTest", JSON.stringify(testProps));
  const testFour = data.getPageProps("SetTest");
  let getSlug;
  const testSlug = data.setPageSlug("SetTest", "Slug");
  getSlug = data.getPageSlug("SetTest");
  
  const testTwo = data.setPageName("SetTest", "Name");
  const getName = data.getPageName("SetTest");
  
  //renderTree("c102c1df8f984db0b1aeb0dada4fb70a");
  //arr.push("Test Here");
  const testThree = data.setPageContent("SetTest", JSON.stringify(testArr));
  const getContent = data.getPageContent("SetTest");

  console.log("Test Slug: " + await getSlug);
  //const testFive = data.setPagePropsKey("SetTest", JSON.stringify(testProps));
  //const testSix = data.setPageNameKey("SetTest", "Name");
  //const testSeven = data.setPageSlugKey("SetTest", "Slug");
  //const testEight = data.setPageContentKey("SetTest", JSON.stringify(testArr));
  let getRes;
  let getResTwo;
  let stringTest = JSON.stringify(getName);
  //const getTest = data.getPageName("SetTestName").then((response) => {getRes = response;});
  //try{
    //getResTwo = await data.getPageName("SetTestName");
    //stringTest = JSON.stringify(getResTwo);
  //}
  //catch(error){
    //console.log(error);
  //}
  
  const testVar = "Test Variable";

  

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        
        <p>
          Get started by editing&nbsp;
          <p>{testFour}</p>
          <p>{getContent}</p>
          {" More Testing "}
          {getSlug}
          {" GetRes Test: "}
          {getName}
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>  </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
