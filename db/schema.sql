-- Fivo LLC — MariaDB schema.
-- Run once on the VPS:  mysql -u <user> -p <database> < db/schema.sql
--
-- Design: content is small and read as whole collections, so each item keeps a
-- few queryable columns (id, slug, position) plus a JSON `data` blob holding the
-- full object. This preserves the rich nested shape (benefits/process/faqs,
-- neighborhoods, social, etc.) without a wide, brittle column set.

SET NAMES utf8mb4;

-- Collections: services, locations, reviews, caseStudies -------------------
CREATE TABLE IF NOT EXISTS content (
  collection   VARCHAR(40)  NOT NULL,
  item_id      VARCHAR(120) NOT NULL,
  slug         VARCHAR(160) NULL,
  position     INT          NOT NULL DEFAULT 0,
  data         JSON         NOT NULL,
  created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (collection, item_id),
  KEY idx_collection_pos (collection, position),
  KEY idx_collection_slug (collection, slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Singletons: company / brand / NAP settings -------------------------------
CREATE TABLE IF NOT EXISTS settings (
  skey        VARCHAR(60) NOT NULL,
  data        JSON        NOT NULL,
  updated_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (skey)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin-authored overrides for a specific service x location page ----------
CREATE TABLE IF NOT EXISTS service_location_pages (
  service_slug   VARCHAR(160) NOT NULL,
  location_slug  VARCHAR(160) NOT NULL,
  data           JSON         NOT NULL,
  updated_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (service_slug, location_slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin users (server-side auth, bcrypt-hashed passwords) ------------------
CREATE TABLE IF NOT EXISTS users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(80)  NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role          VARCHAR(20)  NOT NULL DEFAULT 'admin',
  created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP    NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional: contact form submissions (server-side, replaces the demo form) -
CREATE TABLE IF NOT EXISTS contact_messages (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  full_name    VARCHAR(160) NOT NULL,
  business     VARCHAR(160) NULL,
  email        VARCHAR(200) NOT NULL,
  phone        VARCHAR(60)  NULL,
  website      VARCHAR(200) NULL,
  service      VARCHAR(160) NULL,
  location     VARCHAR(160) NULL,
  budget       VARCHAR(60)  NULL,
  message      TEXT         NOT NULL,
  ip           VARCHAR(60)  NULL,
  created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
