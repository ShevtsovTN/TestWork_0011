<?php

use Illuminate\Support\Facades\Route;
use Modules\Blog\Http\Controllers\CommentController;
use Modules\Blog\Http\Controllers\PostController;

Route::as('blog.')->group(function () {
    Route::as('posts.')->group(function () {

        Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
        Route::get('/posts/{post}', [PostController::class, 'show'])->name('posts.show');
        Route::middleware(['auth:sanctum'])->post('/posts', [PostController::class, 'store'])->name('posts.store');
        Route::middleware(['auth:sanctum'])->match(['put', 'patch'],'/posts/{post}', [PostController::class, 'update'])->name('posts.update');
        Route::middleware(['auth:sanctum'])->delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.delete');

        Route::get('/posts/{post}/comments', [PostController::class, 'showComments'])->name('comments.show');
    });
    Route::as('comments.')->group(function () {

        Route::get('/comments', [CommentController::class, 'index'])->name('comments.index');
        Route::get('/comments/{comment}', [CommentController::class, 'show'])->name('comments.show');
        Route::middleware(['auth:sanctum'])->post('/comments', [CommentController::class, 'store'])->name('comments.store');
        Route::middleware(['auth:sanctum'])->delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.delete');
    });
});
