<?php

namespace Modules\Blog\Services;

use App\Models\Role;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use Modules\Blog\Models\Post;

class PostService
{

    /**
     * Создание поста
     *
     * @param array $validated
     * @return Post
     * @throws Exception
     */
    public function create(array $validated): Post
    {
        DB::beginTransaction();
        try {
            $author = $this->getAuthorPost();

            $post = $author->posts()->create($validated);

            DB::commit();

            return $post->load(['user']);
        } catch (Exception $exception) {
            DB::rollBack();
            throw $exception;
        }
    }

    /**
     * Обновление поста
     *
     * @param Post $post
     * @param array $validated
     * @return Post
     * @throws Exception
     */
    public function update(Post $post, array $validated): Post
    {
        DB::beginTransaction();
        try {
            $post->update($validated);

            DB::commit();

            return $post->load('user');
        } catch (Exception $exception) {
            DB::rollBack();
            throw $exception;
        }
    }

    /**
     * Удаление поста
     *
     * @param Post $post
     * @return Post
     */
    public function delete(Post $post): Post
    {
        DB::beginTransaction();
        try {
            $post->delete();

            DB::commit();

            return $post;
        } catch (Exception $exception) {
            DB::rollBack();
            throw $exception;
        }
    }

    private function getAuthorPost(): User
    {
        return User::whereHas('roles', function ($q) {
            $q->where('role', Role::ROLE_WRITER);
        })->first();
    }
}
