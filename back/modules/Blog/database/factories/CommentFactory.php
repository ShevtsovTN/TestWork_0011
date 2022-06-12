<?php

namespace Modules\Blog\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use Modules\Blog\Models\Comment;

class CommentFactory extends Factory
{

    protected $model = Comment::class;

    /**
     * @inheritDoc
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->words(3, true),
            'content' => $this->faker->words(10, true),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ];
    }
}
