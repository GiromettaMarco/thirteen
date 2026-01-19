<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Profile extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'public',
        'role',
    ];

    /**
     * One to One (inverse) relationship.
     */
    public function profile(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
