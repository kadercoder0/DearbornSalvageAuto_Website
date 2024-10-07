import React from "react";
import styles from "./inventory.module.css";
import searchIcon from "../../../Assets/searchIcon.svg";

const InventoryHeader = () => {
  return (
    <div className={styles.headerWrapper}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.logo}>Dearborn Salvage Auto</h1>
          <div className={styles.contactInfo}>
            <div className={styles.searchWrapper}>
            {/*<input placeholder="Search" /> 
              <div className={styles.iconWrapper}>
                <img src={searchIcon} alt="Search" />
              </div>
              */}
            </div>
            <p>14041 Greenfield Rd, Detroit, MI,48227</p>
            <br />
            <p> +1 (313) 203 - 6018</p>
          </div>
        </div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default InventoryHeader;