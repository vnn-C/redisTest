import Image from "next/image";
import styles from "./page.module.css";
import * as data from "./data";
import { stringify } from "querystring";
export default function Home() {

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

  console.log("Starting");
  const test = data.setPageProps("SetTest", "Props");
  const testFour = data.getPageProps("SetTestProps");
  console.log("Success");
  const testTwo = data.setPageName("SetTest", "Name");
  const testThree = data.setPageContent("SetTest", renderTree("52505493-f6fb-488a-be79-0d1a379d8275"));

  

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        
        <p>
          Get started by editing&nbsp;
         
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
