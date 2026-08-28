<?php

namespace App\Http\Requests\Project;

use App\Models\Team;
use App\Rules\ProjectsRelatedToTeam;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class DestroyProjectsRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        /** @var Team */
        $team = $this->route('team');

        return [
            'ids' => ['required', 'array', new ProjectsRelatedToTeam($team)],
        ];
    }
}
