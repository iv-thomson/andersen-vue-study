<template>
  <footer class="app-footer">
    <section class="info">
      <span class="title">Copyright</span>
      <span class="subtitle">MyServe 2011—2024</span>
    </section>

    <div class="info link">Keyboard Shortcuts</div>
    <section class="info">
      <span class="title">Last Update</span>
      <span class="subtitle">1 day ago</span>
    </section>
  </footer>
</template>

<style scoped lang="scss">
.app-footer {
  display: flex;
  justify-content: space-between;
  border-radius: 0 0 28px 28px;
  border-top: 1px solid #bdbfc1;
  background: #ffffff;
  padding: 10px 36px;
  gap: 4px;
  color: #0e1629;
  size: 14px;
  line-height: 15.6px;
}
.info {
  padding: 10px 17.5px 10px 17.5px;
}
.info .title {
  color: #241f1f;
  font-weight: 700;

  margin-right: 5px;
}
.info.link {
  cursor: pointer;
  text-decoration: underline;
}
.shortcats {
  display: flex;
  gap: 10px;
}
</style>
