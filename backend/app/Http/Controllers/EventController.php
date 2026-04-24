<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    // Fetch all events
    public function index()
    {
        return Event::all();
    }

    // Create a new event
    public function store(Request $request)
    {
        return Event::create($request->all());
    }

    // Update an existing event
    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);
        $event->update($request->all());
        return response()->json(['message' => 'Event updated!']);
    }

    // Delete an event
    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();
        return response()->json(['message' => 'Event deleted!']);
    }
}