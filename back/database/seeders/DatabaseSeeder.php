<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Modules\Blog\Models\Comment;
use Modules\Blog\Models\Post;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        User::factory()->has(Role::factory()->state([
            'role' => Role::ROLE_ADMINISTRATOR
        ]), 'roles')->create();

        User::factory(2)->has(Role::factory()->state([
            'role' => Role::ROLE_MODERATOR
        ]), 'roles')->create();

        $writers = User::factory(3)->has(Role::factory()->state([
            'role' => Role::ROLE_WRITER
        ]), 'roles')->create();

        $readers = User::factory(4)->has(Role::factory()->state([
            'role' => Role::ROLE_READER
        ]), 'roles')->create();

        foreach ($writers as $writer) {
            Post::factory(6)->for($writer, 'user')->create();
        }
        foreach ($readers as $reader) {
            Comment::factory(2)
                ->for(Post::inRandomOrder()->first(), 'post')
                ->for($reader, 'user')
                ->create();
        }
    }
}
