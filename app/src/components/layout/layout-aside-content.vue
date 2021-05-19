<template>
  <main id="main-with-aside">
    <aside>
      <slot name="aside"></slot>
    </aside>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </main>
</template>

<style lang="scss">
aside {
  height: calc(100vh - 64px);
}

#main-with-aside {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "aside content";

  aside {
    .links-list {
      .collapsible,
      .collection {
        margin: 0;
      }

      .collapsible-body {
        padding: 0;
        overflow: auto;
      }

      .collection-item {

        &.active {
          background-color: darken($color: #ddd, $amount: 5) !important;
          font-weight: bold;
        }
      }
    }
  }
}

.content {
  overflow: auto;
  padding: 1rem;
}
</style>
