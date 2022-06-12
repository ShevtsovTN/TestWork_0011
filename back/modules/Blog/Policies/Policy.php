<?php

namespace Modules\Blog\Policies;

use App\Models\Role;
use App\Models\User;
use Modules\Blog\Models\Comment;
use Modules\Blog\Models\Post;

class Policy
{
    protected function getAuthor(User $user, Post|Comment $model): bool
    {
        return $model->user->is($user);
    }

    protected function getEditor(User $user): bool
    {
        return $user->roles == Role::ROLE_ADMINISTRATOR || $user->roles == Role::ROLE_MODERATOR;
    }
}
