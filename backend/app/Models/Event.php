<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Registration; 

class Event extends Model
{
    use HasFactory;

    // This array tells Laravel which fields are allowed to be saved to the database
    protected $fillable = [
        'title', 
        'description', 
        'ministry', 
        'venue', 
        'date', 
        'time', 
        'status', 
        'attendees'
    ];

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }
}