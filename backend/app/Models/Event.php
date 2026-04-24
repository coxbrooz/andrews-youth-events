<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    use HasFactory;

    // This is where you add your fillable fields
    protected $fillable = [
        'title', 
        'description',
        'ministry', 
        'venue', 
        'date', 
        'time', 
        'attendees', 
        'status'
    ];
}