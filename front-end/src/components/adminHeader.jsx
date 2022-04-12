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
        </div>
        {/*<img src={projectMIEM} alt="Miem picture" className="admin-image" />*/}
        <div class="admin-button">
          <form action="/">
            <button class="small">
              <span>Назад</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminHeader;
