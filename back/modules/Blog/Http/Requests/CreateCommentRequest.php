<?php

namespace Modules\Blog\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateCommentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => [
                'required',
                'string',
                'min:10',
                'max:50'
            ],
            'content' => [
                'required',
                'string',
                'min:10',
                'max:300'
            ],
        ];
    }
}
