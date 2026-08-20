"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";

const linkBase =
  "u-border-2 u-border-active-grey-90 u-border-hover-grey-50 u-button-style u-nav-link u-text-active-grey-90 u-text-grey-90 u-text-hover-grey-90";

function isNavActive(pathname, href) {
  if (href === "/") return pathname === "/";
  if (href === "/blog") return pathname === "/blog" || pathname.startsWith("/blog/");
  return pathname === href || pathname.startsWith(`${href}/`);
}

function navLinkClass(pathname, href) {
  return isNavActive(pathname, href) ? `${linkBase} active` : linkBase;
}

function navItemClass(pathname, href) {
  const base = "menu-item menu-item-type-post_type menu-item-object-page u-nav-item";
  if (!isNavActive(pathname, href)) return base;
  return `${base} current-menu-item current_page_item`;
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="u-border-1 u-border-grey-75 u-clearfix u-header u-header" id="sec-51f0">
      <div className="u-clearfix u-sheet u-sheet-1">
        <Link href="/" className="u-image u-logo u-image-1 essam-header-logo" data-image-width="64" data-image-height="64">
          <img
            src={siteConfig.logo}
            alt={siteConfig.nameAr}
            className="u-logo-image u-logo-image-1"
            width={64}
            height={64}
            style={{ width: 64, height: 64, objectFit: "contain", display: "block" }}
          />
        </Link>
        <nav className="u-menu u-menu-dropdown u-offcanvas u-menu-1">
          <div
            className="menu-collapse"
            style={{
              fontSize: "1rem",
              letterSpacing: "0px",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            <a
              className="u-button-style u-custom-active-border-color u-custom-active-color u-custom-border u-custom-border-color u-custom-borders u-custom-hover-border-color u-custom-hover-color u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-text-active-color u-custom-text-color u-custom-text-hover-color u-custom-top-bottom-menu-spacing u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
              href="#"
            >
              <svg>
                <use xlinkHref="#menu-hamburger" />
              </svg>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs>
                  <symbol id="menu-hamburger" viewBox="0 0 16 16" style={{ width: 16, height: 16 }}>
                    <rect y="1" width="16" height="2" />
                    <rect y="7" width="16" height="2" />
                    <rect y="13" width="16" height="2" />
                  </symbol>
                </defs>
              </svg>
            </a>
          </div>
          <div className="u-custom-menu u-nav-container">
            <ul id="menu-menu-1" className="u-nav u-spacing-2 u-unstyled u-nav-1">
              {navigation.map((item) => (
                <li key={item.href} className={navItemClass(pathname, item.href)}>
                  <Link
                    href={item.href}
                    aria-current={isNavActive(pathname, item.href) ? "page" : undefined}
                    className={navLinkClass(pathname, item.href)}
                    style={{ padding: "10px 20px" }}
                  >
                    {item.labelAr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="u-custom-menu u-nav-container-collapse">
            <div className="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
              <div className="u-inner-container-layout u-sidenav-overflow">
                <div className="u-menu-close" />
                <ul id="menu-menu-2" className="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2">
                  {navigation.map((item) => (
                    <li key={`mobile-${item.href}`} className={navItemClass(pathname, item.href)}>
                      <Link
                        href={item.href}
                        aria-current={isNavActive(pathname, item.href) ? "page" : undefined}
                        className={isNavActive(pathname, item.href) ? "u-button-style u-nav-link active" : "u-button-style u-nav-link"}
                        style={{ padding: "10px 20px" }}
                      >
                        {item.labelAr}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="u-black u-menu-overlay u-opacity u-opacity-70" />
          </div>
        </nav>
      </div>
    </header>
  );
}
