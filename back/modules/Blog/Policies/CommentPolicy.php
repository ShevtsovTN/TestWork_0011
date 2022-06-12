<?php

namespace Modules\Blog\Policies;

use App\Models\Role;
use App\Models\User;
use Modules\Blog\Models\Comment;

class CommentPolicy extends Policy
{
    public function viewMany(): bool
    {
        return true;
    }

    public function view(): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->roles == Role::ROLE_READER;
    }

    public function update(User $user, Comment $comment): bool
    {
        return $this->getAuthor($user, $comment) || $this->getEditor($user);
    }

    public function delete(User $user, Comment $comment): bool
    {
        return $this->getAuthor($user, $comment) || $this->getEditor($user);
    }
}
