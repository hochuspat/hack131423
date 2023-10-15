import React, { useState } from 'react';
import styles from './documents.module.css';
import { VscAccount,VscArrowDown} from "react-icons/vsc";
import {HiOutlineHome} from "react-icons/hi2"
import {FiTrendingUp,FiBell} from "react-icons/fi"
import { HiOutlineDocument } from "react-icons/hi";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

// Компонент для отображения карточки документа
const Card = ({ department, title, date, status, onClick }) => {
  const router = useRouter();
  
  const handleCardClick = () => {
    router.push('/h');
    if(onClick) {
      onClick();
    }
  };

  return (
<div className={styles.card} onClick={handleCardClick}>
  <div className={styles.cardheader}>
        <div className={styles.iconuser}></div>
        <div>
          <div className={styles.department}>{department}</div>
          <div className="title">{title}</div>
        </div>
      </div>
      <Image src="/Component.png" alt="Document Image" />

      <div className={styles.icondocument}></div>
      <div className={styles.cardfooter}>
        <div className={styles.date}>{date}</div>
        <div className={styles.status}>{status}</div>
      </div>
    </div>
  );
};



// Компонент для отображения выпадающего списка отделов
const Dropdown = ({ options, value, onChange }) => {
  return (
    <select className={styles.dropdown} value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

// Компонент для отображения фильтра по статусу документов
const Filter = ({ options, value, onChange }) => {
  return (
    <div className={styles.filter}>
      {options.map((option) => (
        <button
          key={option}
          className={`${styles.button} ${
            option === value ? styles.active : ''
          }`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
const getProgressColor = (percentage) => {
  if (percentage <= 30) return 'red';
  if (percentage <= 60) return 'yellow';
  if (percentage <= 100) return 'green';
};

// Компонент для отображения блока с надписями и индикации заполняемости
const StatusIndicator = ({ label, percentage }) => {
  return (
    <div className={styles.statusIndicator}>
      <div>{label}</div>
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${percentage}%`, backgroundColor: getProgressColor(percentage) }}
        ></div>
      </div>
    </div>
  );
};
// Основной компонент страницы
const Page = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    
  // Состояние для хранения выбранного отдела
  const [department, setDepartment] = useState('Все');
  // Состояние для хранения выбранного статуса документов
  const [status, setStatus] = useState('Новые');
  // Массив с данными о документах
  const documents = [
    {
      department: 'Бухгалтерия',
      title: 'Отчет за март',
      date: '01.04.2023',
      status: 'Принято',
    },
    {
      department: 'Маркетинг',
      title: 'Презентация нового продукта',
      date: '05.04.2023',
      status: 'В работе',
    },
    {
      department: 'IT',
      title: 'Исправление ошибок на сайте',
      date: '10.04.2023',
      status: 'Новые',
    },
    {
        department: 'Бухгалтерия',
        title: 'Отчет за март',
        date: '01.04.2023',
        status: 'Принято',
      }
  ];
  // Массив с вариантами отделов
  const departments = ['Все', 'Бухгалтерия', 'Маркетинг', 'IT'];
  // Массив с вариантами статусов документов
  const statuses = ['Новые', 'В работе', 'Принято'];

 // Функция для фильтрации документов по выбранному отделу, статусу и поисковому запросу
 const filterDocuments = (documents, department, status, searchTerm) => {
    return documents.filter(
      (doc) =>
        (department === 'Все' || doc.department === department) &&
        doc.status === status &&
        doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  const router = useRouter();

  const handleStatisticsButtonClick = () => {
    router.push('/graf'); // Укажите путь к целевой странице
  };
  const Modal = ({ document, onClose }) => {
    if (!document) return null;
  
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <h2>{document.title}</h2>
          {/* Остальная информация о документе */}
          <button onClick={onClose}>Закрыть</button>
        </div>
      </div>
    );
  };
  
  // Отфильтрованный массив документов
  const filteredDocuments = filterDocuments(documents, department, status, searchTerm);
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
        <div className={styles.header}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Filter options={statuses} value={status} onChange={setStatus} />
              <Dropdown className="customDropdown" options={departments} value={department} onChange={(e) => setDepartment(e.target.value)} />
            </div>

          </div>            
 
        </div>         <div className={styles.statusBlock}>
              <div className={styles.statusIndicators}>
                <StatusIndicator label="Отправленные" percentage={50} />
                <StatusIndicator label="Не проверенные" percentage={30} />
                <StatusIndicator label="Отклоненные" percentage={20} />
              </div>
            </div>
        <div className={styles.cards}>
          {filteredDocuments.map((doc) => (
            <Card key={doc.title} {...doc} />
          ))}
        </div>
      </div>
    </div>
  );
  };

export default Page;