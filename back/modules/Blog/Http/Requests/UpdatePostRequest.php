<?php

namespace Modules\Blog\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
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
            'description' => [
                'string',
                'min:10',
                'max:255'
            ],
            'content' => [
                'string',
                'min:500',
                'max:1500'
            ],
        ];
    }
}
