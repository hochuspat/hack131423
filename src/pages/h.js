import React, { useState } from 'react';
import styles from './documents1.module.css';
import { VscAccount, VscArrowDown } from "react-icons/vsc";
import { HiOutlineHome } from "react-icons/hi";
import { FiTrendingUp, FiBell } from "react-icons/fi";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const roadmapSteps = [
    '01.10.2023: Документ создан сотрудником отдела продаж Иваном Ивановым.',
    '01.10.2023: Документ создан сотрудником отдела продаж Иваном Ивановым.',
    '01.10.2023: Документ создан сотрудником отдела продаж Иваном Ивановым.',
    '01.10.2023: Документ создан сотрудником отдела продаж Иваном Ивановым.',
    '01.10.2023: Документ создан сотрудником отдела продаж Иваном Ивановым.',

  ];
  const router = useRouter();

  const handleStatisticsButtonClick = () => {
    router.push('/graf'); 
  };
  return (
    <div className={styles.container}>
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
      <div className={styles.content}>
        <div className={styles.whiteBlock}>
          <Image src="/Component.png" alt="Document Image" />
          <div className={styles.documentInfo}>
    <h2>Название документа</h2>
    <div>Дата: 14.10.2023</div>
    <div>Отдел: Продажи</div> 
</div>
        </div>
        <div className={styles.roadmap}>
          <h3>Дорожная карта документа (его перемещения)</h3>
          <ul className={styles.roadmapList}>
            {roadmapSteps.map((step, index) => (
              <li key={index} className={styles.roadmapStep}>
                <div className={styles.circle}></div>
                <p>{step}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
