<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


use App\Repositories\AuthRepository;
use App\User;

class AuthAPIController extends Controller
{

    public $authRepository;

    public function __construct(AuthRepository $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    public function createToken(){
        $user = User::first();
        $accessToken = $user->createToken('Token Name')->accessToken;
        return $accessToken;
    }

    public function login(Request $request){

        $formData = $request->all();
        $validator = \Validator::make($formData,[
        'email' => 'required',
        'password' => 'required',
    ],[
        'email.required' => 'Please give your email',
        'password.required' => 'Please give your password',
    ]);
    if($validator->fails()){
        return response()->json([
            'success' => false,
            'message' => $validator->getMessageBag()->first(),
            'errors' => $validator->getMessageBag(),
        ]);
    }

        if($this->authRepository->checkIfAuthenticated($request)){
            $user = $this->authRepository->findUserByEmailAddress($request->email);
            $accessToken = $user->createToken('authToken')->accessToken;
            return response()->json([
                'success' => true,
                'message' => 'Logged in successfully !',
                'user' => $user,
                'access_token'=> $accessToken,
            ]);
        }else{
                return response()->json([
                'success' => false,
                'message' => 'Invalid Email and Password ',
                'errors' => null,
            ]);
        }
    }

    public function register(Request $request){

        $formData = $request->all();
        $validator = \Validator::make($formData,[
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
        ],[
            'name.required' => 'Please give your name',
            'email.required' => 'Please give your email',
            'email.unique' => 'Your email already used, Please login or use another !',
            'password.required' => 'Please give your password',
        ]);
        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        $user = $this->authRepository->registerUser($request);
        if(!is_null($user)){
            $user = $this->authRepository->findUserByEmailAddress($request->email);
            $accessToken = $user->createToken('authToken')->accessToken;
            return response()->json([
                'success' => true,
                'message' => 'Registered Successfully !',
                'user' => $user,
                'access_token'=> $accessToken,
            ]);
        }else{
                return response()->json([
                'success' => false,
                'message' => 'Registration cannot successfull !! ',
                'errors' => null,
            ]);
        }
    }

}
