<?php

namespace App\Http\Requests\Task;

use App\Models\Project;
use App\Rules\RelatedTasks;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class DestroyTasksRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        /** @var Project */
        $project = $this->route('project');

        return [
            'ids' => ['required', new RelatedTasks($project)],
        ];
    }
}
