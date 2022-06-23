<?php

namespace Modules\Blog\Services;

use App\Models\Role;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Modules\Blog\Models\Comment;
use Modules\Blog\Models\Post;

class CommentService
{
    /**
     * Создание комментария
     *
     * @param Post $post
     * @param mixed $validated
     * @return Comment
     * @throws Exception
     */
    public function create(Post $post, array $validated): Comment
    {
        DB::beginTransaction();
        try {
            $author = User::find(Auth::id());

            $comment = Comment::factory()
                ->for($author, 'user')
                ->for($post, 'post')
                ->create($validated);

            DB::commit();

            return $comment->load('user');
        } catch (Exception $exception) {
            DB::rollBack();
            throw $exception;
        }
    }

    /**
     * Обновление комментария
     *
     * @param Comment $comment
     * @param mixed $validated
     * @return Comment
     * @throws Exception
     */
    public function update(Comment $comment, mixed $validated): Comment
    {
        DB::beginTransaction();
        try {
            $comment->update($validated);

            DB::commit();

            return $comment;
        } catch (Exception $exception) {
            DB::rollBack();
            throw $exception;
        }
    }

    /**
     * Удаление комментария
     *
     * @param Comment $comment
     * @return Comment
     */
    public function delete(Comment $comment): Comment
    {
        DB::beginTransaction();
        try {
            $comment->delete();

            DB::commit();

            return $comment;
        } catch (Exception $exception) {
            DB::rollBack();
            throw $exception;
        }
    }
}
