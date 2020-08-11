<template>
  <div>
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center m-0">
        <!-- 綁定 Class 當無法返回上一頁時反轉為 true-->
        <li class="page-item" :class="{ disabled: !pagesData.has_pre }">
          <a class="page-link" href="#" aria-label="Previous"
          @click.prevent="currentPage(pagesData.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pagesData.total_pages" :key="page"
          :class="{ 'active': pagesData.current_page === page }">
          <a class="page-link" href="#" @click.prevent="currentPage(page)">{{ page }}</a>
        </li>
        <!-- 綁定 Class 當無法前往下一頁時反轉為 true-->
        <li class="page-item" :class="{ disabled: !pagesData.has_next }">
          <a class="page-link" href="#" aria-label="Next"
          @click.prevent="currentPage(pagesData.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'SharedPagination',
  props: {
    pagesData: Object,
  },
  methods: {
    currentPage(
      page,
    ) {
      // $emit 向上層呼叫 "current-page" 事件並傳遞 "page" 參數;
      this.$emit(
        'current-page', page,
      );
    },
  },
};
</script>
