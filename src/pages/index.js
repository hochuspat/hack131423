// App.js
import React, { useState } from 'react';
import { ChakraProvider, Box, Icon } from '@chakra-ui/react';
import { FaFilePdf } from 'react-icons/fa';
import FileDropzone from './FileDropzone';
import { VscAccount,VscArrowDown} from "react-icons/vsc";
import {HiOutlineHome} from "react-icons/hi2"
import {FiTrendingUp,FiBell} from "react-icons/fi"
import styles from './documents1.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';


const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUploaded, setPdfUploaded] = useState(false);
  
  const router = useRouter();

const handleStatisticsButtonClick = () => {
  router.push('/graf');
};
  return (
    <ChakraProvider>
      <div className={styles.header}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Поиск..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.icon}>
  <Link href="/"> 
    <div>
      <HiOutlineHome />
    </div>
  </Link>
</div>
<div className={styles.icon}>
  <Link href="/rr">
    <div>
      <FiBell />
    </div>
  </Link>
</div>

<button className={styles.statisticsButton} onClick={handleStatisticsButtonClick}>
  Статистика
</button>
<div className={styles.icon}>
<Link href="/lk"> 
    <div>

  <VscAccount/>
  </div>
  </Link>
  </div>
      </div>
      <Box 
        w="100%" 
        h="calc(100vh - 80px)" 
        bg="gray.100" 
        p="4"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {pdfFile ? (
          <embed src={URL.createObjectURL(pdfFile)} width="100%" height="100%" />
        ) : (
          <FileDropzone
            onPdfUpload={(file) => {
              setPdfFile(file);
            }}
          />
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;