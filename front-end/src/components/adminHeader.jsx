import React from "react";
// import projectMIEM from "../assets/imgs/project-miem.png";

const AdminHeader = (props) => {
  return (
    <section class="admin-header">
      <div class="admin-container">
        <div class="admin-text">
          <p class="admin-text__first">
            Добро пожаловать на страницу администратора вашего сайта!
          </p>
          <p class="admin-text__second">
            На ней Вы сможете увидеть различные графики, основанные на множестве
            параметров
          </p>
        </div>
        {/*<img src={projectMIEM} alt="Miem picture" className="admin-image" />*/}
        <div class="admin-button">
          <form action="/">
            <button class="admin-button__main">
              Назад на главную страницу сайта!
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminHeader;
