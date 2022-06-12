<?php

namespace Modules\Blog\Http\Controllers;

use App\Http\Controllers\Controller;
use Exception;
use Modules\Blog\Http\Requests\CreateCommentRequest;
use Modules\Blog\Http\Requests\UpdateCommentRequest;
use Modules\Blog\Http\Resources\CommentCollection;
use Modules\Blog\Http\Resources\CommentResource;
use Modules\Blog\Models\Comment;
use Modules\Blog\Models\Post;
use Modules\Blog\Services\CommentService;

class CommentController extends Controller
{
    private CommentService $service;

    public function __construct(CommentService $commentService)
    {
        $this->service = $commentService;
    }

    /**
     * @return CommentCollection
     */
    public function index(): CommentCollection
    {
        return CommentCollection::make(
            Comment::with(['user', 'post'])->paginate(min(15, request('per_page', 15)))
        );
    }

    /**
     * @param Comment $comment
     * @return CommentResource
     */
    public function show(Comment $comment): CommentResource
    {
        return CommentResource::make($comment->load(['user', 'post']));
    }

    /**
     * @param Post $post
     * @param CreateCommentRequest $createCommentRequest
     * @return CommentResource
     * @throws Exception
     */
    public function store(Post $post, CreateCommentRequest $createCommentRequest): CommentResource
    {
        return CommentResource::make($this->service->create($post, $createCommentRequest->validated()));
    }

    /**
     * @param Comment $comment
     * @param UpdateCommentRequest $updateCommentRequest
     * @return CommentResource
     * @throws Exception
     */
    public function update(Comment $comment, UpdateCommentRequest $updateCommentRequest): CommentResource
    {
        return CommentResource::make($this->service->update($comment, $updateCommentRequest->validated()));
    }

    /**
     * @param Comment $comment
     * @return CommentResource
     * @throws Exception
     */
    public function destroy(Comment $comment): CommentResource
    {
        return CommentResource::make($this->service->delete($comment));
    }
}
