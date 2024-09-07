import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, LogOut, User, Menu, X } from "lucide-react";
import devLogo from "../public/assets/dev-logo.jpeg";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Navbar.module.css";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSignOut = () => {
    logout();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image
          src={devLogo}
          alt="Dev Weekends"
          width={40}
          height={40}
          className={styles.logoImage}
        />
        <Link href="/" className={styles.logoText}>
          Dev Weekends
        </Link>
      </div>

      {/* Hamburger Menu Icon for Mobile */}
      <div
        className={styles.mobileMenuIcon}
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? (
          <X className={styles.icon} />
        ) : (
          <Menu className={styles.icon} />
        )}
      </div>

      {/* Links for Desktop */}
      <div className={showMobileMenu ? styles.mobileLinks : styles.links}>
        <Link href="/" className={styles.link}>
          Home
        </Link>
        <Link href="/#values" className={styles.link}>
          Our Values
        </Link>
        <Link href="/#events" className={styles.link}>
          Events/Bootcamps
        </Link>
        <Link href="/#blog" className={styles.link}>
          Blog
        </Link>

        {!user ? (
          <>
            <Link href="/login" className={styles.button}>
              Login
            </Link>
            <Link href="/register" className={styles.button}>
              Register
            </Link>
          </>
        ) : (
          <div className={styles.profileContainer}>
            <div
              className={styles.profile}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <Image
                src={user?.photoURL || "/assets/user.jpg"}
                alt="Profile"
                width={40}
                height={40}
                className={styles.profileIcon}
              />
              <span className={styles.userName}>
                {user.displayName || "User"}
              </span>
              <ChevronDown className={styles.chevronIcon} />
            </div>
            {showDropdown && (
              <div className={styles.dropdown}>
                <Link href="/account" className={styles.dropdownLink}>
                  <User /> View Account
                </Link>
                <button
                  onClick={handleSignOut}
                  className={styles.dropdownButton}
                >
                  <LogOut /> Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
