<script lang="ts">
export default {
  data: () => ({
    isShowMenu: false,
  }),
  methods: {
    handleShowMenu() {
      this.isShowMenu = !this.isShowMenu;
    },
    handleEnterButtonClick() {},
    handleRegisterButtonClick() {},
  },
};
</script>

<template>
  <header class="main-header">
    <common-wrapper>
      <div class="logo-block">
        <div class="logo-container">
          <NuxtLink to="/">
            <img
              src="https://via.placeholder.com/112x72"
              alt="Логотип"
              width="112"
              height="72"
            />
          </NuxtLink>
        </div>
        <button
          :class="['button-close', isShowMenu ? 'cross' : 'burger']"
          @click="handleShowMenu"
        >
          <span class="visually-hidden">Закрыть</span>
        </button>
      </div>

      <nav
        v-show="isShowMenu"
        class="header-navigation"
      >
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
      </nav>

      <div
        v-show="isShowMenu"
        class="user-menu"
      >
        <v-btn
          class="header-button button-enter"
          variant="outlined"
          @click="handleEnterButtonClick"
        >
          Войти
        </v-btn>
        <v-btn
          class="header-button button-register"
          variant="outlined"
          color="blue-darken-1"
          @click="handleRegisterButtonClick"
        >
          Зарегистрироваться
        </v-btn>
      </div>
    </common-wrapper>
  </header>
</template>

<style lang="scss" scoped>
.main-header {
  font: var(--links-forms);
  overflow-x: hidden;
}

.logo-block {
  position: relative;
  min-height: 96px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &::before {
    position: absolute;
    content: '';
    bottom: 0;
    left: -100%;
    width: 300%;
    height: 1px;
    background: var(--line-color);
  }
}

.logo-container {
  max-width: 200px;
  height: auto;
  padding-top: 10px;
  padding-bottom: 5px;

  & > img {
    display: block;
    object-fit: contain;
  }
}

.button-close {
  width: 28px;
  height: 24px;
  border: none;
  cursor: pointer;
  background: center no-repeat;
}

.cross {
  background-image: url(~/assets/icons/green-cross.svg);
}

.burger {
  background-image: url(~/assets/icons/green-burger.svg);
}

.header-navigation {
  margin: 40px 0 40px;

  & ul {
    margin: 0 auto;
    padding: 0;
    list-style: none;
    text-align: center;
  }

  & li:not(:last-child) {
    margin-bottom: 32px;
  }

  & a {
    color: inherit;

    &:hover {
      color: var(--text-color-hover);
    }
  }
}

.separator {
  display: none;
}

.phone {
  font: var(--buttons);
}

.user-menu {
  margin-bottom: 32px;
}

.header-button {
  width: 100%;
}

.button-enter {
  margin-bottom: 20px;
}

@media (min-width: 1100px) {
  .main-header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .main-header > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 96px;
  }

  .logo-block {
    min-height: auto;

    &::before {
      display: none;
    }
  }

  .button-close {
    display: none;
  }

  .header-navigation {
    display: block !important;
    margin: 0 0 0 5px;
    max-width: 700px;

    & ul {
      display: flex;
      flex-wrap: wrap;
      text-align: left;
    }

    & li:not(:last-child) {
      margin: 0 32px 0 0;
    }
  }

  .separator {
    display: block;
    opacity: 0.2;
  }

  .user-menu {
    display: flex !important;
    flex-wrap: wrap;
    flex-shrink: 0;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0;
    column-gap: 10px;
  }

  .header-button {
    width: auto;
    height: 48px;
  }

  .button-enter {
    min-width: auto;
    margin-bottom: 0;
    padding: 10px;
  }

  .button-register {
    min-width: 206px;
  }
}
</style>
