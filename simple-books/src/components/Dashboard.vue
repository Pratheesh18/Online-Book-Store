<template>
  <div class="container my-5">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
      <div class="text-center text-md-start">
        <h2 class="mb-0 display-5 fw-bold">Books Dashboard</h2>
      </div>
      <button class="btn btn-primary mt-3 mt-md-0" @click="openAddModal">
        <i class="bi bi-plus-circle me-2"></i>
        Add Book
      </button>
    </div>

    <div class="row mb-4">
      <div class="col-12 col-md-8">
        <Search @search="handleSearch" />
      </div>
      <div class="col-12 col-md-4">
        <Sort @sort="handleSort" />
      </div>
    </div>

    <div class="row justify-content-center">
      <div v-for="book in filteredBooks" :key="book._id" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div class="card h-100 shadow-sm">
          <img
            :src="`http://localhost:5000/${book.imageUrl}`"
            class="card-img-top"
            :alt="`Book Cover: ${book.title}`"
            style="height: 200px; object-fit: cover;"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold">{{ book.title }}</h5>
            <p class="card-text">Author: {{ book.author }}</p>
            <p class="card-text">Price: ${{ book.price }}</p>
            <p class="card-text">ISBN: {{ book.isbn }}</p>
            <div class="mt-auto">
              <button class="btn btn-sm btn-primary me-2" @click="openEditModal(book)">
                <i class="bi bi-pencil-square me-1"></i>
                Edit
              </button>
              <button class="btn btn-sm btn-danger" @click="deleteBook(book._id)">
                <i class="bi bi-trash me-1"></i>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <BookModal
      ref="bookModal"
      :isEditMode="isEditMode"
      :existingBook="selectedBook"
      @add-book="addBook"
      @update-book="updateBook"
    />
  </div>
</template>

<script>
import api from "../api/api";
import BookModal from "./BookModal.vue";
import Search from "./Search.vue";
import * as bootstrap from "bootstrap";
import { useToast } from "vue-toastification";
import Sort from "./Sort.vue";

export default {
  components: { BookModal, Search,Sort },
  data() {
    return {
      books: [],
      originalBooks:[],
      filteredBooks: [],
      isEditMode: false,
      selectedBook: null,
      toast:useToast(),
    };
  },
  async created() {
    await this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await api.get("/books");
        this.books = response.data;
        this.originalBooks = [...this.books];
        this.filteredBooks = this.books;
        console.log(this.books);
      } catch (error) {
        this.toast.error("Failed to fetch books");
        console.error(error);
      }
    },
    openAddModal() {
      this.isEditMode = false;
      this.selectedBook = null;
      this.$refs.bookModal.resetForm();
      const modal = new bootstrap.Modal(document.getElementById("bookModal"));
      modal.show();
    },
    openEditModal(book) {
      this.isEditMode = true;
      this.selectedBook = book;
      const modal = new bootstrap.Modal(document.getElementById("bookModal"));
      modal.show();
    },
    async addBook(formData) {
      try {
        await api.post("/books", formData);
        await this.fetchBooks();
        this.toast.success("Book added successfully")
        this.closeModal();
      } catch (error) {
        this.toast.error("Failed to add book")
      }
    },
    async updateBook(formData) {
      try {
        const response = await api.put(
          `/books/${this.selectedBook._id}`,
          formData
        );
        const updatedBook = response.data;
        updatedBook.imageUrl = `${
          updatedBook.imageUrl
        }?timestamp=${new Date().getTime()}`;

        const index = this.books.findIndex(
          (book) => book._id === updatedBook._id
        );
        if (index !== -1) {
          this.books.splice(index, 1, updatedBook);
          this.filteredBooks.splice(index, 1, updatedBook);
        }
        this.closeModal();
        this.toast.success("Book details updated successfully")
      } catch (error) {
        this.toast.error("Failed to update book details");
        console.error(error);
      }
    },

    async deleteBook(id) {
      try {
        await api.delete(`/books/${id}`);
        await this.fetchBooks();
        this.toast.success("Book deleted successfully");
      } catch (error) {
        this.toast.error("Failed to delete the book");
        console.error(error);
      }
    },
    handleSearch(query) {
      this.filteredBooks = this.books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );
    },
    handleSort(option){
       if(option === "default"){
        this.filteredBooks = [...this.originalBooks];
       }else if(option === "title"){
        this.filteredBooks.sort((a,b) => a.title.localeCompare(b.title));
       }else if(option === "price"){
        this.filteredBooks.sort((a,b) => a.price - b.price)
       }
    },
    closeModal() {
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("bookModal")
      );
      if (modal) {
        modal.hide();
      }
    },
  },
};
</script>
