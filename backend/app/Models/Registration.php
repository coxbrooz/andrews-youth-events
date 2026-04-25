<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Registration extends Model
{
    use HasFactory;

    protected $fillable = ['event_id', 'user_id'];

    public function event()
    {
        // Use the full namespace or ensure Event is imported
        return $this->belongsTo(Event::class);
    }
}