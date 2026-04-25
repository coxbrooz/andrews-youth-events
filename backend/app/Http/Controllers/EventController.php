<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        return Event::withCount('registrations')->get();
    }

    public function store(Request $request)
    {
        // 1. Merge default values so validation doesn't fail for missing form fields
        $request->merge([
            'status' => $request->input('status', 'upcoming'),
            'attendees' => $request->input('attendees', 0),
        ]);

        // 2. Validate the request
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'ministry'    => 'required|string',
            'venue'       => 'required|string',
            'date'        => 'required|date',
            'time'        => 'required',
            'status'      => 'required|in:upcoming,completed',
            'attendees'   => 'integer|min:0'
        ]);

        // 3. Create the event
        $event = Event::create($validated);
        
        return response()->json($event, 201);
    }

    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        $validated = $request->validate([
            'title'       => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'ministry'    => 'sometimes|required|string',
            'venue'       => 'sometimes|required|string',
            'date'        => 'sometimes|required|date',
            'time'        => 'sometimes|required',
            'status'      => 'sometimes|required|in:upcoming,completed',
            'attendees'   => 'sometimes|integer|min:0'
        ]);

        $event->update($validated);
        return response()->json(['message' => 'Event updated!', 'event' => $event]);
    }

    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();
        
        return response()->json(['message' => 'Event deleted!']);
    }
}