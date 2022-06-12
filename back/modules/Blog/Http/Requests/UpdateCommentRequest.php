<?php

namespace Modules\Blog\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCommentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => [
                'string',
                'min:10',
                'max:50'
            ],
            'content' => [
                'string',
                'min:10',
                'max:300'
            ],
        ];
    }
}
