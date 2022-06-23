<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Http\Resources\BaseResource;
use App\Http\Resources\UserResource;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(AuthRequest $authRequest): UserResource|Response|Application|ResponseFactory
    {
        if (Auth::attempt($authRequest->validated())) {
            return UserResource::make(Auth::user()->load('roles'));
        }

        return response('The provided credentials do not match our records.', 404);
    }

    public function logout(): UserResource
    {
        $user = Auth::user();

        Auth::logout();

        return UserResource::make($user->load('roles'));
    }

    public function getAuthUser(): UserResource|BaseResource
    {
        if (Auth::check()) {
            return UserResource::make(Auth::user()->load('roles'));
        }

        return BaseResource::make([]);
    }
}
