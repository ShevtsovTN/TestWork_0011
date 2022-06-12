<?php

namespace Modules\Blog\Policies;

use App\Models\Role;
use App\Models\User;
use Modules\Blog\Models\Post;

class PostPolicy extends Policy
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
        return $user->roles == Role::ROLE_WRITER;
    }

    public function update(User $user, Post $post): bool
    {
        return $this->getAuthor($user, $post) || $this->getEditor($user);
    }

    public function delete(User $user, Post $post): bool
    {
        return $this->getAuthor($user, $post) || $this->getEditor($user);
    }
}
