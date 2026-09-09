<?php

namespace App\Http\Requests;

use App\Rules\TeamRelatedToUser;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCurrentTeamRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => ['bail', 'required', 'integer', new TeamRelatedToUser],
        ];
    }
}
