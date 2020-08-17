<template>
  <div>
    <div class="form-inline my-2">
      <input class="form-control form-control-sm w-50 mr-auto"
      type="text" placeholder="Search 請按 Enter"
      v-model="searchProduct" @keyup.enter="getProducts(1)">
      <button class="btn btn-sm btn-primary"
      @click="openModal(true)">新增產品</button>
    </div>
    <div class="table-responsive-lg mb-3">
      <table class="table table-sm text-nowrap table-hover">
        <thead>
          <tr class="text-center">
            <th scope="col" style="width: 8%">類別</th>
            <th scope="col" >名稱</th>
            <th scope="col" style="width: 12%">原價</th>
            <th scope="col" style="width: 12%">售價</th>
            <th scope="col" style="width: 8%">單位</th>
            <th scope="col" style="width: 12%">狀態</th>
            <th scope="col" style="width: 12%">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center" v-for="(product) in products" :key="product.id">
            <td scope="row" class="align-middle">{{ product.category }}</td>
            <td class="align-middle">{{ product.title }}</td>
            <td class="text-right align-middle">{{ product.origin_price | currency }}</td>
            <td class="text-right align-middle">{{ product.price | currency }}</td>
            <td class="align-middle">{{ product.unit }}</td>
            <td v-if="product.is_enabled" class="text-success align-middle">已啟用</td>
            <td v-else class="text-danger align-middle">未啟用</td>
            <td class="align-middle">
              <div class="btn-group btn-group-sm" role="group">
                <button type="button" class="btn btn-primary"
                @click="openModal(false,product)">
                  編輯
                </button>
                <button type="button" class="btn btn-outline-danger"
                @click="openDelModal(product)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <shared-pagination :pagesData="pagination" @current-page="getProducts"/>
    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <ValidationObserver v-slot="{ invalid }">
          <form class="modal-content bg-dark text-white"
          @submit.prevent="updateProduct">
            <div class="modal-header border-0">
              <h5 class="modal-title" id="productModalLabel">
                <span>新增產品</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input type="text" class="form-control" id="image"
                      placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                  </div>
                  <div class="form-group">
                    <label for="customFile">或 上傳圖片
                      <i class="fas fa-spinner fa-spin"
                        v-if="status.fileUploading"></i>
                    </label>
                    <input type="file" id="customFile" class="form-control h-100"
                      ref="files" @change="uploadFile">
                  </div>
                  <img class="img-fluid" alt="" :src="tempProduct.imageUrl">
                </div>
                <div class="col-sm-8">
                  <div class="form-group">
                    <label for="title">名稱</label>
                    <ValidationProvider name="名稱" rules="required"
                    immediate v-slot="{ errors, classes }">
                      <input type="text" class="form-control" id="title" :class="classes"
                        placeholder="請輸入名稱" v-model="tempProduct.title">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="category">分類</label>
                      <input type="text" class="form-control" id="category"
                        placeholder="請輸入分類" v-model="tempProduct.category">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">單位</label>
                      <input type="text" class="form-control" id="unit"
                        placeholder="請輸入單位" v-model="tempProduct.unit">
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input type="number" name="原價"
                    class="form-control" id="origin_price"
                      placeholder="請輸入原價" v-model="tempProduct.origin_price">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">特價</label>
                      <input type="number" class="form-control" id="price"
                        placeholder="請輸入特價" v-model="tempProduct.price">
                    </div>
                  </div>
                  <hr>

                  <div class="form-group">
                    <label for="description">產品描述</label>
                    <textarea type="text" class="form-control" id="description"
                      placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea type="text" class="form-control" id="content"
                      placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox"
                        id="is_enabled" v-model="tempProduct.is_enabled"
                        :true-value="1"
                        :false-value="0"
                        >
                      <label class="form-check-label" for="is_enabled">
                        是否啟用
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer border-0">
              <button type="button" class="btn px-4 btn-outline-white"
              data-dismiss="modal">取消</button>
              <button type="submit" class="btn px-4 btn-danger" :disabled="invalid">
                確認
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
      aria-labelledby="delModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header border-0">
            <h5 class="modal-title text-danger" id="delModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong>
            商品
            <small class="text-muted">刪除後將無法恢復</small>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-outline-white px-4"
            data-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-danger px-4"
            @click="updateDelProduct">
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
// mixins
import getProducts from '@/mixins/getProducts';
// components
import SharedPagination from '@/components/Shared/SharedPagination.vue';

export default {
  data(
  ) {
    return {
      tempProduct: {},
      isNew: false,
      status: {
        isLoading: false,
        fileUploading: false,
      },
    };
  },
  components: {
    SharedPagination,
  },
  mixins: [
    getProducts,
  ],
  methods: {
    openModal(
      isNew, product,
    ) {
      this.isNew = isNew;
      if (isNew) {
        this.tempProduct = {};
      } else {
        // 避免傳址
        this.tempProduct = { ...product };
      }
      $(
        '#productModal',
      ).modal(
        'show',
      );
    },
    updateProduct(
    ) {
      const vm = this;
      let api = `
      ${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product`;
      let httpMethod = 'post';
      // 切換 "編輯" 與 "修改"
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
      }
      vm.$http[httpMethod](
        api, { data: vm.tempProduct },
      ).then(
        (response) => {
          if (response.data.success) {
            $(
              '#productModal',
            ).modal(
              'hide',
            );
            vm.getProducts(
            );
          } else {
            $(
              '#productModal',
            ).modal(
              'hide',
            );
            vm.getProducts(
            );
            vm.$bus.$emit(
              'message:push', response.data.message, 'danger',
            );
          }
        },
      );
    },
    openDelModal(
      product,
    ) {
      this.tempProduct = product;
      $(
        '#delProductModal',
      ).modal(
        'show',
      );
    },
    updateDelProduct(
    ) {
      const vm = this;
      const api = `
      ${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${vm.tempProduct.id}`;
      vm.$http.delete(
        api,
      ).then(
        (response) => {
          if (response.data.success) {
            $(
              '#delProductModal',
            ).modal(
              'hide',
            );
            vm.getProducts(
            );
          } else {
            $(
              '#delProductModal',
            ).modal(
              'hide',
            );
            vm.getProducts(
            );
            vm.$bus.$emit(
              'message:push', response.data.message, 'danger',
            );
          }
        },
      );
    },
    uploadFile(
    ) {
      const vm = this;
      const uploadedFile = this.$refs.files.files[0];
      const formData = new FormData(
      );
      formData.append(
        'file-to-upload', uploadedFile,
      );
      const api = `
      ${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/upload`;
      vm.status.fileUploading = true;
      vm.$http.post(
        api, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      ).then(
        (response) => {
          if (response.data.success) {
            vm.$set(
              vm.tempProduct, 'imageUrl', response.data.imageUrl,
            );
            vm.status.fileUploading = false;
          } else {
            vm.$bus.$emit(
              'message:push', response.data.message, 'danger',
            );
          }
        },
      );
    },
  },
  created(
  ) {
    this.getProducts(
    );
  },
};
</script>

<style lang="scss" scoped>
</style>
