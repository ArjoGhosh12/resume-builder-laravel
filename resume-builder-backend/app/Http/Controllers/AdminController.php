<?php

namespace App\Http\Controllers;

use App\Models\User; 
use Illuminate\Http\Request;

use App\Models\Resume;

class AdminController extends Controller
{
    public function allResumes()
{
    return User::with([
        'resumes.personal_details',
        'resumes.socials',
        'resumes.experiences',
        'resumes.educations',
        'resumes.projects',
        'resumes.certifications'
    ])
    ->select('id','name','username','email','role','is_blocked')
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

