<?php

namespace Modules\Blog\Http\Resources;

use App\Http\Resources\BaseCollection;

class CommentCollection extends BaseCollection
{
    public $collects = CommentResource::class;
}
