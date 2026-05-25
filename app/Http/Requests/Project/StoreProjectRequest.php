<?php

namespace App\Http\Requests\Project;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'deadline' => ['nullable', 'date'],
            'description' => ['nullable', 'string', 'max:5000'],
            'name' => ['required', 'string', 'max:255'],
        ];
    }
}
