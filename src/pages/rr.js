import React, { useState } from 'react';
import styles from './documents.module.css';
import { VscAccount,VscArrowDown} from "react-icons/vsc";
import {HiOutlineHome} from "react-icons/hi2"
import {FiTrendingUp,FiBell} from "react-icons/fi"
// Компонент для отображения строки таблицы
import Link from 'next/link';
import { useRouter } from 'next/router';

const TableRow = ({ number, title, department, status, date }) => {
  const handleDownloadClick = () => {
    const filePath = '/Портфолио.pdf';
    window.open(filePath, '_blank');
  };

  return (
    <div className={styles.row}>
      <div className={styles.cell}>{number}</div>
      <div className={styles.cell}>{title}</div>
      <div className={styles.cell}>{department}</div>
      <div className={styles.cell}>{status}</div>
      <div className={styles.cell}>{date}</div>
      <div className={styles.cell}>
        <span className={styles.downloadIcon} onClick={handleDownloadClick}>
          <VscArrowDown />
        </span>
      </div>
    </div>
  );
};

// Компонент для отображения таблицы документов
const Table = ({ documents }) => {
  return (
    <div className={styles.table}>
      {documents.map((doc, index) => (
        <TableRow 
          key={index} 
          number={index + 1} 
          title={doc.title} 
          department={doc.department} 
          status={doc.status} 
          date={doc.date} 
        />
      ))}
    </div>
  );
};


// Компонент для выпадающего списка статусов
const StatusDropdown = ({ options, value, onChange }) => {
  return (
    <select className={styles.statusDropdown} value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
const handleDownloadClick = () => {
  const filePath = '/Портфолио.pdf';
  window.open(filePath, '_blank');
};

// Основной компонент страницы
const TablePage = () => {
  const [statusFilter, setStatusFilter] = useState("Все");
  const [searchTerm, setSearchTerm] = useState("");

  const documents = [
    {
      title: 'Отчет за март',
      department: 'Бухгалтерия',
      status: 'Принято',
      date: '01.04.2023',
    },
    {
      title: 'Презентация нового продукта',
      department: 'Маркетинг',
      status: 'В работе',
      date: '05.04.2023',
    },
    {
      title: 'Исправление ошибок на сайте',
      department: 'IT',
      status: 'Новые',
      date: '10.04.2023',
    },
    {
      title: 'Отчет за март',
      department: 'Бухгалтерия',
      status: 'Принято',
      date: '01.04.2023',
    },
    {
      title: 'Презентация нового продукта',
      department: 'Маркетинг',
      status: 'В работе',
      date: '05.04.2023',
    },
    {
      title: 'Исправление ошибок на сайте',
      department: 'IT',
      status: 'Новые',
      date: '10.04.2023',
    },
    {
      title: 'Отчет за март',
      department: 'Бухгалтерия',
      status: 'Принято',
      date: '01.04.2023',
    },
    {
      title: 'Презентация нового продукта',
      department: 'Маркетинг',
      status: 'В работе',
      date: '05.04.2023',
    },
    {
      title: 'Исправление ошибок на сайте',
      department: 'IT',
      status: 'Новые',
      date: '10.04.2023',
    },
    {
      title: 'Отчет за март',
      department: 'Бухгалтерия',
      status: 'Принято',
      date: '01.04.2023',
    },
    {
      title: 'Презентация нового продукта',
      department: 'Маркетинг',
      status: 'В работе',
      date: '05.04.2023',
    },
    {
      title: 'Исправление ошибок на сайте',
      department: 'IT',
      status: 'Новые',
      date: '10.04.2023',
    },
    {
      title: 'Отчет за март',
      department: 'Бухгалтерия',
      status: 'Принято',
      date: '01.04.2023',
    },
    {
      title: 'Презентация нового продукта',
      department: 'Маркетинг',
      status: 'В работе',
      date: '05.04.2023',
    },
    {
      title: 'Исправление ошибок на сайте',
      department: 'IT',
      status: 'Новые',
      date: '10.04.2023',
    },
    {
      title: 'Отчет за март',
      department: 'Бухгалтерия',
      status: 'Принято',
      date: '01.04.2023',
    },
    {
      title: 'Презентация нового продукта',
      department: 'Маркетинг',
      status: 'В работе',
      date: '05.04.2023',
    },
    {
      title: 'Исправление ошибок на сайте',
      department: 'IT',
      status: 'Новые',
      date: '10.04.2023',
    },
    {
      title: 'Отчет за март',
      department: 'Бухгалтерия',
      status: 'Принято',
      date: '01.04.2023',
    },
    {
      title: 'Презентация нового продукта',
      department: 'Маркетинг',
      status: 'В работе',
      date: '05.04.2023',
    },
    {
      title: 'Исправление ошибок на сайте',
      department: 'IT',
      status: 'Новые',
      date: '10.04.2023',
    },
  ];
  
  const statuses = ['Все', 'Принято', 'В работе', 'Новые'];

  const filteredDocuments = documents
    .filter(
      (doc) =>
        (statusFilter === "Все" || doc.status === statusFilter) &&
        doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const router = useRouter();

    const handleStatisticsButtonClick = () => {
      router.push('/graf'); 
    };
  return (
    <div className={styles.page}>
      <div className={styles.header}>
      <div className={styles.statusFilter}>
  <StatusDropdown 
    options={statuses} 
    value={statusFilter} 
    onChange={(e) => setStatusFilter(e.target.value)} 
  />
</div>

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
      <Table documents={filteredDocuments} />    </div>
  );
};

export default TablePage;