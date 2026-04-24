<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreViewRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'filters' => ['nullable', 'json'],
            'pagination' => ['nullable', 'json'],
            'sorting' => ['nullable', 'json'],
            'visibility' => ['nullable', 'json'],
            'page' => ['required', 'string'],
            'table' => ['required', 'string'],
        ];
    }
}
