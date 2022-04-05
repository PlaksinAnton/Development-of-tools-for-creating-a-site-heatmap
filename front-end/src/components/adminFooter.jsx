import React from "react";

const AdminFooter = (props) => {
  return (
    <section class="admin-footer">
      <div class="admin-container">
        <div class="admin-text admin-text__footer">
          <p class="text admin-text__about">
            Этот страница была создана для реализации проекта 787 - "Разработка
            инструментария по созданию тепловой карты сайта"
          </p>
          <p class="text admin-text__who">
            Руководитель проекта -{" "}
            <span className="main-text">Иванов Фёдор Ильич</span>
          </p>
          <p class="text admin-text__who-create">
            Данный сайт был создан frontend - разработчиками{" "}
            <span class="main-text">Даниилом Холодовым </span>и{" "}
            <span className="main-text">Анастасией Сюракшиной</span>
          </p>
          <p class="text admin-text__designer">
            Макет был создан дизайером -
            <span className="main-text">Данилом Матвеевым</span>
          </p>
          <p class="text admin-text__backend">
            Базы данных быди созданы{" "}
            <span className="main-text">Антоном Плаксиным</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdminFooter;
