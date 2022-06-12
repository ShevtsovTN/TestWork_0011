<?php

use Illuminate\Support\Facades\Route;
use Modules\Blog\Http\Controllers\CommentController;
use Modules\Blog\Http\Controllers\PostController;

Route::as('blog.')/*->middleware(['auth', 'session'])*/->group(function () {
    Route::as('posts.')->group(function () {
        Route::apiResource('/posts', PostController::class);
        Route::get('/posts/{post}/comments', [PostController::class, 'showComments'])->name('comments.show');
    });
    Route::as('comments.')->group(function () {
        Route::apiResource('/comments', CommentController::class)->except(['store']);
        Route::post('/comments/{post}', [CommentController::class, 'store'])->name('comments.store');
    });
});
