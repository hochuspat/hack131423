import React, { useState } from "react";
import styles from "./Home.module.css";
import { HiOutlineHome } from "react-icons/hi";
import { FiBell, FiTrendingUp } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { LineChart, PieChart, BarChart } from "react-chartkick";
import 'chartkick/chart.js'
import Link from 'next/link';
import { useRouter } from 'next/router';
export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleStatisticsButtonClick = () => {
    router.push('/graf'); 
  };
  // Данные для графиков
  const lineData = {
    "2023-01-01": 10,
    "2023-01-02": 15,
    "2023-01-03": 20,
    "2023-01-04": 25,
    "2023-01-05": 30,
  };

  const pieData = {
    Ошибка1: 40,
    Ошибка2: 20,
    Ошибка3: 10,
    Ошибка4: 30,
  };

  const barData = [
    ["Ошибка1", 10],
    ["Ошибка2", 20],
    ["Ошибка3", 30],
    ["Ошибка4", 40],
    ["Ошибка5", 50],
  ];

  return (
    <div className={styles.page}>
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
  <Link href="/"> {/* Укажите путь к целевой странице */}
    <div>
      <HiOutlineHome />
    </div>
  </Link>
</div>
<div className={styles.icon}>
  <Link href="/rr"> {/* Укажите путь к целевой странице */}
    <div>
      <FiBell />
    </div>
  </Link>
</div>
<div className={styles.icon}>
  <Link href="/h"> {/* Укажите путь к целевой странице */}
    <div>
      <FiTrendingUp />
    </div>
  </Link>
</div>
<button className={styles.statisticsButton} onClick={handleStatisticsButtonClick}>
  Статистика
</button>
<div className={styles.icon}>
<Link href="/lk"> {/* Укажите путь к целевой странице */}
    <div>

  <VscAccount/>
  </div>
  </Link>
  </div>
      </div>
      <div className={styles.content}>
        <h1>Графики</h1>
        <div className={styles.charts}>
          <LineChart data={lineData} />
          <PieChart data={pieData} />
          <BarChart data={barData} />
        </div>
      </div>
    </div>
  );
}
