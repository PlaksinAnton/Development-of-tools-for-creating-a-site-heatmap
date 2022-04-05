import React from "react";

const adminHeader = (props) => {
  return (
    <section class="admin-footer">
      <div className="admin-container">
        <div className="admin-text">
          <p>Welcome to the admin page of your web site!</p>
          <p>
            On this page you can see graphics, created of different parametrs
          </p>
        </div>
        <img src="" alt="Heatmap picture" className="admin-image" />
      </div>
    </section>
  );
};

export default adminHeader;
