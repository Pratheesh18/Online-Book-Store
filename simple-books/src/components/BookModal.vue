<template>
  <div class="modal fade" id="bookModal" tabindex="-1" aria-labelledby="bookModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="bookModalLabel">{{ isEditMode ? "Edit Book" : "Add Book" }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Title</label>
              <input type="text" v-model="form.title" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Author</label>
              <input type="text" v-model="form.author" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea v-model="form.description" class="form-control" rows="3"></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label">Genre</label>
              <input type="text" v-model="form.genre" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">Price</label>
              <input type="number" v-model="form.price" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">ISBN</label>
              <input type="text" v-model="form.isbn" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">Image</label>
              <div v-if="isEditMode && form.imageUrl">
                <img :src="`http://localhost:5000/${form.imageUrl}`" alt="Book Image" class="img-fluid mb-2" style="max-height: 150px;" />
              </div>
              <input type="file" @change="handleFileChange" class="form-control" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">{{ isEditMode ? "Update Book" : "Add Book" }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import * as bootstrap from 'bootstrap';

export default {
  props: {
    isEditMode: Boolean,
    existingBook: Object,
  },
  data() {
    return {
      form: {
        title: '',
        author: '',
        description: '',
        genre: '',
        price: '',
        isbn: '',
        imageUrl: '',
        image: null,
      },
    };
  },
  watch: {
    existingBook: {
      immediate: true,
      handler(book) {
        if (this.isEditMode && book) {
          this.form = { ...book, image: null };
        }
      },
    },
  },
  methods: {
    handleFileChange(event) {
      this.form.image = event.target.files[0];
    },
    async handleSubmit() {
      const formData = new FormData();
      // Append only fields that have values
      for (const key in this.form) {
        if (key === 'image' && this.form.image === null) continue;
        if (key === 'imageUrl' && this.isEditMode && !this.form.image) continue;
        formData.append(key, this.form[key]);
      }

      try {
        if (this.isEditMode) {
          await this.$emit('update-book', formData);
        } else {
          await this.$emit('add-book', formData);
        }
        this.resetForm();
        const modal = bootstrap.Modal.getInstance(document.getElementById('bookModal'));
        if (modal) {
          modal.hide();
        }
      } catch (error) {
        alert('Failed to submit book details');
        console.error(error);
      }
    },
    resetForm() {
      this.form = {
        title: '',
        author: '',
        description: '',
        genre: '',
        price: '',
        isbn: '',
        imageUrl: '',
        image: null,
      };
    },
  },
};
</script>
