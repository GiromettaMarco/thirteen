<?php

namespace App\Http\Requests\Task;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTaskRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'description' => ['nullable', 'string', 'max:5000'],
            'label' => ['nullable', Rule::in(['bug', 'documentation', 'feature'])],
            'name' => ['required', 'string', 'max:255'],
            'priority' => ['nullable', Rule::in(['low', 'medium', 'high'])],
            'status' => ['nullable', Rule::in(['backlog', 'todo', 'in_progress', 'done', 'canceled'])],
            'profile_id' => ['nullable', 'numeric'],
        ];
    }
}
