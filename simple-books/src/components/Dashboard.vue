<template>
  <div class="container my-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="flex-grow-1 text-center">
        <h2 class="mb-0">Books Dashboard</h2>
      </div>
      <button class="btn btn-primary" @click="openAddModal">Add Book</button>
    </div>

    <Search @search="handleSearch" />
    <div class="row justify-content-center">
      <div
        v-for="book in filteredBooks"
        :key="book._id"
        class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
      >
        <div class="card h-100 shadow-sm">
          <img
            :src="`http://localhost:5000/${book.imageUrl}`"
            class="card-img-top"
            :alt="`Book Cover: ${book.title}`"
            style="height: 200px; object-fit: cover"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ book.title }}</h5>
            <p class="card-text">Author: {{ book.author }}</p>
            <p class="card-text">Price : {{ book.price }}</p>
            <p class="card-text"> ISBN : {{ book.isbn }} </p>
            <button
              class="btn btn-sm btn-primary mt-auto"
              @click="openEditModal(book)"
            >
              Edit
            </button>
            <button
              class="btn btn-sm btn-danger mt-2"
              @click="deleteBook(book._id)"
            >
              Delete
            </button>
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

export default {
  components: { BookModal, Search },
  data() {
    return {
      books: [],
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
