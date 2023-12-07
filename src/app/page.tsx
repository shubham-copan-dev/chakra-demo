import Image from "next/image";
import styles from "./page.module.css";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box fontFamily="fonts.body">
      <main className={styles.main}>
        <Box>
          <div
            className="banner"
            style={{
              backgroundImage: `url('/assets/images/home-banner.png')`, // Adjust the path as needed
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100vh",
              width: "100%",
            }}
          ></div>
        </Box>
      </main>
    </Box>
  );
}
