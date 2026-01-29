<?php

namespace App\Http\Controllers;

use App\Models\User; 
use Illuminate\Http\Request;

use App\Models\Resume;

class AdminController extends Controller
{
    public function allResumes()
    {
        return Resume::with('user:id,name,email')
            ->latest()
            ->get();
    }
    public function toggleBlock(User $user)
{
    $user->is_blocked = ! $user->is_blocked;
    $user->save();

    return response()->json([
        'blocked' => $user->is_blocked
    ]);
}

}

