<template>
  <footer class="main-footer">
    <common-wrapper>
      <div class="first-line">
        <div class="logo-block">
          <NuxtLink to="/">
            <img
              src="https://via.placeholder.com/112x72"
              alt="Логотип"
              width="112"
              height="72"
            />
          </NuxtLink>
        </div>

        <div class="nav-block">
          <ul>
            <li>
              <NuxtLink to="/">Страница 1</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/">Страница 2</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/">Страница 3</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/">Страница 4</NuxtLink>
            </li>
            <li class="separator">|</li>
            <li class="phone"><a href="tel:8 800 111-22-33">8 800 111-22-33</a></li>
          </ul>
        </div>

        <div class="social-block">
          <ul class="social-list">
            <li class="social-item">
              <img
                src="https://via.placeholder.com/32x32.png"
                alt="Социальная сеть такая-то"
                title="Социальная сеть такая-то"
              />
            </li>
            <li class="social-item">
              <img
                src="https://via.placeholder.com/32x32.png"
                alt="Социальная сеть такая-то"
                title="Социальная сеть такая-то"
              />
            </li>
            <li class="social-item">
              <img
                src="https://via.placeholder.com/32x32.png"
                alt="Социальная сеть такая-то"
                title="Социальная сеть такая-то"
              />
            </li>
            <li class="social-item">
              <img
                src="https://via.placeholder.com/32x32.png"
                alt="Социальная сеть такая-то"
                title="Социальная сеть такая-то"
              />
            </li>
            <li class="social-item">
              <img
                src="https://via.placeholder.com/32x32.png"
                alt="Социальная сеть такая-то"
                title="Социальная сеть такая-то"
              />
            </li>
            <li class="social-item">
              <img
                src="https://via.placeholder.com/32x32.png"
                alt="Социальная сеть такая-то"
                title="Социальная сеть такая-то"
              />
            </li>
            <li class="social-item">
              <img
                src="https://via.placeholder.com/32x32.png"
                alt="Социальная сеть такая-то"
                title="Социальная сеть такая-то"
              />
            </li>
          </ul>
        </div>
      </div>

      <div class="second-line">
        <div class="offer-block">
          <NuxtLink to="/">Пользовательское соглашение</NuxtLink>
          <span>Политика конфиденциальности</span>
        </div>

        <div class="copyright-block">© 2023 Все права защищены</div>
      </div>
    </common-wrapper>
  </footer>
</template>

<style scoped lang="scss">
.main-footer {
  margin-top: auto;
  padding: 48px 0 80px;
  border-top: 1px solid var(--strip-color);
  font: var(--footer);
  text-align: center;
}

.logo-block {
  margin: 0 auto 40px;
  max-width: 200px;
  height: auto;

  & > img {
    object-fit: contain;
  }
}

.nav-block {
  display: none;
}

.social-block {
  margin-bottom: 60px;
}

.social-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.social-item {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;

  & > img {
    object-fit: cover;
  }
}

.offer-block {
  display: flex;
  justify-content: center;
  margin-bottom: 48px;
  column-gap: 20px;

  & > a {
    color: inherit;
    &:hover {
      color: var(--text-color-hover);
    }
  }
}

.copyright-block {
  opacity: 0.5;
}

@media (min-width: 768px) {
  .first-line {
    margin-bottom: 33px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .second-line {
    display: flex;
    column-gap: 20px;
  }

  .nav-block {
    display: block;
    max-width: 700px;
    margin: 0 auto 0 40px;
    font: var(--text);

    & ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      column-gap: 32px;
    }

    & a {
      color: inherit;
      &:hover {
        color: var(--text-color-hover);
      }
    }
  }

  .separator {
    opacity: 0.2;
  }

  .offer-block {
    margin-bottom: 0;
    order: 1;
  }

  .logo-block {
    margin: 0;
    flex-shrink: 0;
    & img {
      display: block;
    }
  }

  .social-block {
    margin-bottom: 0;
  }
}

@media (min-width: 1440px) {
  .main-footer {
    padding: 35px 0;
    font: var(--footer);
    text-align: left;
  }
}
</style>
